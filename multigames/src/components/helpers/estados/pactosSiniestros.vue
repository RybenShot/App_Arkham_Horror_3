<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background" @click="this.$store.state.modalPacto = false"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="modal-card-head BGPactoSiniestro">
            <p class="modal-card-title has-text-light" v-if="this.$store.state.lenguaje == 'español'">Pacto Siniestro</p>
            <p class="modal-card-title has-text-light" v-if="this.$store.state.lenguaje == 'ingles'">Dark Pact</p>
          </header>

          <!-- BOOOOOOOOOODYYYYYYYY -->
          <section class="modal-card-body px-2">
            <div class="hero-body px-1 py-3">
              <div v-if="verCartaPacto">
                <p class="has-text-centered" v-if="this.$store.state.lenguaje == 'español'">Retribución -- Tira un dado. Si sacas un 1</p>
                <p class="has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'">Retribution -- Roll a dice. If you roll a 1</p>
                <h1 class="title has-text-centered titlePactosiniestro" v-if="this.$store.state.lenguaje == 'español'">¿Hora de saldar tu deuda?</h1>
                <h1 class="title has-text-centered titlePactosiniestro" v-if="this.$store.state.lenguaje == 'ingles'">Time to settle your debt?</h1>
              </div>

              <div v-if="verResultadoPacto">
                <p class="title is-1 has-text-centered resultadoPactosiniestro">{{ ResultadoPacto }}</p>
                <div v-if="ResultadoPacto == 1">
                  <p class="subtitle is-3 titlePactosiniestro" v-if="this.$store.state.lenguaje == 'español'"> Dale la vuelta a la carta y cumple con tu destino!</p>
                  <p class="subtitle is-3 titlePactosiniestro" v-if="this.$store.state.lenguaje == 'ingles'">Turn the letter around and fulfill your destiny!</p>
                </div>
                <div v-else>
                  <p class="subtitle is-3 titlePactosiniestro" v-if="this.$store.state.lenguaje == 'español'">La próxima vez no tendrás tanta suerte ...</p>
                  <p class="subtitle is-3 titlePactosiniestro" v-if="this.$store.state.lenguaje == 'ingles'">Next time you won’t be so lucky...</p>
                </div>
                
              </div>

              <div v-if="verPactoSiniestro">
                <p class="title has-text-centered is-italic mb-2" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataPactoSiniestro.title }}</p>
                <p class="title has-text-centered is-italic mb-2" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataPactoSiniestro.ENtitle }}</p>
                <hr class="my-2 has-text-black" />
                <p class="subtitle is-6 mb-2  is-italic" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataPactoSiniestro.narrativa }}</p>
                <p class="subtitle is-6 mb-2  is-italic" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataPactoSiniestro.ENnarrativa }}</p>
                <br />
                <p class="subtitle is-6  has-text-black mb-0" v-if="this.$store.state.lenguaje == 'español'">{{ this.$store.state.dataPactoSiniestro.descripcion }}</p>
                <p class="subtitle is-6  has-text-black mb-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ this.$store.state.dataPactoSiniestro.ENdescripcion }}</p>

                <p class="subtitle is-7 has-text-right" v-if="this.$store.state.lenguaje == 'español'">Expansion: {{ this.$store.state.dataPactoSiniestro.expansion }}</p>
                <p class="subtitle is-7 has-text-right" v-if="this.$store.state.lenguaje == 'ingles'">Expansion: {{ this.$store.state.dataPactoSiniestro.ENexpansion }}</p>
              </div>
            </div>
          </section>
          <!-- BOOOOOOOOOODYYYYYYYY -->

          <!-- FOOOOOOOOOTERRRRRRRRR -->
          <footer class="">
            
            <!-- FASE 1 -->
            <div v-if="verCartaPacto" class="field has-addons columns is-mobile is-gapless" >
              <p class="control column is-half">
                <button @click=" tirarPacto(1), (verResultadoPacto = true), (verCartaPacto = false)" class="button is-danger is-fullwidth" >
                  <p v-if="this.$store.state.lenguaje == 'español'">Tirar</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">Throw</p> 
                </button>
              </p>

              <p class="control column is-half">
                <button @click=" (this.$store.state.EstadoPacto = true), (this.$store.state.modalPacto = false)" class="button is-link is-fullwidth">
                  <p v-if="this.$store.state.lenguaje == 'español'">Añadir</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">Añadir</p>
                </button>
              </p>
            </div>

            <!-- FASE 2 -->
            <div v-if="verResultadoPacto">
              <div >

                <button v-if="ResultadoPacto != 1"
                  @click="
                    (this.$store.state.modalPacto = false),
                    (ResultadoPacto = null),
                    (verResultadoPacto = false),
                    (verCartaPacto = true)"
                  class="button is-fullwidth is-12 is-link column">
                  <p v-if="this.$store.state.lenguaje == 'español'">Volver</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">Go back</p> 
                </button>

                <button
                  v-if="ResultadoPacto == 1"
                  @click="
                    this.seleccionarPacto(),
                    (verResultadoPacto = false),
                    (verPactoSiniestro = true)"
                  class="button is-fullwidth is-12 is-link column">
                  <p v-if="this.$store.state.lenguaje == 'español'">Ver Pacto Siniestro</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'">See Dark Pact</p> 
                </button>
              </div>
            </div>

            <!-- FASE 3 -->
            <div>
              <button
                v-if="verPactoSiniestro == true"
                @click="
                  (this.$store.state.EstadoPacto = false),
                  (verPactoSiniestro = false),
                  (this.$store.state.modalPacto = false),
                  (ResultadoPacto = null),
                  (verCartaPacto = true)"
                class="button is-fullwidth is-12 is-link column">
                <p v-if="this.$store.state.lenguaje == 'español'">Volver</p>
                <p v-if="this.$store.state.lenguaje == 'ingles'">Go back</p>
              </button>
            </div>
          </footer> <!-- End Footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      verCartaPacto: true,
      verResultadoPacto: false,
      ResultadoPacto: null,
      verPactoSiniestro: false,
      DatosPactoSiniestro: {
        expansion: null,
        ENexpansion:"",
        title: null,
        narrativa: null,
        descripcion: null,
      },
      pactosSiniestros: [
        {id: 1,
          expansion: "original",
          ENexpansion:"original",
          title: "Al filo de la navaja",
          ENtitle:"On the edge of the knife",
          narrativa:"Al ver tanta muerte y maldad suelta por el mundo, te desesperas y sientes caer todo el peso del mundo sobre tus hombros. Ya ni siquiera recuerdas la última vez que fuiste feliz.",
          ENnarrativa: "Seeing so much death and evil loose around the world, you despair and feel the weight of the world fall on your shoulders. You don’t even remember the last time you were happy.",
          descripcion:"Estado: Al filo de la navaja -- Durante la partida, si el investigador falla 2 veces seguidas cualquier prueba, este acabará con su vida. Sin embargo, si consigue 2 aciertos seguidos, descarta esta carta.",
          ENdescripcion: "State: On the edge of the knife -- During the game, if the researcher fails 2 times in a row any test, this will end his life. However, if you get 2 hits in a row, discard this card."
        },
        // {id: 2, PACTO DESCARTADO POR AHORA
        //     expansion: "original",
        //title: "Enfermo QUITAR ESTE" ,
        //           narrativa: "Leyendo el pacto que firmaste, notas que te da por toser, cada vez más fuerte, cuando vuelves a ver el papel, lo ves ensangrentado, al igual que tu boca" ,
        //     descripcion: "Estado: Enfermo -- Tira 3 dados; por cada 1 que saque en la tirada, tu vida y cordura Max. se reduce en -1 (Por ejemplo, si en la tirada sacas 3 unos, tu vida y cordura max. se reducirá en -3)"},
        {id: 2,
          expansion: "original",
          ENexpansion:"original",
          title: "La transformación del mal",
          ENtitle:"The transformation of evil",
          narrativa:"La herida que tuviste que hacerte para firmar el pacto se vuelve de pronto más negra y putrefacta. Al darte cuenta de esto, sales corriendo en busca de ayuda; de camino al hospital te caes al suelo. Sientes que algo dentro de ti te está poseyendo rápidamente, como gusanos bajo tu piel agarrando cada músculo para posteriormente acabar controlandote por completo.",
          ENnarrativa:"The wound you had to make to sign the pact suddenly becomes darker and putrid. When you realize this, you run for help; on the way to the hospital you fall to the ground. You feel that something inside you is possessing you quickly, like worms under your skin grabbing each muscle and then eventually controlling you completely.",
          descripcion:"Este investigador se transforma en una criatura, se sustituye a este investigador por una criatura Elite (la primera que se encuentre en el mazo de criaturas, si no hay ninguno, busca en el mazo de la caja).El investigador es devorado.",
          ENdescripcion:"This researcher transforms into a creature, this researcher is replaced by an Elite creature (the first one found in the deck of creatures, if there are none, searches the deck of the box). The investigator is devoured.",
        },
        {id: 3,
          expansion: "original",
          ENexpansion:"original",
          title: "Vortice hacia el caos",
          ENtitle:"Vortice into the chaos",
          narrativa:"Tu mirada se nubla, tu mente se dispersa, tus sentidos se relajan. Metes la mano en el bolsillo y sacas una llave de plata, no sabes exactamente qué hacía ahí, pero simplemente la coges y sigues tu camino. MUEVE EL INVESTIGADOR 2 ESPACIOS. SIGUE LEYENDO DESPUÉS DE MOVER AL INVESTIGADOR. Sin saber exactamente qué estás haciendo, extiendes la mano que sujeta la llave y sientes como encaja en una cerradura, en mitad de la calle. Abres una puerta rosa, de madera, quebrada y mugrienta hasta la última esquina.",
          ENnarrativa:"Your gaze clouds, your mind disperses, your senses relax. You put your hand in your pocket and you pull out a silver key, you don’t know exactly what it was doing there, but you just take it and you go your way. Move the researcher 2 spaces. Continue reading after moving the researcher. Without knowing exactly what you’re doing, you reach out the hand that holds the key and feel it fit into a lock, in the middle of the street. You open a pink, wooden door, broken and filthy to the last corner.",
          descripcion:"Aparece donde el investigador 3 criaturas y se enfrentan directamente al el.",
          ENdescripcion:"It appears where the researcher 3 creatures and face directly to the.",
        },
        {id: 4,
          expansion: "original",
          ENexpansion:"original",
          title: "Señalado por el primigenio",
          ENtitle:"Pointed out by the original",
          narrativa: "El cielo se enrojece, se cubre de nubes y entre los relampagos ves una silueta de tamaño colosal a lo lejos, detrás de las montañas. Te entran unos terribles escalofríos cuando oyes una voz grave y ronca decirte “Tu hora ha llegado”.",
          ENnarrativa: "The sky is red, covered with clouds and among the lightning you see a colossal silhouette in the distance, behind the mountains. You get terrible chills when you hear a deep, hoarse voice saying 'Your time has come'.",
          descripcion:"Estado: Señalado por el primigenio. Para el resto de la partida eres el objetivo de todas las criaturas, ignorando lo que ponga la tarjeta de dicha criatura. Te seguirán hasta alcanzarte y matarte. Mientras esta carta permanezca activa, TODAS LAS CRIATURAS TIENEN +1 DE VELOCIDAD. Si por el camino una criatura se topa con otro investigador, dicha criatura se enfrentará a ese investigador.",
          ENdescripcion:"Condition: Indicated by the original. For the rest of the game you are the target of all creatures, ignoring what the card of that creature puts. They will follow you until they reach you and kill you. As long as this card remains active, ALL CREATURES HAVE +1 SPEED. If along the way a creature encounters another researcher, that creature will face that researcher.",
        },
        {id: 5,
          expansion: "original",
          ENexpansion:"original",
          title: "Hasta los huesos",
          ENtitle:"To the bones",
          narrativa:"-¿Qué me está pasando?- Te preguntas a ti mismo mientras ves impotente como el brazo con el que firmaste ese pacto, se seca poco a poco, hasta convertirse tan solo en piel y hueso.",
          ENnarrativa:"-What is happening to me? - You ask yourself while you see impotent as the arm with which you signed that pact, it dries up little by little, until it becomes only skin and bone.",
          descripcion:"Estado: Manco. Para el resto de la partida no podras usar objetos que requieran de 2 manos. ",
          ENdescripcion:"Status: One-handed. For the rest of the game you cannot use objects that require 2 hands. ",
        },
        // {id: 8,
        //     expansion: "original",
        //   title: "QUITAR ESTE" ,
       //   narrativa: "BLA BLA BLA" ,
        //     descripcion: "Vuelve la peste. El personaje queda afectado por la peste, el barrio donde dicho personaje esté queda en cuarentena, lo cual no se podra entrar ni salir de el por 3 turnos"},
        {id: 6,
          expansion: "base",
          ENexpansion:"original",
          title: "Destino siniestro",
          ENtitle:"Sinister fate",
          narrativa:"Te pinchaste en el dedo y sellaste el pacto con una gota de sangre. Y no te pidieron nada a cambio. -Tenemos nuestros motivos- dijo el desconocido mientras guardaba el contrato bajo los pliegues de su túnica-. Usted limitase en cumplir su parte.",
          ENnarrativa:"You pricked your finger and sealed the pact with a drop of blood. And they asked for nothing in return. -We have our motives- said the stranger while keeping the contract under the folds of his tunic-. You limit yourself in fulfilling your part.",
          descripcion:"Roba y resuelve seis fichas de la reserva de Mitos. Luego descarta esta carta.",
          ENdescripcion:"Draw and solve six tiles from the Myths reserve. Then discard this card.",
        },
        {id: 7,
          expansion: "base",
          ENexpansion:"base",
          title: "El precio más alto",
          ENtitle:"the highest price",
          narrativa:"Cuando sellaste el pacto y firmaste con tu sangre en aquel enorme libro negro, lo ultimo que sabias era que la deuda quedaria saldada el dia de tu muerte. Ahora comprendes que el precio que debes pagar es el día de tu muerte. Y ese día ya ha llegado.",
          ENnarrativa:"When you sealed the pact and signed your blood in that huge black book, the last thing you knew was that the debt would be paid on the day of your death. Now you understand that the price you must pay is the day of your death. And that day has come.",
          descripcion: "Eres devorado.",
          ENdescripcion: "You are devoured.",
        },
        {id: 8,
          expansion: "base",
          ENexpansion:"base",
          title: "Sacrificios rituales",
          ENtitle:"Ritual sacrifices",
          narrativa:"Empiezas con poca cosa: ratas, pájaros, gatos y perros, lo justo para ganar algo de tiempo. Pero no tardas en mancharte las manos con la sangre de terneros cebados, cabras y corderitos blancos como la nieve. Hasta que te ponen el cuchillo en las manos una última vez.",
          ENnarrativa:"You start with little: rats, birds, cats and dogs, just enough to buy some time. But it doesn’t take long to get your hands on the blood of fattened calves, goats and lambs white as snow. Until they put the knife in your hands one last time.",
          descripcion:"Elige a otro investigador que esté en cualquier espacio. Ese investigador es devorado. Luego descarta esta carta.",
          ENdescripcion:"Choose another researcher who is in any space. That researcher is devoured. Then discard this letter.",
        },
        {id: 9,
          expansion: "base",
          ENexpansion:"base",
          title: "Conocimientos prohibidos",
          ENtitle:"Forbidden knowledge",
          narrativa:"Con el corazón en un puño, abres la cubierta pétrea del libro y empiezas a leer. Las palabras se graban a fuego en tu mente, y no tardas en comprender que semejantes conocimientos no deben quedar al alcance de cualquiera.",
          ENnarrativa:"With your heart in your fist, you open the stony cover of the book and start reading. Words burn into your mind, and you soon realize that such knowledge should not be available to anyone.",
          descripcion:"Descarta un total de tres Pistas de entre todos los investigadores y la hoja de Escenario (o todas estas Pistas, si en total suman menos de tres). Si se descartan de este modo exactamente una o ninguna Pista, coloca una ficha de Perdición sobre la hoja de Escenario. Luego descarta esta carta.",
          ENdescripcion:"Discard a total of three Tracks from all researchers and the Scenario sheet (or all of these Tracks, if in total they add up to less than three). If one or no Clue is discarded in this way, place a Doom tab on the Scenario sheet. Then discard this card.",
        },
        {id: 10,
          expansion: "base",
          ENexpansion:"base",
          title: "Alianza maligna",
          ENtitle:"Evil alliance",
          narrativa:"- Ha llegado la hora de saldar tu deuda - sisea la voz, y el pánico se apodera de ti mientras observas imponente como abres esa puerta, rompes aquella farola, apartas ese sumidero ... De un centenar de maneras, entregas las llaves de la ciudad a las fuerzas del mal.",
          ENnarrativa:"- The time has come to pay off your debt - the voice hisses, and panic takes hold of you as you watch as you open that door, break that lamppost, put aside that sink... In a hundred ways, you give the keys of the city to the forces of evil.",
          descripcion:"Aparece un Monstruo en cada uno de los espacios de tu Barrio. (Cada monstruo se enfrenta a un investigador que haya en su espacio.) Cada Monstruo recupera toda su Vida e inflige Daño y Horror al investigador que esté enfrentado a él. Luego descarta esta carta.",
          ENdescripcion:"A Monster appears in each of the spaces in your Neighborhood. (Each monster faces a researcher in his or her space.) Each Monster recovers his entire Life and deals Damage and Horror to the investigator facing him. Then discards this card.",
        },
        {id: 11,
          expansion: "base",
          ENexpansion:"base",
          title: "El mundo está perdido",
          ENtitle:"the world is lost",
          narrativa:"Te resulta imposible conciliar el sueño. Siempre que cierras los ojos, oyes esa voz que te llama por tu nombre. Cada vez suena más cerca, ¿pero cómo es eso posible? La voz pertenece a una criatura ajena al tiempo y el espacio. Lo sabes bien, pues contabas con ello al sellar el pacto. Pero ahora está aquí, y no te queda más remedio que franquearle el paso.",
          ENnarrativa:"You find it impossible to fall asleep. Whenever you close your eyes, you hear that voice calling your name. It sounds closer and closer, but how is that possible? The voice belongs to a creature alien to time and space. You know it well, because you were counting on it when you sealed the pact. But now it’s here, and you have no choice but to go through with it.",
          descripcion:"Coloca tres fichas de Perdición en tu espacio. Luego descarta esta carta.",
          ENdescripcion:"Place three Doom tiles in your space. Then discard this card.",
        },
        {id: 12,
          expansion: "mareas tenebrosas",
          ENexpansion:"under dark waves",
          title: "Plaga virulenta",
          ENtitle:"Virulent plague",
          narrativa:"Sufres un horrible y doloroso ataque de tos; es como si tuvieras cristales rotos en los pulmones. Cuando por fín cesa, respiras entrecortadamente y te limpias la sangre de los labios. Al ver que tus desdichados compañeros sucumben a la misma dolencia, caes en la cuenta de que esta terrible infección ha empezado contigo.",
          ENnarrativa:"You have a horrible, painful cough; it’s like you have broken glass in your lungs. When it ceases, you breathe through your throat and wipe the blood off your lips. Seeing your wretched companions succumb to the same ailment, you realize that this terrible infection has begun with you.",
          descripcion:"Sufres un punto de Daño directo y un punto de Horror directo. Luego todos los demás investigadores sufren 2 puntos de Daño directo y 2 puntos de horror directo (cada uno). Luego descarta esta carta.",
          ENdescripcion:"You suffer a Direct Damage point and a Direct Horror point. Then all other investigators suffer 2 Direct Damage and 2 Direct Horror Points (each). Then discard this card.",
        },
      ],
    };
  }, // end Data

  methods: {
    tirarPacto(min) {
      let max = 6; // maximo de lados de dados
      this.ResultadoPacto = Math.floor(Math.random() * (min, max)) + min;
      console.log(`Resultado de tirada para pacto ${this.ResultadoPacto}`)
    },
    // SELECCION PACTO SINIESTRO
    activarEstados(NdePacto){
      if (NdePacto.id == 1) {
        this.$store.state.EstadoSuicidio = true
      }
      else if (NdePacto.id == 4) {
        this.$store.state.EstadoSeñalado = true
      }
      else if (NdePacto.id == 5) {
        this.$store.state.EstadoManco = true
      }
    },
    seleccionarPacto() {
      function nuevopacto(NumPacto) {
        return NumPacto.id == Math.floor(Math.random() * (0, 11)) + 1;
      }
      let dartosEncontrados = this.pactosSiniestros.find(nuevopacto);
      this.activarEstados(dartosEncontrados)
      this.$store.state.dataPactoSiniestro.expansion = dartosEncontrados.expansion;
      this.$store.state.dataPactoSiniestro.title = dartosEncontrados.title;
      this.$store.state.dataPactoSiniestro.narrativa = dartosEncontrados.narrativa;
      this.$store.state.dataPactoSiniestro.descripcion = dartosEncontrados.descripcion;

      this.$store.state.dataPactoSiniestro.ENexpansion = dartosEncontrados.ENexpansion;
      this.$store.state.dataPactoSiniestro.ENtitle = dartosEncontrados.ENtitle;
      this.$store.state.dataPactoSiniestro.ENnarrativa = dartosEncontrados.ENnarrativa;
      this.$store.state.dataPactoSiniestro.ENdescripcion = dartosEncontrados.ENdescripcion;
    }, // end seleccionarPacto
  },
};
</script>

<style>
.BGPactoSiniestro {
  background-image: url(@/assets/img/Estados/PactoSiniestro.jpg);
  background-position: center;
  background-size: cover;
}
</style>