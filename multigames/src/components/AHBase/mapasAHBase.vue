<template>
  <!-- VIEW DE MAPA -->
  <div>
    <div class="mx-3 container allWindow card">
      <!-- TITULO Y DESCRIPCION -->
      <div id="tituloDescripcion">
        <h1 class="title titleDecoration is-4 pt-3 mb-3" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.datosMapa.title }}</h1>
        <h1 class="title titleDecoration is-4 pt-3 mb-3" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.datosMapa.ENtitle }}</h1>
        <p class="has-text-white has-text-weight-light is-italic p-1" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.datosMapa.description }}</p>
        <p class="has-text-white has-text-weight-light is-italic p-1" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.datosMapa.ENdescription }}</p>
      </div>

      <!-- MAPA , FLECHAS Y BOTON -->
      <div class="columns is-vcentered is-mobile">
 
        <!-- ARROW izquierda -->
        <div class="column is-one-fifth ml-4">
          <!-- boton dehabilitado  -->
          <button v-if="this.$store.state.contadorMapa <= 0" disabled class="p-2"><i class="fa-2x fas fa-angle-double-left"></i></button>

          <!-- boton funcionando!, MAPA ANTERIOR  -->
          <button v-if="this.$store.state.contadorMapa > 0" @click="(this.$store.state.contadorMapa --), (cambiarBGGeneral(`menos`))" class="p-2"><i class="fa-2x fas fa-angle-double-left"></i></button>
        </div><!-- end ARROW izquierda -->

        <!-- Mapa y Boton -->
        <div class="column p-0 mt-5 pb-3">
          <div class="mx-4 helperimgMapas" :class="[imgMapa]"></div>

          <div class="columns is-mobile">
            <div class="column">
              <button @click="this.$store.state.viewMapa = false" class="button is-success has-text-black mt-5 p-5 ml-5" v-if="this.$store.state.lenguaje == 'español'">Ver Enemigos</button>
              <button @click="this.$store.state.viewMapa = false" class="button is-success has-text-black mt-5 p-5 ml-5" v-if="this.$store.state.lenguaje == 'ingles'">See enemies</button>
            </div>
            <div><p class="has-text-white pt-6">{{this.$store.state.contadorMapa + 1}} / 4</p></div>
          </div>
        </div>

        <!-- ARROW derecha -->
        <div class="column column is-one-fifth is-vcentered p-0">
          <!-- boton deshabilitado -->
          <button v-if="this.$store.state.contadorMapa >= 3" disabled class="p-2"><i class="fa-2x fas fa-angle-double-right"></i></button>

          <!-- boton funcionando!, MAAPA SIGUIENTE  -->
          <button v-if="this.$store.state.contadorMapa < 3" @click=" (this.$store.state.contadorMapa ++),(cambiarBGGeneral(`mas`))" class="p-2"><i class="fa-2x fas fa-angle-double-right"></i> </button>
        </div><!-- end ARROW derecha -->

      </div><!-- end MAPA , FLECHAS Y BOTON -->
    </div><!-- end container  -->
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
    // Esta parte se tiene que dejar para que en la primera carga aparezca ya las LOSETAS del mapa cargado.
    if (this.$store.state.contadorMapa == 0) {this.imgMapa = "imgMapa1"}
    else if (this.$store.state.contadorMapa == 1) {this.imgMapa = "imgMapa2"}
    else if (this.$store.state.contadorMapa == 2) {this.imgMapa = "imgMapa3"}
    else if (this.$store.state.contadorMapa == 3) {this.imgMapa = "imgMapa4"}
  },
  updated(){

    if (this.$store.state.contadorMapa == 0) {
        this.$store.state.datosMapa.title = "La llegada de Azathoth";
        this.$store.state.datosMapa.ENtitle = "The arrival of Azathoth";
        this.$store.state.datosMapa.description ="En el corazón del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...";
        this.$store.state.datosMapa.ENdescription ="In the heart of infinity dwells the lethargic Azathoth, lulled by the incessant notes of ominous flutes. But there are mortals who wish to invoke the immeasurable power and calamity of the Blind and Idiot God, even if it means condemning humanity ...";
        this.imgMapa = "imgMapa1"
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa1" //intento fallido de cambiar el bg del mapa desde el hijo y el Store
      }
      else if (this.$store.state.contadorMapa == 1) {
        this.$store.state.datosMapa.title = "Festin para Umordhoth";
        this.$store.state.datosMapa.ENtitle = "Feast for Umordhoth";
        this.$store.state.datosMapa.description ="Los gules que habitan en el mundo subterráneo se alimentan de la carne de los muertos: con todo, incluso ellos viven temerosos del Devorador de las Profundidades al que reverencian. Pero los gules no son los únicos en Arkham que veneran a Umórdhoth...";
        this.$store.state.datosMapa.ENdescription ="The Gules who dwell in the underworld feed on the flesh of the dead: yet even they live in fear of the Devourer of the Deep whom they revere. But the Gules are not the only ones in Arkham who worship Umórdhoth...";
        this.imgMapa = "imgMapa2"
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa2" //intento fallido de cambiar el bg del mapa desde el hijo y el Store
      }
       else if (this.$store.state.contadorMapa == 2) {
        this.$store.state.datosMapa.title = "El velo del Crepusculo";
        this.$store.state.datosMapa.ENtitle = "The veil of the Twilight";
        this.$store.state.datosMapa.description ="Algo acecha en el gélido vacío que separa nuestros mundos. Susurra desde el otro lado del velo, llamando a todos los que tengan el poder necesario para liberarlo de su confinamiento. Quienes sucumben a su influjo obtienen un gran poder, pero el precio que pagan es terrible. Y con cada día que pasa su liberación está más próxima...";
        this.$store.state.datosMapa.ENdescription ="Something lurks in the icy void that separates our worlds. He whispers from the other side of the veil, calling all who have the power to release him from confinement. Those who succumb to their influence gain great power, but the price they pay is terrible. And with each passing day their liberation is closer...";
        this.imgMapa = "imgMapa3";
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa3" //intento fallido de cambiar el bg del mapa desde el hijo y el Store
      }
      else if (this.$store.state.contadorMapa == 3) {
        this.$store.state.datosMapa.title = "Ecos de las profundidades";
        this.$store.state.datosMapa.ENtitle = "Echoes of the deep";
        this.$store.state.datosMapa.description ="En su morada de R’lyeh, el difunto Cthulhu aguarda soñando. Se agita en su letargo y espera a que las estrellas sean propicias para que R’lyeh emerja de su hogar bajo las olas y los primigenios regresen. Pues no está muerto lo que puede yacer eternamente, y con los evos extraños aun la muerte puede morir...";
        this.$store.state.datosMapa.ENdescription ="In his abode of R'lyeh, the late Cthulhu waits dreaming. He agitates in his lethargy and waits for the stars to be propitious for R'lyeh to emerge from his home under the waves and the primeval ones to return. For what can lie eternally is not dead, and with the strange evos even death can die...";
        this.imgMapa = "imgMapa4";
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa4" //intento fallido de cambiar el bg del mapa desde el hijo y el Store
      }
  },
  methods: {
    cambiarBGGeneral(ValueCambioBG){ this.$emit('cambiarBGHijo', ValueCambioBG)} // intento fallido de cambiar el BG desde el hijo
  }, // end methods

};
</script>

<style>
/* MAPAS */
.helperimgMapas{
  width: 181px;
  height: 263px;
}
.imgMapa1 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa1.png);}
.imgMapa2 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa2.png);}
.imgMapa3 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa3.png);}
.imgMapa4 {background-image: url(@/assets/img/Games/AHBase/1imgMapas/mapa4.png);}
</style>