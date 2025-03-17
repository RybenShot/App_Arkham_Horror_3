<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalNotificacionEfectoMancillado = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head BGBendicion m-0">
              <p class="modal-card-title has-text-weight-bold has-text-danger" >  {{ textoInterfaz.titulo }}</p>
              <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalNotificacionEfectoMancillado = false"></i>
            </header>
            

            <section class="modal-card-body hero is-large py-2">
              <h1 class="has-text-centered title mb-1">{{ textoInterfaz.recuerda }}</h1>
              <br>
              <h2 class="subtitle is-5 has-text-centered">{{ textoInterfaz.descripcion }}</h2>
              <p class="subtitle is-7 has-text-right mt-2"> {{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-fullwith">
                  <button @click="this.$store.state.modalNotificacionEfectoMancillado = false" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.quitar }}</p>
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
  name:"Recordatorio Retribucion",
  data(){
    return{
      textoInterfaz:{
        titulo: "",
        recuerda:"",
        descripcion: "",
        expansion: "",
        efectoFichaSacada: "",
        botones: {
          quitar: ""
        },
      },
    }
  },

  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Efecto: Mancillado";
        this.textoInterfaz.recuerda = "Recuerda!";
        this.textoInterfaz.descripcion = "Después de que robes una ficha vacia o una Pista, debes poner una perdicion en tu espacio.";
        this.textoInterfaz.expansion = this.$store.state.datosMapa.expansionMapa;
        this.textoInterfaz.botones.quitar = "Cerrar";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Retribution";
        this.textoInterfaz.recuerda = "Remember!";
        this.textoInterfaz.descripcion = "After you draw a blank token or a Clue, you must place a Doom in your space.";
        this.textoInterfaz.expansion = this.$store.state.datosMapa.expansionMapa;
        this.textoInterfaz.botones.quitar = "Close";
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