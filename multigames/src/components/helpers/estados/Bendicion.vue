<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalBendicion = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head BGBendicion m-0">
              <p class="modal-card-title has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'">Estado: <br> BENDICIÓN</p>
              <p class="modal-card-title has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'">State: Blessed</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2 v-if="this.$store.state.lenguaje == 'español'">Cuando estés resolviendo una prueba, obtienes Éxitos sacando 4, 5 y 6. Después de que falles una prueba, descarta esta carta. Si tienes que adquirir el Estado Maldición, en vez de eso descarta esta carta.</h2>
              <h2 v-if="this.$store.state.lenguaje == 'ingles'">When you are solving a test, you get Hits by pulling 4, 5 and 6. After you fail a test, discard this card. If you have to acquire the Curse State, discard this card instead.</h2>

              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'español'">Expansion: Base</p>
              <p class="subtitle is-7 has-text-right mt-2" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: Base</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoBendicion = false) ,
                  (this.$store.state.modalBendicion = false),
                   (this.$store.state.AvAcierto3 = null)
                  " class="button is-danger is-fullwidth">

                    <p v-if="this.$store.state.lenguaje == 'español'">Quitar Bendición</p>
                    <p v-if="this.$store.state.lenguaje == 'ingles'">Remove Blessing</p>  

                  </button>
                </p>
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoBendicion = true), (this.$store.state.modalBendicion = false), (this.$store.state.AvAcierto2 = 5), (this.$store.state.AvAcierto3 = 4), (this.$store.state.EstadoMaldito = false)" class="button is-link is-fullwidth">
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
  name:"EstadoBendicion",

  methods:{
  }
}
</script>
<style>
.BGBendicion{
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>