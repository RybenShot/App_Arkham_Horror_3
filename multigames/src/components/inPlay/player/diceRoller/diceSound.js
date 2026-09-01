/**
 * DiceSound — golpes de dado sintetizados con Web Audio.
 * No carga ningún archivo: cada impacto es una ráfaga de ruido filtrada
 * más un golpe grave, con volumen y tono según la fuerza del choque.
 *
 *   const snd = new DiceSound()
 *   document.addEventListener('pointerdown', () => snd.unlock(), { once: true })
 *   engine.onImpact = (e) => snd.impact(e)
 */
export default class DiceSound {
  constructor(options = {}) {
    this.volume = options.volume !== undefined ? options.volume : 0.5
    this.enabled = options.enabled !== undefined ? options.enabled : true
    this.maxVoices = options.maxVoices || 6
    this.ctx = null
    this.master = null
    this.noise = null
    this._voices = []
  }

  /** Debe llamarse desde un gesto del usuario: los navegadores bloquean el audio hasta entonces. */
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return false
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.volume
      this.master.connect(this.ctx.destination)
      this.noise = this._makeNoise()
    }
    if (this.ctx.state === 'suspended') this.ctx.resume()
    return this.ctx.state !== 'suspended'
  }

  setEnabled(on) {
    this.enabled = !!on
    if (on) this.unlock()
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v))
    if (this.master) this.master.gain.value = this.volume
  }

  /** Un buffer de ruido reutilizable de medio segundo */
  _makeNoise() {
    const n = Math.floor(this.ctx.sampleRate * 0.5)
    const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
    return buf
  }

  _free() {
    const now = this.ctx.currentTime
    this._voices = this._voices.filter((t) => t > now)
    return this._voices.length < this.maxVoices
  }

  /**
   * @param {{speed:number, kind:'floor'|'wall'|'dice'}} e evento del motor
   */
  impact(e) {
    if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return
    if (!this._free()) return

    const ctx = this.ctx
    const t = ctx.currentTime
    const s = Math.min(1, e.speed / 7) // 0 roce suave, 1 caída fuerte
    const kind = e.kind || 'floor'

    // Timbre por tipo de superficie
    const tone = kind === 'dice' ? 2600 : kind === 'wall' ? 1500 : 1900
    const dur = kind === 'dice' ? 0.055 : 0.075 + s * 0.05
    const gain = (0.12 + s * 0.55) * (kind === 'wall' ? 0.7 : 1)

    // Clic: ruido filtrado con caída exponencial
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    src.playbackRate.value = 0.8 + Math.random() * 0.5

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = tone * (0.8 + Math.random() * 0.45)
    bp.Q.value = 1.1

    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 350

    const env = ctx.createGain()
    env.gain.setValueAtTime(0.0001, t)
    env.gain.exponentialRampToValueAtTime(gain, t + 0.004)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)

    src.connect(bp)
    bp.connect(hp)
    hp.connect(env)
    env.connect(this.master)
    src.start(t)
    src.stop(t + dur + 0.02)

    // Cuerpo grave sólo en golpes fuertes contra el tablero
    if (kind !== 'dice' && s > 0.25) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(150 + Math.random() * 40, t)
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.09)
      const og = ctx.createGain()
      og.gain.setValueAtTime(0.0001, t)
      og.gain.exponentialRampToValueAtTime(0.25 * s, t + 0.006)
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
      osc.connect(og)
      og.connect(this.master)
      osc.start(t)
      osc.stop(t + 0.12)
    }

    this._voices.push(t + dur)
  }

  /**
   * Lanzamiento: un repiqueteo breve de dados agitándose en el puño y el
   * silbido de soltarlos al aire. Debe sonar justo al pulsar "TIRAR!",
   * antes de que lleguen los primeros impactos contra el tablero.
   */
  throwDice() {
    if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return
    const ctx = this.ctx
    const t0 = ctx.currentTime

    // Repiqueteo previo: unos pocos choques rápidos y suaves entre dados.
    const clacks = 3 + Math.floor(Math.random() * 3)
    let t = t0
    for (let i = 0; i < clacks; i++) {
      t += 0.045 + Math.random() * 0.03
      const src = ctx.createBufferSource()
      src.buffer = this.noise
      src.playbackRate.value = 1.4 + Math.random() * 0.6

      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 2200 + Math.random() * 900
      bp.Q.value = 1.4

      const env = ctx.createGain()
      env.gain.setValueAtTime(0.0001, t)
      env.gain.exponentialRampToValueAtTime(0.05 + Math.random() * 0.03, t + 0.004)
      env.gain.exponentialRampToValueAtTime(0.0001, t + 0.035)

      src.connect(bp)
      bp.connect(env)
      env.connect(this.master)
      src.start(t)
      src.stop(t + 0.05)
    }

    // Silbido de soltada: barrido de ruido filtrado que sube y cae, el
    // impulso del brazo al lanzar los dados al aire.
    const relT = t + 0.05
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    src.playbackRate.value = 0.9

    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.Q.value = 0.9
    bp.frequency.setValueAtTime(500, relT)
    bp.frequency.exponentialRampToValueAtTime(2200, relT + 0.16)
    bp.frequency.exponentialRampToValueAtTime(700, relT + 0.34)

    const env = ctx.createGain()
    env.gain.setValueAtTime(0.0001, relT)
    env.gain.exponentialRampToValueAtTime(0.16, relT + 0.08)
    env.gain.exponentialRampToValueAtTime(0.0001, relT + 0.36)

    src.connect(bp)
    bp.connect(env)
    env.connect(this.master)
    src.start(relT)
    src.stop(relT + 0.4)
  }

  destroy() {
    if (this.ctx) this.ctx.close()
    this.ctx = null
  }
}
