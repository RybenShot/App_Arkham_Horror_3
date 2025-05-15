<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="">
      <div class="modal-card">
        
        <!-- titulo  -->
        <header class="modal-card-head BGBendicion"> <p class="modal-card-title title"> {{ titulo }}</p> </header>

        <section class="modal-card-body hero is-large py-2">

          <!-- botones de cambio de lenguaje  -->
          <div class="columns is-mobile m-0" >
            <div class="column p-0 mb-1 has-text-white subtitle has-text-centered">
              <button @click="(this.$store.state.lenguaje = 'español'), (this.rellenarTextosegunIdioma())"><img style="max-height: 50px;" src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español"></button>
            </div>
            <div class="column p-0 mb-1 has-text-white subtitle has-text-centered">
              <button @click="(this.$store.state.lenguaje = 'ingles'), (this.rellenarTextosegunIdioma())"><img style="max-height: 50px;" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles"></button>
            </div>
          </div>

          <hr class="m-0 has-text-black">

          <h2 v-if="this.$store.state.lenguaje == 'español'" class="has-text-centered">Esta aplicación está hecha por solo <strong><u> 1 persona</u></strong>, que invierte todo el tiempo que puede. Actualmente está en desarrollo la 4ª versión, donde puedes ver el progreso en <a href="https://www.instagram.com/apparkhamhorror">Instagram</a>.</h2>
          <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="has-text-centered">This app is made by only <strong><u> 1 person</u></strong>, which invests as much time as you can. Currently in development the 4th version, where you can see the progress on<a href="https://www.instagram.com/apparkhamhorror"> Instagram</a>."</h2>
          <!-- descripcion2  -->
          <h2 class="has-text-centered"> {{ descripcion2 }}</h2>
          <!-- tituloCentral  -->
          <h1 class="title has-text-centered mb-0"> {{ tituloCentral }}</h1>
          <!-- descripcion3  -->
          <p class="has-text-centered"> {{ descripcion3 }}</p>
          <!-- final  -->
          <p class="has-text-centered title is-4 py-3" > {{ final }}</p>
          
        </section>

        <!-- botones  -->
        <footer class="modal-card-foot">
          <a class="column p-1" href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank"> <button class="button is-3 is-success">{{ botonIz }}</button> </a>
          <button @click="this.$store.state.StoreModalDonacion = false" class="button column is-3 is-link p-1">{{ botonDer }}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalDonacion",
  data() {
    return {
      titulo: "",
      descripcion2: "",
      tituloCentral: "",
      descripcion3: "",
      final: "",
      botonIz: "",
      botonDer: ""
    }
  },
  methods: {
    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.titulo = "RECUERDA";
        this.descripcion2 = "Aparte de ser una herramienta, se pretende crear una comunidad para que surjan nuevas ideas y en resumen, darle más vida a este maravilloso juego.";
        this.tituloCentral = "Pero no puedo hacerlo solo";
        this.descripcion3 = "Por eso es de suma importancia vuestro apoyo, para poder dedicarle más tiempo y acabar cuanto antes la versión final.";
        this.final = "Mil gracias por vuestro apoyo.";
        this.botonIz = "Invitame a un Monster";
        this.botonDer = "Más tarde";
      } else if(this.$store.state.lenguaje == 'ingles'){
        this.titulo = "REMEMBER";
        this.descripcion2 = "Apart from being a tool, it is intended to create a community so that new ideas arise and in short, give more life to this wonderful game.";
        this.tituloCentral = "But I can’t do it alone";
        this.descripcion3 = "That is why your support is of the utmost importance, so that we can devote more time to it and finish the final version as soon as possible.";
        this.final = "Thank you very much for your support.";
        this.botonIz = "Buy me a Monster";
        this.botonDer = "Later";
      }
    }
  },
  mounted(){
    this.rellenarTextosegunIdioma();
  }
}
</script>
