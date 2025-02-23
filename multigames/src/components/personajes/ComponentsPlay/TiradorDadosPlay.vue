<template>
  <section>
    <p class="title has-text-centered has-text-white">{{ textoInterfaz.titulo }}</p>
    <!-- Atributos -->
    <div class="columns is-mobile has-text-centered"> 
      <div class="column p-1 mx-2 ml-4 boton" :class="{'active has-text-white': activeButton === 1 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.saber) && (setActiveButton(1))">
        <p><i class="fa-2x fas fa-book-open"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.saber }}</p>
        <p>{{ textoInterfaz.atributos.saber }}</p>
      </div>

      <div class="column p-1 mx-2" :class="{'active has-text-white': activeButton === 2 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.influencia, setActiveButton(2))">
        <p><i class="fa-2x fas fa-handshake"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.influencia }}</p>
        <p>{{ textoInterfaz.atributos.influencia }}</p>
      </div>

      <div class="column p-1 mx-2" :class="{'active has-text-white': activeButton === 3 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.observacion), setActiveButton(3)">
        <p><i class="fa-2x fas fa-eye"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.observacion }}</p>
        <p>{{ textoInterfaz.atributos.observacion }}</p>
      </div>

      <div class="column p-1 mx-2" :class="{'active has-text-white': activeButton === 4 }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.fuerza), setActiveButton(4)">
        <p><i class="fa-2x fas fa-fist-raised"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.fuerza }}</p>
        <p>{{ textoInterfaz.atributos.fuerza }}</p>
      </div>

      <div class="column p-1 mx-2 mr-4" :class="{'active has-text-white': (activeButton === 5) }" @click="(this.NDadosAtributo = this.$store.state.datosPJactual.voluntad), setActiveButton(5)">
        <p><i class="fa-2x fab fa-hornbill"></i></p>
        <p class="contadorAtributos has-text-weight-bold title is-4 mb-0">{{ this.$store.state.datosPJactual.voluntad }}</p>
        <p>{{ textoInterfaz.atributos.voluntad }}</p>
      </div>
    </div>

    <!-- Dados extras -->
    <div class="columns is-mobile has-text-white px-2">
      <p class="column has-text-centered mt-5">{{ textoInterfaz.totalDados }} : {{ this.NDeDadosExtra + this.NDadosAtributo }}</p>
      <div class="column">
        <p class="has-text-centered mb-3">{{ textoInterfaz.dadosExtras }}</p>
        <div class="columns is-mobile">
          <button class="column p-0 ml-5 my-2" @click="NDeDadosExtra--">-</button>
          <input class="column p-0 py-2 mx-2 has-text-centered" type="text" size="7" v-model="NDeDadosExtra">
          <button class="column p-0 mr-5 my-2" @click="NDeDadosExtra++">+</button>
        </div>
      </div>
    </div>

    <!-- Lanzador -->
    <div class="has-text-centered">
      <button @click="tirarDados(1)" class="button is-success is-active">{{ textoInterfaz.botonTirar }}</button>
    </div>

    <br>
    
    <!-- Resultados -->
    <div class="resultados mx-2">
      <h1 class="title has-text-centered has-text-white is-3 mb-2"> {{ textoInterfaz.resultados }} </h1>
      <div id="resultados-css" class="container">
        <!-- Aqui pintamos todos los resultados, OJO!! enseñamos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
        <div v-for="item in resultados" :key="item">
          <!-- SI OPCIONES AVANZADAS -->
          <p v-if=" (item == this.$store.state.AvAcierto) | (item == this.$store.state.AvAcierto2) | (item == this.$store.state.AvAcierto3)" class="acierto resultado-css has-text-white" > {{ item }} </p>
          <p v-else-if=" (item == this.$store.state.AvFatal) | (item == this.$store.state.AvFatal2) | (item == this.$store.state.AvFatal3) " class="fatal resultado-css has-text-white" > {{ item }} </p>
          <p v-else class="resultado-css has-text-white"> {{ item }} </p>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "TiraDados",
  data(){
    return{
      //Atributo activado
      activeButton: null,
    // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,
      resultados: [1, 6, 5, 4],
      sumaResultado: 0,

      textoInterfaz: {
        titulo: "",
        totalDados: "",
        dadosExtras: "",
        botonTirar: "",
        resultados: "",
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
      this.activeButton = button;
    },
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

    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Dados de Atributos";
        this.textoInterfaz.totalDados = "Total de dados";
        this.textoInterfaz.dadosExtras = "Dados Extras";
        this.textoInterfaz.botonTirar = "TIRAR!";
        this.textoInterfaz.resultados = "RESULTADOS";

        this.textoInterfaz.atributos.saber = "Saber";
        this.textoInterfaz.atributos.influencia = "Infl.";
        this.textoInterfaz.atributos.observacion = "Observ.";
        this.textoInterfaz.atributos.fuerza = "Fuer.";
        this.textoInterfaz.atributos.voluntad = "Voluntad";
      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.titulo = "Attribute Dice";
        this.textoInterfaz.totalDados = "Total dice";
        this.textoInterfaz.dadosExtras = "Extra dice";
        this.textoInterfaz.botonTirar = "THROW!";
        this.textoInterfaz.resultados = "RESULTS";

        this.textoInterfaz.atributos.saber = "Know.";
        this.textoInterfaz.atributos.influencia = "Infl.";
        this.textoInterfaz.atributos.observacion = "Obser.";
        this.textoInterfaz.atributos.fuerza = "Stre.";
        this.textoInterfaz.atributos.voluntad = "Will";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
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
  border: solid #1eff00;
  box-shadow: 0 0 20px #1eff00;
}

.fatal {
  border: solid red ;
  box-shadow: 0 0 20px red;
}
</style>