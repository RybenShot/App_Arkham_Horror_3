<template>
      <div class="modal is-active ">
        <div class="modal-background"></div>
        <div class="">
          <div class="modal-card m-0">
            <header class="modal-card-head BGHistoria mb-0 columns is-mobile">
              <div class="column has-text-left">
                <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'español'">La historia <br> hasta ahora...</p>
                <p class="modal-card-title" v-if="this.$store.state.lenguaje == 'ingles'">The story <br> until now</p>
              </div>
              <p class="column has-text-right has-text-white"><i class="fas fa-2x fa-volume-up"></i></p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <p class="has-text-centered title is-italic mb-0">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
              <div class="lineaSeparatoria mx-6">
                <div class="columns is-mobile" style="position: relative; top: 4px">
                  <i class=" has-text-left fas fa-dot-circle column p-0"></i>
                  <i class=" has-text-right fas fa-dot-circle column p-0"></i>
                </div>
              </div>
              <br>

              <p class="subtitle is-7 has-text-centered">{{ this.$store.state.datosPJactual.historia }}</p>
              <br>

              <div v-if="
                this.$store.state.datosPJactual.nombrePJ == 'Marie Lambeau' ||
                this.$store.state.datosPJactual.nombrePJ == 'Jenny Barnes' ||
                this.$store.state.datosPJactual.nombrePJ == 'Dexter Drake' ||
                this.$store.state.datosPJactual.nombrePJ == 'Rex Murphy' ||
                this.$store.state.datosPJactual.nombrePJ == 'Agnes Baker' ||
                this.$store.state.datosPJactual.nombrePJ == 'Gloria Goldberg'"
                class="has-text-centered">
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Marie Lambeau'" class="has-ratio" :src="`https://www.youtube.com/embed/nLVtMyycF2A`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Jenny Barnes'" class="has-ratio" :src="`https://www.youtube.com/embed/A3eG_3SDUTA`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Dexter Drake'" class="has-ratio" :src="`https://www.youtube.com/embed/nCDlFIKAKUw`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Rex Murphy'" class="has-ratio" :src="`https://www.youtube.com/embed/2CNEDE9mJ-0`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Agnes Baker'" class="has-ratio" :src="`https://www.youtube.com/embed/Cx4GNKVIWHQ`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Gloria Goldberg'" class="has-ratio" :src="`https://www.youtube.com/embed/k7XDNDEgZhM`" frameborder="0" allowfullscreen></iframe>
              </div>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless">
                  <button @click="this.$store.state.modalHistoriaDetalle = false" class="button is-link is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Volver</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Go back</p>
                  </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.BGHistoria{
  background-image: url("@/assets/img/ZZOtros/BGModals/IMGModalHistoria.jpg");
  background-position: center;
  background-size: cover;
}
.lineaSeparatoria{
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}
</style>