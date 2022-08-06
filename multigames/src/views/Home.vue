<template>
  <div class="home">

    <div><Hero/></div>

    <div class="mt-2"><Games/></div>
      
   </div><!-- End home -->
</template>

<script>
import Hero from '@/components/Hero.vue'
import Games from '@/components/Games.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Games,
  }
}
</script>
