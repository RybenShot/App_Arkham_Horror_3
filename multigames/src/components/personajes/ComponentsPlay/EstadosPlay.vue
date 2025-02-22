<template>
  <section>
    <!-- Parte superior -->
    <div class="columns is-mobile buttons px-3 mt-3">
      <button :class="{'is-outlined': EstadosActivos == false }" class="column is-3 button is-primary is-small p-0 m-0" @click="(this.EstadosActivos = true) , (this.EstadosTodos = false)">{{ textoInterfaz.botones.activos }}</button>
      <p class="column title has-text-centered has-text-white p-0 m-0 ">{{ textoInterfaz.titulo }}</p>
      <button :class="{'is-outlined': EstadosTodos == false }" class="column is-3 button is-primary is-small p-0 m-0" @click="(this.EstadosTodos = true) , (this.EstadosActivos = false)">{{ textoInterfaz.botones.todos }}</button>
    </div>

    <br>

    <!-- EstadosActivos -->
    <div v-if="this.EstadosActivos">
      <div class="columns is-mobile">
        <div class="column LadoIzquierdo" >
          <p v-if="$store.state.EstadoPacto" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="PactoSiniestro" @click="this.$store.state.modalPacto = true">{{ textoInterfaz.estados.pacto }}</p>
          <p v-if="$store.state.EstadoMaldito" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Maldicion" @click="(this.$store.state.modalMaldito = true)">{{ textoInterfaz.estados.maldito }}</p>
          <p v-if="$store.state.EstadoFatigado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Fatigado" @click="(this.$store.state.modalFatigado = true)">{{ textoInterfaz.estados.fatigado }}</p>
          <p v-if="$store.state.EstadoSeñalado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Señalado" @click="(this.$store.state.modalSeñalado = true)">{{ textoInterfaz.estados.señalado }}</p>
          <p v-if="$store.state.EstadoManco" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Manco" @click="(this.$store.state.modalManco = true)">{{ textoInterfaz.estados.manco }}</p>
          <p v-if="$store.state.EstadoPerseguido" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Perseguido" @click="(this.$store.state.modalPerseguido = true)">{{ textoInterfaz.estados.perseguido }}</p>

        </div>

        <div class="column LadoDerecho" >
          <p v-if="$store.state.EstadoMancillado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Mancillado" @click="this.$store.state.modalMancillado = true">{{ textoInterfaz.estados.mancillado }}</p>
          <p v-if="$store.state.EstadoBendicion" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Bendicion" @click="this.$store.state.modalBendicion = true">{{ textoInterfaz.estados.bendicion }}</p>
          <p v-if="$store.state.EstadoDeterminado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Determinado" @click="(this.$store.state.modalDeterminado = true)">{{ textoInterfaz.estados.determinado }}</p>
          <p v-if="$store.state.EstadoSuicidio" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Suicicio" @click="(this.$store.state.modalSuicidio = true)">{{ textoInterfaz.estados.alFilo }}</p>
          <p v-if="$store.state.estadoPerseguido_Agitado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Agitado" @click="(this.$store.state.modalPerseguido_Agitado = true)">{{ textoInterfaz.estados.agitado }}</p>
        </div>
      </div>
    </div>

    <!-- EstadosTodos -->
    <div v-if="this.EstadosTodos">
      <div class="columns is-mobile">
        <div class="column LadoIzquierdo" >
          <p :class="{'activado': this.$store.state.EstadoPacto == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="PactoSiniestro" @click="this.$store.state.modalPacto = true">{{ textoInterfaz.estados.pacto }}</p>
          <p :class="{'activado': this.$store.state.EstadoMaldito == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Maldicion" @click="(this.$store.state.modalMaldito = true)">{{ textoInterfaz.estados.maldito }}</p>
          <p :class="{'activado': this.$store.state.EstadoFatigado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" @click="this.$store.state.modalFatigado = true" id="Fatigado">{{ textoInterfaz.estados.fatigado }}</p>
          <p :class="{'activado': this.$store.state.EstadoPerseguido == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" @click="this.$store.state.modalPerseguido = true" id="Perseguido">{{ textoInterfaz.estados.perseguido }}</p>
        </div>

        <div class="column LadoDerecho" >
          <p :class="{'activado': this.$store.state.EstadoMancillado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Mancillado" @click="this.$store.state.modalMancillado = true">{{ textoInterfaz.estados.mancillado }}</p>
          <p :class="{'activado': this.$store.state.EstadoBendicion == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Bendicion" @click="this.$store.state.modalBendicion = true">{{ textoInterfaz.estados.bendicion }}</p>
          <p :class="{'activado': this.$store.state.EstadoDeterminado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" @click="this.$store.state.modalDeterminado = true" id="Determinado">{{ textoInterfaz.estados.determinado }}</p>
        </div>
      </div>

      <!-- Estados Segundarios -->
      <div >
        <h2 class="title has-text-centered has-text-white">{{ textoInterfaz.tituloSeg }}</h2>
        <p class="subtitle is-6 has-text-centered has-text-white">{{ textoInterfaz.desrSeg }}</p>
        <div class="columns is-mobile">
          <div class="column LadoIzquierdo" >
            <p :class="{'activado': this.$store.state.estadoPerseguido_Agitado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Agitado" @click="this.$store.state.modalPerseguido_Agitado = true">{{ textoInterfaz.estados.agitado }}</p>
            <p :class="{'activado': this.$store.state.EstadoSuicidio == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Suicicio" @click="(this.$store.state.modalSuicidio = true)">{{ textoInterfaz.estados.alFilo }}</p>
          </div>

          <div class="column LadoDerecho" >
            <p :class="{'activado': this.$store.state.EstadoManco == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Manco" @click="this.$store.state.modalManco = true">{{ textoInterfaz.estados.mancillado }}</p>
            <p :class="{'activado': this.$store.state.EstadoSeñalado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Señalado" @click="this.$store.state.modalSeñalado = true">{{ textoInterfaz.estados.señalado }}</p>
          </div>
        </div >
        
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Estados",
  data(){
    return{
      EstadosActivos: false,
      EstadosTodos: true,

      textoInterfaz:{
        titulo: "",
        tituloSeg:"",
        desrSeg:"",
        botones: {
          activos: "",
          todos: ""
        },
        estados: {
          pacto: "",
          maldito: "",
          fatigado: "",
          perseguido: "",
          mancillado: "",
          bendicion: "",
          determinado: "",
          alFilo: "",
          agitado: "",
          manco: "",
          señalado: ""
        }
      },
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Estados";
        this.textoInterfaz.tituloSeg = "Estados Segundarios";
        this.textoInterfaz.desrSeg = "Estos estados no podras activarlos manualmente, son resultado de otros estados como pactos siniestros o Mancillado";
        this.textoInterfaz.botones.activos = "Activos";
        this.textoInterfaz.botones.todos = "Todos";
        this.textoInterfaz.estados.pacto = "Pacto Siniestro";
        this.textoInterfaz.estados.maldito = "Maldicion";
        this.textoInterfaz.estados.fatigado = "Fatigado";
        this.textoInterfaz.estados.perseguido = "Perseguido";
        this.textoInterfaz.estados.mancillado = "Mancillado";
        this.textoInterfaz.estados.bendicion = "Bendicion";
        this.textoInterfaz.estados.determinado = "Determinado";
        this.textoInterfaz.estados.alFilo = "Al Filo";
        this.textoInterfaz.estados.agitado = "Agitado";
        this.textoInterfaz.estados.manco = "Manco";
        this.textoInterfaz.estados.señalado = "Señalado";
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "States";
        this.textoInterfaz.tituloSeg = "Secondary States";
        this.textoInterfaz.desrSeg = "These states cannot be activated manually, they are the result of other states such as sinister pacts or Defiled";
        this.textoInterfaz.botones.activos = "Active";
        this.textoInterfaz.botones.todos = "All";
        this.textoInterfaz.estados.pacto = "Sinister Pact";
        this.textoInterfaz.estados.maldito = "Curse";
        this.textoInterfaz.estados.fatigado = "Fatigued";
        this.textoInterfaz.estados.perseguido = "Pursued";
        this.textoInterfaz.estados.mancillado = "Defiled";
        this.textoInterfaz.estados.bendicion = "Blessing";
        this.textoInterfaz.estados.determinado = "Determined";
        this.textoInterfaz.estados.alFilo = "On the Edge";
        this.textoInterfaz.estados.agitado = "Agitated";
        this.textoInterfaz.estados.manco = "One-armed";
        this.textoInterfaz.estados.señalado = "Marked";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  },
}
</script>

<style>
.backgrounds{
  background-position: center;
  background-size: cover;
}

#PactoSiniestro{background-image: url(@/assets/img/Estados/PactoSiniestro.jpg);}
#Maldicion{background-image: url(@/assets/img/Estados/Maldicion.jpg);}
#Fatigado{background-image: url(@/assets/img/Estados/Mancillado.jpg);}
#Mancillado{background-image: url(@/assets/img/Estados/Mancillado.jpg);}
#Bendicion{background-image: url(@/assets/img/Estados/Bendicion.jpg);}
#Determinado{background-image: url(@/assets/img/Estados/Determinado.jpg);}
#Fatigado{background-image: url(@/assets/img/Estados/Fatigado.jpg);}
#Perseguido{background-image: url(@/assets/img/Estados/Perseguido.jpg);}
#Agitado{background-image: url(@/assets/img/Estados/Agitado.jpg);}
#Señalado{background-image: url(@/assets/img/Estados/Señalado.jpg);}
#Suicicio{background-image: url(@/assets/img/Estados/Suicidio.jpg);}
#Manco{background-image: url(@/assets/img/Estados/Manco.jpg);}


.activado{
  border: solid #1eff00;
  box-shadow: 0 0 20px #1eff00;
}
</style>