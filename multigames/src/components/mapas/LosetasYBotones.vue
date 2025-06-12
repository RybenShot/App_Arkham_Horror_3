<template>
  <div>
    <div class="columns is-mobile mt-5 mb-0 mx-2">
      <!-- Loseta -->
      <div class="column is-6 px-5">
        <div class=" helperimgMapas ml-2" :style="losetaStyle" @click="this.$store.state.modalVerLosetaMapa = true"></div>
      </div>

      <!-- Botones derecha -->
      <div class="column has-text-centered is-6">
        <!-- Enemigos -->
        <div id="BG-boton-enemigos" class="helperbotones mb-5 pt-2 pb-6">
          <p class="has-text-white subtitle is-6" @click="openEnemyList()">{{ textoBotones.enemigos }}</p>
        </div>
        <!-- "Inv Recomendados" -->
        <div id="BG-boton-inv-rec" class="helperbotones p-4 " @click="this.$store.state.modalInvRec = true">
          <p class="has-text-light has-text-weight-bold subtitle is-7 has-text-left">{{ textoBotones.invRec }}</p>
        </div>
        <!-- Comunidad -->
        
        <div id="BG-boton-comunidad" class="helperbotones my-2 p-4" @click="this.$store.state.modalComunityMap = true">
          <p class="has-text-white subtitle is-7 has-text-left">{{ textoBotones.comunidad }}</p>
        </div>
      </div>
    </div>

    <div class="mb-0 ">
      <button v-if="!this.$store.state.datosMapa.id" class=" py-0 join-btn  button" @click="this.$store.state.modalCrearMapaOnLine = true">
        <img class="gifIMG" src="@/assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt="">
        Crear Mapa On-Line
        <img class="gifIMG" src="@/assets/img/GIFs/wired-outline-726-wireless-connection-loop-wave.gif" alt="">
      </button>

      <div class=" has-text-centered" v-if="this.$store.state.datosMapa.id">
        <button v-if="this.$store.state.mapaSeleccionado == false" @click="this.$store.state.mapaSeleccionado = !this.$store.state.mapaSeleccionado" class="button is-success is-outlined " :class="{'boxShadowGreen': !this.$store.state.mapaSeleccionado}"><strong>{{ textoBotones.seleccionarMapa }}</strong></button>
        <button v-if="this.$store.state.mapaSeleccionado == true" @click="this.$store.state.mapaSeleccionado = !this.$store.state.mapaSeleccionado" class="button is-success "><strong>{{ textoBotones.mapaSeleccionado }}</strong></button>
      </div>

    </div>

    <!-- Footer -->
    <div class="columns is-mobile mt-3 mx-2 has-text-centered has-text-white">
      <div class="column" @click="goBack">
        <p><i class="fa-2x fas fa-bars "></i></p>
        <p>{{ textoBotones.lista }}</p>
      </div>

      <div class="column">
        <p class=" title is-4 has-text-white py-3">{{this.$store.state.datosMapa.idMap + 1}}/13</p>
      </div>
      
      <div id="BG-boton-Selec-inv" :class="{'boxShadowGreen':this.$store.state.mapaSeleccionado}" class="helperbotones column my-2 py-4">
        <router-link to="/ListaPersonajes">
          <p class="has-text-white has-text-left subtitle is-7">{{ textoBotones.selecInv }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';

export default {
  name: "Losetas y botones",
  data(){
    return{
      imgMapa: null,
      textoBotones: {
        enemigos: "",
        invRec: "",
        comunidad: "",

        seleccionarMapa:"",
        mapaSeleccionado:"",
        habilitarMapaOL: "",
        mapaOLHabilitado: "",

        selecInv: "",
        lista: "",
        onLineButton: ""
      }
    }
  },
  computed: {
    losetaStyle() {
      const fileName = this.$store.state.datosMapa.imgMap
      return {
        width: '150px',
        height: '200px',
        backgroundImage: `url(/img/3-mapas/losetas/${fileName})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }
    }
  },
  methods:{
    goBack() {
      this.$router.go(-1);
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoBotones.enemigos = "Enemigos";
        this.textoBotones.invRec = "Investigadores Recomendados";
        this.textoBotones.comunidad = "Comunidad";

        this.textoBotones.seleccionarMapa = "Seleccionar Mapa";
        this.textoBotones.mapaSeleccionado = "Mapa seleccionado";
        this.textoBotones.habilitarMapaOL = "OnLine OFF";
        this.textoBotones.mapaOLHabilitado = "OnLine ON";

        this.textoBotones.selecInv = "Seleccionar investigador";
        this.textoBotones.lista = "Lista";
        this.textoBotones.onLineButton = "Crear Mapa On-Line";
      }else{
        this.textoBotones.enemigos = "Enemies";
        this.textoBotones.invRec = "Recommended Investigators";
        this.textoBotones.comunidad = "Community";
        this.textoBotones.seleccionarMapa = "Select Map";
        this.textoBotones.mapaSeleccionado = "Map Selected";
        this.textoBotones.selecInv = "Select Investigator";
        this.textoBotones.lista = "List";
        this.textoBotones.onLineButton = "Create On-Line Map";
      }
    },
    async openEnemyList(){
      // capturamos la id del mapa
      const idMap = this.$store.state.datosMapa.idMap
      // llama a la api para obtener los enemigos con la id del mapa
      let enemyList = await apiService.obtainEnemyList(idMap)
      console.log(enemyList)
      // guardamos la lista de enemigos en el store
      this.$store.commit('setEnemysList', enemyList)
      // cambiamos la vista
      this.$store.state.viewDetalleMapa = false
      this.$store.state.modalVerEnemigos = true
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma()
  },
}
</script>

<style scoped>
/*#BG-boton-enemigos{background-image: url(@/assets/img/Estados/Bendicion.jpg)}*/
.helperbotones{
  background-position: center;
  background-size: cover;
}
#BG-boton-enemigos{background-image: url(@/assets/img/4-Enemigos/Enemigos.jpg);}
#BG-boton-inv-rec{background-image: url(@/assets/img/ZZOtros/BGinvRec.jpg);}
#BG-boton-comunidad{background-image: url(@/assets/img/ZZOtros/BGComunidad.jpg);}
#BG-boton-Selec-inv{background-image: url(@/assets/img/ZZOtros/BGSeleccionarInvestigador.jpg); }

.boxShadowGreen{
  box-shadow: 0px 0px 10px #05FF00;
  animation: glowing 1s linear infinite;
}

@keyframes glowing{
  0% {
    box-shadow: 0px 0px 10px #04ff0000;
  }
  50% {
    box-shadow: 0px 0px 10px #05FF00;
  }
  100% {
    box-shadow: 0px 0px 20px 20px #04ff0000;
  }
}

/* MAPAS */
.helperimgMapas{
  width: 150px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: contain;
}
  /* Base */
.imgMapa0 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa0.png);}
.imgMapa1 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa1.png);}
.imgMapa2 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa2.png);}
.imgMapa3 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa3.png);}
/* Mareas */
.imgMapa4 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa4MT.png);}
.imgMapa5 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa5MT.png);}
.imgMapa6 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa6MT.png);}
.imgMapa7 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa7MT.png);}
/* Noche */
.imgMapa8 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa8NC.png);}
.imgMapa9 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa9NC.png);}
/* Secretos */
.imgMapa10 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa10SO.png);}
.imgMapa11 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa11SO.png);}
.imgMapa12 {background-image: url(@/assets/img/3-Mapas/losetas/LosetasMapa12SO.png);}

p{
  color: #fff; /* Color del texto */
  padding: 1px;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.733);
}

.join-btn {
  display: block;
  width: 80%;
  max-width: 260px;
  margin: 0.5rem auto;
  padding: 0.75rem 1rem;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  /* Animación de pulso */
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%   { transform: scale(1);     }
  50%  { transform: scale(1.05);  }
  100% { transform: scale(1);     }
}
.gifIMG{
  width: 30px;
}
</style>