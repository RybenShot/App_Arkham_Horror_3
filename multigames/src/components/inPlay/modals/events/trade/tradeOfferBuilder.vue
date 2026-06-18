<template>
  <div>
    <p class="title is-5 has-text-centered mb-3">
      {{ isCounteroffer ? 'Tu contraoferta' : 'Preparar oferta' }}
    </p>

    <!-- Rival items – lo que quieres -->
    <p class="label is-small mb-1">
      <span class="tag is-warning mr-1">{{ rivalName }}</span>lo que quieres
    </p>
    <div v-if="rivalPossessions.length === 0" class="notification is-light py-2 mb-3">
      <p class="is-size-7 has-text-centered">{{ rivalName }} no tiene objetos</p>
    </div>
    <div class="objects-container mb-3" v-else>
      <div
        v-for="(item, index) in rivalPossessions" :key="item.id"
        class="object-item"
        :class="{ 'is-selected': selectedWant.includes(item.id) }"
        :style="cardStyle(index, rivalPossessions.length)"
        @click="toggle(selectedWant, item.id)">
        <CardObject :object="item" />
      </div>
    </div>

    <!-- My items – lo que ofreces -->
    <p class="label is-small mb-1">
      <span class="tag is-info mr-1">Tú</span>lo que ofreces
    </p>
    <div v-if="myPossessions.length === 0" class="notification is-light py-2 mb-3">
      <p class="is-size-7 has-text-centered">No tienes objetos para ofrecer</p>
    </div>
    <div class="objects-container mb-3" v-else>
      <div
        v-for="(item, index) in myPossessions" :key="item.id"
        class="object-item"
        :class="{ 'is-selected': selectedGive.includes(item.id) }"
        :style="cardStyle(index, myPossessions.length)"
        @click="toggle(selectedGive, item.id)">
        <CardObject :object="item" />
      </div>
    </div>

    <!-- Recursos -->
    <div v-if="hasResources" class="mt-2 mb-3">
      <p class="label is-small mb-1">{{ isCounteroffer ? 'Recursos que ofreces' : 'Recursos' }}</p>

      <div class="columns is-mobile is-vcentered mb-2"
           v-if="myAttrs.money > 0 || (!isCounteroffer && rivalAttrs.money > 0)">
        <div class="column is-2"><span>💰</span></div>
        <div class="column" v-if="myAttrs.money > 0">
          <p class="is-size-7 has-text-centered has-text-info">Das ({{ myAttrs.money }})</p>
          <div class="field has-addons is-justify-content-center mb-0">
            <p class="control"><button class="button is-small is-info is-light" @click="give.money = Math.max(0, give.money - 1)">-</button></p>
            <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="give.money" readonly></p>
            <p class="control"><button class="button is-small is-info is-light" @click="give.money = Math.min(myAttrs.money, give.money + 1)">+</button></p>
          </div>
        </div>
        <div class="column" v-if="!isCounteroffer && rivalAttrs.money > 0">
          <p class="is-size-7 has-text-centered has-text-warning">Quieres ({{ rivalAttrs.money }})</p>
          <div class="field has-addons is-justify-content-center mb-0">
            <p class="control"><button class="button is-small is-warning is-light" @click="want.money = Math.max(0, want.money - 1)">-</button></p>
            <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="want.money" readonly></p>
            <p class="control"><button class="button is-small is-warning is-light" @click="want.money = Math.min(rivalAttrs.money, want.money + 1)">+</button></p>
          </div>
        </div>
      </div>

      <div class="columns is-mobile is-vcentered mb-2"
           v-if="myAttrs.clue > 0 || (!isCounteroffer && rivalAttrs.clue > 0)">
        <div class="column is-2"><span>🔍</span></div>
        <div class="column" v-if="myAttrs.clue > 0">
          <p class="is-size-7 has-text-centered has-text-info">Das ({{ myAttrs.clue }})</p>
          <div class="field has-addons is-justify-content-center mb-0">
            <p class="control"><button class="button is-small is-info is-light" @click="give.clue = Math.max(0, give.clue - 1)">-</button></p>
            <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="give.clue" readonly></p>
            <p class="control"><button class="button is-small is-info is-light" @click="give.clue = Math.min(myAttrs.clue, give.clue + 1)">+</button></p>
          </div>
        </div>
        <div class="column" v-if="!isCounteroffer && rivalAttrs.clue > 0">
          <p class="is-size-7 has-text-centered has-text-warning">Quieres ({{ rivalAttrs.clue }})</p>
          <div class="field has-addons is-justify-content-center mb-0">
            <p class="control"><button class="button is-small is-warning is-light" @click="want.clue = Math.max(0, want.clue - 1)">-</button></p>
            <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="want.clue" readonly></p>
            <p class="control"><button class="button is-small is-warning is-light" @click="want.clue = Math.min(rivalAttrs.clue, want.clue + 1)">+</button></p>
          </div>
        </div>
      </div>

      <div class="columns is-mobile is-vcentered mb-2"
           v-if="myAttrs.remnant > 0 || (!isCounteroffer && rivalAttrs.remnant > 0)">
        <div class="column is-2"><span>🧩</span></div>
        <div class="column" v-if="myAttrs.remnant > 0">
          <p class="is-size-7 has-text-centered has-text-info">Das ({{ myAttrs.remnant }})</p>
          <div class="field has-addons is-justify-content-center mb-0">
            <p class="control"><button class="button is-small is-info is-light" @click="give.remnant = Math.max(0, give.remnant - 1)">-</button></p>
            <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="give.remnant" readonly></p>
            <p class="control"><button class="button is-small is-info is-light" @click="give.remnant = Math.min(myAttrs.remnant, give.remnant + 1)">+</button></p>
          </div>
        </div>
        <div class="column" v-if="!isCounteroffer && rivalAttrs.remnant > 0">
          <p class="is-size-7 has-text-centered has-text-warning">Quieres ({{ rivalAttrs.remnant }})</p>
          <div class="field has-addons is-justify-content-center mb-0">
            <p class="control"><button class="button is-small is-warning is-light" @click="want.remnant = Math.max(0, want.remnant - 1)">-</button></p>
            <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="want.remnant" readonly></p>
            <p class="control"><button class="button is-small is-warning is-light" @click="want.remnant = Math.min(rivalAttrs.remnant, want.remnant + 1)">+</button></p>
          </div>
        </div>
      </div>
    </div>

    <button
      class="button is-fullwidth mb-2"
      :class="isCounteroffer ? 'is-warning' : 'is-success'"
      @click="submit">
      📤 {{ isCounteroffer ? 'Enviar contraoferta' : 'Enviar oferta' }}
    </button>
    <button v-if="isCounteroffer" class="button is-light is-fullwidth" @click="$emit('cancel')">
      Volver
    </button>
  </div>
</template>

<script>
import CardObject from '@/components/personajes/ModalsDetallePersonaje/CardObject.vue'

export default {
  name: 'TradeOfferBuilder',
  components: { CardObject },
  emits: ['submit', 'cancel'],

  props: {
    myPossessions:    { type: Array,   default: () => [] },
    rivalPossessions: { type: Array,   default: () => [] },
    myAttrs:          { type: Object,  default: () => ({ money: 0, clue: 0, remnant: 0 }) },
    rivalAttrs:       { type: Object,  default: () => ({ money: 0, clue: 0, remnant: 0 }) },
    rivalName:        { type: String,  default: '' },
    isCounteroffer:   { type: Boolean, default: false }
  },

  data() {
    return {
      selectedWant: [],
      selectedGive: [],
      give: { money: 0, clue: 0, remnant: 0 },
      want: { money: 0, clue: 0, remnant: 0 }
    }
  },

  computed: {
    hasResources() {
      if (this.isCounteroffer)
        return this.myAttrs.money > 0 || this.myAttrs.clue > 0 || this.myAttrs.remnant > 0
      return this.myAttrs.money   > 0 || this.rivalAttrs.money   > 0 ||
             this.myAttrs.clue    > 0 || this.rivalAttrs.clue    > 0 ||
             this.myAttrs.remnant > 0 || this.rivalAttrs.remnant > 0
    }
  },

  methods: {
    toggle(list, id) {
      const idx = list.indexOf(id)
      if (idx === -1) list.push(id)
      else list.splice(idx, 1)
    },
    cardStyle(index, total) {
      const mid = (total - 1) / 2
      return {
        '--card-rotation': `${(index - mid) * 5}deg`,
        animationDelay: `${index * 0.08}s`
      }
    },
    submit() {
      this.$emit('submit', {
        give: { items: [...this.selectedGive], ...this.give },
        want: { items: [...this.selectedWant], ...this.want }
      })
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
  cursor: pointer;
  transform: rotate(var(--card-rotation, 0deg));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}
.object-item:hover {
  transform: rotate(0deg) translateY(-6px) scale(1.05);
  z-index: 10;
}
.object-item.is-selected {
  transform: rotate(0deg) translateY(-10px) scale(1.08);
  z-index: 10;
}
.object-item.is-selected ::v-deep .card-image {
  box-shadow: 0 0 0 3px #48c78e, 0 0 14px rgba(72, 199, 142, 0.7);
}
</style>
