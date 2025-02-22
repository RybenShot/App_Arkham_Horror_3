<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="modal-card-head BGBendicion">
          <p class="modal-card-title">{{ textoInterfaz.titulo }}</p>
        </header>
        <section class="modal-card-body hero is-large py-2">
          <img :src="this.$store.state.SeleccionarURLPertenencia"  />
        </section>

        <footer class="modal-card-foot">
          <button @click="this.$store.state.verDetallePertenencia = false" class="button column is-3 is-link p-1"> {{ textoInterfaz.volver }} </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ver detalle de pertenencias",
  data(){
    return{
      textoInterfaz: {
        titulo: "",
        volver: ""
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Ver Pertenencia";
        this.textoInterfaz.volver = "Volver";
      }else if(this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.titulo = "View Belonging";
        this.textoInterfaz.volver = "Go back";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>