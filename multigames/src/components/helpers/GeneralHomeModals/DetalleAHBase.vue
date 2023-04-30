<template>
  <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGDetalleModalAHBase">
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'español'">{{this.expansiones[this.$store.state.ContadorDetalleModalAH].NombreExpansion}}</p>
              <p class="modal-card-title has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">Arkham Horror Base</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Investigadores: </h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">During the game, if the investigator fails any test twice in a row, it will end his life. However, if you get 2 hits in a row, discard this card.</h2>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                
                <!-- AHBase -->
                <div v-if="this.$store.state.ContadorDetalleModalAH = 1" class="control column is-half">
                  <!-- Desactivar Base -->
                  <p v-if="this.$store.state.ActivarBase == true">
                    <button @click="this.$store.state.ActivarBase = false" class="button is-danger is-fullwidth">
                      <p v-if="this.$store.state.lenguaje == 'español'">Quitar Base</p>
                      <p v-if="this.$store.state.lenguaje == 'ingles'">Remove Base</p>
                    </button>
                  </p>
                  <!-- Activar Base -->
                  <p v-if="this.$store.state.ActivarBase == false">
                    <button @click="this.$store.state.ActivarBase = true" class="button is-danger is-fullwidth">
                      <p v-if="this.$store.state.lenguaje == 'español'">Añadir Base</p>
                      <p v-if="this.$store.state.lenguaje == 'ingles'">Añadir Base</p>
                    </button>
                  </p>
                </div>

                
                  <!-- Cerrar Modal -->
                <p class="control column is-half">
                  <button @click="this.$store.state.DetalleModalAH = false" class="button is-link is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Cerrar</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Close</p>
                  </button>
                </p>
              </div>
            </footer>

          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:"ModalDetalleAHBase",

  data(){
    return{
      expansiones:[
        {NombreExpansion: 'Arkham Horror Base',
          idExpansion: 1,
          NMapas: 4,
          NInvestigadores: 12,
          otro: null
        },
        {NombreExpansion: 'Arkham Horror Mareas Tenebrosas',
          idExpansion: 2,
          NMapas: 4,
          NInvestigadores: 8,
          otro: null
        },
        {NombreExpansion: 'Arkham Horror Original',
          idExpansion: 3,
          NMapas: 0,
          NInvestigadores: 4,
          otro: null
        },
      ]
    }
  },

  methods:{
  }
}
</script>

<style>
  .BGDetalleModalAHBase{
  background-image: url(@/assets/img/Estados/Suicidio.jpg);
  background-position: center;
  background-size: cover;
}
</style>