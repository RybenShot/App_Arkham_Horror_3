<template>
  <div>
    <div class="columns is-mobile mt-5 mb-0 mx-2">
      <!-- Loseta -->
      <div class="column is-6 ml-2">
        <div class=" helperimgMapas" :class="[imgMapa]" @click="this.$store.state.modalVerLosetaMapa = true"></div>
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

    <div class="mx-4">
      <button v-if="this.$store.state.mapaSeleccionado == false" @click="this.$store.state.mapaSeleccionado = !this.$store.state.mapaSeleccionado" class="button is-success is-outlined is-fullwidth"><strong>Seleccionar mapa</strong></button>
      <button v-if="this.$store.state.mapaSeleccionado == true" @click="this.$store.state.mapaSeleccionado = !this.$store.state.mapaSeleccionado" class="button is-success is-fullwidth"><strong>Mapa Seleccionado</strong></button>
    </div>

    <!-- Footer -->
    <div class="columns is-mobile mt-5 mx-2 has-text-centered has-text-white">
      <div class="column" @click="goBack">
        <p><i class="fa-2x fas fa-bars "></i></p>
        <p>{{ textoBotones.lista }}</p>
      </div>
      <div class="column">
        <p class=" title is-4 has-text-white py-3">{{this.$store.state.datosMapa.idMapa + 1}}/13</p>
      </div>
      <div id="BG-boton-Selec-inv" class="helperbotones column my-2 py-4">
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
        selecInv: "",
        lista: ""
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
        this.textoBotones.selecInv = "Seleccionar investigador";
        this.textoBotones.lista = "Lista";
      }else{
        this.textoBotones.enemigos = "Enemies";
        this.textoBotones.invRec = "Recommended Investigators";
        this.textoBotones.comunidad = "Community";
        this.textoBotones.selecInv = "Select Investigator";
        this.textoBotones.lista = "List";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma()
    // Esta parte se tiene que dejar para que en la primera carga aparezca ya las LOSETAS del mapa cargado.
    if (this.$store.state.datosMapa.idMapa == 0) {this.imgMapa = "imgMapa0"}
    else if (this.$store.state.datosMapa.idMapa == 1) {this.imgMapa = "imgMapa1"}
    else if (this.$store.state.datosMapa.idMapa == 2) {this.imgMapa = "imgMapa2"}
    else if (this.$store.state.datosMapa.idMapa == 3) {this.imgMapa = "imgMapa3"}
    
    else if (this.$store.state.datosMapa.idMapa == 4) {this.imgMapa = "imgMapa4"}
    else if (this.$store.state.datosMapa.idMapa == 5) {this.imgMapa = "imgMapa5"}
    else if (this.$store.state.datosMapa.idMapa == 6) {this.imgMapa = "imgMapa6"}
    else if (this.$store.state.datosMapa.idMapa == 7) {this.imgMapa = "imgMapa7"}

    else if (this.$store.state.datosMapa.idMapa == 8) {this.imgMapa = "imgMapa8"}
    else if (this.$store.state.datosMapa.idMapa == 9) {this.imgMapa = "imgMapa9"}

    else if (this.$store.state.datosMapa.idMapa == 10) {this.imgMapa = "imgMapa10"}
    else if (this.$store.state.datosMapa.idMapa == 11) {this.imgMapa = "imgMapa11"}
    else if (this.$store.state.datosMapa.idMapa == 12) {this.imgMapa = "imgMapa12"}
    else {this.imgMapa = "imgMapa1"}
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
#BG-boton-Selec-inv{background-image: url(@/assets/img/ZZOtros/BGSeleccionarInvestigador.jpg);}

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