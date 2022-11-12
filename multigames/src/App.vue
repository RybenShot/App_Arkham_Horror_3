<template>
  <div>
    <div id="VistaMovil">
      <router-view/>
    </div><!-- end Vista Movil -->

    <div id="VistaNoValida">
      <section class="container is-fullhd has-background-dark hero is-fullheight">
        <div class="hero-body">
          <div class="">
            <p class="title has-text-white has-text-centered">
              Vista en PC no disponible
            </p>
            <p class="subtitle has-text-white has-text-centered">
               La aplicación está en una fase Beta y ha sido diseñada (en principio) para la vista móvil. Al ser solo 1 persona cuesta mucho llevar un proyecto tan amplio adelante, así que he decidido focalizar todo el esfuerzo en perfeccionar primero en vista móvil, después ya me centraré en el responsive.
            </p>
            <img src="@/assets/img/ZZOtros/70242-man-working.gif" alt="" style="height: 400px" id="imgWorking">
            <p class="title has-text-white is-4 has-text-centered mt-4">
               Por favor, inicie la aplicación en un móvil o ponga el buscador en modo móvil para poder disfrutarla. Muchas gracias.
            </p>
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
