<template>
  <div >
    <ul v-if="this.$store.state.lenguaje == 'español'">
      <router-link to="/ListaMapas" @click="SonidoTecla()"><button class="buttonsHome ">Mapas</button></router-link>
      <router-link to="/ListaPersonajes" @click="SonidoTecla()"><button class="buttonsHome ">Investigadores</button></router-link>
      <button class="buttonsHome" @click="(SonidoTecla()), (this.$store.state.StoreHomemas = true), (this.$store.state.StoreHomeDefaul = false)">Más</button>
      <a href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank" @click="SonidoTecla()"><button class="buttonsHome">Apoyanos</button></a>
    </ul>

    <ul v-if="this.$store.state.lenguaje == 'ingles'">
      <router-link to="/ListaMapas"><button class="buttonsHome ">Maps</button></router-link>
      <router-link to="/ListaPersonajes"><button class="buttonsHome ">Investigators</button></router-link>
      <button class="buttonsHome" @click="(this.$store.state.StoreHomemas = true), (this.$store.state.StoreHomeDefaul = false)">More</button>
      <a href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank"><button class="buttonsHome">Support</button></a>
    </ul>
  </div>
</template>

<script>
import { Howl } from 'howler';

const sound = new Howl({
  src: require('@/assets/sound/SonidoTecla.mp3'),
});
export default {

  methods: {
  SonidoTecla() {sound.play();},
  },
}
</script>

<style scoped>
button{
  background: none;
  border: 0;
  color: inherit;
  padding: 5px;
}
.buttonsHome{
  display: block;
  width: 50%;
  margin: 10px auto;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 1em;
  border: thick double #272727;
  border-radius: 5px;
  background: rgb(80, 80, 80);
}
</style>