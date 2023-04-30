<template>
  <div>
    <div id="VistaMovil">
      <router-view/>
    </div><!-- end Vista Movil -->

    <!-- Primeras pruebas entre ingles y Español -->

    <div id="VistaNoValida">
      <section class="container is-fullhd has-background-dark hero is-fullheight">
        <div class="hero-body">
          <div class="">
            <p class="title has-text-white has-text-centered" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.responsive.titulo'"></p>
            <p class="title has-text-white has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.responsive.titulo'"></p>

             <p class="subtitle has-text-white has-text-centered" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.responsive.parrafo_1'"><!--Aqui viene la parte de español--></p> 
             <p class="subtitle has-text-white has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.responsive.parrafo_1'"><!--Aqui viene la parte de ingles--></p> 

            <img src="@/assets/img/ZZOtros/70242-man-working.gif" alt="" style="height: 400px" id="imgWorking">

            <p class="title has-text-white is-4 has-text-centered mt-4" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.responsive.parrafo_2'"></p>
            <p class="title has-text-white is-4 has-text-centered mt-4" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.responsive.parrafo_2'"></p>

          </div>
        </div>
      </section>
    </div><!-- end Vista No Valida -->

  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
@import "./views/CssHome.css";
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');
 * {
   padding: 0; 
   margin: 0;
   box-sizing: border-box;
 }

#app {
  font-family: 'Roboto Flex', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#imgWorking{
  display: block;
  margin: auto;
}
</style>
