<template>
  <div class="modal is-active">
    <div class="modal-background" @click="this.$store.state.modalComunityMap = false"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold" >____</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalComunityMap = false"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <h2>____</h2>
          <p class="subtitle is-7 has-text-right mt-2">____</p>
          <a href="https://boardgamegeek.com/boardgame/257499/arkham-horror-third-edition/forums/0?pageid=1&sort=recent" target="_blank"><p>Pincha aqui para ir a BGG</p></a>
        </section>

        <footer class="">
          <div class="field has-addons columns is-mobile is-gapless">
            <p class="control column is-half">
              <button @click="(this.$store.state.EstadoBendicion = false) , (this.$store.state.modalComunityMap = false), (this.$store.state.AvAcierto3 = null)" class="button is-danger is-fullwidth">
                <p>____</p>
              </button>
            </p>

            <p class="control column is-half">
              <button @click="(this.$store.state.EstadoBendicion = true), (this.$store.state.modalComunityMap = false), (this.$store.state.AvAcierto2 = 5), (this.$store.state.AvAcierto3 = 4), (this.$store.state.EstadoMaldito = false)" class="button is-link is-fullwidth">
                <p>___</p>
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
  data(){
    return{
      textoInterfaz:{
      },
    }
  },

  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
      }else if(this.$store.state.lenguaje == 'ingles'){
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
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