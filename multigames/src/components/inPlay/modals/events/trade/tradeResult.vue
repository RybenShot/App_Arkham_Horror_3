<template>
  <div>

    <!-- Intercambio realizado -->
    <div v-if="!cancelled" class="notification is-success is-light has-text-centered">
      <p class="title is-3 has-text-success mb-2">🤝 ¡Intercambio realizado!</p>
      <div class="box mb-2">
        <p class="is-size-7 has-text-grey mb-1">Recibiste:</p>
        <div v-if="!myNewItems.length && !resourcesGained.money && !resourcesGained.clue && !resourcesGained.remnant"
             class="has-text-grey is-size-7">Nada</div>
        <div v-else>
          <div class="tags is-centered" v-if="myNewItems.length">
            <span v-for="item in myNewItems" :key="item.id" class="tag is-success is-medium">🎁 {{ itemName(item) }}</span>
          </div>
          <div class="tags is-centered" v-if="resourcesGained.money || resourcesGained.clue || resourcesGained.remnant">
            <span v-if="resourcesGained.money"   class="tag is-success is-medium">💰 +{{ resourcesGained.money }}</span>
            <span v-if="resourcesGained.clue"    class="tag is-success is-medium">🔍 +{{ resourcesGained.clue }}</span>
            <span v-if="resourcesGained.remnant" class="tag is-success is-medium">🧩 +{{ resourcesGained.remnant }}</span>
          </div>
        </div>
      </div>
      <div class="box">
        <p class="is-size-7 has-text-grey mb-1">Diste:</p>
        <div v-if="!myLostItems.length && !resourcesLost.money && !resourcesLost.clue && !resourcesLost.remnant"
             class="has-text-grey is-size-7">Nada</div>
        <div v-else>
          <div class="tags is-centered" v-if="myLostItems.length">
            <span v-for="item in myLostItems" :key="item.id" class="tag is-light is-medium">📤 {{ itemName(item) }}</span>
          </div>
          <div class="tags is-centered" v-if="resourcesLost.money || resourcesLost.clue || resourcesLost.remnant">
            <span v-if="resourcesLost.money"   class="tag is-light is-medium">💰 -{{ resourcesLost.money }}</span>
            <span v-if="resourcesLost.clue"    class="tag is-light is-medium">🔍 -{{ resourcesLost.clue }}</span>
            <span v-if="resourcesLost.remnant" class="tag is-light is-medium">🧩 -{{ resourcesLost.remnant }}</span>
          </div>
        </div>
      </div>
      <button class="button is-success mt-3" @click="$emit('close')">Cerrar</button>
    </div>

    <!-- Intercambio cancelado -->
    <div v-else class="has-text-centered">
      <div class="notification is-warning is-light">
        <p class="title is-4 mb-2">Intercambio cancelado</p>
        <p class="subtitle is-6">No se realizó ningún intercambio.</p>
        <button class="button is-warning mt-2" @click="$emit('close')">Cerrar</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TradeResult',
  emits: ['close'],

  props: {
    cancelled:       { type: Boolean, default: false },
    myNewItems:      { type: Array,   default: () => [] },
    myLostItems:     { type: Array,   default: () => [] },
    resourcesGained: { type: Object,  default: () => ({ money: 0, clue: 0, remnant: 0 }) },
    resourcesLost:   { type: Object,  default: () => ({ money: 0, clue: 0, remnant: 0 }) }
  },

  methods: {
    itemName(item) {
      return item?.translations?.es?.name || item?.name || 'Objeto desconocido'
    }
  }
}
</script>
