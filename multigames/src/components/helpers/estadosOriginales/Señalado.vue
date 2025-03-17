<template>
  <div class="modal is-active">
        <div class="modal-background" @click="this.$store.state.modalSeñalado = false"></div>
        <div v-if="this.$store.state.EstadoSeñalado == false">
          <div class="notification is-danger is-light my-5 mx-5">
            <strong>ATENCION!</strong><p>{{ textoInterfaz.atencion }}</p>
          </div>
        </div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="modal-card-head BGSeñalado">
              <p class="modal-card-title has-text-white has-text-weight-bold">{{ textoInterfaz.titulo }}</p>
              <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalSeñalado = false"></i>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion1 }}</h2>
              <hr class="my-2">
              <h2 >{{ textoInterfaz.descripcion2 }}</h2>

              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="(this.$store.state.EstadoSeñalado = false) , (this.$store.state.modalSeñalado = false)" class="button is-danger is-fullwidth">
                    <p>{{ textoInterfaz.botones.resset }}</p>
                  </button>
                </p>
                  
                <p class="control column is-half">
                  <button @click="this.$store.state.modalSeñalado = false" class="button is-link is-fullwidth">
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
  name:"EstadoSuicidio",
  data(){
    return{
      textoInterfaz:{
        atencion: "",
        titulo: "",
        descripcion1: "",
        descripcion2: "",
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
        this.textoInterfaz.titulo = "Estado: Señalado";
        this.textoInterfaz.descripcion1 = "Para el resto de la partida eres el objetivo de todas las criaturas, ignorando lo que ponga la tarjeta de dicha criatura. Te seguirán hasta alcanzarte y matarte. Mientras esta carta permanezca activa, TODAS LAS CRIATURAS TIENEN +1 DE VELOCIDAD. Si por el camino una criatura se topa con otro investigador, dicha criatura se enfrentará a ese investigador.";
        this.textoInterfaz.descripcion2 = "Para librarte de esta carta, tienes que descartar un estado de Bendición.";
        this.textoInterfaz.expansion = "Expansion: Original";
        this.textoInterfaz.botones.resset = "Quitar Estado";
        this.textoInterfaz.botones.volver = "Volver";

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.atencion = "You don't have this state activated!"
        this.textoInterfaz.titulo = "State: Pointed";
        this.textoInterfaz.descripcion1 = "For the rest of the game you are the target of all creatures, ignoring what the card of that creature puts. They will follow you until they reach you and kill you. As long as this card remains active, ALL CREATURES HAVE +1 SPEED. If along the way a creature encounters another researcher, that creature will face that researcher.";
        this.textoInterfaz.descripcion2 = "To get rid of this letter, you have to discard a state of Blessing.";
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
.BGSeñalado{
  background-image: url(@/assets/img/Estados/Señalado.jpg);
  background-position: center;
  background-size: cover;
}
</style>