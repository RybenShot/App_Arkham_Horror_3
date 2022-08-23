<template>
  <div class="BGGeneralAH">
    <!-- HERO -->
    <!-- <router-link to="/">
      <div class="hero-body columns is-mobile p-4 m-0">
        <p class="f-x2 column is-one-fifth p-0"></p>
        <img id="imgTitleAH" class="column p-0" src="../assets/img/TituloArkhamHorrorEDITADO.png" alt=""/>
        <p class="column is-one-fifth p-0"></p>
      </div>
    </router-link> -->

    <!-- SELECCION DE PJ -->
    <div v-if="viewPJ == true">
      <div class="allWindow">

        <!-- IMG -->
        <section class="hero is-small helperImgPjs" :class="[imgPersonaje]">
          <div class="hero-body columns is-vcentered is-mobile">

            <!-- ARROW izquierda -->
            <div class="column is-one-fifth ">
              <!-- boton dehabilitado  -->
              <div v-if="this.contador <= 1">
                <button title="Disabled button" disabled class="p-2">
                  <i class="fa-2x fas fa-angle-double-left"></i>
                </button>
              </div>
              <!-- boton funcionando!  -->
              <div v-if="this.contador > 1">
                <button @click="cambiaPJ(contador--)" class="p-2">
                  <i class="fa-2x fas fa-angle-double-left"></i>
                </button>
              </div>
            </div><!-- end ARROW izquierda -->

            <div class="column">
              <h1 class="title titleDecoration is-2 pt-3 mb-3">
                {{ this.nombrePJ }}
              </h1>
            </div>

            <!-- ARROW derecha -->
            <div class="column is-one-fifth">
              <!-- boton deshabilitado -->
              <div v-if="this.contador >= 13">
                <button title="Disabled button" disabled class="p-2">
                  <i class="fa-2x fas fa-angle-double-right"></i>
                </button>
              </div>

              <!-- boton funcionando!  -->
              <div v-if="this.contador < 12">
                <button @click="cambiaPJ(contador++)" class="p-2">
                  <i class="fa-2x fas fa-angle-double-right"></i>
                </button>
              </div>
            </div><!-- end ARROW derecha -->

          </div>
        </section>

        <!-- DatosVida/Cordura-->
        <div class="columns is-mobile mt-2">
          <!-- Vida y cordura -->
            <div class="column">
              <p class="has-text-danger has-text-centered">
                <i class="fa-5x fas fa-heartbeat"></i>
              </p>
              <p class="contadorVidaCordura has-text-centered title is-3 mb-0">
                {{ this.vida }}
              </p>
            </div>

            <div class="column">
              <p class="has-text-info has-text-centered">
                <i class="fa-5x fas fa-brain"></i>
              </p>
              <p class="contadorVidaCordura has-text-centered title is-3 mb-0">
                {{ this.cordura }}
              </p>
            </div>
        </div><!-- end DatosVida/Cordura -->
        
        <!-- ATRIBUTOS y Boton -->
        <div class="columns mx-3 is-mobile">
          <div class="column p-1">
            <p class="has-text-purple has-text-centered">
              <i class="fa-3x fas fa-book-open"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.saber }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-orange has-text-centered">
              <i class="fa-3x fas fa-handshake"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.influencia }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-primary has-text-centered"><i class="fa-3x fas fa-eye"></i></p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.observacion }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-danger has-text-centered">
              <i class="fa-3x fas fa-fist-raised"></i>
            </p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.fuerza }}</p>
          </div>
          <div class="column p-0">
            <p class="has-text-info has-text-centered"><i class="fa-3x fab fa-hornbill"></i></p>
            <p class="contadorAtributos title is-5 has-text-centered">{{ this.voluntad }}</p>
          </div>
        </div>

        <!-- Datos -->
        <div class="px-3">
          <p class="has-text-white pb-1">--> {{ this.efecto1 }}</p>
          <p class="has-text-white pb-1" v-if=" this.efecto2 != null ">--> {{ this.efecto2 }}</p>
          <p class="has-text-white is-italic pt-2">{{this.frase}}</p>
        </div>

        <!-- Boton de Comenzar -->
        <div class="columns is-mobile">
          <div class="column is-4"></div>
          <div class="column"><button @click="comenzar()" class="button is-success has-text-white mt-5 p-5">Comenzar!</button></div>
          <div class="column is-4"></div>
        </div>
        <br />
      </div><!-- end container  -->
    </div><!-- end SELECCION DE PJ  -->

    <!-- VIEW PLAY!!!!! -->
    <div v-if="viewPlay == true">
      <div class="container allWindow">
        
        <!-- IMG -->
        <section class="hero is-small helperImgPjs" :class="[imgPersonaje]">
          <div class="hero-body columns is-vcentered is-mobile">
            <div class="column is-2"></div>
            <div class="column">
              <h1 class="title titleDecoration is-2 pt-3 mb-3">{{ this.nombrePJ }}</h1>
            </div>
            <div class="column is-2 has-text-white"><router-link to="/"><i class="fa-2x fas fa-home"></i></router-link></div>
          </div>
        </section>

        <!-- VIDA Y CORDURA -->
        <div class="columns is-mobile pt-2">
          <!-- VIDA -->
          <div class="column">
            <p class="has-text-danger has-text-centered"><i class="fa-5x fas fa-heartbeat"></i></p>
            <p class="contadorVidaCordura has-text-centered title is-3 mb-0">{{ this.vida }}</p>
            <!-- botones + - -->
            <div class="columns is-mobile pb-2">
              <div class="column ml-4 pt-0">
                <button class="button is-danger" @click="vida--">-</button>
              </div>

              <div class="column ml-3 pt-0">
                <button class="button is-success" @click="vida++">+</button>
              </div>
            </div>
          </div><!-- end VIDA -->
          
          <!-- CORDURA -->
          <div class="column">
            <p class="has-text-info has-text-centered"><i class="fa-5x fas fa-brain"></i></p>
            <p class="contadorVidaCordura has-text-centered title is-3 mb-0">{{ this.cordura }}</p>
            <!-- botones + - -->
            <div class="columns is-mobile pb-2">
              <div class="column ml-4 pt-0">
                <button class="button is-danger" @click="cordura--">-</button>
              </div>

              <div class="column ml-3 pt-0">
                <button class="button is-success" @click="cordura++">+</button>
              </div>
            </div>
          </div><!-- end CORDURA -->
        </div><!-- END VIDA Y CORDURA -->
        
        <!-- ATRIBUTOS -->
        <div class="columns is-mobile" id="botonesAtributos">
          <button class="column p-1 mx-2 ml-4 botonesAtributos" @click="selectAtributo(this.saber)">
            <p class="has-text-purple"><i class="fa-3x fas fa-book-open"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.saber }}</p>
          </button>

          <button class="column p-1 mx-2" @click="selectAtributo(this.influencia)">
            <p class="has-text-orange"><i class="fa-3x fas fa-handshake"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.influencia }}</p>
          </button>

          <button class="column p-1 mx-2" @click="selectAtributo(this.observacion)">
            <p class="has-text-primary"><i class="fa-3x fas fa-eye"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.observacion }}</p>
          </button>

          <button class="column p-1 mx-2" @click="selectAtributo(this.fuerza)">
            <p class="has-text-danger"><i class="fa-3x fas fa-fist-raised"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.fuerza }}</p>
          </button>

          <button class="column p-1 mx-2 mr-4" @click="selectAtributo(this.voluntad)">
            <p class="has-text-info"><i class="fa-3x fab fa-hornbill"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.voluntad }}</p>
          </button>
        </div><!-- end ATRIBUTOS -->

        <div><!-- Dados Extras -->
          <p class="has-text-centered has-text-white">Dados extras</p>
          <div class="columns is-mobile mt-2 px-6">
            <button @click="NDeDadosExtra--" class="column py-2 px-4 mr-3">-</button>
            <input type="number" v-model="NDeDadosExtra" class="column py-2 px-2 px-2" />
            <button @click="NDeDadosExtra++" class="column py-2 px-4 ml-3">+</button>
          </div>
        </div><!-- end Dados Extras -->

        <!-- BOTON DE LANZAR DADOS -->
        <!-- Aqui indicamos ya el minimo del resultado que debe salir y el maximo lo indicamos con "NDeLados" -->
        <div class="columns is-mobile mt-3">
          <div class="column is-4"><p class="subtitle has-text-white is-6 is-italic px-2">Total de dados: {{this.NDeDadosExtra + this.NDadosAtributo}}</p></div>
          <div class="column">
            <button @click="tirarDados(1)" class="button is-success is-active">TIRAR!</button>
            </div>
          <div class="column mr-3">
            <!-- BOTON DE MAS OPCIONES -->
            <button v-if="masOpciones == false" @click="masOpciones = !masOpciones" class="button is-warning"> + opciones + </button>
            <button v-if="masOpciones == true" @click="masOpciones = !masOpciones" class="button is-warning" > - opciones - </button>
          </div>
        </div>

        <!-- AVANZADO -->
        <Transition>
          <div v-show="masOpciones" class="card p-2 mt-2">
            <h3>Avanzado</h3>
            <dir class="columns is-mobile">
              <div class="column">
                <h4>Fatal</h4>
                <input class="p-2 inputs" type="number" v-model="AvFatal" placeholder="Fatal" >
                <input class="p-2 inputs" type="number" v-model="AvFatal2" placeholder="Fatal">
                <input class="p-2 inputs" type="number" v-model="AvFatal3" placeholder="Fatal">
              </div>
              <div class="column">
                <h4>Acierto</h4>
                <input class="p-2 inputs" type="number" v-model="AvAcierto" placeholder="Acierto">
                <input class="p-2 inputs" type="number" v-model="AvAcierto2" placeholder="Acierto">
                <input class="p-2 inputs" type="number" v-model="AvAcierto3" placeholder="Acierto">
              </div>
            </dir>
          </div>
        </Transition>
        
        <!-- RESULTADOS -->
        <div class="resultados mx-6">
          <h1 class="title has-text-centered has-text-white is-3">RESULTADOS</h1>
          <div id="resultados-css" class="container">
            <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
            <div v-for="item in resultados" :key="item">
              <!-- SI OPCIONES AVANZADAS -->
                <p v-if="(item == AvAcierto) |(item == AvAcierto2) |(item == AvAcierto3)" class="acierto resultado-css">{{ item }}</p>
                <p v-else-if="(item == AvFatal) | (item == AvFatal2) | (item == AvFatal3)" class="fatal resultado-css">{{ item }}</p>
                <p v-else class="resultado-css">{{ item }}</p>
            </div>
          </div>
          <br />

          <Transition>
            <div v-if="masOpciones" class="p-2">
              <h1 class="title has-text-white">Suma de todo {{ SumaDetodo }}{{ this.sumaResultado }}</h1>
            </div>
          </Transition>

          <div class="columns is-mobile"><!-- Boton de VOLVER -->
            <div class="column"></div>
            <div class="column"><button @click="volver()" class="button is-link p-5 has-text-white">Volver</button></div>
            <div class="column"></div>
          </div>
          
        </div>
      </div><!-- end card - container -->
    </div><!-- end VIEW PLAY -->

  </div>
</template>

<script>
export default {
  name: "PersonajesAHClasico",

  data() {
    return {
      imgPersonaje: "imgTommy",

      nombrePJ: "Tommy MulDoon",
      vida: 7,
      cordura: 5,
      saber: 2,
      influencia: 2,
      observacion: 3,
      fuerza: 3,
      voluntad: 3,
      dinero: 2,
      limConcentracion: 2,
      efecto1: "Protector : Si un Mounstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tu a ese Mounstro en su lugar.",
      efecto2: null,
      frase: '“Vamos alla, Tommy. Es hora de hacerse el Heroe”',
      historia: "",
      arquetipo1: "",
      arquetipo2: "",
      // Objeto1: require("@BlaBla"),
      // Objeto2: require("@BlaBla"),
      // Objeto3: require("@BlaBla"),

      Personajes: [
        {nombrePJ: "Tommy Muldoon",
          vida: 7,
          cordura: 5,
          saber: 2,
          influencia: 2,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 2,
          limConcentracion: 2,
          efecto1:
            "Protector : Si un Mounstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tu a ese Mounstro en su lugar.",
          efecto2: null,
          frase: "“Vamos alla, Tommy. Es hora de hacerse el Heroe”",
          historia:
            "Los Muldoon habian servido en el cuerpo de policia durante generaciones, y Tommy no hiba a ser menos. Fue el orgullo de su familia cuando se graduo en la academia de boston. Por eso no hizo mucha gracia que lo transladasen a la comisaria de Arkham; despues de todo ¿ que podia ocurrir en aquel pueblucho compararo con los crimenes que habria sido capaz de resolver en boston? Al final resulto que el trabajo policial en arkham no estaba exento de interes, despues de todo. Habia muchos sucesos inexplicables, y la policia local parecia mas interesada en aparentar normalidad que en buscar una solucion. Asiq e tommy echo mano a Becky, el rifle de s abuelo, y se dispuso a buscar soluciones por su cuenta ...",
          arquetipo1:
            "Como Defensor, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          arquetipo2:
            "Como Superviviente, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: null,
        },
        {nombrePJ: "Marie Lambeau",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 4,
          observacion: 2,
          fuerza: 2,
          voluntad: 2,
          dinero: 4,
          limConcentracion: 2,
          efecto1:
            "Voz Aterciopelada: Una vez por ronda, despues de que realices una acción, otro investigadorque esté en cualquier espacio puede realizar esa misma acción.(Se siguen aplicando las restricciones habituales a las acciones.)",
          efecto2: null,
          frase: "“Prestame atención y déjate encandilar por mi voz”",
          historia: "blaBlaBla",
          arquetipo1:
            "Como Mística, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          arquetipo2:
            "Como Superviviente, tu ventaja redica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: null,
        },
        {nombrePJ: "Jenny Barnes",
          vida: 7,
          cordura: 5,
          saber: 1,
          influencia: 4,
          observacion: 2,
          fuerza: 3,
          voluntad: 3,
          dinero: 5,
          limConcentracion: 1,
          efecto1:
            "Fondo financiado -- Acción: Si tienes menos de 3$, ganas 3$",
          efecto2: null,
          frase:
            "“Nome importa solcionar problemas a golpe de talonario; y si eso no fnciona, ya los golpearé con alguna otra cosa”",
          historia: "Bla Bla Bla",
          arquetipo1:
            "Como Experta, posees un conjnto exclsivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          arquetipo2: null,
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: null,
        },
        {nombrePJ: "Dexter Drake",
          vida: 5,
          cordura: 7,
          saber: 4,
          influencia: 3,
          observacion: 2,
          fuerza: 2,
          voluntad: 2,
          dinero: 2,
          limConcentracion: "Es igual al numero de hechizos que tengas",
          efecto1:
            "Don para la magia. Una vez por ronda, cuando estés resolviendo una prueba de SABER, puedes volver a tirar uno o todos los dados",
          efecto2: null,
          frase:
            "“No te conviene ver la autentica magia, chico. Nadie deberia verla nunca.”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Místico, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          arquetipo2: null,
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: null,
        },
        {nombrePJ: "Wendy Adams",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 1,
          observacion: 4,
          fuerza: 2,
          voluntad: 3,
          dinero: 1,
          limConcentracion: 3,
          efecto1:
            "Atajo -- Antes o después de que realices una acción, adicional como parte de una acción de evasión, puedes moverte un máximo de dos espacios (este movimiento es gratuito).",
          efecto2: null,
          frase:
            "“Algun dia encontraré a papá, y mamá vendrá a casa con nosotros y volveremos a ser felices. Ya lo veréis.”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Superviviente, tu ventaja redica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          arquetipo2:
            "Como Buscadora, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: null,
        },
        {nombrePJ: "Rex Murphy",
          vida: 7,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 2,
          dinero: 3,
          limConcentracion: "Sin limite",
          efecto1:
            "Maldición Familiar -- Cuando estés resolviendo una preba, solamente centan como Exitos los 6 que obtengas. No puedes ganar los estados de Bencición ni Maldición.",
          efecto2:
            "Obstinación -- Después de que falles na prueba, te concentras en una habilidad de tu elección",
          frase:
            "“¿Como me he metido en semejante embrollo? Vaya suerte la mia.”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Buscador, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como Experto, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
        {nombrePJ: "Calvin Wrigth",
          vida: 6,
          cordura: 6,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 3,
          voluntad: 1,
          dinero: 3,
          limConcentracion: 2,
          efecto1:
            "Un amigo seguro -- Acción: Puedes intercambiar calqier cantidad de Vida y/o Cordura con otro investigador o Aliado que este en cualquier espacio.",
          efecto2: null,
          frase: "“Sacrificaria lo que hiciera falta con tal de protegerte”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Defensor, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          arquetipo2:
            "Como Experto, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
        {nombrePJ: "Agnes Baker",
          vida: 6,
          cordura: 6,
          saber: 4,
          influencia: 2,
          observacion: 2,
          fuerza: 2,
          voluntad: 3,
          dinero: 3,
          limConcentracion: 2,
          efecto1:
            "La sangre es poder -- Cuando estés lanzando un Hechizo, si sufres Daño o gastas Restos, recives +2 SABER",
          efecto2:
            "Magia de sangre -- Puedes sufrir Daño en vez de Horror cuando lances n Hechizo",
          frase: "“Las cosas no son siempre lo que parecen”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Mística, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          arquetipo2:
            "Como Defensora, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
        {nombrePJ: "Michael McGlen",
          vida: 8,
          cordura: 4,
          saber: 2,
          influencia: 3,
          observacion: 1,
          fuerza: 4,
          voluntad: 3,
          dinero: 3,
          limConcentracion: 1,
          efecto1:
            "Sed de venganza -- Después de que derrotes a un Monstruo con una acción de ataque, recuperas un punto de Cordura o bien te concentras en una habilidad de tu eelcción.",
          efecto2: null,
          frase: "“Esto es por Louie”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Experto, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          arquetipo2:
            "Como Defensor, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
        {nombrePJ: "Daniela Reyes",
          vida: 7,
          cordura: 5,
          saber: 3,
          influencia: 3,
          observacion: 1,
          fuerza: 3,
          voluntad: 3,
          dinero: 3,
          limConcentracion: 3,
          efecto1:
            "Pasión por el trabajo -- Después de que realices una acción de conseguir fondos, puedes concentrarte en una habilidad de tu elección",
          efecto2: null,
          frase: "“Si necesitas un trabajo bien hecho, acuerdate de mí”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Experta, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Daniela no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          arquetipo2:
            "Como Superviviente, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
        {nombrePJ: "Norman Withers",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 1,
          observacion: 3,
          fuerza: 2,
          voluntad: 4,
          dinero: 1,
          limConcentracion: 2,
          efecto1:
            "Escrito en las estrellas -- Después que quites al menos de dos fichas de Perdición de tu espacio, puedes sufrir un punto de horror para revelar una Pista(colócala sobre la hoja de Escenario)",
          efecto2: null,
          frase:
            "“Decir que es algo es imposible no lo hace menos cierto. La verdad es indiferente a la opinión que uno tenga.”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Buscador, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como Místico, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
        {nombrePJ: "Minh Thi Phan",
          vida: 6,
          cordura: 6,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 2,
          dinero: 3,
          limConcentracion: 2,
          efecto1:
            "Pendiente de todo -- una vez por ronda, al resolver na prueba, tu u otro investigador que esté en tu espacio podeis volver a tirar tantos dados como el número de Pistas que haya en vestro Barrio (podeis tirar menos si queréis).",
          efecto2: null,
          frase:
            "“Estoy convencida de que podemos hayar una solución si cooperamos.”",
          historia: "bla Bla Bla",
          arquetipo1:
            "Como Buscadora, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como Superviviente, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
          Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
          Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),
        },
      ],

      // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,

      resultados: [1, 6, 5, 3],
      sumaResultado: 0,

      masOpciones: false,

      AvAcierto: 6,
      AvAcierto2: 5,
      AvAcierto3: null,
      AvFatal: 1,
      AvFatal2: null,
      AvFatal3: null,

      contador: "1",
      viewPJ: true,
      viewPlay: false,
    }; // end return
  }, // end data

  methods: {
    cambiaPJ() {
      if (this.contador == 1) {
        this.imgPersonaje = "imgTommy";
        this.nombrePJ = this.Personajes[0].nombrePJ;
        this.vida = this.Personajes[0].vida;
        this.cordura = this.Personajes[0].cordura;
        this.saber = this.Personajes[0].saber;
        this.influencia = this.Personajes[0].influencia;
        this.observacion = this.Personajes[0].observacion;
        this.fuerza = this.Personajes[0].fuerza;
        this.voluntad = this.Personajes[0].voluntad;
        this.efecto1 = this.Personajes[0].efecto1;
        this.efecto2 = this.Personajes[0].efecto2;
        this.frase = this.Personajes[0].frase;
      } else if (this.contador == 2) {
        this.imgPersonaje = "imgMarie";
        this.nombrePJ = this.Personajes[1].nombrePJ;
        this.vida = this.Personajes[1].vida;
        this.cordura = this.Personajes[1].cordura;
        this.saber = this.Personajes[1].saber;
        this.influencia = this.Personajes[1].influencia;
        this.observacion = this.Personajes[1].observacion;
        this.fuerza = this.Personajes[1].fuerza;
        this.voluntad = this.Personajes[1].voluntad;
        this.efecto1 = this.Personajes[1].efecto1;
        this.efecto2 = this.Personajes[1].efecto2;
        this.frase = this.Personajes[1].frase;
      } else if (this.contador == 3) {
        this.imgPersonaje = "imgJenny";
        this.nombrePJ = this.Personajes[2].nombrePJ;
        this.vida = this.Personajes[2].vida;
        this.cordura = this.Personajes[2].cordura;
        this.saber = this.Personajes[2].saber;
        this.influencia = this.Personajes[2].influencia;
        this.observacion = this.Personajes[2].observacion;
        this.fuerza = this.Personajes[2].fuerza;
        this.voluntad = this.Personajes[2].voluntad;
        this.efecto1 = this.Personajes[2].efecto1;
        this.efecto2 = this.Personajes[2].efecto2;
        this.frase = this.Personajes[2].frase;
      } else if (this.contador == 4) {
        this.imgPersonaje = "imgDexter";
        this.nombrePJ = this.Personajes[3].nombrePJ;
        this.vida = this.Personajes[3].vida;
        this.cordura = this.Personajes[3].cordura;
        this.saber = this.Personajes[3].saber;
        this.influencia = this.Personajes[3].influencia;
        this.observacion = this.Personajes[3].observacion;
        this.fuerza = this.Personajes[3].fuerza;
        this.voluntad = this.Personajes[3].voluntad;
        this.efecto1 = this.Personajes[3].efecto1;
        this.efecto2 = this.Personajes[3].efecto2;
        this.frase = this.Personajes[3].frase;
      } else if (this.contador == 5) {
        this.imgPersonaje = "imgWendy";
        this.nombrePJ = this.Personajes[4].nombrePJ;
        this.vida = this.Personajes[4].vida;
        this.cordura = this.Personajes[4].cordura;
        this.saber = this.Personajes[4].saber;
        this.influencia = this.Personajes[4].influencia;
        this.observacion = this.Personajes[4].observacion;
        this.fuerza = this.Personajes[4].fuerza;
        this.voluntad = this.Personajes[4].voluntad;
        this.efecto1 = this.Personajes[4].efecto1;
        this.efecto2 = this.Personajes[4].efecto2;
        this.frase = this.Personajes[4].frase;
      } else if (this.contador == 6) {
        this.imgPersonaje = "imgRex";
        this.nombrePJ = this.Personajes[5].nombrePJ;
        this.vida = this.Personajes[5].vida;
        this.cordura = this.Personajes[5].cordura;
        this.saber = this.Personajes[5].saber;
        this.influencia = this.Personajes[5].influencia;
        this.observacion = this.Personajes[5].observacion;
        this.fuerza = this.Personajes[5].fuerza;
        this.voluntad = this.Personajes[5].voluntad;
        this.efecto1 = this.Personajes[5].efecto1;
        this.efecto2 = this.Personajes[5].efecto2;
        this.frase = this.Personajes[5].frase;
      } else if (this.contador == 7) {
        this.imgPersonaje = "imgCalvin";
        this.nombrePJ = this.Personajes[6].nombrePJ;
        this.vida = this.Personajes[6].vida;
        this.cordura = this.Personajes[6].cordura;
        this.saber = this.Personajes[6].saber;
        this.influencia = this.Personajes[6].influencia;
        this.observacion = this.Personajes[6].observacion;
        this.fuerza = this.Personajes[6].fuerza;
        this.voluntad = this.Personajes[6].voluntad;
        this.efecto1 = this.Personajes[6].efecto1;
        this.efecto2 = this.Personajes[6].efecto2;
        this.frase = this.Personajes[6].frase;
      } else if (this.contador == 8) {
        this.imgPersonaje = "imgAgnes";
        this.nombrePJ = this.Personajes[7].nombrePJ;
        this.vida = this.Personajes[7].vida;
        this.cordura = this.Personajes[7].cordura;
        this.saber = this.Personajes[7].saber;
        this.influencia = this.Personajes[7].influencia;
        this.observacion = this.Personajes[7].observacion;
        this.fuerza = this.Personajes[7].fuerza;
        this.voluntad = this.Personajes[7].voluntad;
        this.efecto1 = this.Personajes[7].efecto1;
        this.efecto2 = this.Personajes[7].efecto2;
        this.frase = this.Personajes[7].frase;
      } else if (this.contador == 9) {
        this.imgPersonaje = "imgMichael";
        this.nombrePJ = this.Personajes[8].nombrePJ;
        this.vida = this.Personajes[8].vida;
        this.cordura = this.Personajes[8].cordura;
        this.saber = this.Personajes[8].saber;
        this.influencia = this.Personajes[8].influencia;
        this.observacion = this.Personajes[8].observacion;
        this.fuerza = this.Personajes[8].fuerza;
        this.voluntad = this.Personajes[8].voluntad;
        this.efecto1 = this.Personajes[8].efecto1;
        this.efecto2 = this.Personajes[8].efecto2;
        this.frase = this.Personajes[8].frase;
      } else if (this.contador == 10) {
        this.imgPersonaje = "imgDaniela";
        this.nombrePJ = this.Personajes[9].nombrePJ;
        this.vida = this.Personajes[9].vida;
        this.cordura = this.Personajes[9].cordura;
        this.saber = this.Personajes[9].saber;
        this.influencia = this.Personajes[9].influencia;
        this.observacion = this.Personajes[9].observacion;
        this.fuerza = this.Personajes[9].fuerza;
        this.voluntad = this.Personajes[9].voluntad;
        this.efecto1 = this.Personajes[9].efecto1;
        this.efecto2 = this.Personajes[9].efecto2;
        this.frase = this.Personajes[9].frase;
      } else if (this.contador == 11) {
        this.imgPersonaje = "imgNorman";
        this.nombrePJ = this.Personajes[10].nombrePJ;
        this.vida = this.Personajes[10].vida;
        this.cordura = this.Personajes[10].cordura;
        this.saber = this.Personajes[10].saber;
        this.influencia = this.Personajes[10].influencia;
        this.observacion = this.Personajes[10].observacion;
        this.fuerza = this.Personajes[10].fuerza;
        this.voluntad = this.Personajes[10].voluntad;
        this.efecto1 = this.Personajes[10].efecto1;
        this.efecto2 = this.Personajes[10].efecto2;
        this.frase = this.Personajes[10].frase;
      } else if (this.contador == 12) {
        this.imgPersonaje = "imgMinh";
        this.nombrePJ = this.Personajes[11].nombrePJ;
        this.vida = this.Personajes[11].vida;
        this.cordura = this.Personajes[11].cordura;
        this.saber = this.Personajes[11].saber;
        this.influencia = this.Personajes[11].influencia;
        this.observacion = this.Personajes[11].observacion;
        this.fuerza = this.Personajes[11].fuerza;
        this.voluntad = this.Personajes[11].voluntad;
        this.efecto1 = this.Personajes[11].efecto1;
        this.efecto2 = this.Personajes[11].efecto2;
        this.frase = this.Personajes[11].frase;
      }
    }, // end cambiaMapa
    comenzar() {
      this.viewPJ = false;
      this.viewPlay = true;
    },
    volver() {
      this.viewPJ = true;
      this.viewPlay = false;
    },
    selectAtributo(dato) {
      this.NDadosAtributo = dato;
    },
    // TIRADA DE DADOS
    async tirarDados(min) {
      let max = 6; // maximo de lados de dados
      let totalDados = this.NDadosAtributo + this.NDeDadosExtra;
      await this.vaciarArray(); // vaciamos el array de resultados
      for (let i = 0; i < totalDados; i++) {
        // un bucle normal
        this.resultado = Math.floor(Math.random() * (min, max)) + min;
        console.log(this.resultado);
        this.resultados.push(this.resultado); // en cada vuelta metemos el resultado ene l array
      }
    },
    vaciarArray: function () {
      this.resultados = []; // vaciamos el array de resultado
      this.sumaResultado = 0;
    },
  }, // end methods
  computed: {
    SumaDetodo: function () {
      for (let i = 0; i < this.resultados.length; i++) {
        this.sumaResultado += this.resultados[i];
      }
    },
  },
  watch: {}

};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");

.contadorVidaCordura {
  position: relative;
  top: -50px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

.contadorAtributos {
  position: relative;
  top: -30px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

#botonesAtributos button:focus {
  background-color: chartreuse;
}
/* #botonesAtributos button {
  background-color: chartreuse;
} */

/* HELPERS */
/* Necesario para las transiciones */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.titleDecoration {
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
  font-weight: 800;
  text-align: center;
}

.BGGeneralAH {
  background-image: url(../assets/img/Games/ArkhamHorror/BGGeneralAH.jpg);
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}

.allWindow {
  min-height: 70vh;
}


/* imgPersonajes */
.helperImgPjs{
  background-position: center;
  background-size: cover;
}
.imgTommy {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ1.png);}
.imgMarie {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ2.jpg);}
.imgJenny {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ3.png);}
.imgDexter {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ4.png);}
.imgWendy {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ5.jpg);}
.imgRex {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ6.jpg);}
.imgCalvin {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ7.jpg);}
.imgAgnes {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ8.jpg);}
.imgMichael {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ9.jpg);}
.imgDaniela {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ10.jpg);}
.imgNorman {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ11.jpg);}
.imgMinh {background-image: url(../assets/img/Games/ArkhamHorror/imgPersonajes/Clasico/PJ12.jpg);}


/* colores para atributos */
.has-text-purple {
  color: #9b51e0;
}
.has-text-orange {
  color: #f2994a;
}

/* RESULTADO DE DADOS */
.acierto {
  background: #d9d9d9;
  border: 3px solid rgb(0, 255, 0);
}
.fatal {
  background: #d9d9d9;
  border: 3px solid #eb5757;
}
#resultados-css {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 3vmin;
}
.resultado-css {
  padding: 3px;
  margin: 10px;
  text-align: center;
  background: #d9d9d9;
}
</style>>

