<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalMaldito = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGMaldicion">
              <p class="modal-card-title has-text-light" v-if="this.$store.state.lenguaje == 'español'">Estado: MALDICIÓN</p>
              <p class="modal-card-title has-text-light" v-if="this.$store.state.lenguaje == 'ingles'">State: Bloody</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Cuando estés resolviendo una prueba, sólo obtienes Éxitos sacando 6. Después de que superes una prueba, descarta esta carta. Si tienes que adquirir el Estado Bendición, en vez de eso descarta esta carta. </h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">When you are solving a test, you only get Hits by pulling 6. After you pass a test, discard this card. If you have to acquire the Blessing State, discard this letter instead. </h2>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(
                  this.$store.state.EstadoMaldito = false) ,
                  (this.$store.state.modalMaldito = false),
                   (this.$store.state.AvAcierto2 = 5)
                  " class="button is-danger is-fullwidth">
                    <p v-if="this.$store.state.lenguaje == 'español'">Quitar Maldición</p> 
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove Bloody</p> 
                  </button>
                </p>

                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoMaldito = true), (this.$store.state.AvAcierto3 = null), (this.$store.state.AvAcierto2 = null), (this.$store.state.modalMaldito = false), (this.$store.state.EstadoBendicion = false)" class="button is-link is-fullwidth" v-if="this.$store.state.lenguaje == 'español'">
                    <p v-if="this.$store.state.lenguaje == 'español'">Añadir</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Añadir</p>
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
  name:"EstadoMaldicion",
  methods:{
  }
}
</script>
<style>
.BGMaldicion{
  background-image: url(@/assets/img/Estados/Maldicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>