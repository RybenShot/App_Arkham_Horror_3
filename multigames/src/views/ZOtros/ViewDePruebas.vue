<template>
<div>
  <div class="card">
    <div class="card-icon top-left">    <i class="fa fa-heart"></i></div>
    <div class="card-icon top-right">   <i class="fa fa-circle"></i></div>
    
    <div class="card-number top-left has-text-black">1</div>
    <div class="card-number top-right has-text-black">2</div>

    <img src="@/assets/img/Games/AHBase/2imgInvestigadores/PJ1.png" alt="Imagen" class="card-image" />

    <div class="card-overlay">
      <div class="card-title">Título</div>
    </div>
  </div>

  <hr>

    <button @click="reproducirSonido"> Reproducir sonido</button>

  <hr>

  <div>
    <button @click="mostrarNotificacion">Mostrar notificación</button>

    <transition name="fade">
      <div v-if="mostrarNotif" class="notificacion">
        <span>{{ mensaje }}</span>
      </div>
    </transition>
  </div>

  <br> <br>

  <div>
    <button :class="{ 'button': true, 'active': activeButton === 1 }" @click="setActiveButton(1)">Botón 1</button>
    <button :class="{ 'button': true, 'active': activeButton === 2 }" @click="setActiveButton(2)">Botón 2</button>
    <button :class="{ 'button': true, 'active': activeButton === 3 }" @click="setActiveButton(3)">Botón 3</button>
  </div>

</div>  
</template>
<script>
import { Howl } from 'howler';

const sound = new Howl({
  src: require('@/assets/sound/EfectoSonido1.mp3'),
});

export default {
  name: "Pagina_De_Pruebas",
  data() {
    return {
      mostrarNotif: false,
      mensaje: "¡Esto es una notificación!",

      activeButton: null
    }; // end return
  }, // end data
  methods: {
    mostrarNotificacion() {
      this.mostrarNotif = true;
      sound.play();
      setTimeout(() => {
        this.mostrarNotif = false;
      }, 2000);
    },

    setActiveButton(button) {
      this.activeButton = button;
    },

    reproducirSonido() {
    sound.play();
  },
  },
}
</script>
<style scoped>

.button {
  background-color: transparent;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.active {
   box-shadow: 0 0 20px #1eff00;
}
/* Carta */
.card {
  width: 150px;
  height: 200px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  z-index: 2;
}

.card-icon {
  position: absolute;
  font-size: 20px;
  color: #ffffff;
  z-index: 3;
}

.top-left {
  top: 5px;
  left: 5px;
}

.top-right {
  top: 5px;
  right: 5px;
}

.card-number {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  z-index: 3;
}

.card-title {
  font-size: 9px;
  margin-top: 5px;
}


/* Notificacion */
.notificacion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  z-index: 3;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>