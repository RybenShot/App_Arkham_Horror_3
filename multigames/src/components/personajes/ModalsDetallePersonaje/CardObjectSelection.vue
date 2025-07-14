<template>
  <div class="card-object-selection" 
    :class="{ 'is-selected': isSelected, 'is-disabled': isDisabled, 'is-required': isDisabled && isSelected }"
    @click="cartaSeleccionada">
    <!-- Overlay de selección -->
    <div v-if="isSelected && !isDisabled" class="selection-overlay">
      <i class="fas fa-check-circle selection-check"></i>
    </div>
    
    <!-- Imagen de la carta -->
    <img :src="object.img" :alt="getObjectName()" class="card-image">
    
    <!-- Información de la carta -->
    <div class="card-info">
      <div class="card-title">
        <p class="has-text-centered is-size-7">{{ getObjectName() }}</p>
      </div>
      
      <!-- tag de la carta, reducido a 2 max -->
      <div class="card-types">
        <span v-for="type in object.types.slice(0, 2)" 
          :key="type"
          :class="getTypeClass(type)"
          class="tag is-small">
            {{ type }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CardObjectSelection",

  props: {
    object: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    getObjectName() {
      const language = this.$store.state.lenguaje;
      if (language === "español") {
        return this.object.translations.es.name || "";
      } else if (language === "ingles") {
        return this.object.translations.en.name || "";
      }
      return "error en traduccion";
    },
    
    // funcion para pintar el tag
    getTypeClass(type) {
        // declaramos los tipos que existen
      const typeClasses = {
        'objeto': 'is-success',
        'hechizo': 'is-purple',
        'talento': 'is-grey',
        'aliado': 'is-info',
        'especial': 'is-warning'
      };
      
      const lowerType = type.toLowerCase();
      // aqui finalmente retornaria el color pertinente, o uno por defecto
      return typeClasses[lowerType] || 'is-light';
    },
    
    cartaSeleccionada() {
      if (!this.isDisabled) {
        this.$emit('card-clicked', this.object);
      }
    },
  }
}
</script>

<style scoped>
.card-object-selection {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-object-selection:hover:not(.is-disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-object-selection.is-selected {
  border-color: #28a745;
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.card-object-selection.is-disabled {
  cursor: default;
  opacity: 0.8;
}

.card-object-selection.is-required {
  border-color: #f39c12;
  background: linear-gradient(135deg, #fef9e7, #fcf3cf);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

.selection-overlay {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}

.selection-check {
  color: #28a745;
  font-size: 1.5rem;
  background: white;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.card-image {
  max-width: 120px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.card-object-selection:hover:not(.is-disabled) .card-image {
  transform: scale(1.02);
}

.card-info {
  margin-top: 0.75rem;
  width: 100%;
  text-align: center;
}

.card-title {
  margin-bottom: 0.5rem;
}

.card-title p {
  margin: 0;
  line-height: 1.2;
  font-weight: 600;
  color: #495057;
}

.card-types {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
}

.tag.is-purple {
  background-color: #9b59b6;
  color: white;
}

.tag.is-grey {
  background-color: #95a5a6;
  color: white;
}


</style>