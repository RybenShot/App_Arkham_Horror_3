<template>
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGArquetipos">
              <p class="modal-card-title has-text-white">{{ textoInterfaz.titulo }}</p>
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

                  <p class="column has-text-left title mb-0 pb-0">{{ textoInterfaz.tituloArquetipo1}}</p>
                  <div class="column has-text-right is-2">
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Defensor'"><i class="fas fa-2x fa-shield-alt"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Superviviente'"><i class="fas fa-2x fa-user-ninja"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Mistico'"><i class="fas fa-2x fa-hat-wizard"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Experto'"><i class="fas fa-2x fa-crown"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo1 == 'Buscador'"><i class="fas fa-2x fa-user-secret"></i></p>
                  </div>
                </div>
                <p class="subtitle is-6">{{ textoInterfaz.descripcionArquetipo1}}</p>
              </div>

             

              <div v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 != null" class="containerArquetipos mx-3">
                <hr>
                <div class="columns is-mobile mb-0">

                  <p class="column has-text-left title mb-0 pb-0">{{ textoInterfaz.tituloArquetipo2}}</p>                  
                  <div class="column has-text-right is-2">
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Defensor'"><i class="fas fa-2x fa-shield-alt"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Superviviente'"><i class="fas fa-2x fa-user-ninja"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Mistico'"><i class="fas fa-2x fa-hat-wizard"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Experto'"><i class="fas fa-2x fa-crown"></i></p>
                    <p v-if="this.$store.state.datosPJactual.arquetipos.tituloArquetipo2 == 'Buscador'"><i class="fas fa-2x fa-user-secret"></i></p>
                  </div>
                </div>
                <p class="subtitle is-6">{{ textoInterfaz.descripcionArquetipo2}}</p>
              </div>
              <br>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless">
                  <button @click="this.$store.state.modalArquetipoDetalle = false" class="button is-link is-fullwidth">
                    <p>{{ textoInterfaz.volver }}</p>
                  </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "modal Arquetipo Personaje",
  data(){
    return{
      textoInterfaz: {
        titulo: "",
        volver: "",

        tituloArquetipo1: "",
        descripcionArquetipo1: "",
        tituloArquetipo2: "",
        descripcionArquetipo2: "",
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Arquetipos principales";
        this.textoInterfaz.volver = "Volver";
        this.textoInterfaz.tituloArquetipo1 = this.$store.state.datosPJactual.arquetipos.tituloArquetipo1;
        this.textoInterfaz.descripcionArquetipo1 = this.$store.state.datosPJactual.arquetipos.descripcionArquetipo1;
        this.textoInterfaz.tituloArquetipo2 = this.$store.state.datosPJactual.arquetipos.tituloArquetipo2;
        this.textoInterfaz.descripcionArquetipo2 = this.$store.state.datosPJactual.arquetipos.descripcionArquetipo2;
      }else if(this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.titulo = "Main Archetypes";
        this.textoInterfaz.volver = "Go back";
        this.textoInterfaz.tituloArquetipo1 = this.$store.state.datosPJactual.arquetipos.ENtituloArquetipo1;
        this.textoInterfaz.descripcionArquetipo1 = this.$store.state.datosPJactual.arquetipos.ENdescripcionArquetipo1;
        this.textoInterfaz.tituloArquetipo2 = this.$store.state.datosPJactual.arquetipos.ENtituloArquetipo2;
        this.textoInterfaz.descripcionArquetipo2 = this.$store.state.datosPJactual.arquetipos.ENdescripcionArquetipo2;
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
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