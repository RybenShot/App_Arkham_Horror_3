/**
 * DiceEngine — motor de dados 3D con física de cuerpo rígido y render cartoon
 * sobre canvas 2D. No depende de ningún framework.
 *
 *   const engine = new DiceEngine(canvasEl, { count: 3 })
 *   engine.start()
 *   engine.roll()
 *   engine.destroy()
 */

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s]
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
]
const len = (a) => Math.sqrt(dot(a, a))
const norm = (a) => {
  const l = len(a) || 1
  return mul(a, 1 / l)
}
const rnd = () => Math.random() - 0.5
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

const qmul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
]
const qnorm = (q) => {
  const l = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]) || 1
  return [q[0] / l, q[1] / l, q[2] / l, q[3] / l]
}
const qmat = (q) => {
  const [w, x, y, z] = q
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]
  ]
}
const mv = (m, v) => [
  m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
  m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
  m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]
]

// Caras opuestas suman 7
const FACES = [
  { n: [0, 1, 0], u: [1, 0, 0], t: [0, 0, 1], val: 1 },
  { n: [0, -1, 0], u: [1, 0, 0], t: [0, 0, -1], val: 6 },
  { n: [1, 0, 0], u: [0, 0, -1], t: [0, 1, 0], val: 3 },
  { n: [-1, 0, 0], u: [0, 0, 1], t: [0, 1, 0], val: 4 },
  { n: [0, 0, 1], u: [1, 0, 0], t: [0, 1, 0], val: 2 },
  { n: [0, 0, -1], u: [-1, 0, 0], t: [0, 1, 0], val: 5 }
]
const PIPS = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
  5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
  6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]]
}

const DEFAULT_THEME = {
  ink: '#2C2C2A',
  board: '#D9D6C9',
  die: [255, 246, 226],
  dieMarked: [183, 225, 122],
  pipOne: '#E24B4A',
  confetti: ['#639922', '#97C459', '#C0DD97', '#EF9F27']
}

const VIEWS = {
  top: { eye: [0, 5.6, 0], tgt: [0, 0, 0] },
  side: { eye: [0, 3.4, 5.7], tgt: [0, 0.25, 0] }
}

export default class DiceEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.opts = {
      count: 3,
      restitution: 0.45,
      friction: 0.45,
      gravity: -22,
      view: 'top',
      markFrom: 5, // valores >= markFrom disparan confeti y tinte
      interactive: true, // permite lanzar deslizando sobre el canvas
      fadeOut: 0.16,
      fadeIn: 0.22,
      theme: {},
      ...options
    }
    this.theme = { ...DEFAULT_THEME, ...(this.opts.theme || {}) }

    // Constantes del mundo
    this.A = 2.3 // semilado del tablero
    this.M = 1
    this.invM = 1
    this.e = this.opts.restitution
    this.mu = this.opts.friction
    this.G = this.opts.gravity
    this.L = norm([0.35, 1, 0.35])

    this.PLANES = [
      { n: [0, 1, 0], d: 0 },
      { n: [1, 0, 0], d: -this.A },
      { n: [-1, 0, 0], d: -this.A },
      { n: [0, 0, 1], d: -this.A },
      { n: [0, 0, -1], d: -this.A }
    ]

    this.dice = []
    this.parts = []
    this.reported = false
    this.h = 0.25
    this.invI = 6
    this.VERT = []

    this.mode = this.opts.view in VIEWS ? this.opts.view : 'top'
    this.camEye = VIEWS[this.mode].eye.slice()
    this.camTgt = VIEWS[this.mode].tgt.slice()
    this.fov = 1 / Math.tan((24 * Math.PI) / 180)

    // Callbacks públicos
    this.onRollStart = options.onRollStart || null
    this.onSettled = options.onSettled || null
    /** ({ speed, kind: 'floor'|'wall'|'dice', p:[x,y,z] }) en cada golpe audible */
    this.onImpact = options.onImpact || null
    this.impactMin = options.impactMin !== undefined ? options.impactMin : 0.55

    this._raf = 0
    this._last = 0
    this._acc = 0
    this._running = false
    this.W = 0
    this.H = 0

    this._onResize = () => this.resize()
    this._onDown = (ev) => this._pointerDown(ev)
    this._onUp = (ev) => this._pointerUp(ev)
    this._onMove = (ev) => {
      if (ev.buttons) return
      this.canvas.style.cursor = this.pickAt(ev.clientX, ev.clientY) >= 0 ? 'pointer' : ''
    }
    this._drag = { x: 0, y: 0, t: 0, active: false }

    this.resize()
    this._updateCam(1)
    this.setCount(this.opts.count)

    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(this._onResize)
      this._ro.observe(canvas)
    } else if (typeof window !== 'undefined') {
      window.addEventListener('resize', this._onResize)
    }
    if (this.opts.interactive) {
      canvas.addEventListener('pointerdown', this._onDown)
      canvas.addEventListener('pointerup', this._onUp)
      canvas.addEventListener('pointermove', this._onMove)
    }
  }

  /* ---------- API pública ---------- */

  start() {
    if (this._running) return
    this._running = true
    this._last = performance.now()
    this._acc = 0
    const loop = (now) => {
      if (!this._running) return
      const dt = Math.min(0.05, (now - this._last) / 1000)
      this._last = now
      this._acc += dt
      let it = 0
      while (this._acc >= 1 / 180 && it < 8) {
        this._step(1 / 180)
        this._acc -= 1 / 180
        it++
      }
      if (this._acc > 0.05) this._acc = 0
      this._marks(dt)
      this._updateCam(dt)
      this._draw()
      this._raf = requestAnimationFrame(loop)
    }
    this._raf = requestAnimationFrame(loop)
  }

  stop() {
    this._running = false
    cancelAnimationFrame(this._raf)
  }

  destroy() {
    this.stop()
    if (this._ro) this._ro.disconnect()
    else if (typeof window !== 'undefined') window.removeEventListener('resize', this._onResize)
    if (this.opts.interactive) {
      this.canvas.removeEventListener('pointerdown', this._onDown)
      this.canvas.removeEventListener('pointerup', this._onUp)
      this.canvas.removeEventListener('pointermove', this._onMove)
    }
    this.dice = []
    this.parts = []
  }

  setCount(n) {
    const c = Math.max(1, Math.round(n))
    this._setGeom(c)
    while (this.dice.length < c) this.dice.push(this._newDie())
    this.dice.length = c
    for (const b of this.dice) b.p[1] = this.h
  }

  setRestitution(v) {
    this.e = Math.min(0.95, Math.max(0, v))
  }

  setView(mode) {
    if (mode in VIEWS) this.mode = mode
  }

  /** Valor a partir del cual un dado cuenta como éxito (1 a 6). */
  setMarkFrom(v) {
    this.opts.markFrom = Math.max(1, Math.min(6, Math.round(v)))
  }

  get markFrom() {
    return this.opts.markFrom
  }

  /** Nº de dados que alcanzan el umbral de éxito. */
  get marked() {
    return this.values.filter((v) => v >= this.opts.markFrom).length
  }

  /**
   * Devuelve el índice del dado que hay bajo un punto de pantalla, o -1.
   * @param {number} clientX @param {number} clientY coordenadas de puntero
   */
  pickAt(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect()
    const x = clientX - r.left
    const y = clientY - r.top
    let best = -1
    let bestZ = Infinity
    this.dice.forEach((b, i) => {
      if (b.alpha <= 0.05) return
      const sp = this._proj(b.p)
      const rad = this._pxScale(sp[2]) * this.h * 1.3
      if (Math.hypot(sp[0] - x, sp[1] - y) <= rad && sp[2] < bestZ) {
        best = i
        bestZ = sp[2]
      }
    })
    return best
  }

  /**
   * Relanza un solo dado, dejándolo cerca de donde estaba.
   * @param {number} index posición del dado
   * @param {number} [power] fuerza del relanzamiento
   * @returns {boolean} false si el índice no existe o el dado ya está en el aire
   */
  rollOne(index, power = 1) {
    const b = this.dice[index]
    if (!b || b.phase === 'out') return false
    this.reported = false
    const R = Math.max(0.2, this.A - this.h * 1.5)
    b.start = {
      p: [
        clamp(b.p[0] + rnd() * 0.5, -R, R),
        1.0 + Math.random() * 0.35,
        clamp(b.p[2] + rnd() * 0.5, -R, R)
      ],
      q: qnorm([rnd(), rnd(), rnd(), rnd()]),
      v: [rnd() * 0.8 * power, 0.25 + Math.random() * 0.3, rnd() * 0.8 * power],
      w: [rnd() * 26 * power, rnd() * 26 * power, rnd() * 26 * power]
    }
    b.v = [0, 0, 0]
    b.w = [0, 0, 0]
    b.sq = 0
    b.settled = false
    b.calm = 0
    b.burst = false
    b.phase = 'out'
    b.fT = 0
    if (this.onRollStart) this.onRollStart({ index })
    return true
  }

  /**
   * Lanza los dados repartiéndolos por todo el tablero.
   * Cada dado recibe una celda distinta del área de juego y la velocidad
   * necesaria para aterrizar en ella; el rebote posterior hace el resto.
   * @param {number} power  ~1 normal, ~2 fuerte
   * @param {number} [dx]   componente x del gesto (desplaza el reparto)
   * @param {number} [dz]   componente z del gesto
   */
  roll(power = 1, dx, dz) {
    this.reported = false
    this.parts.length = 0

    const n = this.dice.length
    const margin = this.h * 1.5
    const R = Math.max(0.2, this.A - margin)

    // Rejilla de destinos, barajada para que el reparto no siga el orden
    const cols = Math.ceil(Math.sqrt(n))
    const rows = Math.ceil(n / cols)
    const cells = Array.from({ length: cols * rows }, (_, i) => i)
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = cells[i]
      cells[i] = cells[j]
      cells[j] = tmp
    }

    // El gesto desplaza el reparto entero hacia esa dirección
    let bias = [0, 0]
    if (dx !== undefined || dz !== undefined) {
      const bx = dx || 0
      const bz = dz === undefined ? -1 : dz
      const bl = Math.hypot(bx, bz) || 1
      bias = [(bx / bl) * R * 0.4, (bz / bl) * R * 0.4]
    }

    const cw = (2 * R) / cols
    const ch = (2 * R) / rows
    const spawnZ = this.A - this.h - 0.05
    const lane = Math.min(2 * (this.A - this.h), 2.8)

    this.dice.forEach((b, i) => {
      const c = cells[i]
      const tx = clamp(-R + cw * ((c % cols) + 0.5) + rnd() * cw * 0.6 + bias[0], -R, R)
      const tz = clamp(-R + ch * (Math.floor(c / cols) + 0.5) + rnd() * ch * 0.6 + bias[1], -R, R)

      const sx = (n > 1 ? (i / (n - 1) - 0.5) * lane : 0) + rnd() * 0.15
      const sy = 1.45 + (i % 3) * 0.32 + Math.random() * 0.25
      const sz = spawnZ
      const vy = 0.6 + Math.random() * 0.6

      // Tiempo de vuelo hasta tocar el suelo, para calcular la velocidad
      // horizontal que deja el dado en su celda
      const g = this.G
      const t = (vy + Math.sqrt(vy * vy - 2 * g * (sy - this.h))) / -g
      const k = (0.78 * (1 + 0.25 * (power - 1))) / Math.max(0.2, t)

      b.start = {
        p: [sx, sy, sz],
        q: qnorm([rnd(), rnd(), rnd(), rnd()]),
        v: [(tx - sx) * k, vy, (tz - sz) * k],
        w: [rnd() * 28 * power, rnd() * 28 * power, rnd() * 28 * power]
      }
      b.v = [0, 0, 0]
      b.w = [0, 0, 0]
      b.sq = 0
      b.settled = false
      b.calm = 0
      b.burst = false
      b.phase = 'out'
      b.fT = 0
    })
    if (this.onRollStart) this.onRollStart({ index: -1 })
  }

  /** Valores actuales de la cara superior de cada dado. */
  get values() {
    return this.dice.map((b) => this._topFace(b))
  }

  get total() {
    return this.values.reduce((a, b) => a + b, 0)
  }

  get isSettled() {
    return this.dice.every((b) => b.settled)
  }

  resize() {
    const dpr = Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1)
    const r = this.canvas.getBoundingClientRect()
    this.W = r.width || 360
    this.H = r.height || 330
    this.canvas.width = Math.round(this.W * dpr)
    this.canvas.height = Math.round(this.H * dpr)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  /* ---------- Interno: geometría y cámara ---------- */

  _setGeom(n) {
    // El tamaño baja suavemente con la cantidad, con un suelo fijo
    this.h = Math.max(0.168, 0.25 * Math.pow(n, -0.14))
    this.invI = 6 / (this.M * 4 * this.h * this.h)
    this.VERT = []
    for (let i = 0; i < 8; i++) {
      this.VERT.push([i & 1 ? this.h : -this.h, i & 2 ? this.h : -this.h, i & 4 ? this.h : -this.h])
    }
  }

  _newDie() {
    return {
      p: [0, this.h, 0],
      v: [0, 0, 0],
      w: [0, 0, 0],
      q: qnorm([1, 0.2, 0.1, 0.05]),
      settled: true,
      calm: 0,
      hl: 0,
      burst: true,
      sq: 0,
      sndT: 0,
      alpha: 1,
      phase: 'sim',
      fT: 0,
      start: null
    }
  }

  _updateCam(dt) {
    const tv = VIEWS[this.mode]
    const k = 1 - Math.pow(0.0025, Math.min(0.1, dt))
    for (let i = 0; i < 3; i++) {
      this.camEye[i] += (tv.eye[i] - this.camEye[i]) * k
      this.camTgt[i] += (tv.tgt[i] - this.camTgt[i]) * k
    }
    this.cf = norm(sub(this.camTgt, this.camEye))
    // Vista cenital pura: el eje vertical deja de servir como referencia
    const ref = Math.abs(this.cf[1]) > 0.9995 ? [0, 0, -1] : [0, 1, 0]
    this.cs = norm(cross(this.cf, ref))
    this.cu = cross(this.cs, this.cf)
  }

  _proj(pt) {
    const d = sub(pt, this.camEye)
    let z = dot(d, this.cf)
    if (z < 0.05) z = 0.05
    const k = (this.H * 0.5 * this.fov) / z
    return [this.W / 2 + dot(d, this.cs) * k, this.H / 2 - dot(d, this.cu) * k, z]
  }

  _pxScale(z) {
    return (this.H * 0.5 * this.fov) / Math.max(0.05, z)
  }

  _topFace(b) {
    const R = qmat(b.q)
    let best = -2
    let val = 1
    for (const f of FACES) {
      const n = mv(R, f.n)
      if (n[1] > best) {
        best = n[1]
        val = f.val
      }
    }
    return val
  }

  /* ---------- Interno: física ---------- */

  _stepBody(b, dt) {
    if (b.sq > 0) b.sq = Math.max(0, b.sq - dt * 3.4)
    if (b.sndT > 0) b.sndT -= dt

    if (b.phase === 'out') {
      b.fT += dt
      b.alpha = Math.max(0, 1 - b.fT / this.opts.fadeOut)
      if (b.fT >= this.opts.fadeOut) {
        b.p = b.start.p.slice()
        b.q = b.start.q
        b.v = b.start.v.slice()
        b.w = b.start.w.slice()
        b.alpha = 0
        b.fT = 0
        b.phase = 'in'
      }
      return
    }
    if (b.phase === 'in') {
      b.fT += dt
      b.alpha = Math.min(1, b.fT / this.opts.fadeIn)
      if (b.fT >= this.opts.fadeIn) {
        b.alpha = 1
        b.phase = 'sim'
      }
    }
    if (b.settled) return

    b.v[1] += this.G * dt
    b.p = add(b.p, mul(b.v, dt))
    const qd = qmul([0, b.w[0], b.w[1], b.w[2]], b.q)
    b.q = qnorm([
      b.q[0] + 0.5 * qd[0] * dt,
      b.q[1] + 0.5 * qd[1] * dt,
      b.q[2] + 0.5 * qd[2] * dt,
      b.q[3] + 0.5 * qd[3] * dt
    ])

    const R = qmat(b.q)
    let touching = false
    let hit = 0
    let hitKind = 'floor'
    for (let pi = 0; pi < this.PLANES.length; pi++) {
      const pl = this.PLANES[pi]
      for (let i = 0; i < 8; i++) {
        const r = mv(R, this.VERT[i])
        const wp = add(b.p, r)
        const pen = pl.d - dot(wp, pl.n)
        if (pen <= 0) continue
        if (pi === 0) touching = true
        b.p = add(b.p, mul(pl.n, pen * 0.9))
        let vp = add(b.v, cross(b.w, r))
        const vn = dot(vp, pl.n)
        if (vn >= 0) continue
        if (pi === 0 && -vn > 2.2) b.sq = Math.min(0.8, Math.max(b.sq, -vn / 9))
        if (-vn > hit) {
          hit = -vn
          hitKind = pi === 0 ? 'floor' : 'wall'
        }
        const rn = cross(r, pl.n)
        const k = this.invM + this.invI * dot(rn, rn)
        const ee = Math.abs(vn) < 1.0 ? 0 : this.e
        const jn = (-(1 + ee) * vn) / k
        b.v = add(b.v, mul(pl.n, jn * this.invM))
        b.w = add(b.w, mul(cross(r, mul(pl.n, jn)), this.invI))
        vp = add(b.v, cross(b.w, r))
        const vt = sub(vp, mul(pl.n, dot(vp, pl.n)))
        const vtl = len(vt)
        if (vtl > 1e-4) {
          const td = mul(vt, -1 / vtl)
          const rt = cross(r, td)
          const kt = this.invM + this.invI * dot(rt, rt)
          const jt = Math.min(vtl / kt, this.mu * jn)
          b.v = add(b.v, mul(td, jt * this.invM))
          b.w = add(b.w, mul(cross(r, mul(td, jt)), this.invI))
        }
      }
    }

    // Un aterrizaje toca varios vértices: se emite un solo golpe, el más fuerte
    if (this.onImpact && hit > this.impactMin && b.sndT <= 0) {
      b.sndT = 0.05
      this.onImpact({ speed: hit, kind: hitKind, p: b.p.slice() })
    }

    b.v = mul(b.v, 0.999)
    b.w = mul(b.w, 0.997)
    if (touching) {
      b.v = mul(b.v, 0.993)
      b.w = mul(b.w, 0.988)
    }
    if (touching && len(b.v) < 0.14 && len(b.w) < 0.55) b.calm += dt
    else b.calm = 0
    if (b.calm > 0.28) {
      b.settled = true
      b.v = [0, 0, 0]
      b.w = [0, 0, 0]
    }
  }

  _wake(b) {
    if (b.settled) {
      b.settled = false
      b.calm = 0
      b.burst = false
    }
  }

  _pairs() {
    const rad = this.h * 1.2
    const md = rad * 2
    const ee = this.e * 0.7
    for (let i = 0; i < this.dice.length; i++) {
      for (let j = i + 1; j < this.dice.length; j++) {
        const a = this.dice[i]
        const b = this.dice[j]
        if (a.phase === 'out' || b.phase === 'out') continue
        const d = sub(b.p, a.p)
        const dl = len(d)
        if (dl > md || dl < 1e-6) continue
        const n = mul(d, 1 / dl)
        const pen = md - dl
        a.p = add(a.p, mul(n, -pen * 0.5))
        b.p = add(b.p, mul(n, pen * 0.5))
        const ra = mul(n, rad)
        const rb = mul(n, -rad)
        const va = add(a.v, cross(a.w, ra))
        const vb = add(b.v, cross(b.w, rb))
        const vn = dot(sub(vb, va), n)
        if (vn >= 0) continue
        if (-vn > 0.35) {
          this._wake(a)
          this._wake(b)
        }
        if (-vn > 2) a.sq = b.sq = Math.min(0.6, -vn / 12)
        if (this.onImpact && -vn > this.impactMin && a.sndT <= 0 && b.sndT <= 0) {
          a.sndT = b.sndT = 0.05
          this.onImpact({ speed: -vn, kind: 'dice', p: mul(add(a.p, b.p), 0.5) })
        }
        const rna = cross(ra, n)
        const rnb = cross(rb, n)
        const k = 2 * this.invM + this.invI * (dot(rna, rna) + dot(rnb, rnb))
        const jn = (-(1 + ee) * vn) / k
        a.v = add(a.v, mul(n, -jn * this.invM))
        b.v = add(b.v, mul(n, jn * this.invM))
        a.w = add(a.w, mul(cross(ra, mul(n, -jn)), this.invI))
        b.w = add(b.w, mul(cross(rb, mul(n, jn)), this.invI))
      }
    }
  }

  _step(dt) {
    for (const b of this.dice) this._stepBody(b, dt)
    this._pairs()
    if (!this.reported && this.dice.every((b) => b.settled)) {
      this.reported = true
      if (this.onSettled) {
        const values = this.values
        this.onSettled({
          values,
          total: values.reduce((a, b) => a + b, 0),
          marked: values.filter((v) => v >= this.opts.markFrom).length
        })
      }
    }
  }

  /* ---------- Interno: confeti ---------- */

  _burst(b) {
    const n = Math.round(11 + Math.random() * 4)
    const base = [b.p[0], b.p[1] + this.h * 0.9, b.p[2]]
    for (let i = 0; i < n; i++) {
      if (this.parts.length > 320) break
      const a = Math.random() * 6.2832
      const sp = 0.6 + Math.random() * 1.1
      const up = 1.2 + Math.random() * 1.2
      const lf = 0.7 + Math.random() * 0.5
      this.parts.push({
        p: [base[0] + Math.cos(a) * this.h * 0.4, base[1], base[2] + Math.sin(a) * this.h * 0.4],
        v: [Math.cos(a) * sp, up, Math.sin(a) * sp],
        life: lf,
        max: lf,
        r: 0.045 + Math.random() * 0.04,
        rot: Math.random() * 6.28,
        rv: rnd() * 14,
        shape: i % 3,
        col: this.theme.confetti[i % this.theme.confetti.length]
      })
    }
  }

  _marks(dt) {
    for (const b of this.dice) {
      const hi = b.settled && this._topFace(b) >= this.opts.markFrom
      if (b.settled) {
        if (!b.burst) {
          b.burst = true
          if (hi) this._burst(b)
        }
      } else b.burst = false
      b.hl += ((hi ? 1 : 0) - b.hl) * Math.min(1, dt * 5)
      if (b.hl < 0.002) b.hl = 0
    }
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const q = this.parts[i]
      q.v[1] += -5.4 * dt
      q.v[0] *= 0.982
      q.v[2] *= 0.982
      q.p[0] += q.v[0] * dt
      q.p[1] += q.v[1] * dt
      q.p[2] += q.v[2] * dt
      q.rot += q.rv * dt
      if (q.p[1] < 0.012) {
        q.p[1] = 0.012
        q.v[1] *= -0.35
        q.v[0] *= 0.7
        q.v[2] *= 0.7
        q.rv *= 0.6
      }
      q.life -= dt
      if (q.life <= 0) this.parts.splice(i, 1)
    }
  }

  /* ---------- Interno: render ---------- */

  _toneOf(n) {
    const d = Math.max(0, dot(n, this.L))
    return d > 0.72 ? 1 : d > 0.3 ? 0.87 : 0.74
  }

  _faceColor(hl, k) {
    const A = this.theme.die
    const B = this.theme.dieMarked
    const r = A[0] + (B[0] - A[0]) * hl
    const g = A[1] + (B[1] - A[1]) * hl
    const b = A[2] + (B[2] - A[2]) * hl
    return `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`
  }

  _squash(b, pt) {
    if (b.sq <= 0.002) return pt
    const s = b.sq
    const piv = b.p[1] - this.h
    return [
      b.p[0] + (pt[0] - b.p[0]) * (1 + 0.32 * s),
      piv + (pt[1] - piv) * (1 - 0.45 * s),
      b.p[2] + (pt[2] - b.p[2]) * (1 + 0.32 * s)
    ]
  }

  _draw() {
    const ctx = this.ctx
    const A = this.A
    const h = this.h
    ctx.clearRect(0, 0, this.W, this.H)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.globalAlpha = 1

    const c0 = this._proj([-A, 0, -A])
    const c1 = this._proj([A, 0, -A])
    const c2 = this._proj([A, 0, A])
    const c3 = this._proj([-A, 0, A])
    ctx.fillStyle = this.theme.board
    ctx.beginPath()
    ctx.moveTo(c0[0], c0[1])
    ctx.lineTo(c1[0], c1[1])
    ctx.lineTo(c2[0], c2[1])
    ctx.lineTo(c3[0], c3[1])
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = this.theme.ink
    ctx.lineWidth = 3
    ctx.stroke()

    const i0 = this._proj([-A * 0.9, 0, -A * 0.9])
    const i1 = this._proj([A * 0.9, 0, -A * 0.9])
    const i2 = this._proj([A * 0.9, 0, A * 0.9])
    const i3 = this._proj([-A * 0.9, 0, A * 0.9])
    ctx.strokeStyle = 'rgba(44,44,42,0.35)'
    ctx.lineWidth = 2
    ctx.setLineDash([9, 7])
    ctx.beginPath()
    ctx.moveTo(i0[0], i0[1])
    ctx.lineTo(i1[0], i1[1])
    ctx.lineTo(i2[0], i2[1])
    ctx.lineTo(i3[0], i3[1])
    ctx.closePath()
    ctx.stroke()
    ctx.setLineDash([])

    for (const b of this.dice) {
      if (b.alpha <= 0.01) continue
      const sr = h * 1.15 + b.p[1] * 0.07
      const sc = this._proj([b.p[0], 0.006, b.p[2]])
      const ex = this._proj([b.p[0] + sr, 0.006, b.p[2]])
      const ez = this._proj([b.p[0], 0.006, b.p[2] + sr])
      const rx = Math.hypot(ex[0] - sc[0], ex[1] - sc[1])
      const ry = Math.max(1.2, Math.hypot(ez[0] - sc[0], ez[1] - sc[1]))
      ctx.fillStyle = `rgba(44,44,42,${(0.16 * b.alpha).toFixed(3)})`
      ctx.beginPath()
      ctx.ellipse(sc[0], sc[1], rx, ry, 0, 0, 6.2832)
      ctx.fill()
    }

    const list = []
    for (const b of this.dice) {
      if (b.alpha <= 0.01) continue
      const R = qmat(b.q)
      for (const f of FACES) {
        const n = mv(R, f.n)
        const u = mv(R, f.u)
        const t = mv(R, f.t)
        const ctr = add(b.p, mul(n, h))
        if (dot(n, sub(this.camEye, ctr)) <= 0) continue
        const quad = [
          add(add(ctr, mul(u, h)), mul(t, h)),
          add(sub(ctr, mul(u, h)), mul(t, h)),
          sub(sub(ctr, mul(u, h)), mul(t, h)),
          sub(add(ctr, mul(u, h)), mul(t, h))
        ]
        const pts = quad.map((p) => this._proj(this._squash(b, p)))
        list.push({
          pts,
          z: (pts[0][2] + pts[1][2] + pts[2][2] + pts[3][2]) / 4,
          n,
          u,
          t,
          ctr,
          val: f.val,
          hl: b.hl,
          b
        })
      }
    }
    list.sort((a, b) => b.z - a.z)

    const pipR = h * 0.18
    const pipSeg = h > 0.2 ? 12 : 9
    const lw = h > 0.22 ? 2.4 : h > 0.18 ? 2 : 1.7
    for (const f of list) {
      ctx.globalAlpha = f.b.alpha
      ctx.fillStyle = this._faceColor(f.hl, this._toneOf(f.n))
      ctx.strokeStyle = this.theme.ink
      ctx.lineWidth = lw
      ctx.beginPath()
      ctx.moveTo(f.pts[0][0], f.pts[0][1])
      for (let j = 1; j < 4; j++) ctx.lineTo(f.pts[j][0], f.pts[j][1])
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = f.val === 1 ? this.theme.pipOne : this.theme.ink
      for (const pip of PIPS[f.val]) {
        const pc = add(
          add(add(f.ctr, mul(f.n, 0.003)), mul(f.u, pip[0] * h * 0.52)),
          mul(f.t, pip[1] * h * 0.52)
        )
        ctx.beginPath()
        for (let s = 0; s < pipSeg; s++) {
          const an = (s / pipSeg) * 6.2832
          const pp = this._proj(
            this._squash(
              f.b,
              add(add(pc, mul(f.u, Math.cos(an) * pipR)), mul(f.t, Math.sin(an) * pipR))
            )
          )
          if (s === 0) ctx.moveTo(pp[0], pp[1])
          else ctx.lineTo(pp[0], pp[1])
        }
        ctx.closePath()
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1

    for (const q of this.parts) {
      const sp = this._proj(q.p)
      const t = q.life / q.max
      const rr = Math.max(1.5, q.r * this._pxScale(sp[2]) * (0.6 + t * 0.6))
      ctx.save()
      ctx.globalAlpha = Math.min(1, t * 2)
      ctx.translate(sp[0], sp[1])
      ctx.rotate(q.rot)
      ctx.fillStyle = q.col
      ctx.beginPath()
      if (q.shape === 0) {
        ctx.arc(0, 0, rr, 0, 6.2832)
      } else if (q.shape === 1) {
        ctx.rect(-rr, -rr * 0.75, rr * 2, rr * 1.5)
      } else {
        for (let s = 0; s < 8; s++) {
          const an = (s / 8) * 6.2832
          const rad = s % 2 ? rr * 0.42 : rr * 1.15
          const x = Math.cos(an) * rad
          const y = Math.sin(an) * rad
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
      }
      ctx.fill()
      if (rr > 3.5) {
        ctx.strokeStyle = this.theme.ink
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1
  }

  /* ---------- Interno: gesto de lanzamiento ---------- */

  _pointerDown(ev) {
    this._drag = { x: ev.clientX, y: ev.clientY, t: performance.now(), active: true }
    if (this.canvas.setPointerCapture) this.canvas.setPointerCapture(ev.pointerId)
  }

  _pointerUp(ev) {
    if (!this._drag.active) return
    this._drag.active = false
    const dx = (ev.clientX - this._drag.x) / this.W
    const dy = (ev.clientY - this._drag.y) / this.H
    const dt = Math.max(0.06, (performance.now() - this._drag.t) / 1000)
    const mag = Math.sqrt(dx * dx + dy * dy)
    if (mag < 0.05) {
      // Un toque sobre un dado lo relanza a él solo; fuera, tirada completa
      const hit = this.pickAt(ev.clientX, ev.clientY)
      if (hit >= 0) this.rollOne(hit)
      else this.roll(1)
      return
    }
    const pw = Math.min(2.4, 0.7 + (mag / dt) * 0.35)
    this.roll(pw, dx * 7, Math.min(-1.4, dy * 9 - 1.8))
  }
}
