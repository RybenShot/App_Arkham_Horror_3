<template>
  <section>
    <p class="subtitle has-text-white has-text-centered mb-4">Mitos</p>
    <h1 class="title has-text-white has-text-centered">{{ this.$store.state.datosMapa.title }}</h1>
    <hr>

    <div class=" mb-2">
      <button class="button is-success is-rounded">Mezclar fichas</button>
      <button class="button is-success is-rounded">Rounded</button>
      <button class="button is-success is-rounded">Rounded</button>
    </div>

    <p class="has-text-white">Reserva de Mitos</p>
    <div class="mb-2">
      <i class="fa-1x fas fa-star-of-life has-text-perdicion px-1"></i>
      <i class="fa-1x fas fa-star-of-life has-text-perdicion px-1"></i>
      <i class="fa-1x fas fa-star-of-life has-text-perdicion px-1"></i>

      <i class="fa-1x fas fa-spider has-text-monster px-1"></i>
      <i class="fa-1x fas fa-spider has-text-monster px-1"></i>

      <i class="fa-1x fas fa-search has-text-success px-1"></i>
      <i class="fa-1x fas fa-search has-text-success px-1"></i>

      <i class="fa-1x fas fa-scroll has-text-warning px-1"></i>
      <i class="fa-1x fas fa-scroll has-text-warning px-1"></i>

      <i class="fa-1x fab fa-sith has-text-link px-1"></i>

      <i class="fa-1x fab fa-hubspot has-text-danger px-1"></i>
    </div>

    <button class="button is-success is-rounded is-fullwidth">Revelar Ficha</button>

  </section>
</template>

<script>
export default {
  name: "Reserva de Mitos",
  data(){
    return{

    }
  },
}
</script>
PRIMERA MEZCLA
1- mezclo el orden de las Fichas

REVELAR FICHA
2- mando funcion de sacar una Ficha
  selecciono la primera de la lista que no tengla la propiedad "revelada" en "true"
  la muestro
  muestro notificacion
  pongo la propiedad "revelada" de la ficha sacada en "true"

3- RESERVA AGOTADA
  cogemos todas las fichas que tengan a propiedad "revelada" y la ponemos en "false"
  volvemos a ejecutar la funcion del principio de mezclar las fichas dejandolo asi listo para una nueva rellenarTextoSegunIdioma

4- AÑADIR FICHAS DE MITOS
   crear un boton, abre modal y selecciona la ficha que quieres AÑADIR
   añade la ficha seleccionada al array de mitos con la propiedad "revelada" en "false"

5- QUITAR UNA FICHA DE MITOS
  crear boton, abre modal y selecciona la ficha que quiere QUITAR
  busca la ficha seleccionada y la borra del array

6- DEVOLVER FICHA A LA RESERVA
  crea un boton, abre modal y selecciona la fichas que quiere DEVOLVER
  busca la ficha seleccionada que tenga la propiedad "revelada" en "true" y la cambia a "false"

<style scoped>
.has-text-monster{
  color: #7448c7 !important;
}
.has-text-perdicion{
  color: #8b5b33 !important;
}
</style>