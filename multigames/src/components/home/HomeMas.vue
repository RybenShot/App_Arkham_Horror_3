<template>
    <div >
      <ul v-if="this.$store.state.lenguaje == 'español'">
        <button class="buttonsHome" @click="(SonidoTecla()), (this.$store.state.StoreHomemas = false), (this.$store.state.StoreHomeDefaul = true)">Volver</button>
        <button class="buttonsHome" @click="SonidoTecla()">Mi colección</button>
        <button class="buttonsHome" @click="SonidoTecla()">Opciones</button>
        <button class="buttonsHome" @click="SonidoTecla()">Creditos</button>
      </ul>

      <ul v-if="this.$store.state.lenguaje == 'ingles'">
        <button class="buttonsHome" @click="(SonidoTecla()), (this.$store.state.StoreHomemas = false), (this.$store.state.StoreHomeDefaul = true)">Go back</button>
        <router-link to="/PersonajesAHClasico" @click="SonidoTecla()"><button class="buttonsHome ">My colection</button></router-link>
        <button class="buttonsHome " @click="SonidoTecla()">Settings</button>
        <button class="buttonsHome " @click="SonidoTecla()">Credits</button>
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