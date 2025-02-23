<template>
  <div class="modal is-active">
        <div class="modal-background" @click="(this.$store.state.modalPerseguido_Agitado = false)"></div>

        <div v-if="this.$store.state.estadoPerseguido_Agitado == false">
          <div class="notification is-danger is-light my-5 mx-5">
            <strong>ATENCION!</strong><p>{{ textoInterfaz.atencion }}</p>
          </div>
        </div>

        <div class="mr-6">
          <div class="modal-card">
            <header id="Agitado" class="modal-card-head BGManco">
              <p class="modal-card-title has-text-weight-bold has-text-white">{{ textoInterfaz.titulo }}</p>
            </header>

            <!-- PARTE 1 -->
            <section v-if="ElegirAtributo" class="modal-card-body hero is-large py-2">
              <h2>{{ textoInterfaz.descripcion1 }}</h2>
              <div class="mt-2">
                <div class="columns is-mobile has-text-centered"> 
                  <div class="column p-1 mx-2 ml-4 boton" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 1 }" @click="(this.$store.state.AtributoElegido = 1) , (ElegirAtributo = false)">
                    <p><i class="fa-2x fas fa-book-open"></i></p>
                    <p>{{ textoInterfaz.saber }}</p>
                  </div>

                  <div class="column p-1 mx-2" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 2 }" @click="(this.$store.state.AtributoElegido = 2) , (ElegirAtributo = false)">
                    <p><i class="fa-2x fas fa-handshake"></i></p>
                    <p>{{ textoInterfaz.influencia }}</p>
                  </div>

                  <div class="column p-1 mx-2" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 3 }" @click="(this.$store.state.AtributoElegido = 3) , (ElegirAtributo = false)">
                    <p><i class="fa-2x fas fa-eye"></i></p>
                    <p>{{ textoInterfaz.observacion }}</p>
                  </div>

                  <div class="column p-1 mx-2" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 4 }" @click="(this.$store.state.AtributoElegido = 4) , (ElegirAtributo = false)">
                    <p><i class="fa-2x fas fa-fist-raised"></i></p>
                    <p>{{ textoInterfaz.fuerza }}</p>
                  </div>

                  <div class="column p-1 mx-2 mr-4" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 5 }" @click="(this.$store.state.AtributoElegido = 5) , (ElegirAtributo = false)">
                    <p><i class="fa-2x fab fa-hornbill"></i></p>
                    <p>{{ textoInterfaz.voluntad }}</p>
                  </div>
                </div>
              </div>
              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <!-- PARTE 2 -->
            <section v-if="ElegirAtributo == false" class="modal-card-body hero is-large py-2">
              <p> {{ textoInterfaz.descripcion2 }} </p>

              <div class="has-text-centered">
                <i v-if="this.$store.state.AtributoElegido == 1" class="fa-4x fas fa-book-open"></i>
                <i v-if="this.$store.state.AtributoElegido == 2" class="fa-4x fas fa-handshake"></i>
                <i v-if="this.$store.state.AtributoElegido == 3" class="fa-4x fas fa-eye"></i>
                <i v-if="this.$store.state.AtributoElegido == 4" class="fa-4x fas fa-fist-raised"></i>
                <i v-if="this.$store.state.AtributoElegido == 5" class="fa-4x fab fa-hornbill"></i>
              </div>
              <p>{{ textoInterfaz.retribucion }}</p>

              <p class="subtitle is-7 has-text-right mt-2">{{ textoInterfaz.expansion }}</p>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless" >
              <p class="control column is-half">
                <button @click="this.$store.state.modalPerseguido_Agitado = false" class="button is-danger is-fullwidth" >
                  <p>{{ textoInterfaz.botones.volver }}</p>
                </button>
              </p>

              <p class="control column is-half">
                <button @click=" (ElegirAtributo = true), (this.$store.state.AtributoElegido = null)" class="button is-link is-fullwidth">
                  <p>{{ textoInterfaz.botones.resset }}</p>
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
  name: "Modal Agitado",
  data(){
    return{
      ElegirAtributo: true,

      textoInterfaz:{
        atencion: "",
        titulo: "",
        descripcion1: "",
        descripcion2: "",
        retribucion: "",
        expansion: "",
        botones: {
          volver: "",
          resset: "",

          saber: "",
          influencia: "",
          observacion: "",
          fuerza: "",
          voluntad: ""
        },
      },
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.atencion = "No tienes activado este estado!"
        this.textoInterfaz.titulo = "Estado: Agitado";
        this.textoInterfaz.descripcion1 = "Elige una habilidad";
        this.textoInterfaz.descripcion2 = "Cuando resuelvas pruebas en las que utilice esta habilidad, tiras un dado menos.";
        this.textoInterfaz.retribucion = "RETRIBUCION --- Descrata el estado 'Agitado'. Este efecto no se resuelve durante la fase en la que hayas dado la vuelta a esta carta.";

        this.textoInterfaz.saber = "Saber";
        this.textoInterfaz.influencia = "Infl.";
        this.textoInterfaz.observacion = "Observ.";
        this.textoInterfaz.fuerza = "Fuer.";
        this.textoInterfaz.voluntad = "Voluntad";

        this.textoInterfaz.expansion = "Expansion: Secretos";
        this.textoInterfaz.botones.volver = "Volver";
        this.textoInterfaz.botones.resset = "Resetear";
      }else if(this.$store.state.lenguaje == 'ingles'){
         this.textoInterfaz.atencion = "You don't have this state activated!"
        this.textoInterfaz.titulo = "State: Agitated";
        this.textoInterfaz.descripcion1 = "Choose a skill";
        this.textoInterfaz.descripcion2 = "When you solve tests in which you use this skill, you roll one die less.";
        this.textoInterfaz.retribucion = "RETRIBUTION --- Discard the 'Agitated' state. This effect is not resolved during the phase in which you have turned this card.";

        this.textoInterfaz.saber = "Know.";
        this.textoInterfaz.influencia = "Infl.";
        this.textoInterfaz.observacion = "Obser.";
        this.textoInterfaz.fuerza = "Stre.";
        this.textoInterfaz.voluntad = "Will";

        this.textoInterfaz.expansion = "Expansion: Secrets";
        this.textoInterfaz.botones.volver = "Go back";
        this.textoInterfaz.botones.resset = "Resset";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>