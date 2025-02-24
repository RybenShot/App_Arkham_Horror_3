<template>
  <div class="BGAHHome container">
    <div id="contenido">
      <!-- Modals de inicio -->
      <div v-if="this.resultadoAnuncio >= 2 ">
        <!-- modal bienvenida -->
        <div v-if="this.$store.state.StoreModalBienvenida"><ModalBienvenida/></div>
        <!-- modal donacion -->
        <div v-if="this.$store.state.StoreModalDonacion"><ModalDonacion/></div>
        
      </div>
      
      <!-- hero -->
      <div class="hero pt-6 pb-2">
        <div class=" columns is-mobile mx-6">
          <img class="column px-5" src="@/assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt="Logo de Arkham Horror"/>
        </div>
      </div>

      <!-- menu list -->
      <section class="mt-4">
        <div >
          <ul>
            <router-link to="/ListaMapas" @click="SonidoTecla()"><button class="buttonsHome ">{{ textBotonMapa }}</button></router-link>
            <router-link to="/ListaPersonajes" @click="SonidoTecla()"><button class="buttonsHome ">{{ textBotonInvestigador }}</button></router-link>
            <a href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank" @click="SonidoTecla()"><button class="buttonsHome">{{ textBotonSupport }}</button></a>
            <button class="buttonsHome" @click="SonidoTecla()">{{ textBotonCreditos }}</button>
          </ul>
        </div>
        <!-- Apartado para la versión de la aplicación -->
        <div class="app-version">Version: {{ versionApp }}</div>
        <div class="app-version">
          <p>{{ultimaActualizacion}} {{ fechaUltimaActualizacion }}</p>
        </div>
      </section>

    </div>

    <!-- botones para cambiar de lenguaje -->
    <footer>
      <div class="columns is-movile has-text-centered">
        <p class="column">
          <button @click="(this.SonidoTecla()),(this.$store.state.lenguaje = 'español'), (this.rellenarTextosegunIdioma())">
            <img v-if="this.$store.state.lenguaje == 'español'" class="buttonsBanderas" src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español">
            <img v-if="this.$store.state.lenguaje == 'ingles'" class="buttonsBanderas buttonsBanderasDesactivado" src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español">
          </button>
          

          <button @click="(this.SonidoTecla()),(this.$store.state.lenguaje = 'ingles') , (this.rellenarTextosegunIdioma())">
            <img v-if="this.$store.state.lenguaje == 'ingles'" class="buttonsBanderas" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles">
            <img v-if="this.$store.state.lenguaje == 'español'" class="buttonsBanderas buttonsBanderasDesactivado" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles">
          </button>
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
import ModalBienvenida from '@/components/home/modalBienvenida.vue';
import ModalDonacion from '@/components/home/modalDonacion.vue';
import { Howl } from 'howler';                  // dependencia para la reproduccion de sonidos

const sound = new Howl({                        // necesario para enlazar y ejecutar los sonidos
  src: require('@/assets/sound/SonidoTecla.mp3'),
});

export default {
  name: "view_Home",
   components:{
    ModalBienvenida,
    ModalDonacion,
    },
  data() {
    return {
      resultadoAnuncio: 0,
      textBotonMapa: "",
      textBotonInvestigador: "",
      textBotonSupport: "",
      textBotonCreditos:"",
      versionApp: "Beta", // Define aquí la versión de tu aplicación
      ultimaActualizacion: "",
      fechaUltimaActualizacion: "24/02/2025",
    };
  },
  methods: {
    SonidoTecla() {sound.play();},
    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textBotonMapa = "Mapas";
        this.textBotonInvestigador = "Investigadores";
        this.textBotonSupport = "Apoyanos";
        this.textBotonCreditos = "Creditos";
        this.ultimaActualizacion = "Ultima actualización:";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textBotonMapa = "Maps";
        this.textBotonInvestigador = "Investigators";
        this.textBotonSupport = "Support";
        this.textBotonCreditos = "Credits";
        this.ultimaActualizacion = "Last update:";
      }
    },
  },
  mounted(){
    //Esta función tonta es una manera de que salga o no el anuncion al principio
    this.resultadoAnuncio = Math.floor(Math.random() * (1, 3)) + 1;
    console.log("El resultado de la tirada de los modals ha sido", this.resultadoAnuncio)
    this.rellenarTextosegunIdioma();
  },
  updated(){
    this.rellenarTextosegunIdioma();
  }
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

.app-version {
  margin-left: 20px ;
  margin-right: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: #fff;
  font-size: 1em;
  font-family: 'Cinzel', serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
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
  padding-bottom: 25vh;
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

</style>