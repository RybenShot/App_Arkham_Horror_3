<template>
  <div >
    <p class="title has-text-white has-text-centered">{{ textoInterfaz.titleError }}</p>
    <p class="subtitle has-text-white has-text-centered">{{ textoInterfaz.subTitleError }}</p>
  </div>
</template>

<script>
export default {
  name: "AjustesPlay",
  data(){
    return{
      textoInterfaz:{
        titleError: "",
        subTitleError: "",
      },
    }
  },
  methods:{
    rellenarTextoSegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.titleError = "Funcionalidad no disponible";
        this.textoInterfaz.subTitleError = "Esta funcionalidad será para coger cartas de evento. Estará disponible en próximas actualizaciones.";
      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.titleError = "Functionality Not Available";
        this.textoInterfaz.subTitleError = "This feature will allow you to draw event cards. It will be available in upcoming updates.";
      }
    },

  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
#ventana-ajustes{
  height: 40vh;
}
</style>