<template>
  <section class="px-2" data-tour="tiradas-atributos-general">
    <div class="my-3 has-text-centered ">
      <p class="title mb-0 has-text-white">{{ textoInterfaz.titulo }}</p>
    </div>
    
    <!-- Atributos -->

    <div class="columns is-mobile has-text-centered px-2" data-tour="tiradas-atributos">
      <div class="column p-1 mx-2 ml-4 boton" :class="{'color-saber': activeButton === 1 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.atributes.lore) && (setActiveButton(1))">
        <p><i class="fa-2x fas fa-book-open"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.atributes.lore }}</p>
      </div>

      <div class="column p-1 mx-2" :class="{'color-influencia': activeButton === 2 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.atributes.influence, setActiveButton(2))">
        <p><i class="fa-2x fas fa-handshake"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.atributes.influence }}</p>
      </div>

      <div class="column p-1 mx-2" :class="{'color-observacion': activeButton === 3 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.atributes.observation), setActiveButton(3)">
        <p><i class="fa-2x fas fa-eye"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.atributes.observation }}</p>
      </div>

      <div class="column p-1 mx-2" :class="{'color-fuerza': activeButton === 4 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.atributes.strength), setActiveButton(4)">
        <p><i class="fa-2x fas fa-fist-raised"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.atributes.strength }}</p>
      </div>

      <div class="column p-1 mx-2 mr-4" :class="{'color-voluntad': (activeButton === 5) }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.atributes.will), setActiveButton(5)">
        <p><i class="fa-2x fab fa-hornbill"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.atributes.will }}</p>
      </div>
    </div>

    <!-- Dados extras -->
    <div class="columns is-mobile is-vcentered mb-0">

      <!-- Concentracion -->
      <div class="column has-text-centered" data-tour="tiradas-concentracion">
        <p class="title is-5 has-text-white mb-0">Concentración</p>
        <hr class="m-0">
        <div class="has-text-white my-3 columns is-mobile mb-0">
          <p class="column p-0">Max: {{ $store.state.datosPJactual.focusLimit }}</p>
          <div class="column p-0">
            <!-- Mostrar fichas de concentración añadidas -->
            <span v-for="(ficha, index) in concentracionFichas" :key="index">
              <i :class="['fa-1x', ficha.icon, ficha.color, 'px-1']"></i>
            </span>
          </div>
        </div>
        <button class="button is-link is-active is-small mx-1" @click="modalConcentracionAbierto = true">Añadir</button>
        <button class="button is-link is-active is-small mx-1" @click="usarFichaConcentracionSimple">Usar 1</button>
      </div>

      <!-- Dadoz extras + lanzador -->
      <div class="column has-text-white px-2" data-tour="tiradas-lanzar">
        <p class="has-text-centered mb-3">{{ textoInterfaz.dadosExtras }}</p>
        <div class="columns is-mobile mb-0">
          <button class="column p-1 ml-5 my-2 is-size-4" @click="NDeDadosExtra--"><strong>-</strong></button>
          <input class="column p-0 mx-2 has-text-centered" type="text" size="7" v-model="NDeDadosExtra">
          <button class="column p-1 mr-5 my-2 is-size-4" @click="NDeDadosExtra++"><strong>+</strong></button>
        </div>
        <p class="has-text-centered">{{ textoInterfaz.totalDados }} : {{ this.NDeDadosExtra + this.NDadosAtributo }}</p>
         <!-- Lanzador -->
        <div class="column has-text-centered p-0">
          <button @click="tirarDados()" class="button is-success is-active is-fullwidth"><strong>{{ textoInterfaz.botonTirar }}</strong></button>
        </div>
      </div>

    </div>
    
    <!-- Lanzador de dados a pantalla completa: sin tapete, el área de choque es la propia pantalla -->
    <teleport to="body">
      <transition name="dice-overlay-fade">
        <div v-if="rollingFullscreen" class="dice-fullscreen-overlay">
          <DiceRollerCanvas
            ref="diceRollerFullscreen"
            :count="NDadosTotal"
            :success-threshold="successThreshold"
            @settled="handleDiceSettled"
          />
        </div>
      </transition>
    </teleport>

    <!-- Resultados: aparecen uno a uno tras cerrarse el lanzador -->
    <div v-if="resultadosVisibles.length" class="resultados mx-2">
      <hr class="my-1">
      <transition-group name="dado-pop" tag="div" class="columns is-mobile is-multiline is-centered">
        <div v-for="(valor, idx) in resultadosVisibles" :key="idx" class="column is-narrow">
          <div class="resultado-tile" :class="{ acierto: esExito(valor), fatal: valor === 1 }">
            <i class="fas" :class="iconoDado(valor)"></i>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Modal para Concentración -->
    <div v-if="modalConcentracionAbierto" class="modal is-active">
      <div class="modal-background" @click="modalConcentracionAbierto = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Concentrarse</p>
          <button class="delete" @click="modalConcentracionAbierto = false"></button>
        </header>
        <section class="modal-card-body ">
          <div class="buttons is-centered">
            <button v-for="tipo in tiposConcentracion" :key="tipo.tipo" @click="agregarConcentracion(tipo)" :class="['button', tipo.color]">
              <i :class="tipo.icon" class="px-1"></i> 
              <p>{{ tipo.tipo }} </p>
            </button>
          </div>
        </section>
      </div>
    </div>

  </section>
</template>

<script>
import DiceRollerCanvas from "./diceRoller/DiceRollerCanvas.vue";
import { apiService } from '@/services/api.js';

// Iconos de Font Awesome para cada valor del dado en la zona de resultados
// (siempre el dado "normal" de FA, independiente del diseño elegido en Ajustes)
const ICONOS_DADO = {
  1: "fa-dice-one",
  2: "fa-dice-two",
  3: "fa-dice-three",
  4: "fa-dice-four",
  5: "fa-dice-five",
  6: "fa-dice-six"
};

export default {
  name: "TiraDados",
  components: { DiceRollerCanvas },
  data(){
    return{
      //Atributo activado
      activeButton: null,
    // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,
      resultados: [],
      resultadosVisibles: [],
      rollingFullscreen: false,
      sumaResultado: 0,

      modalConcentracionAbierto: false,
      tiposConcentracion: [
        { tipo: 'saber', icon: 'fas fa-book-open', color: 'color-saber' },
        { tipo: 'influencia', icon: 'fas fa-handshake', color: 'color-influencia' },
        { tipo: 'observacion', icon: 'fas fa-eye', color: 'color-observacion' },
        { tipo: 'fuerza', icon: 'fas fa-fist-raised', color: 'color-fuerza' },
        { tipo: 'voluntad', icon: 'fab fa-hornbill', color: 'color-voluntad' }
      ],

      textoInterfaz: {
        titulo: "",
        totalDados: "",
        dadosExtras: "",
        botonTirar: "",
        atributos: {
          saber: "",
          influencia: "",
          observacion: "",
          fuerza: "",
          voluntad: ""
        }
        
      }
    }
  },
  methods:{
  //Atributo activo
  setActiveButton(button) {
    this.NDeDadosExtra = 0;
    this.activeButton = button;
  },
  // Funcion encargada de escribir el modal de notificacion popUP para bendicion y maldicion por ahora
  writeNotification(pjState){
    if (pjState == "bendicion") {
      if (this.$store.state.lenguaje == "español") {
        this.$store.state.NotificacionTexto.title =  "Has perdido la Bendición";
        this.$store.state.NotificacionTexto.texto1 =  "Al no haber sacado ningun acierto, piertes la Bendición.";
      } else if (this.$store.state.lenguaje == "ingles") {
        this.$store.state.NotificacionTexto.title =  "You have lost the Blessing.";
        this.$store.state.NotificacionTexto.texto1 =  "As you didn't roll any success, you lose the Blessing.";
      }
    } 
    else if (pjState == "maldicion") {
      if (this.$store.state.lenguaje == "español") {
        this.$store.state.NotificacionTexto.title =  "Has perdido la Maldición";
        this.$store.state.NotificacionTexto.texto1 =  "Al haber sacado un acierto, piertes la Maldición.";
      } else if (this.$store.state.lenguaje == "ingles") {
        this.$store.state.NotificacionTexto.title =  "You have lost the Curse.";        
        this.$store.state.NotificacionTexto.texto1 =  "As you rolled a success, you lose the Curse.";
      }
    }
  },
  // comprobador de perdida de bendicion o maldicion por la tirada
  comprobarResultado(){
    if (this.$store.state.EstadoBendicion == true) {
      if (!this.resultados.includes(4) && !this.resultados.includes(5) && !this.resultados.includes(6)) {
        this.writeNotification("bendicion")
        this.$store.state.ModalPopUp_Notificaciones = true
        this.$store.state.EstadoBendicion = false;
      }
    } else if (this.$store.state.EstadoMaldito == true) {
      if (this.resultados.includes(6)) {
        this.writeNotification("maldicion")
        this.$store.state.ModalPopUp_Notificaciones = true
        this.$store.state.EstadoMaldito = false;
      }
    }
  },
// TIRADA DE DADOS
    async tirarDados() {
      if (this.NDadosTotal <= 0) return;
      this.resultados = [];
      this.resultadosVisibles = [];
      this.rollingFullscreen = true;
      await this.$nextTick();
      this.$refs.diceRollerFullscreen.roll();
    },
    // Se dispara al asentarse todos los dados en el lanzador a pantalla completa.
    // Se dejan ver 2s los resultados y luego se cierra el lanzador, mostrando
    // los resultados uno a uno en la zona de resultados.
    handleDiceSettled(result) {
      this.resultados = result.values;
      setTimeout(() => {
        this.rollingFullscreen = false;
        this.mostrarResultadosUnoAUno(result.values);
        const tiempoRevelado = result.values.length * 140 + 300;
        setTimeout(() => { this.comprobarResultado(); }, tiempoRevelado);
      }, 2000);
    },
    mostrarResultadosUnoAUno(valores) {
      valores.forEach((valor, i) => {
        setTimeout(() => { this.resultadosVisibles.push(valor); }, i * 140);
      });
    },
    esExito(valor) {
      return valor >= this.successThreshold;
    },
    iconoDado(valor) {
      return ICONOS_DADO[valor];
    },
    vaciarArray: function () {
      this.resultados = [];
      this.resultadosVisibles = [];
      this.sumaResultado = 0;
    },

    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Atributos";
        this.textoInterfaz.totalDados = "Total de dados";
        this.textoInterfaz.dadosExtras = "Dados Extras";
        this.textoInterfaz.botonTirar = "TIRAR!";

        this.textoInterfaz.atributos.saber = "Saber";
        this.textoInterfaz.atributos.influencia = "Infl.";
        this.textoInterfaz.atributos.observacion = "Observ.";
        this.textoInterfaz.atributos.fuerza = "Fuer.";
        this.textoInterfaz.atributos.voluntad = "Voluntad";
      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.titulo = "Attribute";
        this.textoInterfaz.totalDados = "Total dice";
        this.textoInterfaz.dadosExtras = "Extra dice";
        this.textoInterfaz.botonTirar = "THROW!";

        this.textoInterfaz.atributos.saber = "Know.";
        this.textoInterfaz.atributos.influencia = "Infl.";
        this.textoInterfaz.atributos.observacion = "Obser.";
        this.textoInterfaz.atributos.fuerza = "Stre.";
        this.textoInterfaz.atributos.voluntad = "Will";
      }
    },
    agregarConcentracion(tipo) {
    // Dispara la acción y pasa la ficha seleccionada
    this.$store.dispatch('addConcentrationToken_Action', tipo);
    this.modalConcentracionAbierto = false;
  },
    // Método para usar 1 ficha de concentración:
    usarFichaConcentracionSimple() {
      if (this.concentracionFichas.length === 0) {
        alert("No hay fichas de concentración disponibles");
        return;
      }

      const resultado = Math.floor(Math.random() * 6) + 1;

      // Añadir el resultado al array de resultados
      this.vaciarArray(); 
      this.resultados.push(resultado);

      // Eliminar la primera ficha del array:
      this.$store.dispatch('removeConcentrationToken_Action');
    }
  },
  computed: {
    NDadosTotal() {
      return this.NDadosAtributo + this.NDeDadosExtra;
    },
    // Recupera las fichas desde Vuex usando el getter
    //! ESTA FUNCION SE USA COMO VARIABLE
    concentracionFichas() {
      return this.$store.getters.getConcentrationInPlay;
    },
    // Umbral de acierto vigente: 6 por defecto, 5 con la mejora de acierto,
    // 4 con la mejora superior (misma regla que antes usaba cada dado suelto)
    successThreshold() {
      if (this.$store.state.AvAcierto3) return 4;
      if (this.$store.state.AvAcierto2) return 5;
      return 6;
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
    // Cargamos las imágenes de dados personalizadas del usuario (si aún no se han cargado esta sesión)
    if (this.$store.state.IDUserHost && this.$store.state.diceImages.length === 0) {
      apiService.getDiceImages(this.$store.state.IDUserHost)
        .then(images => this.$store.commit('setDiceImages', images))
        .catch(() => {});
    }
  }
}
</script>

<style>
/* colores atributos */
.color-saber{color: #aa20e0 !important;}
.color-influencia{color: #e09320 !important;}
.color-observacion{color: #56e020 !important;}
.color-fuerza{color: #e02020 !important;}
.color-voluntad{color: #2083e0 !important;}

/* Atributo activo */
.active {
   border-bottom: solid 1px white;
}

.contadorAtributos{
  position: relative;
  top: -2.3vh;
  line-height: 0;
  -webkit-text-stroke: 1.5px #000000;
  font-family: Roboto Flex,sans-serif;
  color: aliceblue;
}
#resultados-css{
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 3vmin;
}

.resultado-css{
  padding: 3px;
  margin: 10px;
  text-align: center;
}

.acierto {
  border-radius: 20%;
  background-color: #000000;
  border: solid 0.5px #1eff00;
  box-shadow: 0 0 20px #1eff00;
}

.fatal {
  border: solid red ;
  box-shadow: 0 0 20px red;
}

/* Lanzador de dados a pantalla completa */
.dice-fullscreen-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  background: rgba(0, 0, 0, 0.88);
}
.dice-fullscreen-overlay > * {
  flex: 1;
}
.dice-overlay-fade-enter-active,
.dice-overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.dice-overlay-fade-enter-from,
.dice-overlay-fade-leave-to {
  opacity: 0;
}

/* Resultados: aparición uno a uno */
.resultado-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.6rem;
  color: #fff;
  background-color: #1a1a1a;
  border-radius: 90%;
  border: solid 0.1px rgba(255, 255, 255, 0.25);
}
.dado-pop-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.dado-pop-enter-from {
  opacity: 0;
  transform: scale(0.4) translateY(6px);
}
.dado-pop-move {
  transition: transform 0.35s ease;
}
</style>