<template>
  <div class="app">
    <div class="container">
      <br />

      <!-- FORMULARIO -->
      <div class="formulario">
        <div>
          <p>Numero de DADOS</p>
          <div>
            <button @click="NDeDados--" class="py-2 px-4 mr-3">-</button>
            <input type="number" v-model="NDeDados" class="py-2 px-2 px-2" />
            <button @click="NDeDados++" class="py-2 px-4 ml-3">+</button>
          </div>
        </div>

        <br />

        <!-- OPCIONES DE LADOS   -->
        <div class="">
          <div class="columns is-mobile">

            <div class="column">
              <p class="is-3"><i class="fas fa-dice"></i></p>
              <p>4 Lados</p>
              <input type="radio" v-model="NDeLados" class="mx-2" id="cuatro" value="4"/>
            </div>

            <div class="column">
              <p><i class="fas fa-dice-d6"></i></p>
              <p>6 Lados</p>
              <input type="radio" v-model="NDeLados" class="mx-2" id="seis" checked value="6"/>
            </div>

            <div class="column">
              <p><i class="fas fa-dice"></i></p>
              <p>8 Lados</p>
              <input type="radio" v-model="NDeLados" class="mx-2" id="ocho" value="8"/>
            </div>

            <div class="column">
              <p><i class="fas fa-dice"></i></p>
              <p>12 Lados</p>
              <input type="radio" v-model="NDeLados" class="mx-2" id="doce" value="12"/>
            </div>

            <div class="column">
              <p><i class="fas fa-dice-d20"></i></p>
              <p>20 Lados</p>
              <input type="radio" v-model="NDeLados" class="mx-2" id="veinte" value="20"/>
            </div>
          </div>
        </div>

        <!-- AVANZADO -->
        <Transition>
          <div v-show="masOpciones" class="card p-2 mt-2">
            <h3>Avanzado</h3>
            <dir class="columns is-mobile">
              <div class="column">
                <h4>Fatal</h4>
                <input class="p-2 inputs" type="number" v-model="AvFatal" placeholder="Fatal" >
                <input class="p-2 inputs" type="number" v-model="AvFatal2" placeholder="Fatal">
                <input class="p-2 inputs" type="number" v-model="AvFatal3" placeholder="Fatal">
              </div>
              <div class="column">
                <h4>Acierto</h4>
                <input class="p-2 inputs" type="number" v-model="AvAcierto" placeholder="Acierto">
                <input class="p-2 inputs" type="number" v-model="AvAcierto2" placeholder="Acierto">
                <input class="p-2 inputs" type="number" v-model="AvAcierto3" placeholder="Acierto">
              </div>
            </dir>
            
            
            
          </div>
        </Transition>
      </div>
      <br />

      <!-- BOTON DE LANZAR DADOS -->
      <!-- Aqui indicamos ya el minimo del resultado que debe salir y el maximo lo indicamos con "NDeLados" -->
      <button @click="tirarDados(1)" class="button is-success is-active mx-5">
        TIRAR!
      </button>

      <!-- BOTON DE MAS OPCIONES -->
      <button v-if="masOpciones == false" @click="masOpciones = !masOpciones" class="button is-warning"> Mas opciones </button>
      <button v-if="masOpciones == true" @click="masOpciones = !masOpciones" class="button is-warning" > Menos opciones </button>
    </div>

    <!-- RESULTADOS -->
    <br />
    <br />
    <div class="resultados mx-6">
      <h1 class="title is-3">RESULTADOS</h1>
      <div id="resultados-css" class="container">
        <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
        <div v-for="item in resultados" :key="item">

          <!-- SI OPCIONES AVANZADAS -->
          <div >
            <p v-if="(item == AvAcierto) | (item == AvAcierto2) | (item == AvAcierto3)" class="acierto resultado-css" >{{ item }}</p>
            <p v-else-if="(item == AvFatal) | (item == AvFatal2) | (item == AvFatal3)" class="fatal resultado-css">{{ item }}</p>
            <p v-else class="resultado-css">{{ item }}</p>
          </div>
          
        </div>
      </div>
      <br />
      <Transition>
        <div v-if="masOpciones" class="suma card p-2">
          <h1 class="title">Suma de todo</h1>
          <p class="subtitle">{{ SumaDetodo }}{{ this.sumaResultado }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "juego de Dados",
  data() {
    return {
      // Variables necesarias para ver CUANTOS DADOS y CANTAS CARAS necesitamos
      NDeLados: "6",
      NDeDados: "",
      resultados: [1, 6, 5, 3],
      sumaResultado: 0,
      masOpciones: false,

      AvAcierto: 6,
      AvAcierto2: 5,
      AvAcierto3: null,
      AvFatal: 1,
      AvFatal2: null,
      AvFatal3: null
    };
  },
  methods: {
    async tirarDados(min, max) {
      max = this.NDeLados; // declaramos el maximo (loindicado arriba en el formualrio)
      await this.vaciarArray(); // vaciamos el array de resultados
      for (let i = 0; i < this.NDeDados; i++) {
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
@import "./CssJuegoDados.css";

.acierto {
  background-color: rgb(0, 255, 0);
  border: 1mm ridge rgba(211, 220, 50, 0.6);
}
.fatal {
  background-color: rgb(255, 124, 124);
  border: 1mm ridge rgba(220, 50, 50, 0.6);
}

#resultados-css {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 3vmin;
}

.resultado-css {
  padding: 3px;
  margin: 10px;
  text-align: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.inputs{
  width: 60px ; 
  text-align: center
}
</style>
