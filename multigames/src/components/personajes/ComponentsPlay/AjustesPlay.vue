<template>
  <div >
    <div id="ventana-ajustes">
      <p class="title has-text-centered has-text-white">Ajustes</p>

      <div class="columns is-mobile">
        <div class="column has-text-right ">
          <p class="title is-6 has-text-white mb-3 pt-2">Musica Ambiental</p>
          <p class="title is-6 has-text-white">Efecto Inmersión</p>
        </div>
        <div class="column has-text-left">
          <div class="buttons has-addons m-0">
            <button :class="{'is-outlined': $store.state.PistasAudio.EfectoInmersion == false }" @click="$store.state.PistasAudio.EfectoInmersion = true" class="button is-success is-small is-selected">ON</button>
            <button :class="{'is-outlined': $store.state.PistasAudio.EfectoInmersion == true }" @click="$store.state.PistasAudio.EfectoInmersion = false" class="button is-danger is-small">OFF</button>
          </div>
          <div class="buttons has-addons">
            <button :class="{'is-outlined': $store.state.PistasAudio.MusicaHambiental == false }" @click="$store.state.PistasAudio.MusicaHambiental = true" class="button is-success is-small is-selected">ON</button>
            <button :class="{'is-outlined': $store.state.PistasAudio.MusicaHambiental == true }" @click="$store.state.PistasAudio.MusicaHambiental = false" class="button is-danger is-small">OFF</button>
          </div>
        </div>
      </div>
    </div>
    

    <footer>
      <router-link to="/ListaPersonajes"><button class="button is-fullwidth is-dark mb-2"><i class="fas fa-users mx-3"></i>Volver a selección de personaje</button></router-link>
      <router-link to="/"><button class="button is-fullwidth  is-black"><i class="fas fa-power-off mx-3"></i>Terminar partida</button></router-link>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#ventana-ajustes{
  height: 40vh;
}
</style>