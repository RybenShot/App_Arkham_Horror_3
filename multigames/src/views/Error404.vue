<template>
  <section class="hero is-danger is-fullheight" id="BGError404">
  <div class="hero-body">
    <div class="">
      <p class="title">Error 404</p>
      <p class="subtitle">Perdido en el espacio y el tiempo?</p>
      <button class="button is-danger"><router-link to="/">Volver a estar seguro</router-link></button>
    </div>
  </div>
</section>
</template>

<script>
export default {

}
</script>

<style>
#BGError404 {
  background-image: url(../assets/img/ZZOtros/BGError404.2.jpg);
  min-height: 120vh;
  position: relative;
  background-position: center;
  background-size: cover;
}
</style>