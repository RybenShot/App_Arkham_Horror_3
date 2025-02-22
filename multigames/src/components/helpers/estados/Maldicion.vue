<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalMaldito = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGMaldicion">
              <p class="modal-card-title has-text-light has-text-weight-bold">{{ textoInterfaz.titulo }}</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion }} </h2>

              <p class="subtitle is-7 has-text-right mt-2" >{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoMaldito = false) , (this.$store.state.modalMaldito = false), (this.$store.state.AvAcierto2 = 5)" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.quitar }}</p> 
                  </button>
                </p>

                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoMaldito = true), (this.$store.state.AvAcierto3 = null), (this.$store.state.AvAcierto2 = null), (this.$store.state.modalMaldito = false), (this.$store.state.EstadoBendicion = false)" class="button is-link is-fullwidth">
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
  name:"EstadoMaldicion",
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
        this.textoInterfaz.titulo = "Estado: Maldición";
        this.textoInterfaz.descripcion = "Cuando estés resolviendo una prueba, sólo obtienes Éxitos sacando 6. Después de que superes una prueba, descarta esta carta. Si tienes que adquirir el Estado Bendición, en vez de eso descarta este estado.";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.botones.quitar = "Quitar Maldición";
        this.textoInterfaz.botones.añadir = "Añadir";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "State: Curse";
        this.textoInterfaz.descripcion = "When you are resolving a test, you only get Successes by rolling 6. After you pass a test, discard this card. If you have to acquire the Blessing State, instead discard this state.";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.botones.quitar = "Remove Curse";
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
.BGMaldicion{
  background-image: url(@/assets/img/Estados/Maldicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>