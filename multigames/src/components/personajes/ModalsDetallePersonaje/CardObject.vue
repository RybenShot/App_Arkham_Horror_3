<template>
  <div class="card-object" @click="handleClick">
    <img :src="object.img" :alt="getObjectName()" class="card-image">
    <div class="card-title">
      <p class="has-text-centered is-size-7">{{ getObjectName() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardObject",
  props: {
    object: {
      type: Object,
      required: true
    }
  },
  methods: {
    getObjectName() {
      const language = this.$store.state.lenguaje;
      if (language === "español") {
        return this.object.translations.es.name;
      } else if (language === "ingles") {
        return this.object.translations.en.name;
      }
      return this.object.translations.es.name; // fallback
    },
    handleClick() {
      this.$emit('card-clicked', this.object.img);
    }
  }
}
</script>

<style scoped>
.card-object {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 0.5rem;
}

.card-object:hover {
  transform: scale(1.05);
}

.card-image {
  max-width: 140px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin-top: 0.5rem;
  max-width: 140px;
  word-wrap: break-word;
}

.card-title p {
  margin: 0;
  line-height: 1.2;
}
</style>