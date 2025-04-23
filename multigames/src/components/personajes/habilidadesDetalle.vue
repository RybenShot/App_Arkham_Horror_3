<template>
  <section class="mt-4 mb-4 has-text-white">
    <p>>> {{ textoInterfaz.effect1 }}</p>
    <br>
    <p>>> {{ textoInterfaz.effect2 }}</p>
    <p class="is-italic pt-2 has-text-centered">{{ textoInterfaz.phrase }}</p>
    <p class="has-text-weight-semibold is-underlined pt-3"> {{ textoInterfaz.focusLimit_text }} : {{ textoInterfaz.focusLimit }}</p>
  </section>
</template>

<script>
export default {
  name: "Habilidades Detalle",
  data(){
    return{
      textoInterfaz: {
        effect1: "",
        effect2: "",
        effect3: "",
        phrase: "",
        focusLimit_text: "",
        focusLimit:""
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.effect1 = this.$store.state.datosPJactual.translations.es.effect1;
        this.textoInterfaz.effect2 = this.$store.state.datosPJactual.translations.es.effect2;
        this.textoInterfaz.effect3 = this.$store.state.datosPJactual.translations.es.effect3;
        this.textoInterfaz.phrase = this.$store.state.datosPJactual.translations.es.phrase;
        this.textoInterfaz.focusLimit = this.$store.state.datosPJactual.translations.es.focusLimit;
        this.textoInterfaz.focusLimit_text = "Limite de concentración";
      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.effect1 = this.$store.state.datosPJactual.effect1;
        this.textoInterfaz.effect2 = this.$store.state.datosPJactual.effect2;
        this.textoInterfaz.effect3 = this.$store.state.datosPJactual.effect3;
        this.textoInterfaz.phrase = this.$store.state.datosPJactual.ENphrase;
        this.textoInterfaz.focusLimit = this.$store.state.datosPJactual.focusLimit;
        this.textoInterfaz.focusLimit_text = "Concentration limit";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>