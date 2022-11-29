<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="modal-card-head BGPactoSiniestro">
            <p class="modal-card-title has-text-light">Pacto Siniestro</p>
          </header>

          <!-- BOOOOOOOOOODYYYYYYYY -->
          <section class="modal-card-body px-2">
            <div class="hero-body px-1 py-3">
              <div v-if="verCartaPacto">
                <p class="has-text-centered">Retribución -- Tira un dado. Si sacas un 1</p>
                <h1 class="title has-text-centered titlePactosiniestro">¿Hora de saldar tu deuda?</h1>
              </div>

              <div v-if="verResultadoPacto">
                <p class="title is-1 has-text-centered resultadoPactosiniestro">{{ ResultadoPacto }}</p>
                <p v-if="ResultadoPacto == 1" class="subtitle is-3 titlePactosiniestro"> Dale la vuelta a la carta y cumple con tu destino!</p>
                <p v-else class="subtitle is-3 titlePactosiniestro">La próxima vez no tendrás tanta suerte ...</p>
              </div>

              <div v-if="verPactoSiniestro">
                <p class="title has-text-centered is-italic mb-2">{{ this.$store.state.dataPactoSiniestro.title }}</p>
                <hr class="my-2 has-text-black" />
                <p class="subtitle is-6 mb-2  is-italic">{{ this.$store.state.dataPactoSiniestro.narrativa }}</p>
                <br />
                <p class="subtitle is-6  has-text-black mb-0">{{ this.$store.state.dataPactoSiniestro.descripcion }}</p>
                <p class="subtitle is-7 has-text-right">Expansion: {{ this.$store.state.dataPactoSiniestro.expansion }}</p>
              </div>
            </div>
          </section>
          <!-- BOOOOOOOOOODYYYYYYYY -->

          <!-- FOOOOOOOOOTERRRRRRRRR -->
          <footer class="">
            
            <!-- FASE 1 -->
            <div v-if="verCartaPacto" class="field has-addons columns is-mobile is-gapless" >
              <p class="control column is-half">
                <button @click=" tirarPacto(1), (verResultadoPacto = true), (verCartaPacto = false) " 
                  class="button is-danger is-fullwidth" > Tirar 
                </button>
              </p>

              <p class="control column is-half">
                <button @click=" (this.$store.state.modalPacto = false), (this.ResultadoPacto = null)"
                  class="button is-link is-fullwidth">Aun no
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
                  class="button is-fullwidth is-12 is-link column">Volver
                </button>

                <button
                  v-if="ResultadoPacto == 1"
                  @click="
                    this.seleccionarPacto(),
                    (verResultadoPacto = false),
                    (verPactoSiniestro = true)"
                  class="button is-fullwidth is-12 is-link column">Ver Pacto Siniestro
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
                class="button is-fullwidth is-12 is-link column">Volver
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
        title: null,
        narrativa: null,
        descripcion: null,
      },
      pactosSiniestros: [
        {id: 1,
          expansion: "original",
          title: "Al filo de la navaja",
          narrativa:
            "Al ver tanta muerte y maldad suelta por el mundo, te desesperas y sientes caer todo el peso del mundo sobre tus hombros. Ya ni siquiera recuerdas la última vez que fuiste feliz.",
          descripcion:
            "Estado: Al filo de la navaja -- Durante la partida, si el investigador falla 2 veces seguidas cualquier prueba, este acabará con su vida. Sin embargo, si consigue 2 aciertos seguidos, descarta esta carta.",
        },
        // {id: 2, PACTO DESCARTADO POR AHORA
        //     expansion: "original",
        //     title: "Enfermo QUITAR ESTE" ,
        //     narrativa: "Leyendo el pacto que firmaste, notas que te da por toser, cada vez más fuerte, cuando vuelves a ver el papel, lo ves ensangrentado, al igual que tu boca" ,
        //     descripcion: "Estado: Enfermo -- Tira 3 dados; por cada 1 que saque en la tirada, tu vida y cordura Max. se reduce en -1 (Por ejemplo, si en la tirada sacas 3 unos, tu vida y cordura max. se reducirá en -3)"},
        {id: 2,
          expansion: "original",
          title: "La transformación del mal",
          narrativa:
            "La herida que tuviste que hacerte para firmar el pacto se vuelve de pronto más negra y putrefacta. Al darte cuenta de esto, sales corriendo en busca de ayuda; de camino al hospital te caes al suelo. Sientes que algo dentro de ti te está poseyendo rápidamente, como gusanos bajo tu piel agarrando cada músculo para posteriormente acabar controlandote por completo.",
          descripcion:
            "Este investigador se transforma en una criatura, se sustituye a este investigador por una criatura Elite (la primera que se encuentre en el mazo de criaturas, si no hay ninguno, busca en el mazo de la caja).El investigador es devorado.",
        },
        {id: 3,
          expansion: "original",
          title: "Vortice hacia el caos",
          narrativa:
            "Tu mirada se nubla, tu mente se dispersa, tus sentidos se relajan. Metes la mano en el bolsillo y sacas una llave de plata, no sabes exactamente qué hacía ahí, pero simplemente la coges y sigues tu camino. MUEVE EL INVESTIGADOR 2 ESPACIOS. SIGUE LEYENDO DESPUÉS DE MOVER AL INVESTIGADOR. Sin saber exactamente qué estás haciendo, extiendes la mano que sujeta la llave y sientes como encaja en una cerradura, en mitad de la calle. Abres una puerta rosa, de madera, quebrada y mugrienta hasta la última esquina.",
          descripcion:
            "Aparece donde el investigador 3 criaturas y se enfrentan directamente al el.",
        },
        {id: 4,
          expansion: "original",
          title: "Señalado por el primigenio",
          narrativa:
            "El cielo se enrojece, se cubre de nubes y entre los relampagos ves una silueta de tamaño colosal a lo lejos, detrás de las montañas. Te entran unos terribles escalofríos cuando oyes una voz grave y ronca decirte “Tu hora ha llegado”.",
          descripcion:
            "Estado: Señalado por el primigenio. Para el resto de la partida eres el objetivo de todas las criaturas, ignorando lo que ponga la tarjeta de dicha criatura. Te seguirán hasta alcanzarte y matarte. Mientras esta carta permanezca activa, TODAS LAS CRIATURAS TIENEN +1 DE VELOCIDAD. Si por el camino una criatura se topa con otro investigador, dicha criatura se enfrentará a ese investigador.",
        },
        {id: 5,
          expansion: "original",
          title: "Hasta los huesos",
          narrativa:
            "-¿Qué me está pasando?- Te preguntas a ti mismo mientras ves impotente como el brazo con el que firmaste ese pacto, se seca poco a poco, hasta convertirse tan solo en piel y hueso.",
          descripcion:
            "Estado: Manco. Para el resto de la partida no podras usar objetos que requieran de 2 manos. ",
        },
        // {id: 8,
        //     expansion: "original",
        //     title: "QUITAR ESTE" ,
        //     narrativa: "BLA BLA BLA" ,
        //     descripcion: "Vuelve la peste. El personaje queda afectado por la peste, el barrio donde dicho personaje esté queda en cuarentena, lo cual no se podra entrar ni salir de el por 3 turnos"},
        {id: 6,
          expansion: "base",
          title: "Destino siniestro",
          narrativa:
            "Te pinchaste en el dedo y sellaste el pacto con una gota de sangre. Y no te pidieron nada a cambio. -Tenemos nuestros motivos- dijo el desconocido mientras guardaba el contrato bajo los pliegues de su túnica-. Usted limitase en cumplir su parte.",
          descripcion:
            "Roba y resuelve seis fichas de la reserva de Mitos. Luego descarta esta carta",
        },
        {id: 7,
          expansion: "base",
          title: "El precio más alto",
          narrativa:
            "Cuando sellaste el pacto y firmaste con tu sangre en aquel enorme libro negro, lo ultimo que sabias era que la deuda quedaria saldada el dia de tu muerte. Ahora comprendes que el precio que debes pagar es el día de tu muerte. Y ese día ya ha llegado.",
          descripcion: "Eres devorado.",
        },
        {id: 8,
          expansion: "base",
          title: "Sacrificios rituales",
          narrativa:
            "Empiezas con poca cosa: ratas, pájaros, gatos y perros, lo justo para ganar algo de tiempo. Pero no tardas en mancharte las manos con la sangre de terneros cebados, cabras y corderitos blancos como la nieve. Hasta que te ponen el cuchillo en las manos una última vez.",
          descripcion:
            "Elige a otro investigador que esté en cualquier espacio. Ese investigador es devorado. Luego descarta esta carta.",
        },
        {id: 9,
          expansion: "base",
          title: "Conocimientos prohibidos",
          narrativa:
            "Con el corazón en un puño, abres la cubierta pétrea del libro y empiezas a leer. Las palabras se graban a fuego en tu mente, y no tardas en comprender que semejantes conocimientos no deben quedar al alcance de cualquiera.",
          descripcion:
            "Descarta un total de tres Pistas de entre todos los investigadores y la hoja de Escenario (o todas estas Pistas, si en total suman menos de tres). Si se descartan de este modo exactamente una o ninguna Pista, coloca una ficha de Perdición sobre la hoja de Escenario. Luego descarta esta carta.",
        },
        {id: 10,
          expansion: "base",
          title: "Alianza maligna",
          narrativa:
            "- Ha llegado la hora de saldar tu deuda - sisea la voz, y el pánico se apodera de ti mientras observas imponente como abres esa puerta, rompes aquella farola, apartas ese sumidero ... De un centenar de maneras, entregas las llaves de la ciudad a las fuerzas del mal.",
          descripcion:
            "Aparece un Monstruo en cada uno de los espacios de tu Barrio. (Cada monstruo se enfrenta a un investigador que haya en su espacio.) Cada Monstruo recupera toda su Vida e inflige Daño y Horror al investigador que esté enfrentado a él. Luego descarta esta carta.",
        },
        {id: 11,
          expansion: "base",
          title: "El mundo está perdido",
          narrativa:
            "Te resulta imposible conciliar el sueño. Siempre que cierras los ojos, oyes esa voz que te llama por tu nombre. Cada vez suena más cerca, ¿pero cómo es eso posible? La voz pertenece a una criatura ajena al tiempo y el espacio. Lo sabes bien, pues contabas con ello al sellar el pacto. Pero ahora está aquí, y no te queda más remedio que franquearle el paso.",
          descripcion:
            "Coloca tres fichas de Perdición en tu espacio. Luego descarta esta carta.",
        },
        {id: 12,
          expansion: "mareas tenebrosas",
          title: "Plaga virulenta",
          narrativa:
            "Sufres un horrible y doloroso ataque de tos; es como si tuvieras cristales rotos en los pulmones. Cuando por fín cesa, respiras entrecortadamente y te limpias la sangre de los labios. Al ver que tus desdichados compañeros sucumben a la misma dolencia, caes en la cuenta de que esta terrible infección ha empezado contigo.",
          descripcion:
            "Sufres un punto de Daño directo y un punto de Horror directo. Luego todos los demás investigadores sufren 2 puntos de Daño directo y 2 puntos de horror directo (cada uno). Luego descarta esta carta.",
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