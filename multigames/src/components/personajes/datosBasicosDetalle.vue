<template>
  <section class="columns is-mobile pt-3">
    <div class="column image">
      <img :src="this.$store.state.datosPJactual.fotoUrl" alt="{}" class="is-rounded image image bordeImagen">
    </div>

    <div class="column has-text-white">
      <div>
        <p class="title is-2 has-text-weight-bold has-text-white mb-4">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
        <p class="has-background-dark subtitle is-6 has-text-white pl-2">{{ this.$store.state.datosPJactual.posicion }}</p>
      </div>

      <div class="has-text-centered mt-4 mr-2">
        <div class="columns is-mobile">
          <div class="column p-0 py-1" id="barraDerechaAbajo" @click="this.$store.state.modalPertenenciasDetalle = true">
            <i class="fas fa-suitcase"></i>
            <p>Pertenencias</p>
          </div>
          <div class="column p-0 py-1" @click="this.$store.state.modalHistoriaDetalle = true">
            <i class="fas fa-id-card"></i>
            <p>Historia</p>
          </div>
        </div>

        <div class="columns is-mobile" @click="this.$store.state.modalArquetipoDetalle = true">
          <div class="column p-0 py-1">
            <i class="fas fa-bolt"></i>
            <p>Arquetipo</p>
          </div>
          <div class="column p-0 py-1" id="barraIzquierdaArriba">
            <i class="fas fa-money-bill-wave"></i>
            <p>2</p>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<script>
export default {

}
</script>

<style scoped>
.bordeImagen{
  border: thick double #F2C94C;
}

#barraDerechaAbajo{
  border-right: solid 2px;
  border-bottom: solid 2px
}

#barraIzquierdaArriba{
  border-left: solid 2px;
  border-top: solid 2px
}

</style>