<template>
  <div id="BGGameGeneral">
    <br>
    <div class=" mx-3 container columns is-vcentered is-mobile allWindow card">
      <div class="column column is-one-fifth is-vcentered p-0">
        <button class="p-2"><i class="fa-2x fas fa-angle-double-left "></i></button>
      </div>
      
      <div class="column p-0">
        <h1 class="title titleDecoration is-1 pt-3 mb-3">Festin para Umordhoth</h1>
        <p class="has-text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti fugiat non. Ipsa, doloremque repudiandae iure sequi sit ex ut est ducimus vitae. Perspiciatis minus aliquam fugit odit, consequatur doloribus?</p>
        <div class="mx-4" id="imgMapa"></div>
        <button>seleccionar</button>
      </div>

      <div class="column column is-one-fifth is-vcentered p-0">
        <button class="p-2"><i class="fa-2x fas fa-angle-double-right"></i></button>
      </div>

     </div> <!-- end container  -->
  </div> <!-- end BGGame  -->
</template>

<script>
export default {
  name: "Game Arkham Horror",
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');

.title{
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black; 
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 700;
  font-size: 25px;
  line-height: 24px;
  text-align: center;
}

.allWindow{
  min-height: 70vh;
}

.titleDecoration{
    -webkit-text-stroke: 0.5px rgb(255, 255, 255);
    color: black; 
    font-family: 'Roboto Flex', sans-serif;
    font-weight: 800;
    text-align: center;
}

.card{
  background: rgba(79, 79, 79, 0.75);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
border-radius: 10px;
}


#imgMapa{
  background-image: url(../../assets/img/Games/ArkhamHorror/mapa2.png);
  width: 181px ;
  height: 263px;
}
#BGGameGeneral {
  background-image: url(../../assets/img/Games/ArkhamHorror/BG2MapaArkham.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}
</style>