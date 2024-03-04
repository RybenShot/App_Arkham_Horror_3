<template>
  <div class="modal is-active">
        <div class="modal-background" @click="(this.$store.state.modalPerseguido_Agitado = false)"></div>

        <div v-if="this.$store.state.estadoPerseguido_Agitado == false">
          <div class="notification is-danger is-light my-5 mx-5">
            <strong>ATENCION!</strong><p>No tienes activado este estado!</p>
          </div>
        </div>

        <div class="mr-6">
          <div class="modal-card">
            <header id="Agitado" class="modal-card-head BGManco">
              <p class="modal-card-title has-text-weight-bold has-text-white">Estado: <br/> Agitado</p>
            </header>

            <!-- PARTE 1 -->
            <section v-if="this.$store.state.ElegirAtributo" class="modal-card-body hero is-large py-2">
              <h2>Elige una habilidad.</h2>
              <div class="mt-2">
                <div class="columns is-mobile has-text-centered"> 
                  <div class="column p-1 mx-2 ml-4 boton" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 1 }" @click="(this.$store.state.AtributoElegido = 1) , (this.$store.state.ElegirAtributo = false)">
                    <p class=""><i class="fa-2x fas fa-book-open"></i></p>
                    <p class="">Saber</p>
                  </div>

                  <div class="column p-1 mx-2" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 2 }" @click="(this.$store.state.AtributoElegido = 2) , (this.$store.state.ElegirAtributo = false)">
                    <p class=""><i class="fa-2x fas fa-handshake"></i></p>
                    <p class="">Infl.</p>
                  </div>

                  <div class="column p-1 mx-2" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 3 }" @click="(this.$store.state.AtributoElegido = 3) , (this.$store.state.ElegirAtributo = false)">
                    <p class=""><i class="fa-2x fas fa-eye"></i></p>
                    <p class="">Observ.</p>
                  </div>

                  <div class="column p-1 mx-2" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 4 }" @click="(this.$store.state.AtributoElegido = 4) , (this.$store.state.ElegirAtributo = false)">
                    <p class=""><i class="fa-2x fas fa-fist-raised"></i></p>
                    <p class="">Fuerza</p>
                  </div>

                  <div class="column p-1 mx-2 mr-4" :class="{'active has-text-danger': this.$store.state.AtributoElegido === 5 }" @click="(this.$store.state.AtributoElegido = 5) , (this.$store.state.ElegirAtributo = false)">
                    <p class=""><i class="fa-2x fab fa-hornbill"></i></p>
                    <p class="">Vol.</p>
                  </div>
                </div>
              </div>
              <p class="subtitle is-7 has-text-right mt-2">Expansion: Secretos</p>
            </section>

            <!-- PARTE 2 -->
            <section v-if="this.$store.state.ElegirAtributo == false" class="modal-card-body hero is-large py-2">
              <p> Cuando resuelvas pruebas en las que utilice esta habilidad, tiras un dado menos.</p>

              <div class="has-text-centered">
                <i v-if="this.$store.state.AtributoElegido == 1" class="fa-4x fas fa-book-open"></i>
                <i v-if="this.$store.state.AtributoElegido == 2" class="fa-4x fas fa-handshake"></i>
                <i v-if="this.$store.state.AtributoElegido == 3" class="fa-4x fas fa-eye"></i>
                <i v-if="this.$store.state.AtributoElegido == 4" class="fa-4x fas fa-fist-raised"></i>
                <i v-if="this.$store.state.AtributoElegido == 5" class="fa-4x fab fa-hornbill"></i>
              </div>
              <p>RETRIBUCION --- Descrata el estado 'Agitado'. Este efecto no se resuelve durante la fase en la que hayas dado la vuelta a esta carta.</p>

              <p class="subtitle is-7 has-text-right mt-2">Expansion: Secretos</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless" >
              <p class="control column is-half">
                <button @click="this.$store.state.modalPerseguido_Agitado = false" class="button is-danger is-fullwidth" >
                  <p v-if="this.$store.state.lenguaje == 'español'">Volver</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">Go back</p> 
                </button>
              </p>

              <p class="control column is-half">
                <button @click=" (this.$store.state.ElegirAtributo = true), (this.$store.state.AtributoElegido = null)" class="button is-link is-fullwidth">
                  <p v-if="this.$store.state.lenguaje == 'español'">Resetear</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">Resset</p>
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

  }
}
}
</script>

<style>

</style>