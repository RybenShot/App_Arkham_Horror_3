<template>
      <div class="modal is-active ">
        <div class="modal-background"></div>
        <div class="">
          <div class="modal-card m-0">
            <header class="modal-card-head BGHistoria mb-0 columns is-mobile">
              <div class="column has-text-left">
                <p class="modal-card-title has-text-white">{{ textoInterfaz.titulo }}</p>
              </div>
              <div class="column has-text-right has-text-white">
                <p v-if="reproduciendo == false" @click="(reproducirAudio()), (reproduciendo = true)"><i class="fas fa-2x fa-volume-up"></i></p>
                <p v-if="reproduciendo == true" @click="(detenerAudio()), (reproduciendo = false)" ><i class="fas fa-2x fa-pause-circle"></i></p>
              </div>
            </header>
            
            <section class="modal-card-body hero is-large py-2">

              <!-- Nombre Personaje -->
              <p class="has-text-centered title is-italic mb-0">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
              <div class="lineaSeparatoria mx-6">
                <div class="columns is-mobile" style="position: relative; top: 4px">
                  <i class=" has-text-left fas fa-dot-circle column p-0"></i>
                  <i class=" has-text-right fas fa-dot-circle column p-0"></i>
                </div>
              </div>
              <br>

              <p class="subtitle is-7 has-text-centered">{{ textoInterfaz.historia }}</p>
              <br>

              <!-- TODO corregir esta atrocidad -->
              <div v-if="
                this.$store.state.datosPJactual.nombrePJ == 'Marie Lambeau' ||
                this.$store.state.datosPJactual.nombrePJ == 'Jenny Barnes' ||
                this.$store.state.datosPJactual.nombrePJ == 'Dexter Drake' ||
                this.$store.state.datosPJactual.nombrePJ == 'Rex Murphy' ||
                this.$store.state.datosPJactual.nombrePJ == 'Agnes Baker' ||
                this.$store.state.datosPJactual.nombrePJ == 'Gloria Goldberg'"
                class="has-text-centered">
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Marie Lambeau'" class="has-ratio" :src="`https://www.youtube.com/embed/nLVtMyycF2A`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Jenny Barnes'" class="has-ratio" :src="`https://www.youtube.com/embed/A3eG_3SDUTA`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Dexter Drake'" class="has-ratio" :src="`https://www.youtube.com/embed/nCDlFIKAKUw`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Rex Murphy'" class="has-ratio" :src="`https://www.youtube.com/embed/2CNEDE9mJ-0`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Agnes Baker'" class="has-ratio" :src="`https://www.youtube.com/embed/Cx4GNKVIWHQ`" frameborder="0" allowfullscreen></iframe>
                  <iframe v-if="this.$store.state.datosPJactual.nombrePJ == 'Gloria Goldberg'" class="has-ratio" :src="`https://www.youtube.com/embed/k7XDNDEgZhM`" frameborder="0" allowfullscreen></iframe>
              </div>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless">
                  <button @click="(this.$store.state.modalHistoriaDetalle = false), (reproduciendo = false), (detenerAudio())" class="button is-link is-fullwidth">
                    <p>{{ textoInterfaz.volver }}</p>
                  </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
</template>

<script>
import { Howl } from 'howler';
const sounds = {
  1: new Howl({ src: require('@/assets/sound/Locucion/personajes/1-Tommy.mp3') }),
  2: new Howl({ src: require('@/assets/sound/Locucion/personajes/2-Marie.mp3') }),
  3: new Howl({ src: require('@/assets/sound/Locucion/personajes/3-Jenny.mp3') }),
  4: new Howl({ src: require('@/assets/sound/Locucion/personajes/4-Dexter.mp3') }),
  6: new Howl({ src: require('@/assets/sound/Locucion/personajes/6-Rex.mp3') }),
  8: new Howl({ src: require('@/assets/sound/Locucion/personajes/8-Agnes.mp3') }),
  9: new Howl({ src: require('@/assets/sound/Locucion/personajes/9-Michael.mp3') })
};

export default {
  name: "modal_Historia_Personaje",
  data(){
    return {
      reproduciendo : false,
      textoInterfaz: {
        titulo: "",
        volver: "",
        historia: ""
      },
      enlaceVideo: ""
    }
  },
  methods: {
    reproducirAudio() {
      const idPersonaje = this.$store.state.datosPJactual.idPersonaje;
      const sound = sounds[idPersonaje];
      sound.play()
    },
    detenerAudio() {
      const idPersonaje = this.$store.state.datosPJactual.idPersonaje;
      const sound = sounds[idPersonaje];
      sound.stop()
    },
    rellenaTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "La historia hasta ahora...";
        this.textoInterfaz.volver = "Volver";
        this.textoInterfaz.historia = this.$store.state.datosPJactual.historia;

      }else if(this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.titulo = "The story until now";
        this.textoInterfaz.volver = "Go back";
        this.textoInterfaz.historia = this.$store.state.datosPJactual.ENhistoria;
      }
    }
  },
  mounted(){
    this.rellenaTextoSegunIdioma();
  }
}
</script>

<style scoped>
.BGHistoria{
  background-image: url("@/assets/img/ZZOtros/BGModals/IMGModalHistoria.jpg");
  background-position: center;
  background-size: cover;
}
.lineaSeparatoria{
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}
</style>