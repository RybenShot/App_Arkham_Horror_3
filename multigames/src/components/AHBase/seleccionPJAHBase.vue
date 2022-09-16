<template>
  <div class="allWindow">

        <!-- IMG -->
        <section class="hero is-small helperImgPjs" :class="[datosPJactual.imgPersonaje]">
          <div class="hero-body columns is-vcentered is-mobile p-0 pt-6 mt-5 pb-3">

            <!-- ARROW izquierda -->
            <div class="column is-2 pl-4">
              <!-- si no cumple la regla, simplemente no hay nada --> 
              <!-- boton funcionando!  -->
              <div v-if="this.contador > 0">
                <button @click="cambiaPJ('menos')" class="p-2">
                  <i class="fa-2x fas fa-angle-double-left"></i>
                </button>
              </div>
            </div><!-- end ARROW izquierda -->

            <div class="column">
              <h1 class="title titleDecoration is-4 pt-3 mb-0">
                {{ this.datosPJactual.nombrePJ }}
              </h1>
              <p class="has-background-grey-dark has-text-light has-text-centered">{{this.datosPJactual.posicion}}</p>
            </div>

            <!-- ARROW derecha -->
            <div class="column is-2 p-2">
              <!-- si no cumple la regla, simplemente no hay nada -->
              <!-- boton funcionando!  -->
              <div v-if="this.contador < 11">
                <button @click="cambiaPJ('mas')" class="p-2">
                  <i class="fa-2x fas fa-angle-double-right"></i>
                </button>
              </div>
            </div><!-- end ARROW derecha -->

          </div>
        </section>

        <!-- NAVEGACION -->
        <section class="section columns is-mobile has-background-dark p-0">
          <div class="column is-4 has-background-light pl-5"><p @click="this.VerDatos('Historia')">Historia <i class="far fa-id-card"></i></p> </div>
          <div class="column has-background-light"><p @click="this.VerDatos('Pertenencias')">Pertenencias <i class="fas fa-briefcase"></i></p> </div>
          <div class="column is-3 px-0 has-background-light"><p @click="this.VerDatos('Arquetipo')">Arquetipo <i class="fas fa-bolt"></i></p> </div>
        </section>

        <!-- MODAL HISTORIA -->
        <div v-if="ModalHistoria" class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">
                <p class="modal-card-title">La historia hasta ahora</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p>{{this.datosPJactual.historia}}</p>
              </section>
            </div>
          </div>
        </div>

        <!-- MODAL PERTENENCIAS -->
        <div v-if="ModalPertenencias" class="modal is-active ">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">
                <p class="modal-card-title">Pertenencias iniciales</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p>- {{this.datosPJactual.dinero}}$</p>
                <p>- {{this.datosPJactual.Pertenencia1}}</p>
                <p v-if="this.datosPJactual.Pertenencia2 != null">- {{this.datosPJactual.Pertenencia2}}</p>
                <h1 class="subtitle is-3 mb-0 has-text-centered"> Elige 1 </h1>
                <hr class="my-1">
                <p>- {{this.datosPJactual.Pertenencia3}}</p>
                <p>- {{this.datosPJactual.Pertenencia4}}</p>
              </section>
            </div>
          </div>
        </div>

        <!-- MODAL ARQUETIPO -->
        <div v-if="ModalArquetipo" class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">
                <p class="modal-card-title">Arquetipo principal</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p>{{this.datosPJactual.arquetipo1}}</p>
                <br>
                <p>{{this.datosPJactual.arquetipo2}}</p>
              </section>
            </div>
          </div>
        </div>
        
        <!-- DatosVida/Cordura-->
        <div class="columns is-mobile mt-2">
          <!-- Vida y cordura -->
            <div class="column">
              <p class="has-text-danger has-text-centered">
                <i class="fa-5x fas fa-heartbeat"></i>
              </p>
              <p class="contadorVidaCordura has-text-centered title is-3 mb-0">
                {{ this.datosPJactual.vida }}
              </p>
            </div>

            <div class="column">
              <p class="has-text-info has-text-centered">
                <i class="fa-5x fas fa-brain"></i>
              </p>
              <p class="contadorVidaCordura has-text-centered title is-3 mb-0">
                {{ this.datosPJactual.cordura }}
              </p>
            </div>
        </div><!-- end DatosVida/Cordura -->
        
        <!-- ATRIBUTOS y Boton -->
        <div class="columns mx-3 is-mobile">
          <div class="column p-1">
            <p class="has-text-purple has-text-centered">
              <i class="fa-3x fas fa-book-open"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.datosPJactual.saber }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-orange has-text-centered">
              <i class="fa-3x fas fa-handshake"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.datosPJactual.influencia }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-primary has-text-centered"><i class="fa-3x fas fa-eye"></i></p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.datosPJactual.observacion }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-danger has-text-centered">
              <i class="fa-3x fas fa-fist-raised"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.datosPJactual.fuerza }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-info has-text-centered"><i class="fa-3x fab fa-hornbill"></i></p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.datosPJactual.voluntad }}</p>
          </div>
        </div>

        <!-- Datos -->
        <div class="px-3">
          <p class="has-text-white pb-1">--> {{ this.datosPJactual.efecto1 }}</p>
          <p class="has-text-white pb-1" v-if=" this.datosPJactual.efecto2 != null ">--> {{ this.datosPJactual.efecto2 }}</p>
          <p class="has-text-white is-italic pt-2">{{this.datosPJactual.frase}}</p>
          <p class="has-text-white has-text-weight-semibold pt-3"> <u> Limite de concentracion</u>: {{this.datosPJactual.limConcentracion}}</p>
        </div>

        <!-- Boton de Comenzar -->
        <div class="columns is-mobile">
          <div class="column is-4"></div>
          <div class="column"><button @click="cambiarVista(false)" class="button is-success has-text-white mt-3 p-5">Comenzar!</button></div>
          <div class="column is-4"></div>
        </div>
        <br />
      </div><!-- end container  -->
</template>

<script>
export default {
  name: 'SeleccionPJcomponent',
  props: ['contador', 'datosPJactual'],

  data(){
    return{

    // SELECCION DE PERSONAJE
    ModalHistoria: false,
    ModalPertenencias: false,
    ModalArquetipo: false,
    }
  },

  methods:{
    cambiaPJ(seleccionMenosMas){
        this.$emit('cambioPersonaje', seleccionMenosMas);
    },
    VerDatos(verdato){
      if (verdato == 'Historia') {
          this.ModalHistoria = true;
      } else if (verdato == 'Pertenencias'){
          this.ModalPertenencias = true;
      } else if (verdato == 'Arquetipo'){
          this.ModalArquetipo = true;
      } else{
        this.ModalHistoria = false;
        this.ModalPertenencias = false;
        this.ModalArquetipo = false;
      }
    },
    cambiarVista(ValueCambiarVista){
      this.$emit('cambiarVistaHijo', ValueCambiarVista)
    } // end cambiaVista
  }

}
</script>

<style>

</style>