<template>
<div class="BGJuegos">
  <router-view class="container"/>
</div>
  
</template>

<script>
import Hero from '@/components/Hero.vue'


export default {
  name: 'TODO',
  components: {
    Hero,
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

 * {
   padding: 0; 
   margin: 0;
   box-sizing: border-box;
 }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.BGJuegos {
  background-image: url("https://img.freepik.com/free-vector/white-gold-hexagon-pattern-background_53876-115292.jpg?w=2000");
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>
