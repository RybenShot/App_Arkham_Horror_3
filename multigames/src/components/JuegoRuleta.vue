<template>
  <div class="container">
    <!-- FORMULARIO -->
    <div class="formulario" v-if="!inPlay">
      
      <div class="columns">
        <div class="column">
          <p>Numero de Jugadores</p>
          <input type="number" v-model="NDeJugadores" />
        </div>
        <div class="column">
          <p>Numero de Huecos</p>
          <input type="number" v-model="NDeHuecos" />
        </div>
      </div>

      <button @click="generarJugadores()">Generar Jugadores</button>
        <!-- NOMBRES PARA JUGADORES -->
          <div>
            <ul>
              <li v-for="jugador in arrayJugadores" :key="jugador">
            <li v-if="jugador.isAlive == true"> {{jugador.name}}</li>
            </li>
            </ul>
            
          </div>

      <!-- RECOMENDACION DE HUECOS -->
      <div>
        <h2>
          Segun el Numero de jugadores recomendamos
          {{ NDeJugadores * 2 }} huecos
        </h2>
      </div>

   
      <br />

      <!-- BOTON CARGAR -->
      <button @click="cargarPistola(1)" class="button is-danger is-active">
        CARGAR
      </button>
    </div>

    <hr />
    
    <!-- PARTE DE JUEGO -->
    <div class="Juego" v-if="inPlay">

      <!-- BOTON DE DISPARAR -->
      <button
        @click="disparar()"
        v-bind:disabled="descargada"
        class="button is-danger is-active"
      >
        DISPARAR
      </button>

      <!-- JUGADORES -->
      <div>
        <!-- Aqui el numero de jugadores dependiendo si estan vivos o no apareceran, USAREMOS el v-if por ejemplo
         imaginemos que manoli en "isAlive" = fasle Todos los demas apareceran PERO manoli no porque su condicion NO  se cumple porque ha muerto -->
        <ul v-for="jugador in arrayJugadores" :key="jugador">
          <li >
            <li list-style:none v-if="jugador.isAlive == true"> {{jugador.name}}</li>
          </li>
        </ul>

        <button @click="queEmpieceElJuego()"> que empiece el juego</button>
        <!-- <div title="pepito" v-if="(jugadores.isAlive)"></div>
        <div title="jose" v-if="isAlive">jose</div>
        <div title="Manoli" v-if="isAlive">AMnoli</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NDeJugadores: "",
      NDeHuecos: "",

      inPlay: false,

      balaEnPistola: "",
      pistola: "",
      descargada: true,

      arrayJugadores: [
        // { id: 1, name: "Pepito", isAlive: true },
        // { id: 2, name: "jose", isAlive: true },
        // { id: 3, name: "manoli", isAlive: false },
      ],
    };
  },
  methods: {
    generarJugadores: function (jugadores) {
      jugadores = this.NDeJugadores;
      console.log(`voy a generar ${jugadores} arrayJugadores`);

      for (let i = 0; i < jugadores; i++) {
        console.log(`Estoy crendo al jugador numero ${i}`);
        let nuevoJugador = { id: i, name: `player ${i}`, isAlive: true };
        // nuevoJugador.name = `player ${i}`;
        this.arrayJugadores.push(nuevoJugador);
      }
    },
    cargarPistola: function (min, max) {
      max = this.NDeHuecos;

      this.balaEnPistola = Math.floor(Math.random() * (max - min)) + min;
      console.log(
        `De ${this.NDeHuecos} huecos que hay, la bala esta en el ${this.balaEnPistola}`
      );
      this.descargada = false;
      this.inPlay = true;
      return this.balaEnPistola;
    },
    queEmpieceElJuego() {
      for (let i = 0; i < this.arrayJugadores.length; i++) {
        console.warn(`Se prepara el player ${i}`)
        this.pistola++;

        if (this.pistola == this.balaEnPistola) {
        console.error(
          `MUERTO. La pistola se ha disparado ${this.pistola} veces y la bala estaba en el disparo ${this.balaEnPistola} y el ${this.arrayJugadores[i].name} ha muerto`
        );
        this.pistola = "";
        this.descargada = true;
        this.inPlay = false;
        // this.arrayJugadores[i].isAlive = false
        this.arrayJugadores.splice(i, 1)
        break
      } else {
        console.log(`CLAK que siga el juego`);
      }
      }
    },

    disparar(i) {
      this.shot();
      this.comprovate(i);
    },

    shot: function shot() {
      this.pistola++;
      //  console.log(`CLACK!`)
      
    },
    comprovate: function (i) {
      if (this.pistola == this.balaEnPistola) {
        console.error(
          `MUERTO. La pistola se ha disparado ${this.pistola} veces y la bala estaba en el disparo ${this.balaEnPistola} y el player ${i} ha muerto`
        );
        this.pistola = "";
        this.descargada = true;
        this.inPlay = false;
      } else {
        console.log(`CLAK que siga el juego`);
      }
    },
  },




  compuded: {
    JugadoresVivos: function () {
      return this.arrayJugadores;
    },
  },
};
</script> 

<style>
</style>