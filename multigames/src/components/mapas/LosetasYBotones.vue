<template>
  <div>
    <div class="columns is-mobile mt-5 mb-0 mx-2">
      <div class="column is-6 ml-2">
        <div class=" helperimgMapas" :class="[imgMapa]"></div>
      </div>

      <div class="column has-text-centered is-6">
        <div id="BG-boton-enemigos" class="mb-4 pt-2 pb-6"><p class="has-text-white subtitle is-6" @click="this.$store.state.viewDetalleMapa = false">Enemigos</p></div>
        <div id="BG-boton-inv-rec" class="py-2 my-2"><p class="has-text-white subtitle is-7">Investigadores Recomendados</p></div>
        <div id="BG-boton-comunidad" class="py-2 my-2 py-4"><p class="has-text-white subtitle is-7">Comunidad</p></div>
      </div>
    </div>

    <div class="columns is-mobile mt-5 mx-2 has-text-centered has-text-white">
      <div class="column" @click="goBack">
        <p><i class="fa-2x fas fa-bars "></i></p>
        <p>Lista</p>
      </div>
      <div class="column">
        <p class=" title is-4 has-text-white py-3">{{this.$store.state.datosMapa.idMapa + 1}}/13</p>
      </div>
      <div id="BG-boton-Selec-inv" class="column my-2 py-4">
        <router-link to="/ListaPersonajes">
          <p class="has-text-white has-text-left subtitle is-7">Seleccionar investigador</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Detalle-mapa-losetas",
data(){
    return{
      imgMapa: null,
    }
  },
  mounted(){
    // Esta parte se tiene que dejar para que en la primera carga aparezca ya las LOSETAS del mapa cargado.
    if (this.$store.state.datosMapa.idMapa == 0) {this.imgMapa = "imgMapa1"}
    else if (this.$store.state.datosMapa.idMapa == 1) {this.imgMapa = "imgMapa2"}
    else if (this.$store.state.datosMapa.idMapa == 2) {this.imgMapa = "imgMapa3"}
    else if (this.$store.state.datosMapa.idMapa == 3) {this.imgMapa = "imgMapa4"}
    else {this.imgMapa = "imgMapa2"}
  },
  methods:{
  goBack() {
      this.$router.go(-1);
    },
}
}
</script>

<style scoped>
/*#BG-boton-enemigos{background-image: url(@/assets/img/Estados/Bendicion.jpg)}*/
#BG-boton-enemigos{background-color: rgb(117, 37, 37)}
#BG-boton-inv-rec{background-color: rgb(123, 20, 220)}
#BG-boton-comunidad{background-color: crimson;}
#BG-boton-Selec-inv{background-color: rgb(52, 106, 253);}

/* MAPAS */
.helperimgMapas{
  width: 181px;
  height: 200px;
  background-size: 70%;
  background-repeat: no-repeat;
}
.imgMapa1 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa1.png);}
.imgMapa2 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa2.png);}
.imgMapa3 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa3.png);}
.imgMapa4 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa4.png);}

p{
  color: #fff; /* Color del texto */
  padding: 1px;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.733);
}
</style>