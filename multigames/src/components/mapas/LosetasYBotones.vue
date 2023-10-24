<template>
  <div class="mt-5 mx-2 columns is-mobile">
    <div class="column is-6 ml-2">
      <div class=" helperimgMapas" :class="[imgMapa]"></div>
    </div>

    <div class="column has-text-centered is-6">
      <div id="BG-boton-enemigos" class="mb-4 pt-2 pb-6"><p class="has-text-white subtitle is-6">Enemigos</p></div>
      <div id="BG-boton-inv-rec" class="py-2 my-2"><p class="has-text-white subtitle is-7">Investigadores Recomendados</p></div>
      <div id="BG-boton-comunidad" class="py-2 my-2 py-4"><p class="has-text-white subtitle is-7">Comunidad</p></div>
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
    if (this.$store.state.contadorMapa == 0) {this.imgMapa = "imgMapa1"}
    else if (this.$store.state.contadorMapa == 1) {this.imgMapa = "imgMapa2"}
    else if (this.$store.state.contadorMapa == 2) {this.imgMapa = "imgMapa3"}
    else if (this.$store.state.contadorMapa == 3) {this.imgMapa = "imgMapa4"}
  },
}
</script>

<style scoped>
/*#BG-boton-enemigos{background-image: url(@/assets/img/Estados/Bendicion.jpg)}*/
#BG-boton-enemigos{background-color: rgb(117, 37, 37)}
#BG-boton-inv-rec{background-color: rgb(123, 20, 220)}
#BG-boton-comunidad{background-color: crimson;}

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
</style>