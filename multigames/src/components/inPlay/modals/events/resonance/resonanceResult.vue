<template>
  <section>

    <!-- Éxito -->
    <div v-if="resonanceData.result === 'success'">
      <div class="notification is-success is-light has-text-centered mb-2 py-3">
        <p class="title is-3 has-text-success mb-1">✨ Conexión Establecida</p>
        <p class="subtitle is-6 mb-2">El portal se abre ante vosotros.</p>
        <div class="box py-2 mb-0">
          <p class="is-size-6 mb-0">🌀 Portal abierto durante</p>
          <p class="title is-2 has-text-link mb-0">{{ resonanceData.portalTurns }}</p>
          <p class="is-size-7 has-text-grey">
            turnos · ({{ resonanceData.host.bet }} + {{ resonanceData.guest.bet }}) × 2
          </p>
        </div>
      </div>
    </div>

    <!-- Fracaso -->
    <div v-if="resonanceData.result === 'failure'">
      <div class="notification is-danger is-light has-text-centered mb-2 py-3">
        <p class="title is-3 has-text-danger mb-1">Conexión Interrumpida</p>
        <p class="subtitle is-6 mb-2">El ritual ha fallado. Algo os ha visto.</p>
        <div class="box py-2 mb-0">
          <p class="is-size-5">👁️ <em>Señalados por el Primigenio</em></p>
          <p class="subtitle is-7 mb-0">
            Ambos pierden sus Restos apostados y ganan el estado <strong>Señalado</strong>.
          </p>
        </div>
      </div>
    </div>

    <!-- Dados de ambos jugadores -->
    <div class="columns is-mobile">

      <div class="column has-text-centered">
        <p class="is-size-7 mb-2 has-text-weight-bold">{{ hostName }}</p>
        <div class="dice-results-row mb-2">
          <i
            v-for="(d, i) in resonanceData.host.roll.dice"
            :key="`h${i}`"
            :class="[`fas fa-dice-${diceWord(d)} fa-2x`, d >= 5 ? 'die-success' : 'die-fail']"
          ></i>
        </div>
        <p class="is-size-7">Aciertos: <strong>{{ resonanceData.host.roll.successes }}</strong></p>
        <p class="is-size-7">Apuesta: <strong>{{ resonanceData.host.bet }} Restos</strong></p>
        <span class="tag mt-1" :class="resonanceData.host.roll.successes >= 1 ? 'is-success' : 'is-danger'">
          {{ resonanceData.host.roll.successes >= 1 ? '✓ Conectado' : '✗ Fallido' }}
        </span>
      </div>

      <div class="column has-text-centered">
        <p class="is-size-7 mb-2 has-text-weight-bold">{{ guestName }}</p>
        <div class="dice-results-row mb-2">
          <i
            v-for="(d, i) in resonanceData.guest.roll.dice"
            :key="`g${i}`"
            :class="[`fas fa-dice-${diceWord(d)} fa-2x`, d >= 5 ? 'die-success' : 'die-fail']"
          ></i>
        </div>
        <p class="is-size-7">Aciertos: <strong>{{ resonanceData.guest.roll.successes }}</strong></p>
        <p class="is-size-7">Apuesta: <strong>{{ resonanceData.guest.bet }} Restos</strong></p>
        <span class="tag mt-1" :class="resonanceData.guest.roll.successes >= 1 ? 'is-success' : 'is-danger'">
          {{ resonanceData.guest.roll.successes >= 1 ? '✓ Conectado' : '✗ Fallido' }}
        </span>
      </div>

    </div>

    <button
      class="button is-fullwidth mt-2"
      :class="resonanceData.result === 'success' ? 'is-success' : 'is-danger'"
      @click="$emit('close')"
    >
      Cerrar
    </button>

  </section>
</template>

<script>
export default {
  name: 'ResonanceResult',
  emits: ['close'],

  props: {
    resonanceData: { type: Object, required: true },
    hostName:      { type: String, default: 'Anfitrión' },
    guestName:     { type: String, default: 'Invitado' }
  },

  methods: {
    diceWord(n) {
      const words = ['', 'one', 'two', 'three', 'four', 'five', 'six']
      return words[Math.min(6, Math.max(1, n))]
    }
  }
}
</script>

<style scoped>
.dice-results-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  min-height: 32px;
}
.die-success { color: #48c78e; }
.die-fail    { color: #bbb; }
</style>
