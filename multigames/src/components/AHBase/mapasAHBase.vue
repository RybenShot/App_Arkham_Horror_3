<template>
  <!-- VIEW DE MAPA -->
  <div>
    <div class="mx-3 container allWindow card">
      <!-- TITULO Y DESCRIPCION -->
      <div id="tituloDescripcion">
        <h1 class="title titleDecoration is-4 pt-3 mb-3">{{ this.$store.state.datosMapa.title }}</h1>
        <p class="has-text-white has-text-weight-light is-italic p-1">
          {{ this.$store.state.datosMapa.description }}
        </p>
      </div>

      <!-- MAPA , FLECHAS Y BOTON -->
      <div class="columns is-vcentered is-mobile">
        <!-- ARROW izquierda -->
        <div class="column is-one-fifth ml-4">
          <!-- boton dehabilitado  -->
          <button v-if="this.$store.state.contadorMapa <= 0" disabled class="p-2">
            <i class="fa-2x fas fa-angle-double-left"></i>
          </button>

          <!-- boton funcionando!  -->
          <button
            v-if="this.$store.state.contadorMapa > 0"
            @click="this.$store.state.contadorMapa --"
            class="p-2"
          >
            <i class="fa-2x fas fa-angle-double-left"></i>
          </button>
        </div>
        <!-- end ARROW izquierda -->

        <!-- Mapa y Boton -->
        <div class="column p-0 mt-5 pb-3">
          <div class="mx-4 helperimgMapas" :class="[imgMapa]"></div>

          <div class="columns is-mobile">
            <div class="column">
              <button 
              @click="cambiarVista(false)" 
              class="button is-success has-text-black mt-5 p-5 ml-5">Ver Enemigos</button>
            </div>
            <div><p class="has-text-white pt-6">{{this.$store.state.contadorMapa + 1}} / 4</p></div>
          </div>
          

        </div>

        <!-- ARROW derecha -->
        <div class="column column is-one-fifth is-vcentered p-0">
          <!-- boton deshabilitado -->
          <button v-if="this.$store.state.contadorMapa >= 3" disabled class="p-2">
            <i class="fa-2x fas fa-angle-double-right"></i>
          </button>

          <!-- boton funcionando!  -->
          <button
            v-if="this.$store.state.contadorMapa < 3"
            @click=" this.$store.state.contadorMapa ++"
            class="p-2">
           <!-- emitimos a traves del methods al padre un 'mas', para que el padre cambie el contador -->
           <!-- 1 ejecutamos metodo con un dato -->
            <i class="fa-2x fas fa-angle-double-right"></i>
          </button>
        </div>
        <!-- end ARROW derecha -->
      </div>
      <!-- end MAPA , FLECHAS Y BOTON -->
    </div>
    <!-- end container  -->
  </div>
</template>

<script >
export default {
  name: "mapasAHClasicoComponente",
  data(){
    return{
      imgMapa: null,
    }
  },
  mounted(){
    if (this.$store.state.contadorMapa == 0) {this.imgMapa = "imgMapa1"}
    else if (this.$store.state.contadorMapa == 1) {this.imgMapa = "imgMapa2"}
    else if (this.$store.state.contadorMapa == 2) {this.imgMapa = "imgMapa3"}
    else if (this.$store.state.contadorMapa == 3) {this.imgMapa = "imgMapa4"}
  },
  updated(){
      this.$emit('espavila', 2)

    if (this.$store.state.contadorMapa == 0) {
        this.$store.state.datosMapa.title = "La llegada de Azathoth";
        this.$store.state.datosMapa.description =
          "En el corazón del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...";
        this.imgMapa = "imgMapa1"
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa1"
      } else if (this.$store.state.contadorMapa == 1) {
        this.$store.state.datosMapa.title = "Festin para Umordhoth";
        this.$store.state.datosMapa.description =
          "Los gules que habitan en el mundo subterráneo se alimentan de la carne de los muertos: con todo, incluso ellos viven temerosos del Devorador de las Profundidades al que reverencian. Pero los gules no son los únicos en Arkham que veneran a Umórdhoth...";
        this.imgMapa = "imgMapa2"
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa2"
      } else if (this.$store.state.contadorMapa == 2) {
        this.$store.state.datosMapa.title = "El velo del Crepusculo";
        this.$store.state.datosMapa.description =
          "Algo acecha en el gélido vacío que separa nuestros mundos. Susurra desde el otro lado del velo, llamando a todos los que tengan el poder necesario para liberarlo de su confinamiento. Quienes sucumben a su influjo obtienen un gran poder, pero el precio que pagan es terrible. Y con cada día que pasa su liberación está más próxima...";
        this.imgMapa = "imgMapa3";
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa3"
      } else if (this.$store.state.contadorMapa == 3) {
        this.$store.state.datosMapa.title = "Ecos de las profundidades";
        this.$store.state.datosMapa.description =
          "En su morada de R’lyeh, el difunto Cthulhu aguarda soñando. Se agita en su letargo y espera a que las estrellas sean propicias para que R’lyeh emerja de su hogar bajo las olas y los primigenios regresen. Pues no está muerto lo que puede yacer eternamente, y con los evos extraños aun la muerte puede morir...";
        this.imgMapa = "imgMapa4";
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa4"
      }
  },
  methods: {

    cambiarVista(ValueCambiarVista){
      this.$emit('cambiarVistaHijo', ValueCambiarVista)
    } // end cambiaVista
  }, // end methods

};
</script>

<style>

/* MAPAS */
.helperimgMapas{
  width: 181px;
  height: 263px;
}
.imgMapa1 {background-image: url(../../assets/img/Games/AHBase/1imgMapas/mapa1.png);}
.imgMapa2 {background-image: url(../../assets/img/Games/AHBase/1imgMapas/mapa2.png);}
.imgMapa3 {background-image: url(../../assets/img/Games/AHBase/1imgMapas/mapa3.png);}
.imgMapa4 {background-image: url(../../assets/img/Games/AHBase/1imgMapas/mapa4.png);}
</style>