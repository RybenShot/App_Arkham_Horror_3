<template>
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGArquetipos">
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'español'">Arquetipos <br> principales</p>
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">State: Blessed</p>
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

              <div class="containerArquetipos mx-3">
                <div class="columns is-mobile mb-0">
                  <p class="column has-text-left title mb-0 pb-0">{{ this.$store.state.datosPJactual.arquetipos.tituloArquetipo1}}</p>
                  <div class="column has-text-right is-2">
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Defensor'"><i class="fas fa-2x fa-shield-alt"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Superviviente'"><i class="fas fa-2x fa-user-ninja"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Mistico'"><i class="fas fa-2x fa-hat-wizard"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Experto'"><i class="fas fa-2x fa-crown"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Buscador'"><i class="fas fa-2x fa-user-secret"></i></p>
                  </div>
                </div>
                <p class="subtitle is-6">{{ this.$store.state.datosPJactual.arquetipos.descripcionArquetipo1}}</p>
              </div>

             

              <div v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 != null" class="containerArquetipos mx-3">
                <hr>
                <div class="columns is-mobile mb-0">
                  <p class="column has-text-left title mb-0 pb-0">{{ this.$store.state.datosPJactual.arquetipos.tituloArquetipo2}}</p>
                  <div class="column has-text-right is-2">
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Defensor'"><i class="fas fa-2x fa-shield-alt"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Superviviente'"><i class="fas fa-2x fa-user-ninja"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Mistico'"><i class="fas fa-2x fa-hat-wizard"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Experto'"><i class="fas fa-2x fa-crown"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Buscador'"><i class="fas fa-2x fa-user-secret"></i></p>
                  </div>
                </div>
                <p class="subtitle is-6">{{ this.$store.state.datosPJactual.arquetipos.descripcionArquetipo2}}</p>
              </div>
              <br>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless">
                  <button @click="this.$store.state.modalArquetipoDetalle = false" class="button is-link is-fullwidth">
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
.BGArquetipos{
  background-image: url("@/assets/img/ZZOtros/BGModals/IMGModalArquetipos.jpg");
  background-position: center;
  background-size: cover;
}
.lineaSeparatoria{
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}

</style>