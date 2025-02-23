<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalBendicion = false"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head BGBendicion m-0">
              <p class="modal-card-title has-text-weight-bold" >{{ textoInterfaz.titulo }}</p>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion }}</h2>
              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoBendicion = false) , (this.$store.state.modalBendicion = false), (this.$store.state.AvAcierto3 = null)" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.quitar }}</p>
                  </button>
                </p>

                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoBendicion = true), (this.$store.state.modalBendicion = false), (this.$store.state.AvAcierto2 = 5), (this.$store.state.AvAcierto3 = 4), (this.$store.state.EstadoMaldito = false)" class="button is-link is-fullwidth">
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
        this.textoInterfaz.titulo = "Estado: Bendición";
        this.textoInterfaz.descripcion = "Cuando estés resolviendo una prueba, obtienes Éxitos sacando 4, 5 y 6. Después de que falles una prueba, descarta esta carta. Si tienes que adquirir el Estado Maldición, en vez de eso descarta esta carta.";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.botones.quitar = "Quitar Bendición";
        this.textoInterfaz.botones.añadir = "Añadir";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "State: Blessed";
        this.textoInterfaz.descripcion = "When you are solving a test, you get Hits by pulling 4, 5 and 6. After you fail a test, discard this card. If you have to acquire the Curse State, discard this card instead.";
        this.textoInterfaz.expansion = "Expansion: Base";
        this.textoInterfaz.botones.quitar = "Remove Blessing";
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
.BGBendicion{
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>