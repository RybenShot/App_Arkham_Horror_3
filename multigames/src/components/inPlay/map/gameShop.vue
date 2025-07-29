<template>
  <div class="shop-container">
    <!-- Título -->
    <div class="shop-header">
      <h1 class="title is-3 has-text-white has-text-centered mb-3">{{ textoInterfaz.title }}</h1>
    </div>

    <!-- Botones de gestión -->
    <div class="shop-controls mb-4">
      <div class="columns is-mobile is-gapless">
        <div class="column is-half pr-1">
          <button class="button is-success is-small is-fullwidth control-btn" @click="añadirItemALaTienda" :class="{ 'is-loading': loadingAdd }">
            <span class="icon is-small"> <i class="fas fa-plus"></i> </span>
            <span>{{ textoInterfaz.addButton }}</span>
          </button>
        </div>
        <div class="column is-half pl-1">
          <button class="button is-info is-small is-fullwidth control-btn" @click="verHistorialVendidos">
            <span class="icon is-small"> <i class="fas fa-history"></i> </span>
            <span>{{ textoInterfaz.historyButton }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navegación mejorada -->
    <div class="navigation-section" v-if="shopItems.length > 1">
      <!-- Dots con indicador de progreso -->
      <div class="navigation-dots">
        <span v-for="(item, index) in shopItems" :key="index" class="dot" :class="{ 'active': index === activeIndex }" @click="setActiveCard(index)">
          <div class="dot-inner"></div>
        </span>
      </div>
    </div>

    <!-- Carrusel -->
    <div v-if="shopItems.length > 0" class="carousel-section">
      <!-- Imagen principal -->
      <div class="main-image-container">
        <div class="image-frame">
          <img :src="shopItems[activeIndex].img" :alt="getItemName(shopItems[activeIndex])" @click="seeCard(shopItems[activeIndex])" class="main-image" >
        </div>
      </div>

      <!-- nombre de carta -->
      <div class="item-info">
        <div class="name-container">
          <h2 class="item-name">{{ getItemName(shopItems[activeIndex]) }}</h2>
        </div>
      </div>

      <!-- Botón de comprar -->
      <div class="buy-button-container">
        <button class="button is-primary is-large is-fullwidth buy-btn" @click="comprarCartaDeObjeto(shopItems[activeIndex])" :class="{ 'is-loading': loadingBuy === shopItems[activeIndex].id }" >
          <span class="icon"> <i class="fas fa-shopping-cart"></i></span>
          <span>{{ textoInterfaz.buyButton }}</span>
          <span class="buy-price"> ${{ shopItems[activeIndex].price }} </span>
        </button>
      </div>

      <!-- flechas de navegacion -->
      <div class="navigation-arrows" v-if="shopItems.length > 1">
        <button class="arrow-btn left-arrow" @click="previousCard" :disabled="activeIndex === 0"> <i class="fas fa-chevron-left"></i> </button>
        <button class="arrow-btn right-arrow" @click="nextCard" :disabled="activeIndex === shopItems.length - 1"> <i class="fas fa-chevron-right"></i> </button>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else-if="!loadingShop" class="empty-state">
      <div class="empty-content">
        <div class="empty-icon"> <i class="fas fa-store-slash"></i> </div>
        <p class="empty-title">{{ textoInterfaz.emptyShop }}</p>
        <p class="empty-subtitle">Añade algunas cartas para comenzar</p>
        <button class="button is-success is-medium empty-btn" @click="añadirItemALaTienda" :class="{ 'is-loading': loadingAdd }">
          <span class="icon"> <i class="fas fa-plus"></i> </span>
          <span>{{ textoInterfaz.addFirstButton }}</span>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loadingShop" class="loading-state">
      <div class="loading-content">
        <div class="loading-spinner"> <div class="spinner"></div> </div>
        <p class="loading-text">{{ textoInterfaz.loading }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { apiService } from '@/services/api.js';

export default {
  name: "GameShop",
  data(){
    return{
      textoInterfaz:{
        title: "",
        addButton: "",
        historyButton: "",
        buyButton: "",
        emptyShop: "",
        addFirstButton: "",
        loading: ""
      },
      shopItems: [],
      activeIndex: 0,
      loadingShop: false,
      loadingAdd: false,
      loadingBuy: null,
    }
  },
  methods:{
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.title = "🛒 Tienda";
        this.textoInterfaz.addButton = "Añadir";
        this.textoInterfaz.historyButton = "Historial";
        this.textoInterfaz.buyButton = "Comprar";
        this.textoInterfaz.emptyShop = "Tienda vacía";
        this.textoInterfaz.addFirstButton = "Añadir primera carta";
        this.textoInterfaz.loading = "Cargando...";
        
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.title = "🛒 Shop";
        this.textoInterfaz.addButton = "Add";
        this.textoInterfaz.historyButton = "History";
        this.textoInterfaz.buyButton = "Buy";
        this.textoInterfaz.emptyShop = "Empty shop";
        this.textoInterfaz.addFirstButton = "Add first card";
        this.textoInterfaz.loading = "Loading...";
      }
    },

    // Método para obtener el nombre del item según el idioma
    getItemName(item) {
      const lang = this.$store.state.lenguaje === 'español' ? 'es' : 'en';
      return item.translations?.[lang]?.name || item.id;
    },

    // Establecer carta activa para navegacion de puntos
    setActiveCard(index) {
      this.activeIndex = index;
    },

    // Navegación
    nextCard() {
      if (this.activeIndex < this.shopItems.length - 1) {
        this.activeIndex++;
      }
    },

    previousCard() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },

    // funcion para obtener todos los objetos de la tienda
    async obtainShop(){
      const idMapOnLine = this.$store.state.datosMapa.id
      this.loadingShop = true;
      
      try {
        const result = await apiService.getShopItems(idMapOnLine)
        // console.log("Shop items obtained:", result);
        
        // comprobamos que el resultado que venga es un array, de no ser asi, lo convertimos en un array vacio
        this.shopItems = Array.isArray(result) ? result : [];
        
        if (this.shopItems.length > 0) {
          this.activeIndex = Math.min(this.activeIndex, this.shopItems.length - 1);
        } else {
          this.activeIndex = 0;
        }
        
      } catch (error) {
        console.log("Error obtaining shop items:", error);
        this.shopItems = [];
        this.$buefy.toast.open({ message: 'Error al obtener los items de la tienda', type: 'is-danger' });
      } finally {
        this.loadingShop = false;
      }
    },
    
    // funcion para añadir un item a la tienda
    async añadirItemALaTienda(){
      // antes de hacer la llamada comprobamos si en al tienda ya hay 5 items, de ser asi, se manda mensaje de que no se pueden añadir mas items
      if (this.shopItems.length >= 5) {
        return this.$buefy.toast.open({ message: 'No se pueden añadir más de 5 items a la tienda', type: 'is-warning' });
      }

      const idMapOnLine = this.$store.state.datosMapa.id
      const action = "add"
      const types = ["tienda"]
      const expansion = "base"
      this.loadingAdd = true;

      try {
        const result = await apiService.manageShopItems(idMapOnLine, action, expansion, types)
        // console.log("Item added to shop:", result);

        // si el resultado trae un id, damos por echo que se ha creado exitosamente el item
        if (result.id) {
          this.$buefy.toast.open({ message: 'Buscando en la trastienda ...', type: 'is-success' });
        } else {
          this.$buefy.toast.open({ message: 'No se pudo añadir el item a la tienda', type: 'is-warning' });
        }
      } catch (error) {
        console.log("Error adding item to shop:", error);
        this.$buefy.toast.open({ message: 'Error al añadir item a la tienda', type: 'is-danger' });
      } finally {
        setTimeout(() => {
          this.loadingAdd = false;
          this.obtainShop();
        }, 2000);
      }
    },

    // Funcion para eliminar un item de la tienda (marcarlo como vendido)
    async eliminarItemDeLaTienda(idObject){
      const idMapOnLine = this.$store.state.datosMapa.id
      const action = "soled"
      
      try {
        const result = await apiService.manageShopItems(idMapOnLine, action, null, null, idObject)
        // console.log("Item sold:", result);
        this.$buefy.toast.open({ message: 'Item vendido exitosamente', type: 'is-success' });
        
      } catch (error) {
        console.log("Error selling item:", error);
        this.$buefy.toast.open({ message: 'Error al vender el item', type: 'is-danger' });
      }
    },

    // Funcion para comprar carta de objeto de la tienda
    async comprarCartaDeObjeto(object){
      // Encontrar el objeto en la tienda
      const objeto = this.shopItems.find(item => item.id === object.id);

      // Obtener el dinero actual del investigador
      let dineroActual = this.$store.state.datosPJactual?.atributes?.money || 0;
      const precioObjeto = objeto.price || 0;

      // Verificar si tiene suficiente dinero
      if (dineroActual < precioObjeto) {
        this.$buefy.toast.open({
          message: `No tienes suficiente dinero para comprar este objeto. Necesitas ${precioObjeto}$ y solo tienes ${dineroActual}$`,
          type: 'is-danger',
          duration: 4000
        });
        return;
      }

      // Mostrar confirmación de compra
      const nombreObjeto = this.getItemName(objeto);
      const textoConfirmacion = this.$store.state.lenguaje === 'español' 
        ? `Tienes ${dineroActual}$. ¿Estás seguro de comprar "${nombreObjeto}" por ${precioObjeto}$ ?`
        : `You have ${dineroActual}$. Are you sure you want to buy "${nombreObjeto}" for ${precioObjeto}$ ?`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Confirmar compra' : 'Confirm purchase',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Comprar' : 'Buy',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          // Proceder con la compra
          this.loadingBuy = object.id;
          
          try {
            // funcion para añadir carta comprada al inventario del investigador
            await this.añadirObjeto(object);
            
            await this.eliminarItemDeLaTienda(object.id);
            
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? `¡${nombreObjeto} comprado!` : `${nombreObjeto} purchased!`,
              type: 'is-success',
              duration: 3000
            });          
            
          } catch (error) {
            console.log("Error buying item:", error);
            this.$buefy.toast.open({
              message: this.$store.state.lenguaje === 'español' ? 'Error al comprar la carta' : 'Error buying the card',
              type: 'is-danger'
            });
          } finally {
            setTimeout(() => {
            this.loadingBuy = null;
            this.obtainShop();
          }, 2000);
          }
        }
      });
    },

    // funcion para añadir el objeto al investario del investigador
    async añadirObjeto(objeto) {
      const precioObjeto = objeto.price || 0;

      try {
        // Obtener possessions actuales
        const possessionsActuales = this.$store.getters.getInvestigatorPossessions;
        
        // Crear nueva lista con el objeto añadido
        const nuevasPossessions = [...possessionsActuales, objeto];
        
        // Actualizar investigador
        const investigadorActualizado = { ...this.$store.state.datosPJactual };
        investigadorActualizado.possessions = nuevasPossessions;
        
        // Guardar en store
        this.$store.commit('setDatosInvestigator', investigadorActualizado);
        this.$store.commit('restarDinero', precioObjeto);
        
      } catch (error) {
        console.error("Error al añadir objeto:", error);
        this.mensajeError = "Error al añadir el objeto";
      }
    },

    // Funcion para ver en detalle la carta
    seeCard(object){
      // Pasar el objeto completo al store para ver detalles
      this.$store.state.detalleCartaObjeto = object;
      this.$store.state.verDetallePertenencia = true;
      // console.log("Ver detalle de objeto:", object);
    },

    // Ver historial de vendidos (placeholder)
    verHistorialVendidos() {
      this.$buefy.toast.open({ message: 'Funcionalidad de historial próximamente', type: 'is-info' });
    }
  },

  mounted(){
    this.rellenarTextoSegunIdioma();
    this.obtainShop();
  }
}
</script>

<style scoped>
.shop-container {
  min-height: 100vh;
  padding: 1rem;
}

.shop-header {
  text-align: center;
}

.title {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-weight: 600;
}

.control-btn {
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.carousel-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.main-image-container {
  margin-bottom: 1.5rem;
  position: relative;
}

.image-frame {
  height: 250px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  transition: all 0.3s ease;
}

.image-frame:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-frame:hover .main-image {
  transform: scale(1.05);
}

.item-info {
  text-align: center;
}

.name-container {
  background: rgba(0,0,0,0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.item-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.price-container {
  display: flex;
  justify-content: center;
}

.price-badge {
  background: linear-gradient(45deg, #FFD700, #FFA500);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
  animation: pulse-gold 2s infinite;
}

@keyframes pulse-gold {
  0%, 100% { transform: scale(1); box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 215, 0, 0.6); }
}

.currency {
  font-size: 1.2rem;
  color: #8B4513;
  font-weight: bold;
}

.price-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #8B4513;
}

.navigation-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.navigation-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot:hover {
  background: rgba(255,255,255,0.5);
  transform: scale(1.2);
}

.dot.active {
  background: white;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(255,255,255,0.8);
}

.dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #667eea;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dot.active .dot-inner {
  opacity: 1;
}

.counter {
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
  font-weight: 600;
}

.current {
  color: white;
  font-size: 1.1rem;
}

.separator {
  margin: 0 0.5rem;
}

.buy-button-container {
  width: 100%;
  max-width: 280px;
  margin-bottom: 1rem;
}

.buy-btn {
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.buy-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.4);
}

.buy-btn:active {
  transform: translateY(-1px);
}

.buy-price {
  margin-left: 0.5rem;
  background: rgba(255,255,255,0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
}

.navigation-arrows {
  position: absolute;
  top: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 -30px;
}

.arrow-btn {
  pointer-events: all;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  color: #667eea;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
}

.arrow-btn:hover:not(:disabled) {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.arrow-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.left-arrow {
  margin-left: -25px;
}

.right-arrow {
  margin-right: -25px;
}

.empty-state, .loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

.empty-content, .loading-content {
  text-align: center;
  background: rgba(255,255,255,0.1);
  padding: 3rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.empty-icon {
  font-size: 4rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.empty-subtitle {
  color: rgba(255,255,255,0.8);
  margin-bottom: 2rem;
}

.empty-btn {
  border-radius: 25px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.loading-spinner {
  margin-bottom: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}


</style>