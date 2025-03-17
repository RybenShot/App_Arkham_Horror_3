<template>
  <div>
    <div v-if="this.$store.state.datosMapa.expansionMapa == 'AHBase'"><ListaEnemigosAHBase/></div>
    <div v-if="this.$store.state.datosMapa.expansionMapa == 'AH Mareas'"><ListaEnemigosAHMareas/></div>
    <div v-if="this.$store.state.datosMapa.expansionMapa == 'AH Noche Cerrada'"><ListaEnemigosAHNoche/></div>
    <div v-if="this.$store.state.datosMapa.expansionMapa == 'AH Secretos'"><ListaEnemigosAHSecretos/></div>
  </div>
</template>

<script>
import ListaEnemigosAHBase from "@/components/mapas/ExpansionesEnemigos/enemigosAHBase.vue";
import ListaEnemigosAHMareas from "@/components/mapas/ExpansionesEnemigos/enemigosAHMareasTenerbosas.vue";
import ListaEnemigosAHNoche from "@/components/mapas/ExpansionesEnemigos/enemigosAHNoche.vue";
import ListaEnemigosAHSecretos from "@/components/mapas/ExpansionesEnemigos/enemigosAHSecretos.vue"
export default {
  name: "Switcher Enemigos", 
  components: {
    ListaEnemigosAHBase,
    ListaEnemigosAHMareas,
    ListaEnemigosAHNoche,
    ListaEnemigosAHSecretos
  }
}
</script>