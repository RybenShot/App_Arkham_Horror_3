<template>
          <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              
              <header class="modal-card-head BGBendicion">
                <p class="modal-card-title title" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.titulo'"></p>
                <p class="modal-card-title title" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.titulo'"></p>
              </header>

              <section class="modal-card-body hero is-large py-2">

                <!--Lenguajes  -->
                <div class="columns is-mobile m-0" >
                  <div class="column p-0 mb-1 has-text-white subtitle has-text-centered">
                    <button @click="this.$store.state.lenguaje = 'español'"><img style="max-height: 50px;" src="@/assets/img/ZZOtros/banderas/espana.png" alt="Español"></button>
                  </div>
                  <div class="column p-0 mb-1 has-text-white subtitle has-text-centered">
                    <button @click="this.$store.state.lenguaje = 'ingles'"><img style="max-height: 50px;" src="@/assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles"></button>
                  </div>
                </div>

                <hr class="m-0 has-text-black">

                <h2 v-if="this.$store.state.lenguaje == 'español'" class="has-text-centered">Esta aplicación está hecha por solo <strong><u> 1 persona</u></strong>, que invierte todo el tiempo que puede. Actualmente está en desarrollo la 4ª versión, donde puedes ver el progreso en <a href="https://www.instagram.com/apparkhamhorror">Instagram</a>.</h2>
                <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="has-text-centered" v-t="'EN.Home.modals.recuerda.parrafo_1'"></h2>
                <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="has-text-centered">===== <a href="https://www.instagram.com/apparkhamhorror"><strong><u>apparkhamhorror</u></strong></a> =====</h2>

                <h2 class="has-text-centered" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.parrafo_2'"></h2>
                <h2 class="has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.parrafo_2'"></h2>

                <h1 class="title has-text-centered mb-0" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.parrafo_3'"></h1>
                <h1 class="title has-text-centered mb-0" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.parrafo_3'"></h1>

                <p class="has-text-centered" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.parrafo_4'"></p>
                <p class="has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.parrafo_4'"></p>

                <p class="has-text-centered title is-4 py-3" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.final'"></p>
                <p class="has-text-centered title is-4 py-3" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.final'"></p>
                
              </section>
              <footer class="modal-card-foot">
                <a class="column p-1" href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank">
                <button class="button is-3 is-success" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.btn_Monster'"></button>
                <button class="button is-3 is-success" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.btn_Monster'"></button>
                
                </a>
                <button @click="this.$store.state.StoreModalDonacion = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.btn_Mas-tarde'"></button>
                <button @click="this.$store.state.StoreModalDonacion = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.btn_Mas-tarde'"></button>
              </footer>
            </div>
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>