<template>
  <section class="has-text-centered py-4">
    <div class="mb-4">
      <i class="fas fa-circle-notch fa-spin fa-3x has-text-link"></i>
    </div>
    <p class="title is-4">Ritual Activado</p>
    <p class="subtitle is-6 mb-3">Esperando a <strong>{{ rivalName }}</strong>...</p>
    <div class="notification is-dark is-light">
      <p class="is-size-7">Tu apuesta: <strong>{{ myBet }} Resto{{ myBet !== 1 ? 's' : '' }}</strong></p>
      <p class="is-size-7 mt-1 has-text-grey">
        {{ myName }} — {{ myWillpower }} dado{{ myWillpower !== 1 ? 's' : '' }} de Voluntad
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ResonanceWaiting',
  props: {
    myBet:       { type: Number, default: 0 },
    myName:      { type: String, default: '' },
    myWillpower: { type: Number, default: 3 },
    rivalName:   { type: String, default: '' }
  }
}
</script>
