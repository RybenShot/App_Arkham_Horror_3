<template>
  <div class="container allWindow" :class="[BGVida]" >
    <div class="allWindow" :class="[BGCordura]">
    <!-- IMG -->
    <section class="hero is-small helperImgPjs" :class="[datosPJactual.imgPersonaje]">
      <div class="hero-body columns is-vcentered is-mobile p-0 pt-6 mt-5 pb-0">
        <div class="column is-2 pl-5 p-0 has-text-grey-lighter" @click="cambiarVista(true)"><i class="fa-2x fas fa-arrow-alt-circle-left"></i>
        </div>

        <div class="column">
          <h1 class="title titleDecoration is-4 pt-3 mb-0"> {{ this.datosPJactual.nombrePJ }}</h1>
          <p class="has-background-grey-dark has-text-light has-text-centered">{{ this.datosPJactual.posicion }}</p>
        </div>

        <router-link class="column is-2 pl-2" to="/"><div class="has-text-grey-lighter"><i class="fa-2x fas fa-home"></i></div></router-link>
      </div>
    </section>

    <!-- ESTADOS -->
    <div class="columns is-mobile mt-0 is-centered">
      <h2 v-if="PactoSiniestro" @click="modalPacto = true" class="column is-4 has-background-danger has-text-centered has-text-light p-1">Pacto siniestro</h2>
      <h2 v-if="EstadoMaldito" @click="modalMaldito = true" class=" column is-4 has-background-warning-dark has-text-centered has-text-light p-1" >Maldito</h2>
      <h2 v-if="EstadoBendito" @click="modalBendito = true" class=" column is-4 has-background-info has-text-centered has-text-light p-1" > Bendecido </h2>
    </div>

    <!-- MODAL PACTO SINIESTRO -->
    <div v-if="modalPacto" class="modal is-active">
      <div class="modal-background"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="modal-card-head BGPactoSiniestro">
              <p class="modal-card-title has-text-light">Pacto Siniestro</p>
          </header>

          <section class="modal-card-body "  >
            <div class="hero-body py-3">

              <div v-if="verResultadoPacto == false">
                <p class="has-text-centered">Retribución -- Tira un dado. Si sacas un 1</p>
                <h1 class=" title has-text-centered titlePactosiniestro ">¿Hora de saldar tu deuda? </h1>
              </div>

              <div v-if="verResultadoPacto">
                <p class=" title is-1 has-text-centered resultadoPactosiniestro"> {{ ResultadoPacto }} </p>
                <p v-if="ResultadoPacto == 1" class="subtitle is-3 titlePactosiniestro"> Dale la vuelta a la carta y cumple con tu destino! </p>
                <p v-else class="subtitle is-3 titlePactosiniestro"> La próxima vez no tendrás tanta suerte ... </p>
              </div>

            </div>
          </section>

          <footer class="modal-card-foot">

            <div v-if="verResultadoPacto == false" class="columns is-mobile">
              <button @click="tirarPacto(1), (verResultadoPacto = true)" class="button is-danger is-fullwidth is-12 column"> Tirar </button>
              <button @click="(modalPacto = false), (this.ResultadoPacto = null)" class="button is-link is-fullwidth is-12 column"> Aun no </button>
            </div>

            <div v-if="verResultadoPacto">
              <div class="columns is-mobile">
                <button v-if="ResultadoPacto == 1" @click=" (modalPacto = false), (ResultadoPacto = null), (verResultadoPacto = false), (PactoSiniestro = false)" class="button is-fullwidth is-12 is-link column" > Volver y quitar pacto siniestro </button>
                <button v-else @click=" (modalPacto = false), (ResultadoPacto = null), (verResultadoPacto = false)" class="button is-fullwidth is-12 is-link column"> Volver </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>

    <!-- MODAL MALDITO -->
    <div v-if="modalMaldito">
      <EstadoMaldicion
      @cerrarModalHijoMaldicion = "cambioVistaModalMaldicion"/>
    </div>

    <!-- MODAL BENDITO -->
    <div v-if="modalBendito" >
      <EstadoBendicion
      @cerrarModalHijoBendicion = "cambioVistaModalBendicion"/>
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
      <p class="has-text-centered has-text-white">Dados extras</p>
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
        <p class="subtitle has-text-white is-6 is-italic px-2">Total de dados: {{ this.NDeDadosExtra + this.NDadosAtributo }}</p>
      </div>
      <div class="column">
        <button @click="tirarDados(1)" class="button is-success is-active">TIRAR!</button>
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
        <h3 class=" has-text-centered has-background-warning has-text-grey-darker mb-2 ">Avanzado</h3>

        <button @click="PactoSiniestro = !PactoSiniestro" class="checkbox mr-4 has-text-danger button">Pacto siniestro</button>
        <button @click="Maldito()" class="checkbox mr-4 has-text-warning-dark button">Maldito</button>
        <button @click="Bendecido()" class="checkbox has-text-info button">Bendecido</button>

        <div class="columns is-mobile mt-2">
          <div class="column">
            <h4 class="has-text-centered">Fatal</h4>
            <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal" placeholder="Fatal"/>
            <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal2" placeholder="Fatal"/>
            <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal3" placeholder="Fatal"/>
          </div>
          <div class="column">
            <h4>Acierto</h4>
            <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto" placeholder="Acierto"/>
            <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto2" placeholder="Acierto"/>
            <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto3" placeholder="Acierto" />
          </div>
        </div>

        <div v-if="masOpciones" class="p-2">
          <h1 class="title"> Suma total: {{ SumaDetodo }}{{ this.sumaResultado }} </h1>
        </div>
      </div>
    </Transition>

    <!-- RESULTADOS -->
    <div class="resultados mx-2">
      <h1 class="title has-text-centered has-text-white is-3 mb-2"> RESULTADOS </h1>
      <div id="resultados-css" class="container">
        <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
        <div v-for="item in resultados" :key="item">
          <!-- SI OPCIONES AVANZADAS -->
          <p v-if=" (item == AvAcierto) | (item == AvAcierto2) | (item == AvAcierto3)" class="acierto resultado-css has-text-white has-background-dark" > {{ item }} </p>
          <p v-else-if=" (item == AvFatal) | (item == AvFatal2) | (item == AvFatal3) " class="fatal resultado-css has-text-white has-background-dark" > {{ item }} </p>
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
export default {
  name: "Playcomponent",
  components:{
    EstadoMaldicion,
    EstadoBendicion
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
      // estados
      EstadoBendito: false,
      EstadoMaldito: false,

      // MODALS
      // pacto siniestro
      modalPacto: false,
      PactoSiniestro: false,
      verResultadoPacto: false,
      ResultadoPacto: null,
      // Maldito
      modalMaldito: false,
      // Bendito
      modalBendito: false,

      // aciertos - fatal
      AvAcierto: 6,
      AvAcierto2: 5,
      AvAcierto3: null,
      AvFatal: 1,
      AvFatal2: null,
      AvFatal3: null,

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
    Bendecido() {
      this.EstadoBendito = !this.EstadoBendito;
      if (this.EstadoBendito == true) {
        this.AvAcierto2 = 5;
        this.AvAcierto3 = 4;
      } else {
        this.AvAcierto3 = null;
      }
    },
    Maldito() {
      this.EstadoMaldito = !this.EstadoMaldito;
      if (this.EstadoMaldito == true) {
        this.AvAcierto2 = null;
        this.AvAcierto3 = null;
      } else {
        this.AvAcierto2 = 5;
      }
    },
    tirarPacto(min) {
      let max = 6; // maximo de lados de dados
      this.ResultadoPacto = Math.floor(Math.random() * (min, max)) + min;
      console.log(this.ResultadoPacto);
    },
    vaciarArray: function () {
      this.resultados = []; // vaciamos el array de resultado
      this.sumaResultado = 0;
    },

// CAMBIAR VISTAS
    cambiarVista(ValueCambiarVista) {
      this.$emit("cambiarVistaHijo", ValueCambiarVista);
    }, // end cambiaVista
    cambioVistaModalMaldicion(valueVistaModalMaldicion){
      this.modalMaldito = valueVistaModalMaldicion
    },
    cambioVistaModalBendicion(valueVistaModalBendicion){
      this.modalBendito = valueVistaModalBendicion
    }     
  },

  computed: {
    SumaDetodo: function () {
      for (let i = 0; i < this.resultados.length; i++) {
        this.sumaResultado += this.resultados[i];
      }
    },
  },
  whatch: {
    vida() {},
  },
};
</script>

<style scoped>
.BGPactoSiniestro{
  background-image: url(@/assets/img/Estados/PactoSiniestro.jpg);
  background-position: center;
  background-size: cover;
}

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