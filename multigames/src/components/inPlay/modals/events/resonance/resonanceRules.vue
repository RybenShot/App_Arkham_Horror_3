<template>
  <div>
    <div class="cajaReglas">
      <header class="rules-header">
        <h1 class="title has-text-centered mb-1">Ritual de Resonancia</h1>
        <p class="subtitle has-text-centered is-7 mb-0">Un conjuro cooperativo entre dos investigadores</p>
      </header>

      <section class="rules-content">

        <div class="rule-item">
          <div class="dice-container">
            <i class="fas fa-dice-one fa-lg mr-1"></i>
            <span>–</span>
            <i class="fas fa-dice-four fa-lg ml-1"></i>
          </div>
          <div class="rule-description">
            <p class="rule-title">Silencio. La conexión no responde.</p>
          </div>
        </div>

        <div class="rule-item">
          <div class="dice-container">
            <i class="fas fa-dice-five fa-lg die-success-icon mr-1"></i>
            <i class="fas fa-dice-six fa-lg die-success-icon"></i>
          </div>
          <div class="rule-description">
            <p class="rule-title">Acierto — la conexión se fortalece.</p>
          </div>
        </div>

        <hr>

        <p class="subtitle is-7 mb-2 has-text-weight-bold">¿Cómo funciona?</p>
        <p class="subtitle is-7 mb-2">
          Ambos investigadores apuestan <strong>Restos</strong> (pueden ser 0) y lanzan sus dados de
          <strong>Voluntad</strong> simultáneamente.
        </p>

        <div class="rule-item danger-item mb-2">
          <div class="dice-container">
            <i class="fas fa-skull has-text-danger fa-lg"></i>
          </div>
          <div class="rule-description">
            <p class="rule-title has-text-danger">Si alguno falla (0 aciertos):</p>
            <ul class="subtitle is-7 pl-3 mt-1 mb-0">
              <li>Ambos pierden los Restos apostados</li>
              <li>Ambos ganan el estado <em>Señalado por el Primigenio</em></li>
            </ul>
          </div>
        </div>

        <div class="rule-item success-item">
          <div class="dice-container">
            <i class="fas fa-door-open has-text-success fa-lg"></i>
          </div>
          <div class="rule-description">
            <p class="rule-title has-text-success">Si los dos aciertan:</p>
            <ul class="subtitle is-7 pl-3 mt-1 mb-0">
              <li>Portal abierto: <strong>(Restos Host + Restos Guest) × 2</strong> turnos</li>
              <li>Hechizos del barrio: +1 dado · sin tirada de Horror</li>
              <li>El barrio no puede ganar Perdición (se desvía al adyacente)</li>
            </ul>
          </div>
        </div>

      </section>
    </div>

    <div class="field mt-3">
      <button @click="$emit('next')" class="button is-info is-fullwidth">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResonanceRules',
  emits: ['next']
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
.rules-content { padding: 16px; }

.rule-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
}
.rule-item.danger-item  { border-color: #ffcdd2; background: #fff8f8; }
.rule-item.success-item { border-color: #c8e6c9; background: #f8fff8; }

.dice-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  margin-right: 12px;
  flex-shrink: 0;
  color: #666;
}
.rule-description { flex: 1; }
.rule-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}
.die-success-icon { color: #48c78e; }
</style>
