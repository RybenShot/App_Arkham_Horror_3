<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalPopUpNotificacion = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head BGBendicion m-0">
              <i class="px-1 fab fa-hubspot has-text-danger"></i>
              <p class="modal-card-title has-text-weight-bold has-text-danger" >  {{ textoInterfaz.titulo }}</p>
            </header>
            

            <section class="modal-card-body hero is-large py-2">
              <h1 class="has-text-centered title mb-1">{{ textoInterfaz.recuerda }}</h1>
              <br>
              <h2 class="subtitle is-5 has-text-centered">{{ textoInterfaz.descripcion }}</h2>
              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-fullwith">
                  <button @click="this.$store.state.modalPopUpNotificacion = false" class="button is-danger is-fullwidth">
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
        botones: {
          quitar: ""
        },
      },
    }
  },

  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Retribución";
        this.textoInterfaz.recuerda = "Recuerda!";
        this.textoInterfaz.descripcion = this.$store.state.datosMapa.retribucion;
        this.textoInterfaz.expansion = this.$store.state.datosMapa.expansionMapa;
        this.textoInterfaz.botones.quitar = "Cerrar";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Retribution";
        this.textoInterfaz.recuerda = "Remember!";
        this.textoInterfaz.descripcion = this.$store.state.datosMapa.ENretribucion;
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