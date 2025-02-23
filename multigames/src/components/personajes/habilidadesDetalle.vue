<template>
  <section class="mt-4 mb-4 has-text-white">
    <p>{{ textoInterfaz.efecto1 }}</p>
    <div v-if="this.$store.state.datosPJactual.efecto2">
      <p>{{ textoInterfaz.efecto2 }}</p>
    </div>
    <p class="is-italic pt-2 has-text-centered">{{ textoInterfaz.frase }}</p>
    <p class="has-text-weight-semibold is-underlined pt-3"> {{ textoInterfaz.limConcentracion }} : {{ this.$store.state.datosPJactual.limConcentracion }}</p>
  </section>
</template>

<script>
export default {
  name: "Habilidades Detalle",
  data(){
    return{
      textoInterfaz: {
        efecto1: "",
        efecto2: "",
        frase: "",
        limConcentracion: ""
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.efecto1;
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.efecto2;
        this.textoInterfaz.frase = this.$store.state.datosPJactual.frase;
        this.textoInterfaz.limConcentracion = "Limite de concentración";
      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.efecto1 = this.$store.state.datosPJactual.ENefecto1;
        this.textoInterfaz.efecto2 = this.$store.state.datosPJactual.ENefecto2;
        this.textoInterfaz.frase = this.$store.state.datosPJactual.ENfrase;
        this.textoInterfaz.limConcentracion = "Concentration limit";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>