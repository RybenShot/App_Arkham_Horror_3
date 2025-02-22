<template>
  <section class="mt-4 mb-4 has-text-white">
    <p v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.datosPJactual.efecto1 }}</p>
    <p v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.datosPJactual.ENefecto1 }}</p>

    <div v-if="this.$store.state.datosPJactual.efecto2">
      <p v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.datosPJactual.efecto2 }}</p>
      <p v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.datosPJactual.ENefecto2 }}</p>
    </div>

    <p v-if="this.$store.state.lenguaje == 'español'" class="is-italic pt-2 has-text-centered">{{ this.$store.state.datosPJactual.frase }}</p>
    <p v-if="this.$store.state.lenguaje == 'ingles'" class="is-italic pt-2 has-text-centered">{{ this.$store.state.datosPJactual.ENfrase }}</p>

    <p class="has-text-weight-semibold is-underlined pt-3"> {{ textoInterfaz.limConcentracion }} : {{ this.$store.state.datosPJactual.limConcentracion }}</p>
  </section>
</template>

<script>
export default {
  name: "Habilidades Detalle",
  data(){
    return{
      textoInterfaz: {
        limConcentracion: ""
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.limConcentracion = "Limite de concentración";
      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.limConcentracion = "Concentration limit";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>

</style>