<template>
<div>
  <a href="/"><Hero/></a>
  
  <div class="container">
    <JuegoDados/>
  </div>
  

  <Footer/>
</div>
  
</template>

<script>
import Hero from '@/components/Hero.vue'
import JuegoDados from '@/components/JuegoDados.vue'
import Footer from '@/components/Footer.vue'


export default {
  name: 'Dados',
  components: {
    Hero,
    JuegoDados,
    Footer
  }

}
</script>

<style scoped>

.container{
  height: 80vh;
}
</style>>

