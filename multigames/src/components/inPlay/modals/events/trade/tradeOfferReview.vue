<template>
  <div>
    <p class="title is-5 has-text-centered mb-3">
      {{ reviewType === 'offer' ? `Oferta de ${rivalName}` : `Contraoferta de ${rivalName}` }}
    </p>

    <!-- Lo que el rival ofrece / propone dar -->
    <p class="label is-small mb-1">
      <span class="tag is-info mr-1">{{ rivalName }}</span>
      {{ reviewType === 'offer' ? 'te ofrece' : 'propone dar' }}
    </p>
    <div v-if="!rivalSide.hasContent" class="has-text-grey is-size-7 mb-2">Nada</div>
    <div v-else class="mb-3">
      <div class="objects-container mb-1" v-if="rivalSide.items.length">
        <div
          v-for="(id, index) in rivalSide.items" :key="id"
          class="object-item no-hover"
          :style="cardStyle(index, rivalSide.items.length)">
          <CardObject :object="makeCard(id, 'rival')" />
        </div>
      </div>
      <div class="tags is-centered mb-0">
        <span v-if="rivalSide.money"   :class="`tag is-${rivalSide.tagColor} is-light`">💰 {{ rivalSide.money }}</span>
        <span v-if="rivalSide.clue"    :class="`tag is-${rivalSide.tagColor} is-light`">🔍 {{ rivalSide.clue }}</span>
        <span v-if="rivalSide.remnant" :class="`tag is-${rivalSide.tagColor} is-light`">🧩 {{ rivalSide.remnant }}</span>
      </div>
    </div>

    <!-- Lo que tú das a cambio -->
    <p class="label is-small mb-1">
      <span class="tag is-warning mr-1">Tú</span>das a cambio
    </p>
    <div v-if="!mySide.hasContent" class="has-text-grey is-size-7 mb-3">Nada</div>
    <div v-else class="mb-3">
      <div class="objects-container mb-1" v-if="mySide.items.length">
        <div
          v-for="(id, index) in mySide.items" :key="id"
          class="object-item no-hover"
          :style="cardStyle(index, mySide.items.length)">
          <CardObject :object="makeCard(id, 'mine')" />
        </div>
      </div>
      <div class="tags is-centered mb-0">
        <span v-if="mySide.money"   :class="`tag is-${mySide.tagColor} is-light`">💰 {{ mySide.money }}</span>
        <span v-if="mySide.clue"    :class="`tag is-${mySide.tagColor} is-light`">🔍 {{ mySide.clue }}</span>
        <span v-if="mySide.remnant" :class="`tag is-${mySide.tagColor} is-light`">🧩 {{ mySide.remnant }}</span>
      </div>
    </div>

    <div class="buttons is-centered mb-0">
      <button class="button is-success is-medium" @click="$emit('accept')">✅ Aceptar</button>
      <button v-if="reviewType === 'offer'"        class="button is-warning is-medium" @click="$emit('counteroffer')">🔄 Contraoferta</button>
      <button v-if="reviewType === 'counteroffer'" class="button is-danger is-medium"  @click="$emit('reject')">❌ Rechazar</button>
    </div>
  </div>
</template>

<script>
import CardObject from '@/components/personajes/ModalsDetallePersonaje/CardObject.vue'

export default {
  name: 'TradeOfferReview',
  components: { CardObject },
  emits: ['accept', 'counteroffer', 'reject'],

  props: {
    offer:            { type: Object,  required: true },
    myPossessions:    { type: Array,   default: () => [] },
    rivalPossessions: { type: Array,   default: () => [] },
    rivalName:        { type: String,  default: '' },
    isHost:           { type: Boolean, default: false },
    reviewType:       { type: String,  default: 'offer' }
  },

  computed: {
    rivalSide() {
      // isHost=true → rival is guest (fromGuest); isHost=false → rival is host (fromHost)
      const side = this.isHost ? this.offer.fromGuest : this.offer.fromHost
      const items = side?.items ?? []
      return {
        items,
        money:      side?.money   || 0,
        clue:       side?.clue    || 0,
        remnant:    side?.remnant || 0,
        hasContent: items.length || side?.money || side?.clue || side?.remnant,
        tagColor:   this.isHost ? 'warning' : 'info'
      }
    },
    mySide() {
      // isHost=true → I am host (fromHost); isHost=false → I am guest (fromGuest)
      const side = this.isHost ? this.offer.fromHost : this.offer.fromGuest
      const items = side?.items ?? []
      return {
        items,
        money:      side?.money   || 0,
        clue:       side?.clue    || 0,
        remnant:    side?.remnant || 0,
        hasContent: items.length || side?.money || side?.clue || side?.remnant,
        tagColor:   this.isHost ? 'info' : 'warning'
      }
    }
  },

  methods: {
    cardStyle(index, total) {
      const mid = (total - 1) / 2
      return { '--card-rotation': `${(index - mid) * 5}deg` }
    },
    itemName(item) {
      return item?.translations?.es?.name || item?.name || 'Objeto desconocido'
    },
    makeCard(id, who) {
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      const item = list.find(p => p.id == id)
      const name = item ? this.itemName(item) : `Objeto (${id})`
      return { img: item?.img || '', translations: { es: { name }, en: { name } } }
    }
  }
}
</script>

<style scoped>
.objects-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem 0.25rem;
}
.object-item {
  width: 25%;
  text-align: center;
  margin-bottom: 1rem;
  transform: rotate(var(--card-rotation, 0deg));
  position: relative;
}
.object-item.no-hover { cursor: default; }
</style>
