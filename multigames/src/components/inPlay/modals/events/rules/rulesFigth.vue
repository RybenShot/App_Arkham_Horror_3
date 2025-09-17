<template>
  <div class="cajaReglas">
    <header class="rules-header">
      <h1 class="title has-text-centered">Reglas de Dados</h1>
    </header>
    
    <section class="rules-content">
      
      <!-- Pifia -->
      <div class="rule-item">
        <div class="dice-container">
          <i class="fas fa-dice-one"></i>
        </div>
        <div class="rule-description">
          <p class="rule-title">Pifia, contraresta un acierto.</p>
        </div>
      </div>

      <!-- Nada -->
      <div class="rule-item">
        <div class="dice-container">
          <i class="fas fa-dice-two"></i>
          <i class="fas fa-dice-four"></i>
        </div>
        <div class="rule-description">
          <p class="rule-title">Nada</p>
        </div>
      </div>

      <!-- Comodín -->
      <div class="rule-item">
        <div class="dice-container">
          <i class="fas fa-dice-three"></i>
        </div>
        <div class="rule-description">
          <p class="rule-title">Comodín, permite rerolear 1 dado (excepto 1 pifia)</p>
        </div>
      </div>

      <!-- Acierto -->
      <div class="rule-item">
        <div class="dice-container">
          <i class="fas fa-dice-five"></i>
          <i class="fas fa-dice-six"></i>
        </div>
        <div class="rule-description">
          <p class="rule-title">Acierto</p>
        </div>
      </div>

      <hr>

      <div>
        <p class="subtitle is-7 mb-1">El perdedor pierte 1 Cordura y gana un estado mancillado, pero recupera todas las vidas. El ganador del combate arrebata una de los siguientes objetos del rival de forma aleatoria:
            <ul class="pl-3 subtitle is-7">
                <li>2 dinero</li>
                <li>1 resto</li>
                <li>1 pista</li>
                <li>1 objeto aleatorio</li>
            </ul>
        </p>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: 'RulesModal'
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

.rules-content {
  padding: 16px;
}

.rule-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 12px;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #e8e8e8;
}

.rule-item:last-child {
  margin-bottom: 0;
}

.dice-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  margin-right: 12px;
}

.dice-container i {
  font-size: 1.5rem;
  margin: 0 2px;
  color: #666;
}

.rule-description {
  flex: 1;
}

.rule-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #333;
}

</style>