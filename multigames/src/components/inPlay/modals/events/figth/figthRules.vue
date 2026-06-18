<template>
  <div class="cajaReglas">
    <header class="rules-header">
      <h1 class="title has-text-centered">{{ textoInterfaz.titulo }}</h1>
    </header>

    <section class="rules-content">

      <div class="rule-item">
        <div class="dice-container"><i class="fas fa-dice-one"></i></div>
        <div class="rule-description"><p class="rule-title">{{ textoInterfaz.reglas.pifia }}</p></div>
      </div>

      <div class="rule-item">
        <div class="dice-container">
          <i class="fas fa-dice-two"></i>
          <i class="fas fa-dice-four"></i>
        </div>
        <div class="rule-description"><p class="rule-title">{{ textoInterfaz.reglas.nada }}</p></div>
      </div>

      <div class="rule-item">
        <div class="dice-container"><i class="fas fa-dice-three"></i></div>
        <div class="rule-description"><p class="rule-title">{{ textoInterfaz.reglas.comodin }}</p></div>
      </div>

      <div class="rule-item">
        <div class="dice-container">
          <i class="fas fa-dice-five"></i>
          <i class="fas fa-dice-six"></i>
        </div>
        <div class="rule-description"><p class="rule-title">{{ textoInterfaz.reglas.acierto }}</p></div>
      </div>

      <hr>

      <div>
        <p class="subtitle is-7 mb-1">{{ textoInterfaz.descripcionCombate }}</p>
        <ul class="pl-3 subtitle is-7">
          <li>{{ textoInterfaz.recompensas.dinero }}</li>
          <li>{{ textoInterfaz.recompensas.resto }}</li>
          <li>{{ textoInterfaz.recompensas.pista }}</li>
          <li>{{ textoInterfaz.recompensas.objeto }}</li>
        </ul>
        <p class="subtitle is-7 mb-1 has-text-centered">{{ textoInterfaz.infoFinal }}</p>
        <p class="subtitle is-7 mb-1 has-text-centered">{{ textoInterfaz.infoOmision }}</p>
      </div>

    </section>
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
        this.textoInterfaz.reglas.pifia   = 'Pifia, contraresta un acierto.'
        this.textoInterfaz.reglas.nada    = 'Nada'
        this.textoInterfaz.reglas.comodin = 'Comodín, permite rerolear el dado'
        this.textoInterfaz.reglas.acierto = 'Acierto'
        this.textoInterfaz.descripcionCombate = 'El perdedor pierde 1 Cordura y gana un estado mancillado, pero recupera todas las vidas. El ganador del combate arrebata uno de los siguientes objetos del rival de forma aleatoria:'
        this.textoInterfaz.recompensas.dinero = '2 dinero'
        this.textoInterfaz.recompensas.resto  = '1 resto'
        this.textoInterfaz.recompensas.pista  = '1 pista'
        this.textoInterfaz.recompensas.objeto = '1 objeto aleatorio'
        this.textoInterfaz.infoFinal   = 'Al final del encuentro se te dirá que has ganado o perdido.'
        this.textoInterfaz.infoOmision = 'Si no puedes cumplir con la petición, omítelo.'
      } else {
        this.textoInterfaz.titulo = 'Rules'
        this.textoInterfaz.reglas.pifia   = 'Fumble, counteracts a hit.'
        this.textoInterfaz.reglas.nada    = 'Nothing'
        this.textoInterfaz.reglas.comodin = 'Wild, allows rerolling the die'
        this.textoInterfaz.reglas.acierto = 'Hit'
        this.textoInterfaz.descripcionCombate = 'The loser loses 1 Sanity and gains a tainted status, but recovers all health. The combat winner randomly takes one of the following items from the rival:'
        this.textoInterfaz.recompensas.dinero = '2 money'
        this.textoInterfaz.recompensas.resto  = '1 remnant'
        this.textoInterfaz.recompensas.pista  = '1 clue'
        this.textoInterfaz.recompensas.objeto = '1 random object'
        this.textoInterfaz.infoFinal   = 'At the end of the encounter you will be told if you won or lost.'
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
.cajaReglas {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.rules-header {
  background: #f5f5f5;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}
.title {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
}
.rules-content { padding: 16px; }
.rule-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 12px;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
}
.dice-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  margin-right: 12px;
}
.dice-container i { font-size: 1.5rem; margin: 0 2px; color: #666; }
.rule-description { flex: 1; }
.rule-title { font-size: 1rem; font-weight: 500; margin: 0; color: #333; }
</style>