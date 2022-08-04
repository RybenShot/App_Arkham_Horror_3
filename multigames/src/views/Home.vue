<template>
  <div class="home">

    <div class="">
      <div><Hero/></div>
      <br>
      <div><Games/></div>
      <br>
      <div><Footer/></div>
      
      
      
    </div>
    

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Games from '@/components/Games.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Games,
    Footer
  }
}
</script>
