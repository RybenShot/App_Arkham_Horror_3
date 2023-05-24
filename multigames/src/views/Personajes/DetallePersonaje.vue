<template>
    <div class="allWindow">

        <!-- IMG -->
        <section class="hero is-small helperImgPjs" :class="[imgPJDetalle]" >
          <div class=" hero-body columns is-vcentered is-mobile p-0 pt-6 ">

            <router-link class="" to="/ListaPersonajes"><div class="column is-2 pl-5 p-0 has-text-grey-lighter" ><i class="fa-2x fas fa-arrow-alt-circle-left"></i></div></router-link>

            <div class="column">
              <div class="classDatosDetalle">
                <h1 class="title titleDecoration is-4 pt-3 mb-0">{{this.$store.state.datosPJactual.nombrePJ}}</h1>
                <p class="has-background-grey-dark has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'español'">{{this.$store.state.datosPJactual.posicion}}</p>
                <p class="has-background-grey-dark has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'">{{this.$store.state.datosPJactual.ENposicion}}</p>
              </div>
            </div>

            <router-link class="column is-2 pl-2" to="/"><div class="has-text-grey-lighter"><i class="fa-2x fas fa-home"></i></div></router-link>

          </div>
        </section>

        <!-- NAVEGACION -->
        <section class="section columns is-mobile has-background-dark p-0 mt-1 mb-0">
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
      datosDetalle:{},
      imgPJDetalle: "",

    // SELECCION DE PERSONAJE
    ModalHistoria: false,
    ModalPertenencias: false,
    ModalArquetipo: false,
    }
  },

   mounted(){
    this.datosDetalle= { ...this.$store.state.datosPJactual };


    if (this.datosDetalle.idPersonaje == 1) {
      this.imgPJDetalle = "PlayimgTommy"
    } else if (this.datosDetalle.idPersonaje == 2) {
      this.imgPJDetalle = "PlayimgMarie"
    } else if (this.datosDetalle.idPersonaje == 3) {
      this.imgPJDetalle = "PlayimgJenny"
    } else if (this.datosDetalle.idPersonaje == 4) {
      this.imgPJDetalle = "PlayimgDexter"
    } else if (this.datosDetalle.idPersonaje == 5) {
      this.imgPJDetalle = "PlayimgWendy"
    } else if (this.datosDetalle.idPersonaje == 6) {
      this.imgPJDetalle = "PlayimgRex"
    } else if (this.datosDetalle.idPersonaje == 7) {
      this.imgPJDetalle = "PlayimgCalvin"
    } else if (this.datosDetalle.idPersonaje == 8) {
      this.imgPJDetalle = "PlayimgAgnes"
    } else if (this.datosDetalle.idPersonaje == 9) {
      this.imgPJDetalle = "PlayimgMichael"
    } else if (this.datosDetalle.idPersonaje == 10) {
      this.imgPJDetalle = "PlayimgDaniela"
    } else if (this.datosDetalle.idPersonaje == 11) {
      this.imgPJDetalle = "PlayimgNorman"
    } else if (this.datosDetalle.idPersonaje == 12) {
      this.imgPJDetalle = "PlayimgMinh"
    } else if (this.datosDetalle.idPersonaje == 13) {
      this.imgPJDetalle = "PlayimgSilas"
    } else if (this.datosDetalle.idPersonaje == 14) {
      this.imgPJDetalle = "PlayimgCharlie"
    } else if (this.datosDetalle.idPersonaje == 15) {
      this.imgPJDetalle = "PlayimgStella"
    } else if (this.datosDetalle.idPersonaje == 16) {
      this.imgPJDetalle = "PlayimgZoey"
    } else if (this.datosDetalle.idPersonaje == 17) {
      this.imgPJDetalle = "PlayimgPadre"
    } else if (this.datosDetalle.idPersonaje == 18) {
      this.imgPJDetalle = "PlayimgPatricie"
    } else if (this.datosDetalle.idPersonaje == 19) {
      this.imgPJDetalle = "PlayimgCarson"
    } else if (this.datosDetalle.idPersonaje == 20) {
      this.imgPJDetalle = "PlayimgPete"
    } else if (this.datosDetalle.idPersonaje == 21) {
      this.imgPJDetalle = "PlayimgDarrell"
    } else if (this.datosDetalle.idPersonaje == 22) {
      this.imgPJDetalle = "PlayimgGloria"
    } else if (this.datosDetalle.idPersonaje == 23) {
      this.imgPJDetalle = "PlayimgMandy"
    } else if (this.datosDetalle.idPersonaje == 24) {
      this.imgPJDetalle = "PlayimgMontarrey"
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

<style scoped>
.modal-card{
  max-width: 380px;
}

.PlayimgTommy {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ1.png);}
.PlayimgMarie {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ2.jpg);}
.PlayimgJenny {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ3.png);}
.PlayimgDexter {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ4.png);}
.PlayimgWendy {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ5.jpg);}
.PlayimgRex {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ6.jpg);}
.PlayimgCalvin {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ7.jpg);}
.PlayimgAgnes {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ8.jpg);}
.PlayimgMichael {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ9.jpg);}
.PlayimgDaniela {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ10.jpg);}
.PlayimgNorman {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ11.jpg);}
.PlayimgMinh {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ12.jpg);}

.PlayimgSilas {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ13.jpg);}
.PlayimgCharlie {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ14.jpg);}
.PlayimgStella {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ15.jpg);}
.PlayimgZoey {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ16.jpg);}
.PlayimgPadre {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ17.jpg);}
.PlayimgPatricie {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ18.jpg);}
.PlayimgCarson {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ19.jpg);}
.PlayimgPete {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ20.jpg);}

.PlayimgDarrell {background-image: url(@/assets/img/Games/AHOriginal/2imgInvestigadores/PJ21.jpg);}
.PlayimgGloria {background-image: url(@/assets/img/Games/AHOriginal/2imgInvestigadores/PJ22.jpg);}
.PlayimgMandy {background-image: url(@/assets/img/Games/AHOriginal/2imgInvestigadores/PJ23.jpg);}
.PlayimgMontarrey {background-image: url(@/assets/img/Games/AHOriginal/2imgInvestigadores/PJ24.jpg);}

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
.classDatosDetalle{
  position: absolute;
  z-index: 2;
  top: 90px;
  left: 15%;
  right:15%
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

.allWindow {
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
  height: 100vh;
  background-position: center;
  background-size: cover;
}


/* imgPersonajes */
.helperImgPjs{
  background-position: center;
  background-size: cover;
  height: 20vh;
}

/* colores para atributos */
.has-text-purple {
  color: #9b51e0;
}
.has-text-orange {
  color: #f2994a;
}

</style>