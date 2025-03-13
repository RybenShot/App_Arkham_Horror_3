<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
      <div class="mr-6">
        <div class="modal-card">
          <section class="modal-card-body hero is-large py-2 has-background-black-ter p-4">
            <h2 class="has-text-centered title mb-0 has-text-white">{{ titulo }}</h2>

            <hr class="my-3">
            <h2 class="has-text-centered has-text-white">{{ descripcion1 }}</h2>
            <br>
            <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'">Si encontrais algún error en la app, me lo podéis decir en la cuenta de <a href="https://www.instagram.com/apparkhamhorror">Instagram</a> y siguenos para formar parte de esta familia infame.</p>
            <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">If you find any errors in the app, you can tell me in the account <a href="https://www.instagram.com/apparkhamhorror">Instagram</a> and follow us to be part of this infamous family.</p>
          </section>

          <footer class="modal-card-foot has-background-grey-dark">
            <button @click="this.$store.state.StoreModalBienvenida = false" class="button column is-3 is-danger p-1" >{{ boton }}</button>
          </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalBienvenida",
  data() {
    return {
      titulo: "",
      descripcion1: "",
      descripcionFinal: "",
      boton: ""
    }
  },
  methods: {
    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.titulo = "Bienvenido a casa, querido investigador";
        this.descripcion1 = "Espero que disfrutes de esta demo tanto como yo he disfrutado haciéndola. Esta app, es una HERRAMIENTA, es necesario el juego físico para poder jugar.";
        this.boton = "Cerrar";
      } else if(this.$store.state.lenguaje == 'ingles'){
        this.titulo = "Welcome home, dear investigator";
        this.descripcion1 = "I hope you enjoy this demo as much as I have enjoyed making it. This app, is a TOOL, you need the physical game to play.";
        this.boton = "Close";
      }
    }
  },
  mounted(){
    this.rellenarTextosegunIdioma();
  },
  updated(){
    this.rellenarTextosegunIdioma();
  }
}

</script>