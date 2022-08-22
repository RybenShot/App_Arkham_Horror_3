<template>
  <div class="BGGeneralAH">
    <br />

    <!-- SELECCION DE PJ -->
    <div v-if="viewPJ == true">
      <div class="mx-3 container allWindow card">
        <!-- TITULO -->
        <div>
          <h1 class="title titleDecoration pt-3 mb-3">{{ this.nombrePJ }}</h1>
        </div>

        <!-- DatosPJ , FLECHAS -->
        <div class="columns is-mobile mt-5">

          <!-- ARROW izquierda -->
          <div class="column column is-one-fifth is-vcentered p-0">
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
          </div>

          <!-- datas y Boton -->
          <div class="column p-0">
            <!-- Vida y cordura -->
            <div class="columns is-mobile">
              <p class="column">{{this.vida}}</p>
              <p class="column">{{this.cordura}}</p>
            </div>
            <!-- atributos -->
            <div class="columns is-mobile">
              <p class="column">{{this.saber}}</p>
              <p class="column">{{this.influencia}}</p>
              <p class="column">{{this.observacion}}</p>
              <p class="column">{{this.fuerza}}</p>
              <p class="column">{{this.voluntad}}</p>
            </div>

            <button @click="comenzar()" class="button is-success has-text-white mt-5 p-5">Comenzar!</button>
          </div>

          <!-- ARROW derecha -->
          <div class="column column is-one-fifth is-vcentered p-0">
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
          </div>

        </div>
        <br>
      </div><!-- end container  -->
    </div><!-- end SELECCION DE PJ  -->

    <!-- VIEW PLAY!!!!! -->
    <div v-if="viewPlay == true">
      <div class="mx-3 container allWindow card">

        <p>{{this.nombrePJ}}</p>

          <!-- VIDA Y CORDURA -->
          <div class="columns is-mobile">
            <!-- VIDA -->
            <div class="column">

              <p class="has-text-danger"><i class="fa-5x fas fa-heartbeat"></i></p>
              <p class="contadorVidaCordura title is-3 mb-0">{{this.vida}}</p>
            
              <!-- botones + - -->
              <div class="columns is-mobile pb-2">
                <div class="column p-0">
                  <button class="button is-danger" @click="vida --">-</button>
                </div>

                <div class="column p-0">
                  <button class="button is-success" @click="vida ++">+</button>
                </div>
              </div>
            </div> <!-- end VIDA -->

            <!-- CORDURA -->
            <div class="column">

              <p class="has-text-info"><i class="fa-5x fas fa-brain"></i></p>
              <p class="contadorVidaCordura title is-3 mb-0">{{this.cordura}}</p>
              

                <div class="columns is-mobile pb-2">
                  <div class="column p-0">
                    <button class="button is-danger" @click="cordura --">-</button>
                  </div>

                  <div class="column p-0">
                    <button class="button is-success" @click="cordura ++">+</button>
                  </div>
                </div>
            </div> <!-- end CORDURA -->
          </div> <!-- END VIDA Y CORDURA -->
          
          <!-- ATRIBUTOS -->
          <div class="columns is-mobile " id="botonesAtributos">

              <button class="p-1 is-link column mx-2 ml-4 "  @click="selectAtributo(this.saber)">
                <p class="has-text-purple"><i class="fa-3x fas fa-book-open"></i></p>
                <p class="contadorAtributos title is-5 mb-0">{{this.saber}}</p>
                <!-- <p>Saber</p> -->
              </button>

              <button class="p-1 is-warning column mx-2" @click="selectAtributo(this.influencia)">
                <p class="has-text-orange"><i class="fa-3x fas fa-handshake"></i></p>
                <p class="contadorAtributos title is-5 mb-0">{{this.influencia}}</p>
                <!-- <p>influencia</p> -->
              </button>

              <button class="p-1 is-success column mx-2" @click="selectAtributo(this.observacion)">
                <p class="has-text-primary "><i class="fa-3x fas fa-eye"></i></p>
                <p class="contadorAtributos title is-5 mb-0">{{this.observacion}}</p>
                <!-- <p>observacion</p> -->
              </button>

              <button class="p-1 is-danger column mx-2" @click="selectAtributo(this.fuerza)">
                <p class="has-text-danger "><i class="fa-3x fas fa-fist-raised"></i></p>
                <p class="contadorAtributos title is-5 mb-0">{{this.fuerza}}</p>
                <!-- <p>fuerza</p> -->
              </button>

              <button class="p-1 is-info column mx-2 mr-4" @click="selectAtributo(this.voluntad)">
                <p class="has-text-info"><i class="fa-3x fab fa-hornbill"></i></p>
                <p class="contadorAtributos title is-5 mb-0">{{this.voluntad}}</p>
                <!-- <p>voluntad</p> -->
              </button>
          </div>  <!-- end ATRIBUTOS -->

          <div>
            <p>Dados extras</p>
            <div>
              <button @click="NDeDadosExtra--" class="py-2 px-4 mr-3">-</button>
              <input type="number" v-model="NDeDadosExtra" class="py-2 px-2 px-2" />
              <button @click="NDeDadosExtra++" class="py-2 px-4 ml-3">+</button>
            </div>
          </div> <!-- end Dados Extras -->

          <br>

          <!-- BOTON DE LANZAR DADOS -->
          <!-- Aqui indicamos ya el minimo del resultado que debe salir y el maximo lo indicamos con "NDeLados" -->
          <button @click="tirarDados(1)" class="button is-success is-active mx-5">
            TIRAR!
          </button>

              <!-- RESULTADOS -->
          <br />
          <br />
          <div class="resultados mx-6">
            <h1 class="title is-3">RESULTADOS</h1>
            <div id="resultados-css" class="container">
              <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
              <div v-for="item in resultados" :key="item">

                <!-- SI OPCIONES AVANZADAS -->
                <div >
                  <p v-if="(item == AvAcierto) | (item == AvAcierto2) | (item == AvAcierto3)" class="acierto resultado-css" >{{ item }}</p>
                  <p v-else-if="(item == AvFatal) | (item == AvFatal2) | (item == AvFatal3)" class="fatal resultado-css">{{ item }}</p>
                  <p v-else class="resultado-css">{{ item }}</p>
                </div>
                
              </div>
            </div>
            <br />

            <Transition>
              <div v-if="masOpciones" class="suma card p-2">
                <h1 class="title">Suma de todo</h1>
                <p class="subtitle">{{ SumaDetodo }}{{ this.sumaResultado }}</p>
              </div>
            </Transition>

          <button @click="volver()" class="button is-link mt-5 p-5 has-text-white">Volver</button>

        </div>
      </div>  <!-- end card - container -->
    </div> <!-- end VIEW PLAY -->

  </div><!-- end BGGame  -->
  
</template>

<script>
export default {
  name: "Game Arkham Horror Personajes",

  data() {
    return {
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
      efecto1: "",
      efecto2: "",
      frase: "",
      historia: "",
      arquetipo1: "",
      arquetipo2: "",
      // Objeto1: require("@BlaBla"),
      // Objeto2: require("@BlaBla"),
      // Objeto3: require("@BlaBla"),

      Personajes:[
        {nombrePJ:"Tommy Muldoon",
          imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 7, cordura: 5, saber: 2, influencia: 2, observacion: 3, fuerza: 3, voluntad: 3, dinero: 2, limConcentracion: 2, efecto1: "Protector : Si un Mounstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tu a ese Mounstro en su lugar.", efecto2: "nada", frase: '“Vamos alla, T ommy. Es hora de hacerse el Heroe”', historia: "Los Muldoon habian servido en el cuerpo de policia durante generaciones, y Tommy no hiba a ser menos. Fue el orgullo de su familia cuando se graduo en la academia de boston. Por eso no hizo mucha gracia que lo transladasen a la comisaria de Arkham; despues de todo ¿ que podia ocurrir en aquel pueblucho compararo con los crimenes que habria sido capaz de resolver en boston? Al final resulto que el trabajo policial en arkham no estaba exento de interes, despues de todo. Habia muchos sucesos inexplicables, y la policia local parecia mas interesada en aparentar normalidad que en buscar una solucion. Asiq e tommy echo mano a Becky, el rifle de s abuelo, y se dispuso a buscar soluciones por su cuenta ...", arquetipo1: "Como Defensor, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.", arquetipo2: "Como Superviviente, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: null
          },
        {nombrePJ:"Marie Lambeau", 
          imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 5, cordura: 7, saber: 3, influencia: 4, observacion: 2, fuerza: 2, voluntad: 2, dinero: 4, limConcentracion: 2, efecto1: "Voz Aterciopelada: Una vez por ronda, despues de que realices una acción, otro investigadorque esté en cualquier espacio puede realizar esa misma acción.(Se siguen aplicando las restricciones habituales a las acciones.)", efecto2: "nada", frase: '“Prestame atención y déjate encandilar por mi voz”', historia: "blaBlaBla", arquetipo1: "Como Mística, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios", arquetipo2: "Como Superviviente, tu ventaja redica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: null
          },
        {nombrePJ:"Jenny Barnes",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 7, cordura: 5, saber: 1, influencia: 4, observacion: 2, fuerza: 3, voluntad: 3, dinero: 5, limConcentracion: 1, efecto1: "Fondo financiado -- Acción: Si tienes menos de 3$, ganas 3$", efecto2: "nada", frase: '“Nome importa solcionar problemas a golpe de talonario; y si eso no fnciona, ya los golpearé con alguna otra cosa”', historia: "Bla Bla Bla", arquetipo1: "Como Experta, posees un conjnto exclsivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.", arquetipo2: null,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: null
          },
        {nombrePJ:"Dexter Drake",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 5, cordura: 7, saber: 4, influencia: 3, observacion: 2, fuerza: 2, voluntad: 2, dinero: 2, limConcentracion: "Es igual al numero de hechizos que tengas", efecto1: "Don para la magia. Una vez por ronda, cuando estés resolviendo una prueba de SABER, puedes volver a tirar uno o todos los dados", efecto2: null, frase: '“No te conviene ver la autentica magia, chico. Nadie deberia verla nunca.”', historia: "bla Bla Bla", arquetipo1: "Como Místico, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios", arquetipo2: null ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: null
          },
        {nombrePJ:"Wendy Adams",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 5, cordura: 7, saber: 3, influencia: 1, observacion: 4, fuerza: 2, voluntad: 3, dinero: 1, limConcentracion: 3, efecto1: "Atajo -- Antes o después de que realices una acción, adicional como parte de una acción de evasión, puedes moverte un máximo de dos espacios (este movimiento es gratuito).", efecto2: null, frase: '“Algun dia encontraré a papá, y mamá vendrá a casa con nosotros y volveremos a ser felices. Ya lo veréis.”', historia: "bla Bla Bla", arquetipo1: "Como Superviviente, tu ventaja redica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.", arquetipo2: "Como Buscadora, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios." ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: null
          },
        {nombrePJ:"Rex Murphy",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 7, cordura: 7, saber: 3, influencia: 3, observacion: 3, fuerza: 2, voluntad: 2, dinero: 3, limConcentracion: "Sin limite" , efecto1: "Maldición Familiar -- Cuando estés resolviendo una preba, solamente centan como Exitos los 6 que obtengas. No puedes ganar los estados de Bencición ni Maldición.", efecto2: "Obstinación -- Después de que falles na prueba, te concentras en una habilidad de tu elección", frase: '“¿Como me he metido en semejante embrollo? Vaya suerte la mia.”', historia: "bla Bla Bla", arquetipo1: "Como Buscador, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.", arquetipo2: "Como Experto, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien." ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
        {nombrePJ:"Calvin Wrigth",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 6, cordura: 6, saber: 3, influencia: 3, observacion: 3, fuerza: 3, voluntad: 1, dinero: 3, limConcentracion: 2 , efecto1: "Un amigo seguro -- Acción: Puedes intercambiar calqier cantidad de Vida y/o Cordura con otro investigador o Aliado que este en cualquier espacio.", efecto2: null, frase: '“Sacrificaria lo que hiciera falta con tal de protegerte”', historia: "bla Bla Bla", arquetipo1: "Como Defensor, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.", arquetipo2: "Como Experto, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien." ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
        {nombrePJ:"Agnes Baker",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 6, cordura: 6, saber: 4, influencia: 2, observacion: 2, fuerza: 2, voluntad: 3, dinero: 3, limConcentracion: 2 , efecto1: "La sangre es poder -- Cuando estés lanzando un Hechizo, si sufres Daño o gastas Restos, recives +2 SABER", efecto2: "Magia de sangre -- Puedes sufrir Daño en vez de Horror cuando lances n Hechizo" , frase: '“Las cosas no son siempre lo que parecen”', historia: "bla Bla Bla", arquetipo1: "Como Mística, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios", arquetipo2: "Como Defensora, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza." ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
        {nombrePJ:"Michael McGlen",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 8, cordura: 4, saber: 2, influencia: 3, observacion: 1, fuerza: 4, voluntad: 3, dinero: 3, limConcentracion: 1 , efecto1: "Sed de venganza -- Después de que derrotes a un Monstruo con una acción de ataque, recuperas un punto de Cordura o bien te concentras en una habilidad de tu eelcción.", efecto2: null , frase: '“Esto es por Louie”', historia: "bla Bla Bla", arquetipo1: "Como Experto, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.", arquetipo2: "Como Defensor, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza." ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
        {nombrePJ:"Daniela Reyes",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 7, cordura: 5, saber: 3, influencia: 3, observacion: 1, fuerza: 3, voluntad: 3, dinero: 3, limConcentracion: 3 , efecto1: "Pasión por el trabajo -- Después de que realices una acción de conseguir fondos, puedes concentrarte en una habilidad de tu elección", efecto2: null , frase: '“Si necesitas un trabajo bien hecho, acuerdate de mí”', historia: "bla Bla Bla", arquetipo1: "Como Experta, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Daniela no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.", arquetipo2: "Como Superviviente, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria" ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
        {nombrePJ:"Norman Withers",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 5, cordura: 7, saber: 3, influencia: 1, observacion: 3, fuerza: 2, voluntad: 4, dinero: 1, limConcentracion: 2 , efecto1: "Escrito en las estrellas -- Después que quites al menos de dos fichas de Perdición de tu espacio, puedes sufrir un punto de horror para revelar una Pista(colócala sobre la hoja de Escenario)", efecto2: null , frase: '“Decir que es algo es imposible no lo hace menos cierto. La verdad es indiferente a la opinión que uno tenga.”', historia: "bla Bla Bla", arquetipo1: "Como Buscador, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.", arquetipo2: "Como Místico, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios" ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
        {nombrePJ:"Minh Thi Phan",
           imagen: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), vida: 6, cordura: 6, saber: 3, influencia: 3, observacion: 3, fuerza: 2, voluntad: 2, dinero: 3, limConcentracion: 2 , efecto1: "Pendiente de todo -- una vez por ronda, al resolver na prueba, tu u otro investigador que esté en tu espacio podeis volver a tirar tantos dados como el número de Pistas que haya en vestro Barrio (podeis tirar menos si queréis).", efecto2: null , frase: '“Estoy convencida de que podemos hayar una solución si cooperamos.”', historia: "bla Bla Bla", arquetipo1: "Como Buscadora, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.", arquetipo2: "Como Superviviente, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria" ,Objeto1: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto2: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto3: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),Objeto4: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png")
          },
      ],

      // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,

      resultados: [1, 6, 5, 3],
      sumaResultado: 0,

      masOpciones:false,

      AvAcierto: 6,
      AvAcierto2: 5,
      AvAcierto3: null,
      AvFatal: 1,
      AvFatal2: null,
      AvFatal3: null,

      contador: "1",
      viewPJ: true,
      viewPlay: false

    }; // end return
  }, // end data

  mounted() {},

  methods: {
    cambiaPJ() {
      if (this.contador == 1) {
        this.nombrePJ = this.Personajes[0].nombrePJ;
        this.vida = this.Personajes[0].vida;
        this.cordura = this.Personajes[0].cordura;
        this.saber = this.Personajes[0].saber;
        this.influencia = this.Personajes[0].influencia;
        this.observacion = this.Personajes[0].observacion;
        this.fuerza = this.Personajes[0].fuerza;
        this.voluntad = this.Personajes[0].voluntad;
      } else if (this.contador == 2) {
        this.nombrePJ = this.Personajes[1].nombrePJ;
        this.vida = this.Personajes[1].vida;
        this.cordura = this.Personajes[1].cordura;
        this.saber = this.Personajes[1].saber;
        this.influencia = this.Personajes[1].influencia;
        this.observacion = this.Personajes[1].observacion;
        this.fuerza = this.Personajes[1].fuerza;
        this.voluntad = this.Personajes[1].voluntad;
      } else if (this.contador == 3) {
        this.nombrePJ = this.Personajes[2].nombrePJ;
        this.vida = this.Personajes[2].vida;
        this.cordura = this.Personajes[2].cordura;
        this.saber = this.Personajes[2].saber;
        this.influencia = this.Personajes[2].influencia;
        this.observacion = this.Personajes[2].observacion;
        this.fuerza = this.Personajes[2].fuerza;
        this.voluntad = this.Personajes[2].voluntad;
      } else if (this.contador == 4) {
        this.nombrePJ = this.Personajes[3].nombrePJ;
        this.vida = this.Personajes[3].vida;
        this.cordura = this.Personajes[3].cordura;
        this.saber = this.Personajes[3].saber;
        this.influencia = this.Personajes[3].influencia;
        this.observacion = this.Personajes[3].observacion;
        this.fuerza = this.Personajes[3].fuerza;
        this.voluntad = this.Personajes[3].voluntad;
      } else if (this.contador == 5) {
        this.nombrePJ = this.Personajes[4].nombrePJ;
        this.vida = this.Personajes[4].vida;
        this.cordura = this.Personajes[4].cordura;
        this.saber = this.Personajes[4].saber;
        this.influencia = this.Personajes[4].influencia;
        this.observacion = this.Personajes[4].observacion;
        this.fuerza = this.Personajes[4].fuerza;
        this.voluntad = this.Personajes[4].voluntad;
      } else if (this.contador == 6) {
        this.nombrePJ = this.Personajes[5].nombrePJ;
        this.vida = this.Personajes[5].vida;
        this.cordura = this.Personajes[5].cordura;
        this.saber = this.Personajes[5].saber;
        this.influencia = this.Personajes[5].influencia;
        this.observacion = this.Personajes[5].observacion;
        this.fuerza = this.Personajes[5].fuerza;
        this.voluntad = this.Personajes[5].voluntad;
      } else if (this.contador == 7) {
        this.nombrePJ = this.Personajes[6].nombrePJ;
        this.vida = this.Personajes[6].vida;
        this.cordura = this.Personajes[6].cordura;
        this.saber = this.Personajes[6].saber;
        this.influencia = this.Personajes[6].influencia;
        this.observacion = this.Personajes[6].observacion;
        this.fuerza = this.Personajes[6].fuerza;
        this.voluntad = this.Personajes[6].voluntad;
      } else if (this.contador == 8) {
        this.nombrePJ = this.Personajes[7].nombrePJ;
        this.vida = this.Personajes[7].vida;
        this.cordura = this.Personajes[7].cordura;
        this.saber = this.Personajes[7].saber;
        this.influencia = this.Personajes[7].influencia;
        this.observacion = this.Personajes[7].observacion;
        this.fuerza = this.Personajes[7].fuerza;
        this.voluntad = this.Personajes[7].voluntad;
      } else if (this.contador == 9) {
        this.nombrePJ = this.Personajes[8].nombrePJ;
        this.vida = this.Personajes[8].vida;
        this.cordura = this.Personajes[8].cordura;
        this.saber = this.Personajes[8].saber;
        this.influencia = this.Personajes[8].influencia;
        this.observacion = this.Personajes[8].observacion;
        this.fuerza = this.Personajes[8].fuerza;
        this.voluntad = this.Personajes[8].voluntad;
      } else if (this.contador == 10) {
        this.nombrePJ = this.Personajes[9].nombrePJ;
        this.vida = this.Personajes[9].vida;
        this.cordura = this.Personajes[9].cordura;
        this.saber = this.Personajes[9].saber;
        this.influencia = this.Personajes[9].influencia;
        this.observacion = this.Personajes[9].observacion;
        this.fuerza = this.Personajes[9].fuerza;
        this.voluntad = this.Personajes[9].voluntad;
      } else if (this.contador == 11) {
        this.nombrePJ = this.Personajes[10].nombrePJ;
        this.vida = this.Personajes[10].vida;
        this.cordura = this.Personajes[10].cordura;
        this.saber = this.Personajes[10].saber;
        this.influencia = this.Personajes[10].influencia;
        this.observacion = this.Personajes[10].observacion;
        this.fuerza = this.Personajes[10].fuerza;
        this.voluntad = this.Personajes[10].voluntad;
      } else if (this.contador == 12) {
        this.nombrePJ = this.Personajes[11].nombrePJ;
        this.vida = this.Personajes[11].vida;
        this.cordura = this.Personajes[11].cordura;
        this.saber = this.Personajes[11].saber;
        this.influencia = this.Personajes[11].influencia;
        this.observacion = this.Personajes[11].observacion;
        this.fuerza = this.Personajes[11].fuerza;
        this.voluntad = this.Personajes[11].voluntad;
      }
    }, // end cambiaMapa
    comenzar(){
      this.viewPJ = false
      this.viewPlay = true
    },
    volver(){
      this.viewPJ = true
      this.viewPlay = false
    },
    selectAtributo(dato){
      this.NDadosAtributo = dato
    },

    // TIRADA DE DADOS
    async tirarDados(min) {
      let max = 6 // maximo de lados de dados
      let totalDados = this.NDadosAtributo + this.NDeDadosExtra
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

  watch: {}, // end watch
}; // end export defaul
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");

.contadorVidaCordura{
  position: relative;
  top: -50px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

.contadorAtributos{
  position: relative;
  top: -30px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

#botonesAtributos button:focus{
  background-color: chartreuse;
}
#botonesAtributos button{
  background-color: chartreuse;
}

.titleDecoration {
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
  font-weight: 700;
  text-align: center;
}

.BGGeneralAH{
  background-image: url(../../assets/img/Games/ArkhamHorror/BGGeneralAH.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}

.allWindow {
  min-height: 70vh;
}

/* colores para atributos */
.has-text-purple{
  color: #9B51E0;
}
.has-text-orange{
  color: #F2994A;
}

/* RESULTADO DE DADOS */
.acierto {
  background: #D9D9D9;
  border: 3px solid rgb(0, 255, 0);
}
.fatal {
  background: #D9D9D9;
  border: 3px solid #EB5757;
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
  background: #D9D9D9;
}

</style>