<template>
<div class="container allWindow">
        
        <!-- IMG -->
        <section class="hero is-small helperImgPjs" :class="[datosPJactual.imgPersonaje]">
          <div class="hero-body columns is-vcentered is-mobile p-0 pt-6 mt-5 pb-0">

            <div class="column is-2 pl-5 p-0 has-text-grey-lighter" @click="cambiarVista(true)"><i class="fa-2x fas fa-arrow-alt-circle-left"></i></div>

            <div class="column">
              <h1 class="title titleDecoration is-4 pt-3 mb-0">
                {{ this.datosPJactual.nombrePJ }}
              </h1>
              <p class="has-background-grey-dark has-text-light has-text-centered">{{this.datosPJactual.posicion}}</p>
            </div>

            <router-link class="column is-2 pl-2" to="/"><div class="has-text-grey-lighter"><i class="fa-2x fas fa-home"></i></div></router-link>
          </div>
        </section> 

        <!-- ESTADOS -->
        <div class="columns is-mobile mt-0 is-centered">
          <h2 v-if="PactoSiniestro" @click="modalPacto = true" class="column is-4 has-background-danger has-text-centered has-text-light p-1 ">Pacto siniestro</h2>
          <h2 v-if="EstadoMaldito" class="column is-4 has-background-warning-dark has-text-centered has-text-light p-1 ">Maldito</h2>
          <h2 v-if="EstadoBendecido" class="column is-4 has-background-info has-text-centered has-text-light p-1 ">Bendecido</h2>
        </div>

        <!-- MODAL PACTO SINIESTRO -->
        <div v-if="modalPacto" class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-body hero is-large has-background-danger-dark py-6" id="modalPactoSiniestro">
                <div class="hero-body py-6">
                  <div v-if="verResultadoPacto == false">
                    <h1 class="title is-1 has-text-centered has-text-grey-lighter titlePactosiniestro">Hora de saldar tu deuda?</h1>
                    <button @click="tirarPacto(1), verResultadoPacto = true" class="button is-danger is-medium is-fullwidth">Tirar</button>
                    <div class="columns is-mobile m-1 ml-0">
                      <p class="column"></p>
                      <button @click="modalPacto = false , this.ResultadoPacto = null" class="button column is-3 is-link p-1">Aun no</button>
                    </div>
                  </div>
                  
                  <div v-if="verResultadoPacto" >
                    <p class="title is-1 has-text-centered has-text-white mt-2 resultadoPactosiniestro">{{ResultadoPacto}}</p>
                    <p v-if="ResultadoPacto == 1" class="subtitle is-3 titlePactosiniestro has-text-white">Dale la vuelta a la carta y cumple con tu destino!</p>
                    <p v-else class="subtitle is-3 titlePactosiniestro has-text-white">La proxima vez no tendrás tanta suerte ...</p>
                    <button v-if="ResultadoPacto == 1" @click="modalPacto = false , ResultadoPacto = null, verResultadoPacto = false, PactoSiniestro = false" class="button column is-3 is-link p-1">Volver y quitar pacto siniestro</button>
                    <button v-else @click="modalPacto = false , ResultadoPacto = null, verResultadoPacto = false " class="button column is-3 is-link p-1">Volver</button>
                  </div>
                </div>
                
              </section>
            </div>
          </div>
        </div>

        <!-- VIDA Y CORDURA -->
        <div class="columns is-mobile pt-2">
          <!-- VIDA -->
          <div class="column">
            <p class="has-text-danger has-text-centered"><i class="fa-5x fas fa-heartbeat"></i></p>
            <p class="contadorVidaCordura has-text-centered title is-3 mb-0">{{ this.datosPJactual.vida }}</p>
            <!-- botones + - -->
            <div class="columns is-mobile pb-2">
              <div class="column ml-4 pt-0">
                <button class="button is-danger" @click="datosPJactual.vida--">-</button>
              </div>

              <div class="column ml-3 pt-0">
                <button class="button is-success" @click="datosPJactual.vida++">+</button>
              </div>
            </div>
          </div><!-- end VIDA -->
          
          <!-- CORDURA -->
          <div class="column">
            <p class="has-text-info has-text-centered"><i class="fa-5x fas fa-brain"></i></p>
            <p class="contadorVidaCordura has-text-centered title is-3 mb-0">{{ this.datosPJactual.cordura }}</p>
            <!-- botones + - -->
            <div class="columns is-mobile pb-2">
              <div class="column ml-4 pt-0">
                <button class="button is-danger" @click="datosPJactual.cordura--">-</button>
              </div>

              <div class="column ml-3 pt-0">
                <button class="button is-success" @click="datosPJactual.cordura++">+</button>
              </div>
            </div>
          </div><!-- end CORDURA -->
        </div><!-- END VIDA Y CORDURA -->
        
        <!-- ATRIBUTOS -->
        <div class="columns is-mobile" id="botonesAtributos">
          <button class="column helpermaxheigth p-1 mx-2 ml-4 botonesAtributos" @click="this.NDadosAtributo = this.datosPJactual.saber">
            <p class="has-text-purple"><i class="fa-3x fas fa-book-open"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.datosPJactual.saber }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2" @click="this.NDadosAtributo = this.datosPJactual.influencia">
            <p class="has-text-orange"><i class="fa-3x fas fa-handshake"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.datosPJactual.influencia }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2" @click="this.NDadosAtributo = this.datosPJactual.observacion">
            <p class="has-text-primary"><i class="fa-3x fas fa-eye"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.datosPJactual.observacion }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2" @click="this.NDadosAtributo = this.datosPJactual.fuerza">
            <p class="has-text-danger"><i class="fa-3x fas fa-fist-raised"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.datosPJactual.fuerza }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2 mr-4" @click="this.NDadosAtributo = this.datosPJactual.voluntad">
            <p class="has-text-info"><i class="fa-3x fab fa-hornbill"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.datosPJactual.voluntad }}</p>
          </button>
        </div><!-- end ATRIBUTOS -->

        <div><!-- Dados Extras -->
          <p class="has-text-centered has-text-white">Dados extras</p>
          <div class="columns is-mobile mt-2 px-6">
            <button @click="NDeDadosExtra--" class="column py-2 px-4 mr-3">-</button>
            <input type="number" v-model="NDeDadosExtra" class="column py-2 px-2 px-2" />
            <button @click="NDeDadosExtra++" class="column py-2 px-4 ml-3">+</button>
          </div>
        </div><!-- end Dados Extras -->

        <!-- BOTON DE LANZAR DADOS y MAS OPCIONES -->
        <!-- Aqui indicamos ya el minimo del resultado que debe salir y el maximo lo indicamos con "NDeLados" -->
        <div class="columns is-mobile mt-3">
          <div class="column is-4"><p class="subtitle has-text-white is-6 is-italic px-2">Total de dados: {{this.NDeDadosExtra + this.NDadosAtributo}}</p></div>
          <div class="column">
            <button @click="tirarDados(1)" class="button is-success is-active">TIRAR!</button>
            </div>
          <div class="column mr-3">
            <!-- BOTON DE MAS OPCIONES -->
            <button v-if="masOpciones == false" @click="masOpciones = !masOpciones" class="button is-warning"> + opciones + </button>
            <button v-if="masOpciones == true" @click="masOpciones = !masOpciones" class="button is-warning" > - opciones - </button>
          </div>
        </div>

        <!-- AVANZADO -->
        <Transition>
          <div v-show="masOpciones" class=" has-background-white p-2 mt-2 pt-0">
            <h3 class="has-text-centered has-background-warning has-text-grey-darker mb-2">Avanzado</h3>

            <button @click="PactoSiniestro = !PactoSiniestro" class="checkbox mr-4 has-text-danger button">Pacto siniestro</button>
            <button @click="Maldito()" class="checkbox mr-4 has-text-warning-dark button">Maldito</button>
            <button @click="Bendecido()" class="checkbox has-text-info button">Bendecido</button>

            <div class="columns is-mobile mt-2">
              <div class="column">
                <h4 class="has-text-centered">Fatal</h4>
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal" placeholder="Fatal" >
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal2" placeholder="Fatal">
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal3" placeholder="Fatal">
              </div>
              <div class="column">
                <h4>Acierto</h4>
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto" placeholder="Acierto">
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto2" placeholder="Acierto">
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto3" placeholder="Acierto">
              </div>
            </div>

            <div v-if="masOpciones" class="p-2">
              <h1 class="title">Suma total: {{ SumaDetodo }}{{ this.sumaResultado }}</h1>
            </div>
          </div>
        </Transition>
        
        <!-- RESULTADOS -->
        <div class="resultados mx-2">
          <h1 class="title has-text-centered has-text-white is-3 mb-2">RESULTADOS</h1>
          <div id="resultados-css" class="container">
            <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
            <div v-for="item in resultados" :key="item">
              <!-- SI OPCIONES AVANZADAS -->
                <p v-if="(item == AvAcierto) |(item == AvAcierto2) |(item == AvAcierto3)" class="acierto resultado-css has-text-white">{{ item }}</p>
                <p v-else-if="(item == AvFatal) | (item == AvFatal2) | (item == AvFatal3)" class="fatal resultado-css has-text-white">{{ item }}</p>
                <p v-else class="resultado-css has-text-white">{{ item }}</p>
            </div>
          </div>
        </div>
      </div><!-- end card - container -->
  
</template>

<script>
export default {
  name: 'Playcomponent',
  props: ['datosPJactual'],

  data(){
    return{
      // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,
      resultados: [1, 6, 5, 4],
      sumaResultado: 0,

      masOpciones: false,
      // estados
      EstadoBendecido: false,
      EstadoMaldito: false,
      // pacto siniestro
      modalPacto:false,
      PactoSiniestro:false,
      verResultadoPacto: false,
      ResultadoPacto: null,
      // aciertos fatal
      AvAcierto: 6,
      AvAcierto2: 5,
      AvAcierto3: null,
      AvFatal: 1,
      AvFatal2: null,
      AvFatal3: null,

    }
  },
  methods:{
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
    Bendecido(){
      this.EstadoBendecido = !this.EstadoBendecido
      if (this.EstadoBendecido == true) {
        this.AvAcierto2 = 5;
        this.AvAcierto3 = 4
      } else {
        this.AvAcierto3 = null
      }
    },
    Maldito(){
      this.EstadoMaldito = !this.EstadoMaldito
      if (this.EstadoMaldito == true) {
        this.AvAcierto2 = null;
        this.AvAcierto3 = null
      }else {
        this.AvAcierto2 = 5
      }
    },
    tirarPacto(min){
      let max = 6; // maximo de lados de dados
      this.ResultadoPacto = Math.floor(Math.random() * (min, max)) + min;
      console.log(this.ResultadoPacto);
    },
    vaciarArray: function () {
      this.resultados = []; // vaciamos el array de resultado
      this.sumaResultado = 0;
    },
    cambiarVista(ValueCambiarVista){
      this.$emit('cambiarVistaHijo', ValueCambiarVista)
    } // end cambiaVista
  },

  computed: {
    SumaDetodo: function () {
      for (let i = 0; i < this.resultados.length; i++) {
        this.sumaResultado += this.resultados[i];
      }
    },
  },
}
</script>

<style>

</style>