<template>
  <div>
    <div class="todo">
    <div class="container">
      <button @click="cambio(1)" class="panel " :class=" {active: img1}" style="background-image: url('https://64.media.tumblr.com/182670cb1647cf3b6f10f9a2690ce9c0/ed598ecd39ff023f-ad/s1280x1920/eff9eb4fd92812f682d5d0186b92cbd5ed69530e.jpg')">
        <h3><router-link id="links" to="/dados">Juego de dados</router-link></h3> 
      </button >
      <button @click="cambio(2)" class="panel" :class=" {active: img2}" style="background-image: url('https://p4.wallpaperbetter.com/wallpaper/717/632/865/cartridge-revolver-russian-roulette-hd-wallpaper-preview.jpg')">
        <h3><router-link id="links" to="/ruleta">Ruleta rusa</router-link></h3>
      </button>
       <button @click="cambio(3)" class="panel" :class=" {active: img3}" style="background-image: url('https://p4.wallpaperbetter.com/wallpaper/400/66/430/artistic-oriental-vending-machine-hd-wallpaper-preview.jpg')">
        <h3><router-link id="links" to="/enproceso">Maquina Expendedora</router-link></h3>
      </button>
      <!--<button @click="cambio(4)" class="panel" :class=" {active: img4}" style="background-image: url('https://www.proandroid.com/wp-content/uploads/2017/04/E36.jpg')">
        <h3>Nombre random</h3>
      </button>
      <button @click="cambio(5)" class="panel" :class=" {active: img5}" style="background-image: url('https://img.freepik.com/foto-gratis/hermoso-camino-madera-que-impresionantes-arboles-coloridos-bosque_181624-5840.jpg?w=2000')">
        <h3>Nombre random</h3>
      </button> -->
    </div>
    </div>
  </div>
</template>

<script>
export default {
  
  data(){
    return{
    img1: true,
    img2: false,
    img3: false,
    img4: false,
    img5: false
    }
    
  },
methods: {
  cambio : function(i){
    this.deleteAll()
    if (i == 1) {
      this.img1 = true
    }
    if (i == 2) {
      this.img2 = true
    }
    if (i == 3) {
      this.img3 = true
    }
    if (i == 4) {
      this.img4 = true
    }
    if (i == 5) {
      this.img5 = true
    }
  },
  deleteAll : function(){
    this.img1 = false;
    this.img2 = false;
    this.img3 = false;
    this.img4 = false;
    this.img5 = false
  }
}


};
</script>

<style scoped>

  @import url("https://fonts.googleapis.com/css2?family=Muli&display=swap");

*{
  box-sizing: border-box;
}

button{
  border: none;
}

router-link{
  color: #fff;
}

router-link:hover{
  color: blue;
}

.todo{
  font-family: "Muli", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  margin: 0;
}
.container{
  display: flex;
  width: 90%;
}

.panel{
  background-size: auto 110%;
  background-position: center;
  background-repeat: no-repeat;
  height: 40vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  transition: flex 0.7s ease-in;
  -webkit-transition: all 700ms ease-in;
}
.panel h3{
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}
.panel.active{
  flex: 5;
}
.panel.active h3{
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}
@media(max-width: 480px){
  .container{
    width: 100%;
  }
  .panel:nth-of-type(4),
  .panel:nth-of-type(5){
    display: none;
  }
}

#links{
  color: #EFEFEF;
  transition: background-color .5s;
  transition: color .5s;
  padding: 0.3em;
  border-bottom: 0.01em solid;
}

#links:hover{
  color: #F66B0E;
  /* background-color: #112B3C; */
  
}

</style>