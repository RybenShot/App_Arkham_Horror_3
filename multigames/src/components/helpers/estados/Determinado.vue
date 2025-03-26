<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalDeterminado = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head m-0 BGDeterminado">
              <p class="modal-card-title has-text-weight-bold has-text-light" >{{ textoInterfaz.titulo }}</p>
              <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalDeterminado = false"></i>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion }}</h2>
              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoDeterminado = false) , (this.$store.state.modalDeterminado = false)" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.quitar }}</p>
                  </button>
                </p>

                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoDeterminado = true) , (this.$store.state.modalDeterminado = false)" class="button is-link is-fullwidth">
                    <p>{{ textoInterfaz.botones.añadir }}</p>
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
  name:"EstadoDeterminado",
  data(){
    return{
      textoInterfaz:{
        titulo: "",
        descripcion: "",
        expansion: "",
        botones: {
          quitar: "",
          añadir: ""
        },
      },
    }
  },

  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Estado: Determinado";
        this.textoInterfaz.descripcion = "Tu límite de concentración aumenta en uno. Al final de tu turno, si no estás Fatigado, puedes darle la vuelta a esta carta (quitar carta de determinado y activar carta de Fatigado) para realizar una acción adicional.";
        this.textoInterfaz.expansion = "Expansion: Secretos";
        this.textoInterfaz.botones.quitar = "Descartar";
        this.textoInterfaz.botones.añadir = "Añadir";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "State: Determined";
        this.textoInterfaz.descripcion = "Your concentration limit increases by one. At the end of your turn, if you are not Fatigued, you can flip this card over (remove Determined card and activate Fatigued card) to take an additional action.";
        this.textoInterfaz.expansion = "Expansion: Secrets";
        this.textoInterfaz.botones.quitar = "Discard";
        this.textoInterfaz.botones.añadir = "Add";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
.BGDeterminado{
  background-image: url(@/assets/img/Estados/Determinado.jpg);
  background-position: center;
  background-size: cover;
}

</style>