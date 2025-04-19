<template>
  <section class="columns is-mobile pt-3">
    <div class="column image">
      <img :src="this.$store.state.datosPJactual.imgInv" class="is-rounded image image bordeImagen">
    </div>

    <div class="column has-text-white">
      <div>
        <p class="title is-2 has-text-weight-bold has-text-white mb-4">{{ this.$store.state.datosPJactual.name }}</p>

        <p class="has-background-dark subtitle is-6 has-text-white pl-2">{{ textoInterfaz.posicion }}</p>
      </div>

      <div class="has-text-centered mt-4 mr-2">
        <div class="columns is-mobile">
          <!-- <div class="column p-0 py-1" id="barraDerechaAbajo" @click="this.$store.state.modalPertenenciasDetalle = true"> Seleccionar Investigador -->
          <div class="column p-0 py-1" id="barraDerechaAbajo" @click="redireccionarTemporalmente()">
            <i class="fas fa-suitcase"></i>
            <p>{{ textoInterfaz.pertenencias }}</p>
          </div>
          <div class="column p-0 py-1" @click="this.$store.state.modalHistoriaDetalle = true">
            <i class="fas fa-id-card"></i>
            <p>{{ textoInterfaz.historia }}</p>
          </div>
        </div>

        <div class="columns is-mobile" @click="this.$store.state.modalArquetipoDetalle = true">
          <div class="column p-0 py-1">
            <i class="fas fa-bolt"></i>
            <p>{{ textoInterfaz.arquetipo }}</p>
          </div>
          <div class="column p-0 py-1" id="barraIzquierdaArriba">
            <i class="fas fa-money-bill-wave"></i>
            <p>{{ this.$store.state.datosPJactual.atributes.money }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: "Datos Basicos Detalle",
  data(){
    return{
      textoInterfaz: {
        pertenencias: "",
        historia: "",
        arquetipo: "",
        posicion: "",
      }
    }
  },
  methods:{
    redireccionarTemporalmente(){
      this.$router.push('/enproceso');
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.pertenencias = "Pertenencias";
        this.textoInterfaz.historia = "Historia";
        this.textoInterfaz.arquetipo = "Arquetipo";
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.translations.es.position;

      }else if (this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.pertenencias = "Belongings";
        this.textoInterfaz.historia = "History";
        this.textoInterfaz.arquetipo = "Archetype";
        this.textoInterfaz.posicion = this.$store.state.datosPJactual.position;
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
.bordeImagen{
  border: thick double #F2C94C;
}

#barraDerechaAbajo{
  border-right: solid 2px;
  border-bottom: solid 2px
}

#barraIzquierdaArriba{
  border-left: solid 2px;
  border-top: solid 2px
}

</style>