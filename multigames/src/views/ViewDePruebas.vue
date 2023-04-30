<template>
  <div>
    <h1 class="has-text-white">Vamos a traducir textos!

      <div class="has-text-white">
        <p v-t="'home.io'"></p>
      </div>
      
      <button class="mr-2" @click="this.$store.state.lenguaje = 'ingles'">Ingles</button>
      <button @click="this.$store.state.lenguaje = 'español'">Español</button>
      <hr>

      <p class="pl-2" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.pruebas.lenguaje.español'"></p>
      <p class="pl-2" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.pruebas.lenguaje.ingles'"></p>

      <hr>
      <p class="has-text-white">{{this.$store.state.datosPJactual.nombrePJ}}</p>

      <router-link class="column is-2 pl-2" to="/PersonajesAHClasico"><div class="has-text-grey-lighter"><i class="fa-2x fas fa-home"></i></div></router-link>
         
      <p class="has-text-white">{{this.$store.state.datosPJactual}}</p>
      
    </h1>
  </div>
</template>

<script>
export default {
  name: "Pagina_De_Pruebas",
  data() {
    return {
      
    }; // end return
  }, // end data
}
</script>
