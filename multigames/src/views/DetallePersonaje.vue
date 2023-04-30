<template>
    <div class="allWindow">

        <!-- IMG -->
        <section class="hero is-small helperImgPjs" >
          <div class="columns is-vcentered is-mobile p-0 pb-3">

            <div class="column p-0">
              <img class="imgDetalle p-0" :src="this.$store.state.datosPJactual.fotoUrl" :alt="this.$store.state.datosPJactual.nombrePJ">
              <div class="datosDetalle">
                <h1 class="title titleDecoration is-4 pt-3 mb-0">{{this.$store.state.datosPJactual.nombrePJ}}</h1>
                <p class="has-background-grey-dark has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.posicion}}</p>
                <p class="has-background-grey-dark has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.ENposicion}}</p>
              </div>
            </div>

          </div>
        </section>

        <!-- NAVEGACION -->
        <section class="section columns is-mobile has-background-dark p-0  mb-0">
          <div class="column is-4 has-background-light pl-5">
            <p @click="this.VerDatos('Historia')" v-if="this.$store.state.lenguaje == 'español'">Historia <i class="far fa-id-card"></i></p>
            <p @click="this.VerDatos('Historia')" v-if="this.$store.state.lenguaje == 'ingles'">History <i class="far fa-id-card"></i></p>
          </div>
          <div class="column has-background-light">
            <p @click="this.VerDatos('Pertenencias')" v-if="this.$store.state.lenguaje == 'español'">Pertenencias <i class="fas fa-briefcase"></i></p>
            <p @click="this.VerDatos('Pertenencias')" v-if="this.$store.state.lenguaje == 'ingles'">Possessions <i class="fas fa-briefcase"></i></p> 
          </div>
          <div class="column is-3 px-0 has-background-light">
            <p @click="this.VerDatos('Arquetipo')" v-if="this.$store.state.lenguaje == 'español'">Arquetipo <i class="fas fa-bolt"></i></p>
            <p @click="this.VerDatos('Arquetipo')" v-if="this.$store.state.lenguaje == 'ingles'">Archetype <i class="fas fa-bolt"></i></p>
          </div>
        </section>

        <!-- EXPANSION -->
        <div v-if="this.$store.state.datosPJactual.expansion">
          <p class="subtitle is-7 has-background-light has-text-centered is-underlined py-1 mt-1">{{ this.$store.state.datosPJactual.expansion }}</p>
        </div>

        <!-- MODALS -->
        <div>
          <!-- MODAL HISTORIA -->
        <div v-if="ModalHistoria" class="modal is-active ">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">

                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">La historia hasta ahora</p>
                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">The story so far</p>

                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">

                <p v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.historia}}</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.ENhistoria}}</p>

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
                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">Pertenencias iniciales</p>
                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Initial Possessions</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p >- {{this.$store.state.datosPJactual.dinero}}$</p>
                <!-- PERTENENCIA 1 -->
                <p v-if="this.$store.state.lenguaje == 'español'">- {{this.$store.state.datosPJactual.Pertenencia1.nombre}}</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">- {{this.$store.state.datosPJactual.Pertenencia1.ENnombre}}</p>
                <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.Pertenencia1.descripcion}}</p>
                <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.Pertenencia1.ENdescripcion}}</p>
                <!-- Pertenencia 2, SI EXISTE  -->
                <div v-if="this.$store.state.datosPJactual.Pertenencia2 != null">
                  <p v-if="this.$store.state.lenguaje == 'español'">- {{this.$store.state.datosPJactual.Pertenencia2.nombre}}</p>
                  <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.Pertenencia2.descripcion}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">- {{this.$store.state.datosPJactual.Pertenencia2.ENnombre}}</p>
                  <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.Pertenencia2.ENdescripcion}}</p>
                </div>
                
                <h1 class="subtitle is-3 mb-0 has-text-centered" v-if="this.$store.state.lenguaje == 'español'"> Elige 1 </h1>
                <h1 class="subtitle is-3 mb-0 has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'"> Take 1 </h1>
                <hr class="my-1">
                <!-- PERTENENCIA 3 -->
                <p v-if="this.$store.state.lenguaje == 'español'">- {{this.$store.state.datosPJactual.Pertenencia3.nombre}}</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">- {{this.$store.state.datosPJactual.Pertenencia3.ENnombre}}</p>
                <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.Pertenencia3.descripcion}}</p>
                <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.Pertenencia3.ENdescripcion}}</p>
                <!-- PERTENENCIA 4, SI EXISTE  -->
                <div v-if="this.$store.state.datosPJactual.Pertenencia4 != null">
                  <p v-if="this.$store.state.lenguaje == 'español'">- {{this.$store.state.datosPJactual.Pertenencia4.nombre}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">- {{this.$store.state.datosPJactual.Pertenencia4.ENnombre}}</p>
                  <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.Pertenencia4.descripcion}}</p>
                  <p class="subtitle is-7" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.Pertenencia4.ENdescripcion}}</p>
                </div>
                
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
                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'español'">Arquetipo principal</p>
                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">Main archetype</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.arquetipo1}}</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.ENarquetipo1}}</p>
                <br>
                <p v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.arquetipo2}}</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.ENarquetipo2}}</p>
              </section>
            </div>
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
                {{ this.$store.state.datosPJactual.vida }}
              </p>
            </div>

            <div class="column">
              <p class="has-text-info has-text-centered">
                <i class="fa-5x fas fa-brain"></i>
              </p>
              <p class="contadorVidaCordura has-text-centered title is-3 mb-0">
                {{ this.$store.state.datosPJactual.cordura }}
              </p>
            </div>
        </div><!-- end DatosVida/Cordura -->
        
        <!-- ATRIBUTOS y Boton -->
        <div class="columns mx-3 is-mobile">
          <div class="column p-1">
            <p class="has-text-purple has-text-centered">
              <i class="fa-3x fas fa-book-open"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.$store.state.datosPJactual.saber }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-orange has-text-centered">
              <i class="fa-3x fas fa-handshake"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.$store.state.datosPJactual.influencia }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-primary has-text-centered"><i class="fa-3x fas fa-eye"></i></p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.$store.state.datosPJactual.observacion }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-danger has-text-centered">
              <i class="fa-3x fas fa-fist-raised"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.$store.state.datosPJactual.fuerza }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-info has-text-centered"><i class="fa-3x fab fa-hornbill"></i></p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.$store.state.datosPJactual.voluntad }}</p>
          </div>
        </div>

        <!-- Datos -->
        <div class="px-3">
          <p class="has-text-white pb-1" v-if="this.$store.state.lenguaje == 'español'">--> {{ this.$store.state.datosPJactual.efecto1 }}</p>
          <p class="has-text-white pb-1" v-if="this.$store.state.lenguaje == 'ingles'">--> {{ this.$store.state.datosPJactual.ENefecto1 }}</p>

          <div v-if=" this.$store.state.datosPJactual.efecto2 != null ">>
            <p class="has-text-white pb-1" v-if="this.$store.state.lenguaje == 'español'">--> {{ this.$store.state.datosPJactual.efecto2 }}</p>
            <p class="has-text-white pb-1" v-if="this.$store.state.lenguaje == 'ingles'">--> {{ this.$store.state.datosPJactual.ENefecto2 }}</p>
          </div>
        
          <p class="has-text-white is-italic pt-2" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.frase}}</p>
          <p class="has-text-white is-italic pt-2" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.ENfrase}}</p>

          <p class="has-text-white has-text-weight-semibold pt-3" v-if="this.$store.state.lenguaje == 'español'"> <u> Limite de concentracion</u>: {{this.$store.state.datosPJactual.limConcentracion}}</p>
          <p class="has-text-white has-text-weight-semibold pt-3" v-if="this.$store.state.lenguaje == 'ingles'"> <u> Concentration limit</u>: {{this.$store.state.datosPJactual.ENlimConcentracion}}</p>
        </div>

        <!-- Boton de Comenzar -->
        <div class="columns is-mobile">
          <div class="column is-4"></div>
          <div class="column">
            <router-link to="/PlayAH"><button class="button is-success has-text-white mt-3 p-5" v-if="this.$store.state.lenguaje == 'español'">Comenzar!</button></router-link>
            <router-link to="/PlayAH"><button class="button is-success has-text-white mt-3 p-5" v-if="this.$store.state.lenguaje == 'ingles'">Start!</button></router-link>
          </div>
          <div class="column is-4"></div>
        </div>
        <br />
      </div><!-- end container  -->
</template>

<script>
export default {
  name: 'DetallePersonaje',

  data(){
    return{

    // SELECCION DE PERSONAJE
    ModalHistoria: false,
    ModalPertenencias: false,
    ModalArquetipo: false,
    }
  },

  methods:{
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
  }
}
</script>

<style>
.modal-card{
  max-width: 380px;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");

@font-face{
  font-family: NombrePJs;
  src: url('@/assets/fonts/PJs/NombrePJs.ttf'), url('@/assets/fonts/PJs/NombrePJsItalic.ttf')
}
@font-face{
  font-family: Pacto Siniestro;
  src: url('@/assets/fonts/Pacto Siniestro/bloodcrow.ttf'), url('@/assets/fonts/Pacto Siniestro/bloodcrowc.ttf'), url('@/assets/fonts/Pacto Siniestro/bloodcrowci.ttf')
}

.imgDetalle{
  position: relative;
  z-index: 1
}
.datosDetalle{
  position: absolute;
  z-index: 2;
  top: 90px;
  left: 1%;
  right:1%
}

.contadorVidaCordura {
  position: relative;
  top: -50px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

.contadorAtributos {
  position: relative;
  top: -30px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

.titleDecoration {
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "NombrePJs";
  font-weight: 300;
  text-align: center;
}

.allWindow {
  min-height: 70vh;
}


/* imgPersonajes */
.helperImgPjs{
  background-position: center;
  background-size: cover;
}

/* colores para atributos */
.has-text-purple {
  color: #9b51e0;
}
.has-text-orange {
  color: #f2994a;
}

</style>