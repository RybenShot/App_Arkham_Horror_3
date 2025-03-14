<template>
  <section>
    <p class="title has-text-centered has-text-white">{{ textoInterfaz.titulo }}</p>
    <div class="container mx-3 has-text-white">
      <p>{{ textoInterfaz.efecto1 }}</p>
      <p v-if="this.$store.state.datosPJactual.efecto2">{{ textoInterfaz.efecto2 }}</p>
      <p class="has-text-weight-semibold is-underlined pt-3">{{ textoInterfaz.limConcentracion }} {{ this.$store.state.datosPJactual.limConcentracion }}</p>
    </div>

    <hr>

    <h1 class="title has-text-white has-text-centered">Pertenencias Iniciales</h1>

    <br>

    <div class="columns is-mobile mx-3">
      <!-- Per. 1 -->
      <img  class="CartasPertenencias cajaCartas" :src="this.$store.state.datosPJactual.Pertenencia1.fotoCartaPertenenciaURL" alt="">

      <!-- Per 2 -->
      <img v-if="this.$store.state.datosPJactual.Pertenencia2 != null" class="CartasPertenencias cajaCartas column" :src="this.$store.state.datosPJactual.Pertenencia2.fotoCartaPertenenciaURL" alt="">
      
    </div>
    <br>

    <div class="columns is-mobile mx-3">
      <!-- Per 3 -->
      <img :class="{'column': this.$store.state.datosPJactual.Pertenencia4 != null }" class="CartasPertenencias cajaCartas" :src="this.$store.state.datosPJactual.Pertenencia3.fotoCartaPertenenciaURL" alt="">

      <!-- Per 4 -->
      <img v-if="this.$store.state.datosPJactual.Pertenencia4 != null" class="CartasPertenencias cajaCartas column" :src="this.$store.state.datosPJactual.Pertenencia4.fotoCartaPertenenciaURL" alt="">

      <!-- Condiciones especiales de personajes -->
      <div v-if="this.$store.state.datosPJactual.Pertenencia4 == null" class="column has-text-white">
          <!-- Esta partye hayq ue corregirla, para que aparezca tambien en ingles -->
        <p v-if="this.$store.state.datosPJactual.nombrePJ == 'Calvin Wrigth'">Si coges este objeto, debes añadirte un "Pacto Siniestro"</p>
      </div>
    </div>

  
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
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Habilidades";
        this.textoInterfaz.tituloSeg = "Dinero y Restos";
        this.textoInterfaz.limConcentracion = "Limite de concentración :";
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.efecto1;
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.efecto2;

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Skills";
        this.textoInterfaz.tituloSeg = "Money and Rests";
        this.textoInterfaz.limConcentracion = "Concentration limit :";
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.ENefecto1;
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.ENefecto2;
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