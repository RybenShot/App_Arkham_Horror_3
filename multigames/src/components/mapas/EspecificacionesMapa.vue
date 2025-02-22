<template>
  <div class="mt-5 mx-6">
    <div class="has-text-centered has-text-white">
      <div class="columns is-mobile">
        <div class="column p-0 py-1" id="barraDerechaAbajo" >
          <p>{{ textoInterfaz.votosUsuarios }}</p>
          <p>{{ this.$store.state.datosMapa.votosUsuariosMapa }} de 5</p>
        </div>
        <div class="column p-0 py-1" >
          <p>{{ textoInterfaz.duracion }}</p>
          <p>{{ this.$store.state.datosMapa.ducacionMapa }} min</p>
        </div>
      </div>

      <div class="columns is-mobile" >
        <div class="column p-0 py-1">
          <p>{{ textoInterfaz.cajaNecesaria }}</p>
          <p>{{ this.$store.state.datosMapa.expansionMapa }}</p>
        </div>
        <div class="column p-0 py-1" id="barraIzquierdaArriba">
          <p>{{ textoInterfaz.dificultad }}</p>
          <p>{{ this.$store.state.datosMapa.dificultadMapa }} de 5</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Especificaciones de mapas",
  data(){
    return{
      textoInterfaz: {
        votosUsuarios: "",
        duracion: "",
        cajaNecesaria: "",
        dificultad: ""
      }
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.votosUsuarios = "Votos de Usuarios";
        this.textoInterfaz.duracion = "Duracion";
        this.textoInterfaz.cajaNecesaria = "Caja necesaria";
        this.textoInterfaz.dificultad = "Dificultad";
      }else{
        this.textoInterfaz.votosUsuarios = "User Votes";
        this.textoInterfaz.duracion = "Duration";
        this.textoInterfaz.cajaNecesaria = "Required Box";
        this.textoInterfaz.dificultad = "Difficulty";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style scoped>
#barraDerechaAbajo{
  border-right: solid 2px;
  border-bottom: solid 2px
}

#barraIzquierdaArriba{
  border-left: solid 2px;
  border-top: solid 2px
}

p{
  color: #fff; /* Color del texto */
  padding: 1px;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.733);
}
</style>s