<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalBendicion = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head BGBendicion m-0">

            </header>

            <section class="modal-card-body hero is-large py-2">

            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
 
                </p>

                <p class="control column is-half">

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