<template>
  <section>
    <!-- Parte datos -->
    <div class="columns is-mobile">
      <div class="column image">
        <img class="is-rounded image image bordeImagen" :src="this.$store.state.datosPJactual.fotoUrl" alt="">
      </div>
      
      <div class="column has-text-white">
        <div>
          <p class="title is-2 has-text-weight-bold has-text-white mb-4">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
          <p class="has-background-dark subtitle is-6 has-text-white pl-2">{{ this.$store.state.datosPJactual.posicion }}</p>
        </div>

        <!-- Vida - Cordura -->
        <div class="columns is-mobile has-text-centered pt-2">
          <div class="column pb-1">
            <i class="fa-4x fas fa-heartbeat has-text-danger"></i>
            <p class="contadorVidaCordura title has-text-white">{{ this.$store.state.datosPJactual.vida }}</p>
            <div class="columns is-mobile">
              <button @click="this.$store.state.datosPJactual.vida --" class="column mx-2 button is-small p-0 is-danger">-</button>
              <button @click="this.$store.state.datosPJactual.vida ++" class="column mx-2 button is-small p-0 is-primary">+</button>
            </div>
          </div>
          <div class="column pb-0">
            <i class="has-text-info fa-4x fas fa-brain"></i>
            <p class="contadorVidaCordura title has-text-white">{{ this.$store.state.datosPJactual.cordura }}</p>
            <div class="columns is-mobile">
              <button @click="this.$store.state.datosPJactual.cordura --" class="column mx-2 button is-small p-0 is-danger">-</button>
              <button @click="this.$store.state.datosPJactual.cordura ++" class="column mx-2 button is-small p-0 is-primary">+</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Navegacion -->
    <div class="columns is-mobile has-text-centered has-text-white">
      <!-- Dados -->
      <div @click="(this.$store.state.StoreTiradorDados = true), 
      (this.$store.state.StoreEstadosPlay = false), 
      (this.$store.state.StoreHabilidades = false),
      (this.$store.state.StoreAjustesPlay = false) " 
      class="column pt-0">
        <i v-if="this.$store.state.StoreTiradorDados == true" class="has-text-success fa-2x fas fa-dice"></i>
        <i v-if="this.$store.state.StoreTiradorDados == false" class="desactivado fa-2x fas fa-dice"></i>
      </div>

      <!-- Estados -->
      <div @click="(this.$store.state.StoreTiradorDados = false), 
      (this.$store.state.StoreEstadosPlay = true), 
      (this.$store.state.StoreHabilidades = false),
      (this.$store.state.StoreAjustesPlay = false) "
      class="column pt-0">
        <i v-if="this.$store.state.StoreEstadosPlay == true" class="has-text-success fa-2x fas fa-hamsa"></i>
        <i v-if="this.$store.state.StoreEstadosPlay == false" class="desactivado fa-2x fas fa-hamsa"></i>
      </div>

      <div @click="(this.$store.state.StoreTiradorDados = false), 
      (this.$store.state.StoreEstadosPlay = false), 
      (this.$store.state.StoreHabilidades = true), 
      (this.$store.state.StoreAjustesPlay = false) "
      class="column pt-0">
        <i v-if="this.$store.state.StoreHabilidades == true" class="has-text-success fa-2x fas fa-user-ninja"></i>
        <i v-if="this.$store.state.StoreHabilidades == false" class="desactivado fa-2x fas fa-user-ninja"></i>
      </div>

      <!-- Ajustes -->
      <div @click="(this.$store.state.StoreTiradorDados = false), 
      (this.$store.state.StoreEstadosPlay = false), 
      (this.$store.state.StoreHabilidades = false),
      (this.$store.state.StoreAjustesPlay = true) "
      class="column pt-0">
        <i v-if="this.$store.state.StoreAjustesPlay == true" class="has-text-success fa-2x fas fa-cogs"></i>
        <i v-if="this.$store.state.StoreAjustesPlay == false" class="desactivado fa-2x fas fa-cogs"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>
.bordeImagen{
  border: thick double #F2C94C;
}

.contadorVidaCordura{
  position: relative;
  top: -4vh;
  line-height: 0;
}

.desactivado{
  opacity: 30%;
}
</style>