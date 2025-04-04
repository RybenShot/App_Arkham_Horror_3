<template>
  <div>
    <div class="columns is-mobile mt-5 mb-0 mx-2">
      <!-- Loseta -->
      <div class="column is-6 ml-2">
        <div class=" helperimgMapas" :style="losetaStyle" @click="this.$store.state.modalVerLosetaMapa = true"></div>
      </div>

      <!-- Botones derecha -->
      <div class="column has-text-centered is-6">
        <!-- Enemigos -->
        <div id="BG-boton-enemigos" class="helperbotones mb-5 pt-2 pb-6">
          <p class="has-text-white subtitle is-6" @click="(this.$store.state.viewDetalleMapa = false), (this.$store.state.modalVerEnemigos = true) ">{{ textoBotones.enemigos }}</p>
        </div>
        <!-- "Inv Recomendados" -->
        <router-link to="/enproceso">
          <div id="BG-boton-inv-rec" class="helperbotones py-2 my-2 pl-2">
            <p class="has-text-light has-text-weight-bold subtitle is-7 has-text-left">{{ textoBotones.invRec }}</p>
          </div>
        </router-link>
        <!-- Comunidad -->
        <a href="https://boardgamegeek.com/boardgame/257499/arkham-horror-third-edition/forums/0?pageid=1&sort=recent" target="_blank">
          <div id="BG-boton-comunidad" class="helperbotones py-4 my-2 pl-2">
            <p class="has-text-white subtitle is-7 has-text-left">{{ textoBotones.comunidad }}</p>
          </div>
        </a>
      </div>
    </div>

    <div class="mx-4" :class="{'boxShadowGreen':!this.$store.state.mapaSeleccionado}">
      <button v-if="this.$store.state.mapaSeleccionado == false" @click="this.$store.state.mapaSeleccionado = !this.$store.state.mapaSeleccionado" class="button is-success is-outlined is-fullwidth"><strong>{{ textoBotones.seleccionarMapa }}</strong></button>
      <button v-if="this.$store.state.mapaSeleccionado == true" @click="this.$store.state.mapaSeleccionado = !this.$store.state.mapaSeleccionado" class="button is-success is-fullwidth"><strong>{{ textoBotones.mapaSeleccionado }}</strong></button>
    </div>

    <!-- Footer -->
    <div class="columns is-mobile mt-5 mx-2 has-text-centered has-text-white">
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
        selecInv: "",
        lista: ""
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
        this.textoBotones.selecInv = "Seleccionar investigador";
        this.textoBotones.lista = "Lista";
      }else{
        this.textoBotones.enemigos = "Enemies";
        this.textoBotones.invRec = "Recommended Investigators";
        this.textoBotones.comunidad = "Community";
        this.textoBotones.seleccionarMapa = "Select Map";
        this.textoBotones.mapaSeleccionado = "Map Selected";
        this.textoBotones.selecInv = "Select Investigator";
        this.textoBotones.lista = "List";
      }
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
</style>