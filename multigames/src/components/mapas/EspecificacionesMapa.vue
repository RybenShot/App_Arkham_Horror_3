<template>
  <div class="mt-2 mx-6">
    <div class="has-text-centered has-text-white">

      <div v-if="this.$store.state.datosMapa.id">
        <b-field >
          <b-input placeholder="1234-1234-1234"
              type="search"
              icon="magnify"
              v-model="this.$store.state.datosMapa.id ">
          </b-input>
          <p class="control">
              <b-button type="is-primary" label="Copiar" @click="copyCode()" />
          </p>
        </b-field>
      </div>
      

      <div class="columns mt-2 is-mobile">
        <div class="column p-0 py-1" id="barraDerechaAbajo" >
          <p>{{ textoInterfaz.votosUsuarios }}</p>
          <p>{{ this.$store.state.datosMapa.userVotes }}/5</p>
        </div>
        <div class="column p-0 py-1" >
          <p>{{ textoInterfaz.duracion }}</p>
          <p>{{ this.$store.state.datosMapa.duration }} min</p>
        </div>
      </div>

      <div class="columns is-mobile" >
        <div class="column p-0 py-1">
          <p>{{ textoInterfaz.cajaNecesaria }}</p>
          <p>{{ this.$store.state.datosMapa.expansion }}</p>
        </div>
        <div class="column p-0 py-1" id="barraIzquierdaArriba">
          <p>{{ textoInterfaz.dificultad }}</p>
          <p>{{ this.$store.state.datosMapa.difficulty }}/5</p>
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
      },
      barCode: this.$store.state.datosMapa.id 
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
    },
    async copyCode(){
      if (!this.barCode) return alert('Nada que copiar');
      // estructura para copiar a porta papeles
      const textarea = document.createElement('textarea');
      textarea.value = this.barCode;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);

      alert(copied ? 'Código copiado 😊' : 'No se pudo copiar');
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