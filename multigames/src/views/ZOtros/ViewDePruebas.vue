<template>
  <div class="card">
    <div class="card-icon top-left">    <i class="fa fa-heart"></i></div>
    <div class="card-icon top-right">   <i class="fa fa-circle"></i></div>
    
    <div class="card-number top-left has-text-black">1</div>
    <div class="card-number top-right has-text-black">2</div>

    <img src="@/assets/img/Games/AHBase/2imgInvestigadores/PJ1.png" alt="Imagen" class="card-image" />

    <div class="card-overlay">
      <div class="card-title">Título</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pagina_De_Pruebas",
  data() {
    return {
      
    }; // end return
  }, // end data
}
</script>
<style scoped>
.card {
  width: 150px;
  height: 200px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  z-index: 2;
}

.card-icon {
  position: absolute;
  font-size: 20px;
  color: #ffffff;
  z-index: 3;
}

.top-left {
  top: 5px;
  left: 5px;
}

.top-right {
  top: 5px;
  right: 5px;
}

.card-number {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  z-index: 3;
}

.card-title {
  font-size: 9px;
  margin-top: 5px;
}

</style>