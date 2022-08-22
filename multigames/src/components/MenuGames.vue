<template>
  <div>
    <div class="todo">
      <div class="container mx-4 px-2 ">

        <h1 class="has-text-centered title is-4">SELECCIONA UNA CAJA</h1>

        <router-link to="/GameGeneral">
          <div class="columns is-mobile box p-1">
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHClasico.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
            <div class="column p-1">
              <h1>Arkham Horror Clasico</h1>
              <p>4 mapas</p>
              <p>12 investigadores</p>
              <button>Ver mas</button>
            </div>
          </div>
        </router-link>

        <br>

        <router-link to="/HomeArkhamHorror">
          <div class="columns is-mobile box p-1">
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHMareasTenebrosas.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
            <div class="column p-1">
              <h1>Mareas Tenebrosas</h1>
              <p>4 mapas</p>
              <p>8 investigadores</p>
              <button>Ver mas</button>
            </div>
          </div>
        </router-link>

        <br>

        <router-link to="/enproceso">
          <div class="columns is-mobile box p-1">
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHNocheCerrada.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
            <div class="column p-1">
              <h1>noche cerrada</h1>
              <p>2 mapas</p>
              <p>4 investigadores</p>
              <button>Ver mas</button>
            </div>
          </div>
        </router-link>

        <br>

        <router-link to="/enproceso">
          <div class="columns is-mobile box p-1">
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHSecretosDeLaOrden.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
            <div class="column p-1">
              <h1>Secretos de la orden</h1>
              <p>3 mapas</p>
              <p>4 investigadores</p>
              <button>Ver mas</button>
            </div>
          </div>
        </router-link>

      </div> <!-- end container   -->
    </div> <!-- end todo   -->
  </div>
</template>

<script>
export default {
  name: 'MenuGames',
  data(){
    return{
    } // end return
  }, // end data
  methods: {
  } // end methods
};
</script>

<style scoped>

.cajasimg{
  width: 100%;
}


#BGAHHome {
  background-image: url(../assets/img/Games/ArkhamHorror/1FondoGamesArkhamHorror.jpg);
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>