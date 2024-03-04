<template>
  <section>
    <!-- Parte superior -->
    <div class="columns is-mobile buttons px-3 mt-3">
      <button :class="{'is-outlined': EstadosActivos == false }" class="column is-3 button is-primary is-small p-0 m-0" @click="(this.EstadosActivos = true) , (this.EstadosTodos = false)">ACTIVOS</button>
      <p class="column title has-text-centered has-text-white p-0 m-0 ">Estados</p>
      <button :class="{'is-outlined': EstadosTodos == false }" class="column is-3 button is-primary is-small p-0 m-0" @click="(this.EstadosTodos = true) , (this.EstadosActivos = false)">TODOS</button>
    </div>

    <br>

    <!-- EstadosActivos -->
    <div v-if="this.EstadosActivos">
      <div class="columns is-mobile">
        <div class="column LadoIzquierdo" >
          <p v-if="$store.state.EstadoPacto" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="PactoSiniestro" @click="this.$store.state.modalPacto = true">Pacto Siniestro</p>
          <p v-if="$store.state.EstadoMaldito" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Maldicion" @click="(this.$store.state.modalMaldito = true)">Maldicion</p>
          <p v-if="$store.state.EstadoFatigado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Fatigado" @click="(this.$store.state.modalFatigado = true)">Fatigado</p>
          <p v-if="$store.state.EstadoSeñalado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Señalado" @click="(this.$store.state.modalSeñalado = true)">Señalado</p>
          <p v-if="$store.state.EstadoManco" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Manco" @click="(this.$store.state.modalManco = true)">Manco</p>
          <p v-if="$store.state.EstadoPerseguido" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Perseguido" @click="(this.$store.state.modalPerseguido = true)">Perseguido</p>

        </div>

        <div class="column LadoDerecho" >
          <p v-if="$store.state.EstadoMancillado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Mancillado" @click="this.$store.state.modalMancillado = true">Mancillado</p>
          <p v-if="$store.state.EstadoBendicion" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Bendicion" @click="this.$store.state.modalBendicion = true">Bendicion</p>
          <p v-if="$store.state.EstadoDeterminado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Determinado" @click="(this.$store.state.modalDeterminado = true)">Determinado</p>
          <p v-if="$store.state.EstadoSuicidio" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Suicicio" @click="(this.$store.state.modalSuicidio = true)">Al Filo</p>
          <p v-if="$store.state.estadoPerseguido_Agitado" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Agitado" @click="(this.$store.state.modalPerseguido_Agitado = true)">Agitado</p>
        </div>
      </div>
    </div>

    <!-- EstadosTodos -->
    <div v-if="this.EstadosTodos">
      <div class="columns is-mobile">
        <div class="column LadoIzquierdo" >
          <p :class="{'activado': this.$store.state.EstadoPacto == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="PactoSiniestro" @click="this.$store.state.modalPacto = true">Pacto Siniestro</p>
          <p :class="{'activado': this.$store.state.EstadoMaldito == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Maldicion" @click="(this.$store.state.modalMaldito = true)">Maldicion</p>
          <p :class="{'activado': this.$store.state.EstadoFatigado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" @click="this.$store.state.modalFatigado = true" id="Fatigado">Fatigado</p>
          <p :class="{'activado': this.$store.state.EstadoPerseguido == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" @click="this.$store.state.modalPerseguido = true" id="Perseguido">Perseguido</p>
        </div>

        <div class="column LadoDerecho" >
          <p :class="{'activado': this.$store.state.EstadoMancillado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Mancillado" @click="this.$store.state.modalMancillado = true">Mancillado</p>
          <p :class="{'activado': this.$store.state.EstadoBendicion == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Bendicion" @click="this.$store.state.modalBendicion = true">Bendicion</p>
          <p :class="{'activado': this.$store.state.EstadoDeterminado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" @click="this.$store.state.modalDeterminado = true" id="Determinado">Determinado</p>
        </div>
      </div>

      <!-- Estados Segundarios -->
      <div >
        <h2 class="title has-text-centered has-text-white">Estados Segundarios</h2>
        <p class="subtitle is-6 has-text-centered has-text-white">Estos estados no podras activarlos manualmente, son resultado de otros estados como pactos siniestros o Mancillado</p>
        <div class="columns is-mobile">
          <div class="column LadoIzquierdo" >
            <p :class="{'activado': this.$store.state.estadoPerseguido_Agitado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Agitado" @click="this.$store.state.modalPerseguido_Agitado = true">Agitado</p>
            <p :class="{'activado': this.$store.state.EstadoSuicidio == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Suicicio" @click="(this.$store.state.modalSuicidio = true)">Al Filo</p>
          </div>

          <div class="column LadoDerecho" >
            <p :class="{'activado': this.$store.state.EstadoManco == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Manco" @click="this.$store.state.modalManco = true">Manco</p>
            <p :class="{'activado': this.$store.state.EstadoSeñalado == true }" class="backgrounds title is-6 has-text-white p-4 py-5 mx-2" id="Señalado" @click="this.$store.state.modalSeñalado = true">Señalado</p>
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
    EstadosTodos: true
  }
}
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