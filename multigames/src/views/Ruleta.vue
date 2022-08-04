<template>
<div>
  <a href="/"><Hero/></a>
  <br>  
  <JuegoRuleta/>

</div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import JuegoRuleta from '@/components/JuegoRuleta.vue'
export default {
  components: {
      Hero,
      JuegoRuleta
  }
}
</script>

<style>

</style>