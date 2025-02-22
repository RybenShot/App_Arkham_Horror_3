<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalFatigado = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head m-0 BGFatigado">
              <p class="modal-card-title has-text-weight-bold has-text-light">{{ textoInterfaz.titulo }}</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion }}</h2>

              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoFatigado = false) , (this.$store.state.modalFatigado = false)" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.quitar }}</p>
                  </button>
                </p>

                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoFatigado = true) , (this.$store.state.modalFatigado = false)" class="button is-link is-fullwidth">
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
  name: "modalFatigado",
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
        this.textoInterfaz.titulo = "Estado: Fatigado";
        this.textoInterfaz.descripcion = "Si estás Determinado, descarta esa estado. No puedes ganar Determinado. Cuendo estés resolkviendo una prueba, como coste adicional para volver a tirar uno o más dados quita un dado de esa prueba. Después de que realices una acción de concentración, descarta esta carta.";
        this.textoInterfaz.expansion = "Expansion: Secretos";
        this.textoInterfaz.botones.quitar = "Descartar";
        this.textoInterfaz.botones.añadir = "Añadir";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "State: Tired";
        this.textoInterfaz.descripcion = "If you are Determined, discard that state. You cannot gain Determined. When you are resolving a test, as an additional cost to reroll one or more dice, remove one die from that test. After you perform a Concentration action, discard this card.";
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
.BGFatigado{
  background-image: url(@/assets/img/Estados/Fatigado.jpg);
  background-position: center;
  background-size: cover;
}

</style>