<template>
  <div class="container allWindow" :class="[BGVida]" >
    <div class="allWindow" :class="[BGCordura]">
    <!-- IMG -->
    <section class="hero is-small helperImgPjs" :class="[datosPJactual.imgPersonaje]">
      <div class="hero-body columns is-vcentered is-mobile p-0 pt-6 mt-5 pb-0">
        <div class="column is-2 pl-5 p-0 has-text-grey-lighter" @click="cambiarVista(true)"><i class="fa-2x fas fa-arrow-alt-circle-left"></i></div>

        <div class="column">
          <h1 class="title titleDecoration is-4 pt-3 mb-0" > {{ this.datosPJactual.nombrePJ }}</h1>
          <p class="has-background-grey-dark has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'español'">{{ this.datosPJactual.posicion }}</p>
          <p class="has-background-grey-dark has-text-light has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.datosPJactual.ENposicion }}</p>
        </div>

        <router-link class="column is-2 pl-2" to="/"><div class="has-text-grey-lighter"><i class="fa-2x fas fa-home"></i></div></router-link>
      </div>
    </section>

    <!-- barra superior ESTADOS -->
    <div class="columns is-mobile mt-0 is-centered">
      <!-- Esta sera para el estado de perseguido ams adelante -->
      <!-- <i class="fas fa-shoe-prints"></i> -->

      <!-- PACTO -->
      <h2 v-if="this.$store.state.EstadoPacto" @click="this.$store.state.modalPacto = true" 
      class="column has-background-danger has-text-centered has-text-light p-1"><i class="fa-1x fas fa-skull-crossbones"></i></h2>
      <!-- MALDITO -->
      <h2 v-if="this.$store.state.EstadoMaldito" 
      @click="(this.$store.state.modalMaldito = true)" 
      class=" column has-background-warning-dark has-text-centered has-text-light p-1"><i class="fa-1x fas fa-skull"></i></h2>
      <!-- BENDICION -->
      <h2 v-if="this.$store.state.EstadoBendicion" @click="this.$store.state.modalBendicion = true" 
      class=" column has-background-info has-text-centered has-text-light p-1"><i class="fa-1x fas fa-bible"></i></h2>
      <!-- MANCILLADO -->
      <h2 v-if="this.$store.state.EstadoMancillado" @click="this.$store.state.modalMancillado = true" 
      class=" column has-background-success-dark has-text-centered has-text-light p-1"><i class="fa-1x fas fa-tint"></i></h2>


      <!-- ORIGINALES -->
      <!-- MANCO -->
      <h2 v-if="this.$store.state.EstadoManco"  @click="this.$store.state.modalManco = true" 
      class="column has-background-warning-light has-text-centered has-text-warning-dark p-1"><i class="fa-1x fas fa-user-injured"></i></h2>
      <!-- ENFERMO -->
      <!-- <h2 v-if="this.$store.state.EstadoEnfermo" @click="this.$store.state.modalEnfermo = true" 
      class="column has-background-danger-light has-text-centered has-text-danger-dark p-1"><i class="fa-1x fas fa-capsules"></i></h2> -->
      <!-- SUICIDIO -->
      <h2 v-if="this.$store.state.EstadoSuicidio"  @click="this.$store.state.modalSuicidio = true" 
      class="column has-background-dark has-text-centered has-text-grey-lighter p-1"><i class="fa-1x fas fa-sad-tear"></i></h2>
      <!-- SEÑALADO -->
      <h2 v-if="this.$store.state.EstadoSeñalado"  @click="this.$store.state.modalSeñalado = true" 
      class="column has-background-link has-text-centered has-text-link-light p-1"><i class="fa-1x fas fa-street-view"></i></h2>
    </div>

    <!-- MODALS -->
    <div>
      <!-- MODAL PACTO SINIESTRO -->
      <div v-if="this.$store.state.modalPacto"><PactosSiniestros/></div>
      <!-- MODAL MALDITO -->
      <div v-if="this.$store.state.modalMaldito"><EstadoMaldicion/></div>
      <!-- MODAL BENDITO -->
      <div v-if="this.$store.state.modalBendicion" ><EstadoBendicion/></div>
      <!-- MODAL MANCILLADO  -->
      <div v-if="this.$store.state.modalMancillado" ><EstadoMancillado/></div>

      <!-- ORIGINALES -->
      <!-- MANCO -->
      <div v-if="this.$store.state.modalManco" ><EstadoManco/></div>
      <!-- SUICIDIO -->
      <div v-if="this.$store.state.modalSuicidio" ><EstadoSuicidio/></div>
      <!-- SEÑALADO -->
      <div v-if="this.$store.state.modalSeñalado" ><EstadoSeñalado/></div>
    </div>

    <!-- VIDA Y CORDURA -->
    <div class="columns is-mobile pt-2">
      <!-- VIDA -->
      <div class="column">
        <div>
          <p class="has-text-danger has-text-centered"> <i class="fa-5x fas fa-heartbeat"></i> </p>
          <p class="contadorVidaCordura has-text-centered title is-3 mb-0"> {{ this.datosPJactual.vida }} </p>
          <!-- botones + - -->
          <div class="columns is-mobile pb-2">
            <div class="column ml-4 pt-0">
              <button class="button is-danger" @click="datosPJactual.vida--"> - </button>
            </div>

            <div class="column ml-3 pt-0">
              <button class="button is-success" @click="datosPJactual.vida++"> + </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end VIDA -->

      <!-- CORDURA -->
      <div class="column">
        <div>
          <p class="has-text-info has-text-centered"> <i class="fa-5x fas fa-brain"></i>
          </p>
          <p class="contadorVidaCordura has-text-centered title is-3 mb-0"> {{ this.datosPJactual.cordura }}
          </p>
          <!-- botones + - -->
          <div class="columns is-mobile pb-2">
            <div class="column ml-4 pt-0">
              <button class="button is-danger" @click="datosPJactual.cordura--"> - </button>
            </div>

            <div class="column ml-3 pt-0">
              <button class="button is-success" @click="datosPJactual.cordura++" > + </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end CORDURA -->
    </div>
    <!-- END VIDA Y CORDURA -->

    <!-- ATRIBUTOS -->
    <div class="columns is-mobile" id="botonesAtributos">
      <button
        class="column helpermaxheigth p-1 mx-2 ml-4 botonesAtributos"
        @click="this.NDadosAtributo = this.datosPJactual.saber"
      >
        <p class="has-text-purple"><i class="fa-3x fas fa-book-open"></i></p>
        <p class="contadorAtributos title is-5 mb-0">
          {{ this.datosPJactual.saber }}
        </p>
      </button>

      <button
        class="column helpermaxheigth p-1 mx-2"
        @click="this.NDadosAtributo = this.datosPJactual.influencia"
      >
        <p class="has-text-orange"><i class="fa-3x fas fa-handshake"></i></p>
        <p class="contadorAtributos title is-5 mb-0">
          {{ this.datosPJactual.influencia }}
        </p>
      </button>

      <button
        class="column helpermaxheigth p-1 mx-2"
        @click="this.NDadosAtributo = this.datosPJactual.observacion"
      >
        <p class="has-text-primary"><i class="fa-3x fas fa-eye"></i></p>
        <p class="contadorAtributos title is-5 mb-0">
          {{ this.datosPJactual.observacion }}
        </p>
      </button>

      <button
        class="column helpermaxheigth p-1 mx-2"
        @click="this.NDadosAtributo = this.datosPJactual.fuerza"
      >
        <p class="has-text-danger"><i class="fa-3x fas fa-fist-raised"></i></p>
        <p class="contadorAtributos title is-5 mb-0">
          {{ this.datosPJactual.fuerza }}
        </p>
      </button>

      <button
        class="column helpermaxheigth p-1 mx-2 mr-4"
        @click="this.NDadosAtributo = this.datosPJactual.voluntad"
      >
        <p class="has-text-info"><i class="fa-3x fab fa-hornbill"></i></p>
        <p class="contadorAtributos title is-5 mb-0">
          {{ this.datosPJactual.voluntad }}
        </p>
      </button>
    </div>
    <!-- end ATRIBUTOS -->

  <!-- Dados Extras -->
    <div>
      <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'">Dados extras</p>
      <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">Extra dices</p>
      <div class="columns is-mobile mt-2 px-6">
        <button @click="NDeDadosExtra--" class="column py-2 px-4 mr-3">
          -
        </button>
        <input
          type="number"
          v-model="NDeDadosExtra"
          class="column py-2 px-2 px-2"
        />
        <button @click="NDeDadosExtra++" class="column py-2 px-4 ml-3">
          +
        </button>
      </div>
    </div>
    <!-- end Dados Extras -->

    <!-- BOTON DE LANZAR DADOS y MAS OPCIONES -->
    <!-- Aqui indicamos ya el minimo del resultado que debe salir y el maximo lo indicamos con "NDeLados" -->
    <div class="columns is-mobile mt-3">
      <div class="column is-4">
        <p class="subtitle has-text-white is-6 is-italic px-2" v-if="this.$store.state.lenguaje == 'español'">Total de dados: {{ this.NDeDadosExtra + this.NDadosAtributo }}</p>
        <p class="subtitle has-text-white is-6 is-italic px-2" v-if="this.$store.state.lenguaje == 'ingles'">Total number of dice: {{ this.NDeDadosExtra + this.NDadosAtributo }}</p>
      </div>
      <div class="column">
        <button @click="tirarDados(1)" class="button is-success is-active" v-if="this.$store.state.lenguaje == 'español'">TIRAR!</button>
        <button @click="tirarDados(1)" class="button is-success is-active" v-if="this.$store.state.lenguaje == 'ingles'">THROW!</button>
      </div>
      <div class="column mr-3">
        <!-- BOTON DE MAS OPCIONES -->
        <button v-if="masOpciones == false" @click="masOpciones = !masOpciones" class="button is-warning">+ opciones +</button>
        <button v-if="masOpciones == true" @click="masOpciones = !masOpciones" class="button is-warning">- opciones -</button>
      </div>
    </div>

    <!-- AVANZADO -->
    <Transition>
      <div v-show="masOpciones" class="has-background-white p-2 mt-2 pt-0">
        <h3 class=" has-text-centered has-background-warning has-text-grey-darker mb-2 " v-if="this.$store.state.lenguaje == 'español'">Avanzado</h3>
        <h3 class=" has-text-centered has-background-warning has-text-grey-darker mb-2 " v-if="this.$store.state.lenguaje == 'ingles'">Advance</h3>

        <button @click="this.$store.state.EstadoPacto = !this.$store.state.EstadoPacto" class="checkbox mr-4 has-text-danger button" >
          <p v-if="this.$store.state.lenguaje == 'español'">Pacto siniestro</p>
          <p v-if="this.$store.state.lenguaje == 'ingles'">Dark Pact</p> 
        </button>

        <button @click="this.$store.state.EstadoMaldito = true, 
        (this.$store.state.AvAcierto2 = null),
        (this.$store.state.AvAcierto3 = null),
        (this.$store.state.EstadoBendicion = false)" class="checkbox mr-4 has-text-warning-dark button">
          <p v-if="this.$store.state.lenguaje == 'español'">Maldito</p> 
          <p v-if="this.$store.state.lenguaje == 'ingles'">Bloody</p> 
        </button>

        <button @click="this.$store.state.EstadoBendicion = true, 
        (this.$store.state.AvAcierto2 = 5),
        (this.$store.state.AvAcierto3 = 4),
        (this.$store.state.EstadoMaldito = false)" class="checkbox has-text-info button">
          <p v-if="this.$store.state.lenguaje == 'español'">Bendecido</p>
          <p v-if="this.$store.state.lenguaje == 'ingles'">Blessed</p>
        </button>

        <button @click="this.$store.state.EstadoMancillado = !this.$store.state.EstadoMancillado" class="checkbox mr-4 mt-1 has-text-success-dark button">
          <p v-if="this.$store.state.lenguaje == 'español'">Mancillado</p>
          <p v-if="this.$store.state.lenguaje == 'ingles'">Defiled</p>
        </button>

        <div v-if="masOpciones" class="p-2">
          <h1 class="title" v-if="this.$store.state.lenguaje == 'español'"> Suma total: {{ SumaDetodo }}{{ this.sumaResultado }} </h1>
          <h1 class="title" v-if="this.$store.state.lenguaje == 'ingles'"> Total sum: {{ SumaDetodo }}{{ this.sumaResultado }} </h1>
        </div>
      </div>
    </Transition>

    <!-- RESULTADOS -->
    <div class="resultados mx-2">
      <h1 class="title has-text-centered has-text-white is-3 mb-2" v-if="this.$store.state.lenguaje == 'español'"> RESULTADOS </h1>
      <h1 class="title has-text-centered has-text-white is-3 mb-2" v-if="this.$store.state.lenguaje == 'ingles'"> RESULTS </h1>
      <div id="resultados-css" class="container">
        <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
        <div v-for="item in resultados" :key="item">
          <!-- SI OPCIONES AVANZADAS -->
          <p v-if=" (item == this.$store.state.AvAcierto) | (item == this.$store.state.AvAcierto2) | (item == this.$store.state.AvAcierto3)" class="acierto resultado-css has-text-white has-background-dark" > {{ item }} </p>
          <p v-else-if=" (item == this.$store.state.AvFatal) | (item == this.$store.state.AvFatal2) | (item == this.$store.state.AvFatal3) " class="fatal resultado-css has-text-white has-background-dark" > {{ item }} </p>
          <p v-else class="resultado-css has-text-white has-background-dark"> {{ item }} </p>
        </div>
      </div>
      </div>
    </div>
  </div>
  <!-- end card - container -->
</template>

<script>
import EstadoMaldicion from "@/components/helpers/estados/Maldicion.vue"
import EstadoBendicion from "@/components/helpers/estados/Bendicion.vue"
import EstadoMancillado from "@/components/helpers/estados/Mancillado.vue"
import PactosSiniestros from "@/components/helpers/estados/pactosSiniestros.vue"
// Estados Originales
import EstadoManco from "@/components/helpers/estadosOriginales/Manco.vue"
import EstadoSuicidio from "@/components/helpers/estadosOriginales/Suicidio.vue"
import EstadoSeñalado from "@/components/helpers/estadosOriginales/Señalado.vue"
export default {
  name: "Playcomponent",
  components:{
    EstadoMaldicion,
    EstadoBendicion,
    EstadoMancillado,
    PactosSiniestros,

    EstadoManco,
    EstadoSuicidio,
    EstadoSeñalado
  },
  props: ["datosPJactual"],

  data() {
    return {
      // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,
      resultados: [1, 6, 5, 4],
      sumaResultado: 0,

      masOpciones: false,

      // aciertos - fatal
      AvAcierto: 6,
      AvAcierto2: 5,
      AvAcierto3: null,
      AvFatal: 1,

      BGVida: "",
      BGCordura: "",
    };
  },

  updated() {
    if (this.datosPJactual.vida >= 5 && this.datosPJactual.vida < 7) {
      this.BGVida = "damageV25";
    } else if (this.datosPJactual.vida >= 3 && this.datosPJactual.vida < 5) {
      this.BGVida = "damageV50";
    } else if (this.datosPJactual.vida >= 2 && this.datosPJactual.vida < 3) {
      this.BGVida = "damageV75"
    } else if (this.datosPJactual.vida < 2) {
      this.BGVida = "damageV90"
    } else if (this.datosPJactual.vida >= 7) {
      this.BGVida = ""
    } 
    
    if (this.datosPJactual.cordura >= 5 && this.datosPJactual.cordura < 7) {
      this.BGCordura = "damageC25";
    } else if (this.datosPJactual.cordura >= 3 && this.datosPJactual.cordura < 5) {
      this.BGCordura = "damageC50";
    } else if (this.datosPJactual.cordura >= 2 && this.datosPJactual.cordura < 3) {
      this.BGCordura = "damageC75"
    } else if (this.datosPJactual.cordura < 2) {
      this.BGCordura = "damageC90"
    } else if (this.datosPJactual.cordura >= 7) {
      this.BGCordura = ""
    } 
  },
  methods: {
    // TIRADA DE DADOS
    async tirarDados(min) {
      let max = 6; // maximo de lados de dados
      let totalDados = this.NDadosAtributo + this.NDeDadosExtra;
      await this.vaciarArray(); // vaciamos el array de resultados
      for (let i = 0; i < totalDados; i++) {
        // un bucle normal
        this.resultado = Math.floor(Math.random() * (min, max)) + min;
        console.log(this.resultado);
        this.resultados.push(this.resultado); // en cada vuelta metemos el resultado ene l array
      }
    },
    vaciarArray: function () {
      this.resultados = []; // vaciamos el array de resultado
      this.sumaResultado = 0;
    },
// CAMBIAR VISTAS
    cambiarVista(ValueCambiarVista) {
      this.$emit("cambiarVistaHijo", ValueCambiarVista);
    }, // end cambiaVista
  },
  computed: {
    SumaDetodo: function () {
      for (let i = 0; i < this.resultados.length; i++) {
        this.sumaResultado += this.resultados[i];
      }
    },
  },
};
</script>

<style scoped>

.allWindow {
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}

.damageV25 {background-image: url("@/assets/img/EfectoVida&Cordura/vida/damageVida25.png");}
.damageV50 {background-image: url("@/assets/img/EfectoVida&Cordura/vida/damageVida50.png");}
.damageV75 {background-image: url("@/assets/img/EfectoVida&Cordura/vida/damageVida75.png");}
.damageV90 {background-image: url("@/assets/img/EfectoVida&Cordura/vida/damageVida90.png");}

.damageC25 {background-image: url("@/assets/img/EfectoVida&Cordura/cordura/damageCordura25.png");}
.damageC50 {background-image: url("@/assets/img/EfectoVida&Cordura/cordura/damageCordura50.png");}
.damageC75 {background-image: url("@/assets/img/EfectoVida&Cordura/cordura/damageCordura75.png");}
.damageC90 {background-image: url("@/assets/img/EfectoVida&Cordura/cordura/damageCordura90.png");}
</style>s