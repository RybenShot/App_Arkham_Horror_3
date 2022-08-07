<template>
  <div class="home">

    <div><Hero/></div>

    <div class="mt-2"><MenuGames/></div>
      
   </div><!-- End home -->
</template>

<script>
import Hero from '@/components/Hero.vue'
import MenuGames from '@/components/MenuGames.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    MenuGames,
  }
}
</script>
