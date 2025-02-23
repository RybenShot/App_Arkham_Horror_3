<template>
  <div class="mt-3">
    <div class="mx-3 has-background-grey-light py-1"></div>
    <div class="columns is-mobile mb-0">
      <div class="column mx-6 mt-3 has-background-light">
        <div class="columns is-mobile m-0">
          <p class="column title is-size-5  is-underlined mb-0">{{ textoInterfaz.titulo }}</p>

          <!-- Voz en Off -->
          <div class="column is-2">
            <p v-if="reproduciendo == false" @click="(reproducirAudio()), (reproduciendo = true)"><i class="fas fa-2x fa-volume-up"></i></p>
            <p v-if="reproduciendo == true" @click="(detenerAudio()), (reproduciendo = false)" ><i class="fas fa-2x fa-pause-circle"></i></p>
          </div>
        </div>
        <p class="subtitle is-size-7">{{ textoInterfaz.descripcion }}</p>
      </div>
    </div>
    <div class="mx-3 has-background-grey-light py-1"></div>
  </div>
</template>

<script>
import { Howl } from 'howler';
const sounds = {
  0: new Howl({ src: require('@/assets/sound/Locucion/mapas/1-Azathoth.mp3') }),
  1: new Howl({ src: require('@/assets/sound/Locucion/mapas/2-Festin.mp3') }),
  2: new Howl({ src: require('@/assets/sound/Locucion/mapas/3-ElVelo.mp3') }),
  3: new Howl({ src: require('@/assets/sound/Locucion/mapas/4-Ecos.mp3') }),
};

export default {
  name: 'Rollo de historia',
  data(){
    return {
      reproduciendo : false,
      textoInterfaz:{
        titulo: "",
        descripcion: ""
      },
    }
  },
  methods: {
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = this.$store.state.datosMapa.title;
        this.textoInterfaz.descripcion = this.$store.state.datosMapa.description;
      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = this.$store.state.datosMapa.ENtitle;
        this.textoInterfaz.descripcion = this.$store.state.datosMapa.ENdescription;
      }
    },
    reproducirAudio() {
      const idMapasound = this.$store.state.datosMapa.idMapa;
      const sound = sounds[idMapasound];
      sound.play()
    },
    detenerAudio() {
      const idMapasound = this.$store.state.datosMapa.idMapa;
      const sound = sounds[idMapasound];
      sound.stop()
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>