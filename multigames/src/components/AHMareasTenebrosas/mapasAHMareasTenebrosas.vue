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
          <button v-if="this.$store.state.contadorMapa <= 0" disabled class="p-2">
            <i class="fa-2x fas fa-angle-double-left"></i>
          </button>

          <!-- boton funcionando!  -->
          <button v-if="this.$store.state.contadorMapa > 0" @click="this.$store.state.contadorMapa --" class="p-2">
            <i class="fa-2x fas fa-angle-double-left"></i>
          </button>
        </div>
        <!-- end ARROW izquierda -->

        <!-- Mapa y Boton -->
        <div class="column p-0 mt-5 pb-3">
          <div class="mx-4 helperimgMapas" :class="[imgMapa]"></div>

          <div class="columns is-mobile">
            <div class="column">
              <button @click="cambiarVista(false)" class="button is-success has-text-black mt-5 p-5 ml-5">
                <p v-if="this.$store.state.lenguaje == 'español'">Ver Enemigos</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">See enemies</p>
              </button>
            </div>
            <div>
              <p class="has-text-white pt-6">{{this.$store.state.contadorMapa + 1}} / 4</p>
            </div>
          </div>
          

        </div>

        <!-- ARROW derecha -->
        <div class="column column is-one-fifth is-vcentered p-0">
          <!-- boton deshabilitado -->
          <button v-if="this.$store.state.contadorMapa >= 3" disabled class="p-2">
            <i class="fa-2x fas fa-angle-double-right"></i>
          </button>

          <!-- boton funcionando!  -->
          <button v-if="this.$store.state.contadorMapa < 3" @click=" this.$store.state.contadorMapa ++" class="p-2">
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

<script>
export default {
  name: "mapasAHMareasTenebrosasComponente",
  data(){
    return{
      imgMapa: null,
    }
  },
  mounted(){
    if (this.$store.state.contadorMapa == 0) {this.imgMapa = "imgMapa5"}
    else if (this.$store.state.contadorMapa == 1) {this.imgMapa = "imgMapa6"}
    else if (this.$store.state.contadorMapa == 2) {this.imgMapa = "imgMapa7"}
    else if (this.$store.state.contadorMapa == 3) {this.imgMapa = "imgMapa8"}
  },
  updated(){

    if (this.$store.state.contadorMapa == 0) {
        this.$store.state.datosMapa.title = "Tiranos de la desolación";
        this.$store.state.datosMapa.ENtitle = "Tyrants of desolation";
        this.$store.state.datosMapa.description ="En las profundidades submarinas del Arredice del Diablo, los tiranos de Y´hanthlei gobiernan las mareas tenebrosas mientras sueñan con transcender ses vetustas formas mortales. Se agitan bajo las aguas y envían a sus profundos para que corrompan el mundo de la superficie.";
        this.$store.state.datosMapa.ENdescription ="In the underwater depths of the Devil’s Arredice, the tyrants of Y hanthlei rule the dark tides as they dream of transcending these ancient mortal forms. They stir under the waters and send them deep to corrupt the surface world.";
        this.imgMapa = "imgMapa5"
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa1"
      } else if (this.$store.state.contadorMapa == 1) {
        this.$store.state.datosMapa.title = "La lámpara Mortecina";
         this.$store.state.datosMapa.ENtitle = "The Mortecina lamp";
        this.$store.state.datosMapa.description ="En el brumoso pueblo de Kingsport, la clase alta prospera en el seno de una nueva sociedad conocida como el Club de la Lámpara. En callejones y barrios bajos, muchas personas que habían desaparecido regresan despojados de sus recuerdos, como meras sombras de lo que fueron.";
        this.$store.state.datosMapa.ENdescription ="In the foggy town of Kingsport, the upper class thrives within a new society known as the Lamp Club. In alleys and slums, many disappeared people return stripped of their memories, like mere shadows of what they were.";
        this.imgMapa = "imgMapa6"
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa2"
      } else if (this.$store.state.contadorMapa == 2) {
        this.$store.state.datosMapa.title = "La progenie de Ithaqua";
        this.$store.state.datosMapa.ENtitle = "The progeny of Ithaqua";
        this.$store.state.datosMapa.description ="Ithaqua, el que camina en el viento, acecha en el gélido norte. Es el viento helado que cala hasta el alma, el hielo voras que aprisiona a los incautos. Olvidado y solitario, Ithaqua propaga si influencia coo la cruel esteranza de engendrar una progenie terrible, un nuevo vástago capaz de venzer a los mismísimos dioses arquetípicos.";
        this.$store.state.datosMapa.ENdescription ="Ithaqua, who walks in the wind, lurks in the icy north. It is the icy wind that reaches to the soul, the vore ice that imprisons the unwary. Forgotten and lonely, Ithaqua propagates if it influences the cruel sterility of begetting a terrible progeny, a new offspring capable of defeating the archetypal gods themselves.";
        this.imgMapa = "imgMapa7";
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa3"
      } else if (this.$store.state.contadorMapa == 3) {
        this.$store.state.datosMapa.title = "Sueños de R´lyeh";
        this.$store.state.datosMapa.ENtitle = "Dreams of R lyeh";
        this.$store.state.datosMapa.description ="La fresca brisa otoñal arrastra consigo una melodía sobrenatural, prácticamente imperceptible para al mente despierta. En sueños, visitáis una fantástica ciudad submarina y os deleitáis en la gloria de una entidad ciclópea que no alcanzáis a ver.";
        this.$store.state.datosMapa.ENdescription ="The fresh autumn breeze carries with it a supernatural melody, practically imperceptible to the awake mind. In dreams, you visit a fantastic underwater city and delight in the glory of a cyclopean entity that you cannot see.";
        this.imgMapa = "imgMapa8";
        this.$store.state.datosMapa.BGMapa = "BGGameGeneralMapa4"
      }
  },
  methods: {

    cambiarVista(ValueCambiarVista){
      this.$emit('cambiarVistaHijo', ValueCambiarVista)
    } // end cambiaVista
  }, // end methods
}
</script>

<style>
/* MAPAS */
.helperimgMapas{
  width: 181px;
  height: 263px;
}
.imgMapa5 {background-image: url(@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa1MareasTenebrosas.png);}
.imgMapa6 {background-image: url(@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa2MareasTenebrosas.png);}
.imgMapa7 {background-image: url(@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa3MareasTenebrosas.png);}
.imgMapa8 {background-image: url(@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa4MareasTenebrosas.png);}
</style>