<template>
  <section>
    <p class="title has-text-centered has-text-white">{{ textoInterfaz.titulo }}</p>
    <div class="container mx-3 has-text-white">
      <p>>> {{ textoInterfaz.efecto1 }}</p>
      <br>
      <p v-if="textoInterfaz.efecto2">>> {{ textoInterfaz.efecto2 }}</p>
    </div>
    <hr>

    <h1 class="title has-text-white has-text-centered">Pertenencias Iniciales</h1>

    <div class="columns is-mobile mx-3">
      <!-- Pertenencias -->
          <b-carousel-list v-model="test" :data="this.$store.state.responseObjectsInPlay" :items-to-show="3">
            <template #item="object">
              <div class="card-image">
                  <figure class="image mx-1" @click="seeCard(object.img)">
                    <img :src="object.img" >
                  </figure>
              </div>
            </template>
          </b-carousel-list>

    </div>
    <br>

  
  </section>
</template>

<script>
export default {
  name: "HabilidadesPlay",
  data(){
    return{
      textoInterfaz:{
        titulo: "",
        tituloSeg:"",
        limConcentracion: "",

        efecto1: "",
        efecto2: "",
      },
      
      test: 0,

    }
  },
  methods:{
    seeCard(url){
      this.$store.state.SeleccionarURLPertenencia = url;
      this.$store.state.verDetallePertenencia = true;
      console.log("URL de la carta seleccionada", this.$store.state.SeleccionarURLPertenencia);
    },
    info(value) {
        this.test = value
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Habilidades";
        this.textoInterfaz.tituloSeg = "Dinero y Restos";
        this.textoInterfaz.limConcentracion = "Limite de concentración :";
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.translations.es.effect1;
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.translations.es.effect2;

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Skills";
        this.textoInterfaz.tituloSeg = "Money and Rests";
        this.textoInterfaz.limConcentracion = "Concentration limit :";
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.effect1;
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.effect2;
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
.CartasPertenencias{
  border-radius: 10px;
}
</style>