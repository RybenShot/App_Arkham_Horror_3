<template>
  <div class="has-text-centered py-5">
    <button class="button is-loading is-white is-large is-rounded mb-3"></button>
    <p class="subtitle is-6">{{ message }}</p>

    <div v-if="subNote" class="box mx-2 mt-2">
      <p class="is-size-7 has-text-grey">{{ subNote }}</p>
    </div>

    <div v-if="offerPreview" class="box mx-2 mt-2 has-text-left">
      <p class="is-size-7 has-text-grey mb-2"><strong>Tu oferta enviada:</strong></p>
      <p class="is-size-7 mb-1">
        🎁 <strong>Das:</strong> {{ formatSide(offerPreview.fromHost, 'mine') }}
        <span v-if="offerPreview.fromHost.money"> + 💰{{ offerPreview.fromHost.money }}</span>
        <span v-if="offerPreview.fromHost.clue"> + 🔍{{ offerPreview.fromHost.clue }}</span>
        <span v-if="offerPreview.fromHost.remnant"> + 🧩{{ offerPreview.fromHost.remnant }}</span>
      </p>
      <p class="is-size-7">
        🔍 <strong>Quieres:</strong> {{ formatSide(offerPreview.fromGuest, 'rival') }}
        <span v-if="offerPreview.fromGuest.money"> + 💰{{ offerPreview.fromGuest.money }}</span>
        <span v-if="offerPreview.fromGuest.clue"> + 🔍{{ offerPreview.fromGuest.clue }}</span>
        <span v-if="offerPreview.fromGuest.remnant"> + 🧩{{ offerPreview.fromGuest.remnant }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeWaiting',
  props: {
    message:          { type: String, required: true },
    subNote:          { type: String, default: '' },
    offerPreview:     { type: Object, default: null },
    myPossessions:    { type: Array,  default: () => [] },
    rivalPossessions: { type: Array,  default: () => [] }
  },
  methods: {
    itemName(item) {
      return item?.translations?.es?.name || item?.name || 'Objeto desconocido'
    },
    formatSide(side, who) {
      const items = side?.items ?? []
      if (!items.length) return 'Nada'
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      return items.map(id => {
        const found = list.find(p => p.id == id)
        return found ? this.itemName(found) : `Objeto (${id})`
      }).join(', ')
    }
  }
}
</script>