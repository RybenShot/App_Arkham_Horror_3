<template>
  <!-- VIEW DE MAPA -->
  <div>
    <div class="mx-3 container allWindow card">
      <!-- TITULO Y DESCRIPCION -->
      <div id="tituloDescripcion">
        <h1 class="title titleDecoration is-4 pt-3 mb-3">{{ this.title }}</h1>
        <p class="has-text-white has-text-weight-light is-italic p-1">
          {{ this.description }}
        </p>
      </div>

      <!-- MAPA , FLECHAS Y BOTON -->
      <div class="columns is-vcentered is-mobile">
        <!-- ARROW izquierda -->
        <div class="column is-one-fifth ml-4">
          <!-- boton dehabilitado  -->
          <button v-if="this.contador <= 1" disabled class="p-2">
            <i class="fa-2x fas fa-angle-double-left"></i>
          </button>

          <!-- boton funcionando!  -->
          <button
            v-if="this.contador > 1"
            @click="cambiaMapa('menos')"
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
            <div><p class="has-text-white pt-6">{{contador}} / 4</p></div>
          </div>
          

        </div>

        <!-- ARROW derecha -->
        <div class="column column is-one-fifth is-vcentered p-0">
          <!-- boton deshabilitado -->
          <button v-if="this.contador >= 4" disabled class="p-2">
            <i class="fa-2x fas fa-angle-double-right"></i>
          </button>

          <!-- boton funcionando!  -->
          <button
            v-if="this.contador < 4"
            @click="cambiaMapa('mas')"
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
  props: ['contador'],
  data(){
    return{
      title: "La llegada de Azathoth",
      description:
        "En el colazon del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funnestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...",
      imgMapa: "imgMapa1",
    }
  },
  mounted(){
    // console.log(this.contador)
  },
  methods: {
    cambiaMapa(seleccionMenosMas) {
      // console.log(seleccionMenosMas)
      this.$emit('valorMenosMasHijo', seleccionMenosMas);
      // 2 enviamos un evento con el dato recivido
      // 3 EL NOMBRE DEL EVENTO debe ser EL MISMO que el del padre QUE ESTA ESCUCHANDO!!!
      if (this.contador == 1) {
        this.title = "La llegada de Azathoth";
        this.description =
          "En el colazon del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funnestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...";
        this.imgMapa = "imgMapa1";
      } else if (this.contador == 2) {
        this.title = "Festin para Umordhoth";
        this.description =
          "Los gules que habitan en el mundo subterraneo se alimentan de la carne de los muertos: con todo, incluso ellos viven temerosos del Devorador de las Profundidades alq ue reverencian. Pero los gules no son los unicos en Arkham que veneran a mordhoth...";
        this.imgMapa = "imgMapa2";
      } else if (this.contador == 3) {
        this.title = "El velo del Crepusculo";
        this.description =
          "Algo acecha en el gelido vacio que separa nuestros mundos. Susurra desde el otro lado del velo, llamandoa  todos los que tengan el poder necesario para liberarlo de su confinamiento. Quienes sucumben a su influjo obtienen un gran poder, pero el precio que pagan es terrible. Y con cada dia que pasa su liberacion esta mas proxima...";
        this.imgMapa = "imgMapa3";
      } else if (this.contador == 4) {
        this.title = "Ecos de las profundidades";
        this.description =
          "En su morada de R’lyeh, el difunto Cthulhu aguada soñando. Se agita en su letargo y espera a que las estrellas sean propicias para que R’lyeh emerja de su hogar bajo las olas y los primigenios regresen. Pues no esta muerto lo que puede yacer eternamente, y con los evos extraños aun la muerte puede morir...";
        this.imgMapa = "imgMapa4";
      }
    }, // end cambiaMapa
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
.imgMapa1 {background-image: url(../../assets/img/Games/ArkhamHorror/mapa1.png);}
.imgMapa2 {background-image: url(../../assets/img/Games/ArkhamHorror/mapa2.png);}
.imgMapa3 {background-image: url(../../assets/img/Games/ArkhamHorror/mapa3.png);}
.imgMapa4 {background-image: url(../../assets/img/Games/ArkhamHorror/mapa4.png);}
</style>