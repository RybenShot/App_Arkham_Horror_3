<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalSuicidio = false"></div>
        <div v-if="this.$store.state.EstadoSuicidio == false">
          <div class="notification is-danger is-light my-5 mx-5">
            <strong>ATENCION!</strong><p>{{ textoInterfaz.atencion }}</p>
          </div>
        </div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGSuicidio">
              <p class="modal-card-title has-text-white has-text-weight-bold"> {{ textoInterfaz.titulo }}</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion }}</h2>
              <p class="subtitle is-7 has-text-right mt-2" >{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoSuicidio = false) ,(this.$store.state.modalSuicidio = false)" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.resset }}</p>
                  </button>
                </p>
                  
                <p class="control column is-half">
                  <button @click="this.$store.state.modalSuicidio = false" class="button is-link is-fullwidth">
                    <p>{{ textoInterfaz.botones.volver }}</p>
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
  name:"EstadoAlFilo",
  data(){
    return{
      textoInterfaz:{
        atencion: "",
        titulo: "",
        descripcion: "",
        expansion: "",
        botones: {
          resset: "",
          volver: "",
        },
      },
    }
  },

  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.atencion = "No tienes activado este estado!"
        this.textoInterfaz.titulo = "Estado: Al filo de la navaja";
        this.textoInterfaz.descripcion = "Durante la partida, si el investigador falla 2 veces seguidas cualquier prueba, este acabará con su vida. Sin embargo, si consigue 2 aciertos seguidos, descarta esta carta.";
        this.textoInterfaz.expansion = "Expansion: Original";
        this.textoInterfaz.botones.resset = "Quitar Estado";
        this.textoInterfaz.botones.volver = "Volver";

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.atencion = "You don't have this state activated!"
        this.textoInterfaz.titulo = "State: On the edge of the knife";
        this.textoInterfaz.descripcion = "During the game, if the investigator fails any test twice in a row, it will end his life. However, if you get 2 hits in a row, discard this card.";
        this.textoInterfaz.expansion = "Expansion: Original";
        this.textoInterfaz.botones.resset = "Resset State";
        this.textoInterfaz.botones.volver = "Go back";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>
<style>
.BGSuicidio{
  background-image: url(@/assets/img/Estados/Suicidio.jpg);
  background-position: center;
  background-size: cover;
}
</style>