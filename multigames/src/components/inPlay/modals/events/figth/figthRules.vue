<template>
  <div class="rules-scene">

    <header class="rules-header">
      <p class="rules-eyebrow">— REGLAS DEL COMBATE —</p>
      <h2 class="rules-title">{{ textoInterfaz.titulo }}</h2>
    </header>

    <section class="rules-list">

      <div class="rule-row">
        <div class="rule-die die-fumble"><i class="fas fa-dice-one"></i></div>
        <div class="rule-text">
          <span class="rule-tag fumble-tag">PIFIA</span>
          <p>{{ textoInterfaz.reglas.pifia }}</p>
        </div>
      </div>

      <div class="rule-row">
        <div class="rule-die die-miss">
          <i class="fas fa-dice-two"></i>
          <i class="fas fa-dice-four"></i>
        </div>
        <div class="rule-text">
          <span class="rule-tag miss-tag">NADA</span>
          <p>{{ textoInterfaz.reglas.nada }}</p>
        </div>
      </div>

      <div class="rule-row">
        <div class="rule-die die-wild"><i class="fas fa-dice-three"></i></div>
        <div class="rule-text">
          <span class="rule-tag wild-tag">COMODÍN</span>
          <p>{{ textoInterfaz.reglas.comodin }}</p>
        </div>
      </div>

      <div class="rule-row">
        <div class="rule-die die-hit">
          <i class="fas fa-dice-five"></i>
          <i class="fas fa-dice-six"></i>
        </div>
        <div class="rule-text">
          <span class="rule-tag hit-tag">ACIERTO</span>
          <p>{{ textoInterfaz.reglas.acierto }}</p>
        </div>
      </div>

    </section>

    <div class="loot-section">
      <p class="loot-intro">{{ textoInterfaz.descripcionCombate }}</p>
      <div class="loot-list">
        <span class="loot-item">💰 {{ textoInterfaz.recompensas.dinero }}</span>
        <span class="loot-item">🧩 {{ textoInterfaz.recompensas.resto }}</span>
        <span class="loot-item">🔍 {{ textoInterfaz.recompensas.pista }}</span>
        <span class="loot-item">🎴 {{ textoInterfaz.recompensas.objeto }}</span>
      </div>
      <p class="loot-note">{{ textoInterfaz.infoFinal }}</p>
      <p class="loot-note">{{ textoInterfaz.infoOmision }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FigthRules',
  data() {
    return {
      textoInterfaz: {
        titulo: '',
        reglas: { pifia: '', nada: '', comodin: '', acierto: '' },
        descripcionCombate: '',
        recompensas: { dinero: '', resto: '', pista: '', objeto: '' },
        infoFinal: '',
        infoOmision: ''
      }
    }
  },
  methods: {
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje === 'español') {
        this.textoInterfaz.titulo = 'Reglas'
        this.textoInterfaz.reglas.pifia   = 'Contraresta un acierto.'
        this.textoInterfaz.reglas.nada    = 'No tiene efecto.'
        this.textoInterfaz.reglas.comodin = 'Permite rerolear el dado.'
        this.textoInterfaz.reglas.acierto = 'Inflige daño al rival.'
        this.textoInterfaz.descripcionCombate = 'El perdedor pierde 1 Cordura y gana el estado Mancillado. El ganador arrebata al rival uno de los siguientes:'
        this.textoInterfaz.recompensas.dinero = '2 dinero'
        this.textoInterfaz.recompensas.resto  = '1 resto'
        this.textoInterfaz.recompensas.pista  = '1 pista'
        this.textoInterfaz.recompensas.objeto = '1 objeto aleatorio'
        this.textoInterfaz.infoFinal   = 'Al terminar se te informará del resultado.'
        this.textoInterfaz.infoOmision = 'Si no puedes cumplir la petición, omítela.'
      } else {
        this.textoInterfaz.titulo = 'Rules'
        this.textoInterfaz.reglas.pifia   = 'Cancels one hit.'
        this.textoInterfaz.reglas.nada    = 'No effect.'
        this.textoInterfaz.reglas.comodin = 'Allows rerolling the die.'
        this.textoInterfaz.reglas.acierto = 'Deals damage to the rival.'
        this.textoInterfaz.descripcionCombate = 'The loser loses 1 Sanity and gains the Tainted status. The winner takes one of the following from the rival:'
        this.textoInterfaz.recompensas.dinero = '2 money'
        this.textoInterfaz.recompensas.resto  = '1 remnant'
        this.textoInterfaz.recompensas.pista  = '1 clue'
        this.textoInterfaz.recompensas.objeto = '1 random object'
        this.textoInterfaz.infoFinal   = 'You will be informed of the result at the end.'
        this.textoInterfaz.infoOmision = 'If you cannot fulfill the request, skip it.'
      }
    }
  },
  mounted() {
    this.rellenarTextoSegunIdioma()
  }
}
</script>

<style scoped>
.rules-scene {
  background: #0d0000;
  color: #d1d5db;
  padding: 0.75rem 0.5rem;
}

/* ── Header ── */
.rules-header { text-align: center; margin-bottom: 1rem; }
.rules-eyebrow {
  font-size: 0.55rem;
  letter-spacing: 0.4em;
  color: #6b1a1a;
  margin-bottom: 0.25rem;
}
.rules-title {
  font-size: 1.1rem;
  font-weight: 900;
  color: #fca5a5;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(220,38,38,0.5);
}

/* ── Rules list ── */
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.rule-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  border-left: 3px solid transparent;
}
.rule-row:nth-child(1) { border-left-color: #dc2626; }
.rule-row:nth-child(2) { border-left-color: #4b5563; }
.rule-row:nth-child(3) { border-left-color: #d97706; }
.rule-row:nth-child(4) { border-left-color: #16a34a; }

.rule-die {
  display: flex;
  align-items: center;
  gap: 3px;
  min-width: 50px;
  justify-content: center;
}
.rule-die i { font-size: 1.3rem; }
.die-fumble i { color: #dc2626; }
.die-miss   i { color: #6b7280; }
.die-wild   i { color: #d97706; }
.die-hit    i { color: #22c55e; }

.rule-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.rule-text p { font-size: 0.78rem; color: #9ca3af; margin: 0; }

.rule-tag {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 1px 5px;
  border-radius: 3px;
  width: fit-content;
}
.fumble-tag { background: rgba(220,38,38,0.15); color: #f87171; }
.miss-tag   { background: rgba(75,85,99,0.2);  color: #9ca3af; }
.wild-tag   { background: rgba(217,119,6,0.15); color: #fbbf24; }
.hit-tag    { background: rgba(22,163,74,0.15); color: #4ade80; }

/* ── Loot section ── */
.loot-section {
  background: rgba(220,38,38,0.04);
  border: 1px solid rgba(220,38,38,0.15);
  border-radius: 6px;
  padding: 0.75rem;
}
.loot-intro {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.loot-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}
.loot-item {
  font-size: 0.75rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  color: #d1d5db;
}
.loot-note {
  font-size: 0.68rem;
  color: #4b5563;
  font-style: italic;
  margin-top: 0.25rem;
  text-align: center;
}
</style>