<template>
  <div class="BGAHHome container">
    <div id="contenido">
      <div v-if="this.resultadoAnuncio >= 2 ">
        <!-- MODAL BIENVENIDA -->
        <div v-if="this.$store.state.StoreModalBienvenida"><ModalBienvenida/></div>
        <!-- MODAL DONACION -->
        <div v-if="this.$store.state.StoreModalDonacion"><ModalDonacion/></div>
      </div>
      
      <!-- HERO -->
      <div class="hero pt-6 pb-2">
        <div class=" columns is-mobile mx-6">
          <img class="column px-5" src="@/assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt=""/>
        </div>
      </div>

      <!-- MENU LIST -->
      <section v-if="this.$store.state.StoreHomeDefaul" class="mt-4"><HomeDefaul/></section>
      <!-- HomeMas.vue -->
      <section v-if="this.$store.state.StoreHomemas" class="mt-4"><HomeMas/></section>

    </div>

    <footer>
      <div class="columns is-movile has-text-centered">
        <p class="column">
          <button @click="(this.SonidoTecla()),(this.$store.state.lenguaje = 'español')">
            <img v-if="this.$store.state.lenguaje == 'español'" class="buttonsBanderas" src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español">
            <img v-if="this.$store.state.lenguaje == 'ingles'" class="buttonsBanderas buttonsBanderasDesactivado" src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español">
          </button>
          

          <button @click="(this.SonidoTecla()),(this.$store.state.lenguaje = 'ingles')">
            <img v-if="this.$store.state.lenguaje == 'ingles'" class="buttonsBanderas" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles">
            <img v-if="this.$store.state.lenguaje == 'español'" class="buttonsBanderas buttonsBanderasDesactivado" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles">
          </button>
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
import { Howl } from 'howler';

const sound = new Howl({
  src: require('@/assets/sound/SonidoTecla.mp3'),
});

import DetalleModalAHBase from '@/components/helpers/GeneralHomeModals/DetalleAHBase.vue';
import ModalBienvenida from '@/components/home/modalBienvenida.vue';
import ModalDonacion from '@/components/home/modalDonacion.vue';

import HomeDefaul from '@/components/home/HomeDefaul.vue';
import HomeMas from '@/components/home/HomeMas.vue';



export default {
  name: "Home",
   components:{
    DetalleModalAHBase,
    ModalBienvenida,
    ModalDonacion,
    HomeDefaul,
    HomeMas

    },
  data() {
    return {
      modalDonacion: true,
      modalBienvenida: true,

      resultadoAnuncio: 0
    };
  },
  mounted(){
    //Esta función tonta es una manera de que salga o no el anuncion al principio
    this.resultadoAnuncio = Math.floor(Math.random() * (1, 3)) + 1;
    console.log(this.resultadoAnuncio)
  },
  methods: {
  SonidoTecla() {sound.play();},
  },
};
</script>

<style scoped>
@font-face {
  font-family: tituloSeleccion;
  src: url("@/assets/fonts/home/Stranger back in the Night.ttf");
}
/* Helpers */
.buttonsBanderas{
  max-height: 50px;
}
.buttonsBanderasDesactivado{
  opacity: 30%;
}

#BGAHHome {
  background-image: url(@/assets/img/ZZOtros/BG-App-AH-Home.jpg);
  min-height: 120vh;
  position: relative;
  background-position: center;
  background-size: cover;
}

#contenido{
  position: relative;
  z-index: 2;
  padding-bottom: 35vh;
}

button{
  background: none;
  border: 0;
  color: inherit;
  padding: 5px;
}

.buttonsHome{
  display: block;
  width: 50%;
  margin: 10px auto;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 1em;
  border: thick double #272727;
  border-radius: 5px;
  background: rgb(80, 80, 80);
}

/* Footer */
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px; /* Altura del footer */
}
</style>