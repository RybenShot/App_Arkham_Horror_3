<template>
  <div>
        <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="modal-card-head BGPactoSiniestro">
              <p class="modal-card-title has-text-light">Pacto Siniestro</p>
          </header>

          <section class="modal-card-body "  >
            <div class="hero-body py-3">

              <div v-if="verCartaPacto ">
                <p class="has-text-centered">Retribución -- Tira un dado. Si sacas un 1</p>
                <h1 class=" title has-text-centered titlePactosiniestro ">¿Hora de saldar tu deuda? </h1>
              </div>

              <div v-if="verResultadoPacto">
                <p class=" title is-1 has-text-centered resultadoPactosiniestro"> {{ ResultadoPacto }} </p>
                <p v-if="ResultadoPacto == 1" class="subtitle is-3 titlePactosiniestro"> Dale la vuelta a la carta y cumple con tu destino! </p>
                <p v-else class="subtitle is-3 titlePactosiniestro"> La próxima vez no tendrás tanta suerte ... </p>
              </div>

              <div v-if="verPactoSiniestro">
                <p class="title has-text-centered is-italic mb-2">{{this.$store.state.dataPactoSiniestro.title}}</p>
                <hr class="my-2">
                <p class="subtitle is-6 mb-2 has-text-centered is-italic">{{this.$store.state.dataPactoSiniestro.narrativa}}</p>
                <br>
                <p class="subtitle is-6 has-text-centered">{{this.$store.state.dataPactoSiniestro.descripcion}}</p>
              </div>

            </div>
          </section>

          <footer class="modal-card-foot">
            <div v-if="verCartaPacto" class="columns is-mobile">
              <button @click="tirarPacto(1), (verResultadoPacto = true),(verCartaPacto = false)" class="button is-danger is-fullwidth is-12 column"> Tirar </button>
              <button @click="(this.$store.state.modalPacto = false), (this.ResultadoPacto = null)" class="button is-link is-fullwidth is-12 column"> Aun no </button>
            </div>
            <!-- (modalPacto = false) -->

            <div v-if="verResultadoPacto">
              <div class="columns is-mobile">
                <button v-if="verPactoSiniestro" @click="(ResultadoPacto = null), (verResultadoPacto = false), (PactoSiniestro = false), (verPactoSiniestro = false)" class="button is-fullwidth is-12 is-link column" > Volver y quitar pacto siniestro </button>
                <button v-if="ResultadoPacto != 1" @click=" (this.$store.state.modalPacto = false), (ResultadoPacto = null), (verResultadoPacto = false), (verCartaPacto = true)" class="button is-fullwidth is-12 is-link column"> Volver </button>
                <button v-if="ResultadoPacto == 1" @click=" this.seleccionarPacto(), (verResultadoPacto = false), (verPactoSiniestro = true)" class="button is-fullwidth is-12 is-link column" > Ver Pacto Siniestro </button>
              </div>
            </div>

            <div >
              <button v-if="verPactoSiniestro == true" @click="(this.$store.state.EstadoPacto = false), (verPactoSiniestro = false), (this.$store.state.modalPacto = false), (ResultadoPacto = null), (verResultadoPacto = false), (verCartaPacto = true)" class="button is-fullwidth is-12 is-link column"> Volver </button>
            </div>
          </footer>

        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  data(){
    return{
      verCartaPacto: true,
      verResultadoPacto: false,
      verPactoSiniestro: false,
      ResultadoPacto: null,
      DatosPactoSiniestro:{
        title: null,
        narrativa: null,
        descripcion: null
      },
      pactosSiniestros: [
        {id: 1,
            expansion: "original",
            title: "Al filo de la navaja" ,
            narrativa: "BLA BLA BLA" , 
            descripcion: "Estado: Al filo de la navaja -- Si el investigador falla 2 veces seguidas cualquier prueba, este acabará con su vida. Sin envargo si consigue 2 aciertos seguidos, descarta esta carta."},
        {id: 2,
            expansion: "original",
            title: "Enfermo" ,
            narrativa: "Leyendo el pacto que firmaste, notas que te da por toser, cada vez mas fuerte, cuando vuelves a ver el papel, lo ves ensangrentado, al igual que tu boca" ,
            descripcion: "Estado: Enfermo -- Este investigador Tira 6 o 3 dados, por cada 1 que saque en la tirada, su vida y cordura Max. se reduce en -1 (Por ejemplo, si en al tirada sacas 3 unos, su vida y cordura max. se reduciran en -3)"},
        {id: 3,
            expansion: "original",
            title: "" ,
            narrativa: " BLA BLA BLA" ,
            descripcion: "Este investigador se transforma en una criatura, se sustituye a este investigador por una criatura Elite (la primera que se encuentre del mazo de criaturas, de no encontrarlo busca en el mazo de la caja).El investigador es devorado."},
        {id: 4,
            expansion: "original",
            title: "" ,
            narrativa: "De tu pecho aparece una mano fantasmagorica agarrando un puñal dispuesto a clavartelo en el pecho" ,
            descripcion: "Poseido por los muertos. Haz una tirada de 10 dados -Nºvoluntad (aqui no sirve la concentracion, ni la bendicion, ni la maldicion), el numero de aciertos sera la veces que ha conseguido el puñal herirte, por lo cual, sera el numero de vidas que te tienes que quitar"},
        {id: 5,
            expansion: "original",
            title: "" ,
            narrativa: "BLA BLA BLA" ,
            descripcion: "Vortice hacia el caos. Aparece donde el investigador 3 criaturas y se enfrentan directamente al el."},
        {id: 6,
            expansion: "original",
            title: "" ,
            narrativa: "BLA BLA BLA" ,
            descripcion: "Estado: Señalado por el primigenio. Para el resto de la partida ereas el objetivo de todas las criaturas, ignorando lo que ponga la tarjeta de dicha criatura. Le seguiran hasta alcanzarle y matarlo."},
        {id: 7,
            expansion: "original",
            title: "" ,
            narrativa: "BLA BLA BLA" ,
            descripcion: "Estado: Manco. Para el resto de la partida la vida maxima se reduce -1 y no podra usar objetos que requieran 2 manos. "},
        {id: 8,
            expansion: "original",
            title: "" ,
            narrativa: "BLA BLA BLA" ,
            descripcion: "Vuelve la peste. El personaje queda afectado por la peste, el barrio donde dicho personaje esté queda en cuarentena, lo cual no se podra entrar ni salir de el por 3 turnos"},
        {id: 9,
            expansion: "base",
            title: "Destino siniestro" ,
            narrativa: "Te pinchaste en el dedo y sellaste el pacto con una gota de sangre. Y no te pidieron nada a cambio. -Tenemos nuestros motivos- dijo el desconocido mientras guardaba el contrato bajo los plegues de su túnica-. Usted limitase en cumplir su parte." ,
            descripcion: "Roba y resuelve seis fichas de la reserva de Mitos. Luego descarta esta carta"},
        {id: 10,
            expansion: "base",
            title: "El precio mas alto" ,
            narrativa: "Cuando sellaste el pacto y firmaste con tu sangre en aquel enorme libro negro, lo ultimo que sabias era que la deuda quedaria saldada el dia de tu muerte. Ahora comprendes que el precio que debes pagar es el dia de tu muerte. Y ese dia ya ha llegado." ,
            descripcion: "Eres devorado."},
        {id: 11,
            expansion: "base",
            title: "Sacrificios rituales" ,
            narrativa: "Empiezas con poca cosa: ratas, pajaros, gatos y perros, lo justo para ganar algo de tiempo. Pero no tardas en mancharte las manos con la sangre de terneros cebados, cabras y corderitos blancos como la nieve. Hasta que te ponen el cuchillo en las manos una ultima vez." ,
            descripcion: "Elige a otro investigador que est'e en cualquier espacio. ese investigador es devorado. Luego descarta esta carta."},
        {id: 12,
            expansion: "base",
            title: "Conocimientos prohibidos" ,
            narrativa: "Con el corazón en un puño, abres la cubierta pétreadel libro y empiezas a leer. Las palabras se graban a fuego en tu mente, y no tardas en comprender que semejantes conocimientos no deben quedar al alcance de cualquiera." ,
            descripcion: "Descarta un total de tres Pistas de entre todos los investigadores y la hoja de Escenario (o todas estas Pistas, si en total suman menos de tres). Si se descartan de este modo exactamente una o ninguna Pista, coloca una ficha de Perdición sobre la hoja de Excenario. Luego descarta esta carta."},
        {id: 13,
            expansion: "base",
            title: "Alianza maligna" ,
            narrativa: "- Ha llegado la hora de saldar tu deuda / sisea la voz, y el panico se apodera de ti mientras observas imponente como abres esa puerta, rompes aquella farola, apartas ese simidero ... De un centenar de maneras, entregas las llaves de la ciudad a las fuerzas del mal." ,
            descripcion: "Aparece un Monstruo en cada uno de los espacios de tu Barrio. (Cada monstruo se enfrenta a un investigador que haya en su espacio.) Cada Monstruo recupera toda su Vida e infringe Daño y Horror al investigador que esté enrfentado a él. Luego descarta esta carta."},
        {id: 14,
            expansion: "base",
            title: "El mundo está perdido" ,
            narrativa: "Te resulta imposible conciliar el sueño. Siempre que cierras los ojos, oyes esa voz que te llama por tu nombre. Cada vez sena más cerca, ¿pero como es eso posible? La voz pertenece a una criatura ajena al tiempo y el espacio. Lo sabes bien, pues contabas con ello al sellar el pacto. Pero ahora está aquí, y no te queda más remedio que franquearle el paso." ,
            descripcion: "Coloca tres fichas de Perdición en tu espacio. Luego descarta esta carta."},
        {id: 15,
            expansion: "mareas tenebrosas",
            title: "Plaga virulenta" ,
            narrativa: "Sufres un horrible y doloroso ataque de tos; es como si tuvieras cristales rotos en los pulmones. Cuando por fín cesa, respiras entrecortadamente y te limpias la sangre de los labios. Al ver que tus desdichados compañeros sucumben a la misma dolencia, caes en la cuenta de que esta rterrible infección ha empezado contigo." ,
            descripcion: "Sufres un punto de Daño directo y un punto de Horror directo. Luego todos los demás investigadores sufren 2 puntos de Daño directo y 2 puntos de horror directo (cada uno). Luego descarta esta carta."},
            
      ],
    }
  }, // end Data

  methods: {
    tirarPacto(min) {
      let max = 6; // maximo de lados de dados
      this.ResultadoPacto = Math.floor(Math.random() * (min, max)) + min;
      console.log(this.ResultadoPacto);
    },

    // SELECCION PACTO SINIESTRO
    seleccionarPacto(){
      function nuevopacto(NumPacto) {
        return NumPacto.id === Math.floor(Math.random() * (6, 14)) + 1
      }
      let dartosEncontrados = this.pactosSiniestros.find(nuevopacto)
      this.$store.state.dataPactoSiniestro.title = dartosEncontrados.title;
      this.$store.state.dataPactoSiniestro.narrativa = dartosEncontrados.narrativa;
      this.$store.state.dataPactoSiniestro.descripcion = dartosEncontrados.descripcion
    } // end seleccionarPacto
  }
}
</script>

<style>
.BGPactoSiniestro{
  background-image: url(@/assets/img/Estados/PactoSiniestro.jpg);
  background-position: center;
  background-size: cover;
}
</style>