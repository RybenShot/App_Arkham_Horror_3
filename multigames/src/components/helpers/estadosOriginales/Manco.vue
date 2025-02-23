<template>
  <div class="modal is-active">
        <div class="modal-background" @click="(this.$store.state.modalManco = false)"></div>
        <div v-if="this.$store.state.EstadoManco == false">
          <div class="notification is-danger is-light my-5 mx-5">
            <strong>ATENCION!</strong><p>{{ textoInterfaz.atencion }}</p>
          </div>
        </div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGManco">
              <p class="modal-card-title has-text-white has-text-weight-bold">{{ textoInterfaz.titulo }}</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion }}</h2>

              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column ">
                  <button @click=" (this.$store.state.modalManco = false)" class="button is-danger is-fullwidth">
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
  name:"EstadoManco",
  data(){
    return{
      textoInterfaz:{
        atencion: "",
        titulo: "",
        descripcion: "",
        expansion: "",
        botones: {
          volver: "",
        },
      },
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.atencion = "No tienes activado este estado!"
        this.textoInterfaz.titulo = "Estado: Manco";
        this.textoInterfaz.descripcion = "Para el resto de la partida no podrás usar objetos ni hechizos que requieran de 2 manos.";
        this.textoInterfaz.expansion = "Expansion: Original";
        this.textoInterfaz.botones.volver = "Volver";
      }else if(this.$store.state.lenguaje == 'ingles'){
         this.textoInterfaz.atencion = "You don't have this state activated!"
        this.textoInterfaz.titulo = "State: One-handed";
        this.textoInterfaz.descripcion = "For the rest of the game you will not be able to use objects or spells that require 2 hands.";
        this.textoInterfaz.expansion = "Expansion: Original";
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
.BGManco{
  background-image: url(@/assets/img/Estados/Manco.jpg);
  background-position: center;
  background-size: cover;
}
</style>