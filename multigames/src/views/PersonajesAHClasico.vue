<template>
  <div class="BGGeneralAH">
    <!-- SELECCION DE PJ -->
    <div v-if="viewPJ == true">
      <div class="allWindow">

        <!-- IMG -->
        <section class="hero is-small helperImgPjs" :class="[imgPersonaje]">
          <div class="hero-body columns is-vcentered is-mobile p-0 pt-6 mt-5 pb-3">

            <!-- ARROW izquierda -->
            <div class="column is-2 pl-4">
              <!-- si no cumple la regla, simplemente no hay nada --> 
              <!-- boton funcionando!  -->
              <div v-if="this.contador > 1">
                <button @click="cambiaPJ(contador--)" class="p-2">
                  <i class="fa-2x fas fa-angle-double-left"></i>
                </button>
              </div>
            </div><!-- end ARROW izquierda -->

            <div class="column">
              <h1 class="title titleDecoration is-4 pt-3 mb-0">
                {{ this.nombrePJ }}
              </h1>
              <p class="has-background-grey-dark has-text-light has-text-centered">{{this.posicion}}</p>
            </div>

            <!-- ARROW derecha -->
            <div class="column is-2 p-2">
              <!-- si no cumple la regla, simplemente no hay nada -->
              <!-- boton funcionando!  -->
              <div v-if="this.contador < 12">
                <button @click="cambiaPJ(contador++)" class="p-2">
                  <i class="fa-2x fas fa-angle-double-right"></i>
                </button>
              </div>
            </div><!-- end ARROW derecha -->

          </div>
        </section>

        <!-- NAVEGACION -->
        <section class="section columns is-mobile has-background-dark p-0">
          <div class="column is-4 has-background-light pl-5"><p @click="this.VerDatos('Historia')">Historia <i class="far fa-id-card"></i></p> </div>
          <div class="column has-background-light"><p @click="this.VerDatos('Pertenencias')">Pertenencias <i class="fas fa-briefcase"></i></p> </div>
          <div class="column is-3 px-0 has-background-light"><p @click="this.VerDatos('Arquetipo')">Arquetipo <i class="fas fa-bolt"></i></p> </div>
        </section>

        <!-- MODAL HISTORIA -->
        <div v-if="ModalHistoria" class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">
                <p class="modal-card-title">La historia hasta ahora</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p>{{this.historia}}</p>
              </section>
            </div>
          </div>
        </div>

        <!-- MODAL PERTENENCIAS -->
        <div v-if="ModalPertenencias" class="modal is-active ">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">
                <p class="modal-card-title">Pertenencias iniciales</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p>- {{this.dinero}}$</p>
                <p>- {{this.Pertenencia1}}</p>
                <p v-if="this.Pertenencia2 != null">- {{this.Pertenencia2}}</p>
                <h1 class="subtitle is-3 mb-0 has-text-centered"> Elige 1 </h1>
                <hr class="my-1">
                <p>- {{this.Pertenencia3}}</p>
                <p>- {{this.Pertenencia4}}</p>
              </section>
            </div>
          </div>
        </div>

        <!-- MODAL ARQUETIPO -->
        <div v-if="ModalArquetipo" class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-head">
                <p class="modal-card-title">Arquetipo principal</p>
                <i @click="this.VerDatos('nada')" class="fa-2x fas fa-times-circle has-text-danger"></i>
              </section>
              <section class="modal-card-body">
                <p>{{this.arquetipo1}}</p>
                <br>
                <p>{{this.arquetipo2}}</p>
              </section>
            </div>
          </div>
        </div>
        
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
          <p class="has-text-white has-text-weight-semibold pt-3"> <u> Limite de concentracion</u>: {{this.limConcentracion}}</p>
        </div>

        <!-- Boton de Comenzar -->
        <div class="columns is-mobile">
          <div class="column is-4"></div>
          <div class="column"><button @click="comenzar()" class="button is-success has-text-white mt-3 p-5">Comenzar!</button></div>
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
          <div class="hero-body columns is-vcentered is-mobile p-0 pt-6 mt-5 pb-0">

            <div class="column is-2 pl-5 p-0 has-text-grey-lighter" @click="volver(), reseteaTodo()"><i class="fa-2x fas fa-arrow-alt-circle-left"></i></div>

            <div class="column">
              <h1 class="title titleDecoration is-4 pt-3 mb-0">
                {{ this.nombrePJ }}
              </h1>
              <p class="has-background-grey-dark has-text-light has-text-centered">{{this.posicion}}</p>
            </div>

            <router-link class="column is-2 pl-2" to="/"><div class="has-text-grey-lighter"><i class="fa-2x fas fa-home"></i></div></router-link>
          </div>
        </section>

        <!-- PACTO SINIESTRO -->
        <div class="columns is-mobile mt-0 is-centered">
          <h2 v-if="PactoSiniestro" @click="modalPacto = true" class="column is-4 has-background-danger has-text-centered has-text-light p-1 ">Pacto siniestro</h2>
          <h2 v-if="EstadoMaldito" class="column is-4 has-background-warning-dark has-text-centered has-text-light p-1 ">Maldito</h2>
          <h2 v-if="EstadoBendecido" class="column is-4 has-background-info has-text-centered has-text-light p-1 ">Bendecido</h2>
        </div>

        <!-- MODAL PACTO SINIESTRO -->
        <div v-if="modalPacto" class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-body hero is-large has-background-danger-dark py-6" id="modalPactoSiniestro">
                <div class="hero-body py-6">
                  <div v-if="verResultadoPacto == false">
                    <h1 class="title is-1 has-text-centered has-text-grey-lighter titlePactosiniestro">Hora de saldar tu deuda?</h1>
                    <button @click="tirarPacto(1), verResultadoPacto = true" class="button is-danger is-medium is-fullwidth">Tirar</button>
                    <div class="columns is-mobile m-1 ml-0">
                      <p class="column"></p>
                      <button @click="modalPacto = false , this.ResultadoPacto = null" class="button column is-3 is-link p-1">Aun no</button>
                    </div>
                  </div>
                  
                  <div v-if="verResultadoPacto" >
                    <p class="title is-1 has-text-centered has-text-white mt-2 resultadoPactosiniestro">{{ResultadoPacto}}</p>
                    <p v-if="ResultadoPacto == 1" class="subtitle is-3 titlePactosiniestro has-text-white">Dale la vuelta a la carta y cumple con tu destino!</p>
                    <p v-else class="subtitle is-3 titlePactosiniestro has-text-white">La proxima vez no tendrás tanta suerte ...</p>
                    <button v-if="ResultadoPacto == 1" @click="modalPacto = false , ResultadoPacto = null, verResultadoPacto = false, PactoSiniestro = false" class="button column is-3 is-link p-1">Volver y quitar pacto siniestro</button>
                    <button v-else @click="modalPacto = false , ResultadoPacto = null, verResultadoPacto = false " class="button column is-3 is-link p-1">Volver</button>
                  </div>
                </div>
                
              </section>
            </div>
          </div>
        </div>

        <!-- MODAL MALDITO -->

        <!-- MODAL BENDITO -->

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
          <button class="column helpermaxheigth p-1 mx-2 ml-4 botonesAtributos" @click="selectAtributo(this.saber)">
            <p class="has-text-purple"><i class="fa-3x fas fa-book-open"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.saber }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2" @click="selectAtributo(this.influencia)">
            <p class="has-text-orange"><i class="fa-3x fas fa-handshake"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.influencia }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2" @click="selectAtributo(this.observacion)">
            <p class="has-text-primary"><i class="fa-3x fas fa-eye"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.observacion }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2" @click="selectAtributo(this.fuerza)">
            <p class="has-text-danger"><i class="fa-3x fas fa-fist-raised"></i></p>
            <p class="contadorAtributos title is-5 mb-0">{{ this.fuerza }}</p>
          </button>

          <button class="column helpermaxheigth p-1 mx-2 mr-4" @click="selectAtributo(this.voluntad)">
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

        <!-- BOTON DE LANZAR DADOS y MAS OPCIONES -->
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
          <div v-show="masOpciones" class=" has-background-white p-2 mt-2 pt-0">
            <h3 class="has-text-centered has-background-warning has-text-grey-darker mb-2">Avanzado</h3>

            <button @click="PactoSiniestro = !PactoSiniestro" class="checkbox mr-4 has-text-danger button">Pacto siniestro</button>
            <button @click="Maldito()" class="checkbox mr-4 has-text-warning-dark button">Maldito</button>
            <button @click="Bendecido()" class="checkbox has-text-info button">Bendecido</button>

            <dir class="columns is-mobile mt-2">
              <div class="column">
                <h4 class="has-text-centered">Fatal</h4>
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal" placeholder="Fatal" >
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal2" placeholder="Fatal">
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvFatal3" placeholder="Fatal">
              </div>
              <div class="column">
                <h4>Acierto</h4>
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto" placeholder="Acierto">
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto2" placeholder="Acierto">
                <input class="p-2 input inputsAvanzado" type="number" v-model="AvAcierto3" placeholder="Acierto">
              </div>
            </dir>

            <div v-if="masOpciones" class="p-2">
              <h1 class="title">Suma total: {{ SumaDetodo }}{{ this.sumaResultado }}</h1>
            </div>
          </div>
        </Transition>
        
        <!-- RESULTADOS -->
        <div class="resultados mx-2">
          <h1 class="title has-text-centered has-text-white is-3 mb-2">RESULTADOS</h1>
          <div id="resultados-css" class="container">
            <!-- Aqui pintamos todos los resultados, OJO!! ense;amos el array gracias a la funcion "TodosLosResultados", si pusieramos aqui el array no hace na -->
            <div v-for="item in resultados" :key="item">
              <!-- SI OPCIONES AVANZADAS -->
                <p v-if="(item == AvAcierto) |(item == AvAcierto2) |(item == AvAcierto3)" class="acierto resultado-css has-text-white">{{ item }}</p>
                <p v-else-if="(item == AvFatal) | (item == AvFatal2) | (item == AvFatal3)" class="fatal resultado-css has-text-white">{{ item }}</p>
                <p v-else class="resultado-css has-text-white">{{ item }}</p>
            </div>
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
      posicion: "Poli Novato",
      vida: 7,
      cordura: 5,
      saber: 2,
      influencia: 2,
      observacion: 3,
      fuerza: 3,
      voluntad: 3,
      dinero: 2,
      limConcentracion: 2,
      efecto1: "Protector: Si un Mounstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tu a ese Mounstro en su lugar.",
      efecto2: null,
      frase: '“Vamos allá, Tommy. Es hora de hacerse el héroe.”',
      historia: "Los Muldoon habian servido en el cuerpo de policia durante generaciones, y Tommy no hiba a ser menos. Fue el orgullo de su familia cuando se graduo en la academia de boston. Por eso no hizo mucha gracia que lo transladasen a la comisaria de Arkham; despues de todo ¿ que podia ocurrir en aquel pueblucho compararo con los crimenes que habria sido capaz de resolver en boston? Al final resulto que el trabajo policial en arkham no estaba exento de interes, despues de todo. Habia mchos sucesos inexplicables, y la policia local parecia mas interesada en aparentar normalidad que en buscar una solucion. Asiq e tommy echo mano a Becky, el rifle de s abuelo, y se dispuso a buscar soluciones por su cuenta ...",
      arquetipo1: "Como DEFENSOR, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
      arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
      Pertenencia1: "Becky",
      Pertenencia2: null,
      Pertenencia3: "Esposas",
      Pertenencia4: "Motocicleta",
      Personajes: [
        {nombrePJ: "Tommy Muldoon",
          posicion: "Poli Novato",
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
            "Como DEFENSOR, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
          Pertenencia1: "Becky",
          Pertenencia2: null,
          Pertenencia3: "Esposas",
          Pertenencia4: "Motocicleta",
        },
        {nombrePJ: "Marie Lambeau",
          posicion: "Cantante",
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
          historia: "Marie ignoraba por qué su grand-mère se habia marchado a Arkham, pero sin duda la anciana tendria sus motivos. No sabia por qué el resto de su familia se habia mantenido lejos de aquella ciudad, aún después de que su grand mère falleciese. 'deberías ir a visiatarla', le dijo su padre. 'Seguro que le das una alegria'.  Como si la anciana no estuviese muerta y enterrada. Marie consiguió qe la contratase par actuar en un local de Arkham, Algo trivial para la VOZ ATERCIOPELADA del jazz. Y procuró no pensar en las canciones que invadian sus sueños, ni en sus terribles tono inhumanos, ni en aquel horripilante caballero, tan aprecido al mismisimo barón Samedi, que siempre estaba entre el publico cuando actuaba ...",
          arquetipo1:
            "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja redica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          Pertenencia1: "Intervención" ,
          Pertenencia2: null ,
          Pertenencia3: "El cuchillo de Grande mère" ,
          Pertenencia4: "Sangre de bruja",
        },
        {nombrePJ: "Jenny Barnes",
          posicion: "Diletante",
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
          historia: "Aunque le apasionaban los lujos y el dinero, Jenny siempre ha tenido una vena curiosa y aventurera. Adora la moda y al alta sociedad de París y Venecia, pero se mueve con la misma soltura cazando en los campos de Escociaque de juega en los clubes de Nueva Orleans. Incluso financió una excabación aqueologica por el mero hecho de ser la primera en entrar en aquella tumba antigua. Por eso, cuando se enteró de que su hermana Isabelle había desaparecido, Jenny viajó a Arkham para tomar cartas en el asunto personalmente. Pueude que vivir en medio de tanta opulencia y poder la hubiese vuelto demasiado confiada ... o tan vez los rufianes que secuestraron a su hermana habían cometido su ultimo error.",
          arquetipo1:
            "Como EXPERTA, posees un conjnto exclsivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          arquetipo2: null,
          Pertenencia1: "Buscando a Izzie" ,
          Pertenencia2: null ,
          Pertenencia3: ".45 gemelas de Jenny" ,
          Pertenencia4: "De punta en blanco",
        },
        {nombrePJ: "Dexter Drake",
          posicion: "Mago",
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
          historia: "La magia, concretamente el ilusionismo, fué la principal afición de Dexter Drake en su infancia y durante la Gran Guerra. de pequeño soñaba con la autentica hechiceria, pero nunca logró pasar de escamotear monedas y realizar otros trucos de salón ... hasta que aquél viejo mago callejero desató su maldición. Así fué como Dexter aberiguó la verdad: Que existia la magia autentica, y era más terrible de lo que nunca imaginó. ¿Y qué podia hacer el sino estudiarla en la medida de sus posivilidades? Descbrir el truco, el conejo en la chistera, el secreto que hacía que toco cobrara sentido. Pero en este caso la chistera es la realidad, y el Gran Drake cada vez tiene menos claro que merezca la pena desvelar su secreto.",
          arquetipo1:
            "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          arquetipo2: null,
          Pertenencia1: "Nieblas de R'lyeh" ,
          Pertenencia2: null ,
          Pertenencia3: "Baston de mago" ,
          Pertenencia4: "Viaje astral",
        },
        {nombrePJ: "Wendy Adams",
          posicion: "Niña callejera",
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
          historia: "Después de que su padre desapareciese en alta mar y su madre fese ingresada en un psiquiatrico, Wendy acabó en un orfanato. Ella sabia que su madre no estaba loca: los canticos que recitaba, los simbolos que garabateaban, todo lo hacia para protegerla. Por eso le habia dado aquél amuleto que tenia dibujada una estrella de cinco puntas torcida. pero Wendy sabía que no estaba a salvo en el orfanato sin la protección de su madre, asi que se fugó. n dia encontró una fotografia de su padre con una nota escrita en ruso. Por detrás habia un mensaje: 'La Marea Roja se alzará pronto. Cuidate mucho, peqeña mia'. De repente, Wendy se sintió embargada por una emoción que no sentía desde habia mucho tiempo: Esperanza",
          arquetipo1:
            "Como SUPERVIVIENTE, tu ventaja redica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          arquetipo2:
            "Como BUSCADORA, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          Pertenencia1: "Amuleto de mama" ,
          Pertenencia2: null ,
          Pertenencia3: "Fotografia misteriosa" ,
          Pertenencia4: "Osito Pawterson",
        },
        {nombrePJ: "Rex Murphy",
          posicion: "Reportero",
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
          historia: "Rex Murphy no creia en la suerte; lo cual estaba muy bien, porqe la suya era nefasta. Tampoco creyó a aquella vieja en rumania que le dijo que estaba maldito. Pero debía admitir que todo tendia hacia salirle mas mal que bien, en ocasiones con resultado catastroficos. Había perdido la cuenta de las veces que había descubierto pruebas de la existencia de un 'mundo oculto', para que luego se las llevase una rafaga de viento, les lloviera encima o se las comiera un rinoceronte. Pero la suerte no podia demostrarse ni tampoco se podía imprimir en el Arkham Advertised, asíq ue Rex se convenció a sí mismo que no creia en ella. Aunque las cosas le hubieran salido mejor, todos creeríanq ue el mundo oculto existe de verdad.",
          arquetipo1:
            "Como BUSCADOR, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          Pertenencia1: "Buscando la verdad" ,
          Pertenencia2: "La Torre" ,
          Pertenencia3: "Superar la adversidad" ,
          Pertenencia4: "Todas las piezas encajan" ,
        },
        {nombrePJ: "Calvin Wrigth",
          posicion: "Tipo atormentado",
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
          historia: "Lo más dificil que había echo calvin jamás fué dar la espalda a Joao, que siempre estuvo ahí para ayudarle a sobrellevarlo todo. Pero no tuvo elección. La imagen de Joao ardiendo hasta quedar reducido a cenizas, su mundo calcinado en un fogonazo de luz, la oscuridad que anidaba en su interior. Calvin no podia permitir que le arrebatasen a su amante, por eso optó por despejarse de la ecuación. Así que hizo un trato. Dejó que la secta del Dios Enmascarado creyese qe podía controlarlo, y agardó el momento propio para revelarse conrta el antigo mal que amenazaba el mundo. Fueron tiempos dificiles, pero saber que Joao estaba a salvo le ayudó a superarlos. No esque Calvin no tuviese miedo (lo tenia), pero sabía lo que debía hacerse, y tabién que él era el único capáz de hacerlo",
          arquetipo1:
            "Como DEFENSOR, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          arquetipo2:
            "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          Pertenencia1: "Daga espiritual" ,
          Pertenencia2: "Hasta el fin de los tiempos" ,
          Pertenencia3: "OPCIONAL == Voz del mensajero y tambien un PACTO SINIESTRO" ,
          Pertenencia4: null,
        },
        {nombrePJ: "Agnes Baker",
          posicion: "Camarera",
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
          historia: "Agnes ya casi se había acostumbrado a las extrañas visiones que perturbaban sus sueños: Extraños con tunicas, cánticos rituales, mounstruos auyantes de afilazas zarpas que solo alcanzaba a ver por el rabillo del ojo. Pero hace poco sufrió una mala caida y se golpeó en al cabeza. desde entonces ha tenido visiones incluso estando despierta. En ella se vé a si misma lideranto los Salmos de las figuras de las túnicas, ocultando una llave de plata en al argamasa de un pozo o lanzando sortilegios como hechicera en al mítica Hiperborea. Agnes ha viajado a Arkham en bsca de una explicación, pues la ciudad posee una larga tradición de juicios por brujeria y además sucesos inexplicables. Consigió trabajo en el restaurante de Velma, un buen dia se topó con un viejo pozo que tenia los ladrillos flojos. Y en tre los ladrillos, incrustada en al agramasa, entonctró una antigua llave de plata, exactamente donde sabia que estaría.",
          arquetipo1:
            "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          arquetipo2:
            "Como DEFENSORA, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: "Herencia de Hiperborea" ,
          Pertenencia2: null,
          Pertenencia3: "Proteccion corporal" ,
          Pertenencia4: "Tormenta de espiritus" ,
        },
        {nombrePJ: "Michael McGlen",
          posicion: "Mafioso",
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
          historia: "Michael McGlen era un hombre de pocas palabras. Tampoco tenía que decir mucho: para eso estaba Louie 'el Rapido'. Los dos eran los mejores soldados de los O´Bannion, y se aseguraban de que la banda fuese respetada en todo Arkham... hasta la noche en que aquella cosa emergió del rio y se llevó a rastras a Louie del muelle para despedazarlo bajo el agua. Michael creyó que sus jefes lo tacharian de pirado en cuanto les contase lo sucedido, pero lo que pasó fué a un peór: dijeron que le creian y que lo mejor era olvidarse del tema. Pero Michael no puede dejar impune la muerte de su socio, ni tampoco olvidar a los seres que lo hicieron pedazos. Sigue siendo hombre de pocas palabras; ahora prefiere que su metralleta hable por él.",
          arquetipo1:
            "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          arquetipo2:
            "Como DEFENSOR, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podria significar aydarles a recuperarse de daños fisicos y mentales, o bien despachar Mounstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: "Metralleta de tambor" ,
          Pertenencia2: null ,
          Pertenencia3: "Automovil de Gangster" ,
          Pertenencia4: "Secuaz de O'Bannion" ,
        },
        {nombrePJ: "Daniela Reyes",
          posicion: "Mecánica",
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
          historia: "Haciendo valance de su vida, Daniela podía darse por satisfecha: tenía una familia efusiva a la que adoraba, nunca le faltaba trabajo y siempre disponia de suficiente dinero para permitirse sus dos grandes pasiones (motocicletas y chicas guapas) influso después de poner un plato en su mesa. Anque no todo era de color de rosa; por un lado, estaba su madre la santera, que no dejaba de augurarle un futuro sombrio sino se andaba con ojo. Por el otro su hermano Ramón, que se metía en lios constantemente. Y ahora Ramón volvía a tener problemas. El talismán de protección contra el mal que le regaló para complacer a su madre estaba echo pedazos, y daniela era la unica que podía solucionarlo todo. Como de costumbre.",
          arquetipo1:
            "Como EXPERTA, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Daniela no tiene ningun reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
          Pertenencia1: "Gabriel" ,
          Pertenencia2: null ,
          Pertenencia3: "As de espadas" ,
          Pertenencia4: "Llave inglesa" ,
        },
        {nombrePJ: "Norman Withers",
          posicion: "Astrónomo",
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
          historia: "Norman Withers era cientifico, un hombre racional consagrado a la exploración logica al universo. Por eso, cuando su investigación reveró que el universo estaba proximo a su fin, contrastó sus resultados y estudió la situación desde la calma y el raciocinio. No cabía error posible: seis estrellas se habian desvanecido sin dejar rastro, y en su lugar algo imposible surcaba el vacio. Aunque la comunidad cientifica rechazó sus conclusiones tachandolas de los desvaríos de un lunatico, Norman prosiguió con sus estudios, abordando el problema con la racionalidad que le caracterizaba. ¿Qué importaba que s investigación se centrase en conocicientos arcaicos largo tiempo olvidad, o incuso en la magia? no por ello era menos racional.",
          arquetipo1:
            "Como BUSCADOR, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contrivuyes la mejor opcción defensiva contra los Primigenios",
          Pertenencia1: "Encontrar portal" ,
          Pertenencia2: null ,
          Pertenencia3: "Recuerdo preciado" ,
          Pertenencia4: "Tratado de astronomia" ,
        },
        {nombrePJ: "Minh Thi Phan",
          posicion: "Secretaria",
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
          historia: "Minh nació en el seno de una familia vietnamita afincada en Corea qe posteriormente se mudó a EEUU. Su dón para los idiomas y sus excepcionales calificaciones le procuraron trabajo en una empresa de Arkham, y Minh encantada con su nuevo jefe, el Sr Thomas, buen hombre y mejor amigo. Hasta que Thomas adquirió un ejemplar de la blasfema obra El Rey de Amarillo. Su lectura lo volvió huraño e irascible. La conminó a leerla, pero a ella le resultó demasiado perturvadora. Y luego el Sr Thomas se qutó al vida. Minh está convencida de que, si consigue desentrañar el secreto de la obra maldita, podrá evitar que los otros sufran el mismo destino que su infortunado jefe.",
          arquetipo1:
            "Como BUSCADORA, eres una intrépida sabuesa. Debeías concentrarte en la obtención de Pistas y en descubrir su significado oclto. Tu labor es esencial para frustar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducira a la victoria",
          Pertenencia1: "El rey de amarillo" ,
          Pertenencia2: null ,
          Pertenencia3: "Mente analitica" ,
          Pertenencia4: "Sinergia" ,
        },
      ],
      // SELECCION DE PERSONAJE
      ModalHistoria: false,
      ModalPertenencias: false,
      ModalArquetipo: false,

      // TIRADA DE DADOS
      NDadosAtributo: 0,
      NDeDadosExtra: 0,
      resultados: [1, 6, 5, 4],
      sumaResultado: 0,

      masOpciones: false,
      // estados
      EstadoBendecido: false,
      EstadoMaldito: false,
      // pacto siniestro
      modalPacto:false,
      PactoSiniestro:false,
      verResultadoPacto: false,
      ResultadoPacto: null,
      // aciertos fatal
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
        this.posicion = this.Personajes[0].posicion;
        this.vida = this.Personajes[0].vida;
        this.cordura = this.Personajes[0].cordura;
        this.saber = this.Personajes[0].saber;
        this.influencia = this.Personajes[0].influencia;
        this.observacion = this.Personajes[0].observacion;
        this.fuerza = this.Personajes[0].fuerza;
        this.voluntad = this.Personajes[0].voluntad;

        this.limConcentracion = this.Personajes[0].limConcentracion;
        this.efecto1 = this.Personajes[0].efecto1;
        this.efecto2 = this.Personajes[0].efecto2;
        this.frase = this.Personajes[0].frase;

        this.Pertenencia1 = this.Personajes[0].Pertenencia1;
        this.Pertenencia2 = this.Personajes[0].Pertenencia2;
        this.Pertenencia3 = this.Personajes[0].Pertenencia3;
        this.Pertenencia4 = this.Personajes[0].Pertenencia4;

        this.arquetipo1 = this.Personajes[0].arquetipo1;
        this.arquetipo2 = this.Personajes[0].arquetipo2;
      } else if (this.contador == 2) {
        this.imgPersonaje = "imgMarie";
        this.nombrePJ = this.Personajes[1].nombrePJ;
        this.posicion = this.Personajes[1].posicion;
        this.vida = this.Personajes[1].vida;
        this.cordura = this.Personajes[1].cordura;
        this.saber = this.Personajes[1].saber;
        this.influencia = this.Personajes[1].influencia;
        this.observacion = this.Personajes[1].observacion;
        this.fuerza = this.Personajes[1].fuerza;
        this.voluntad = this.Personajes[1].voluntad;
        this.limConcentracion = this.Personajes[1].limConcentracion;
        this.efecto1 = this.Personajes[1].efecto1;
        this.efecto2 = this.Personajes[1].efecto2;
        this.frase = this.Personajes[1].frase;
        this.historia = this.Personajes[1].historia;
        this.Pertenencia1 = this.Personajes[1].Pertenencia1;
        this.Pertenencia2 = this.Personajes[1].Pertenencia2;
        this.Pertenencia3 = this.Personajes[1].Pertenencia3;
        this.Pertenencia4 = this.Personajes[1].Pertenencia4;
        this.arquetipo1 = this.Personajes[1].arquetipo1;
        this.arquetipo2 = this.Personajes[1].arquetipo2;
      } else if (this.contador == 3) {
        this.imgPersonaje = "imgJenny";
        this.nombrePJ = this.Personajes[2].nombrePJ;
        this.posicion = this.Personajes[2].posicion;
        this.vida = this.Personajes[2].vida;
        this.cordura = this.Personajes[2].cordura;
        this.saber = this.Personajes[2].saber;
        this.influencia = this.Personajes[2].influencia;
        this.observacion = this.Personajes[2].observacion;
        this.fuerza = this.Personajes[2].fuerza;
        this.voluntad = this.Personajes[2].voluntad;
        this.limConcentracion = this.Personajes[2].limConcentracion;
        this.efecto1 = this.Personajes[2].efecto1;
        this.efecto2 = this.Personajes[2].efecto2;
        this.frase = this.Personajes[2].frase;
        this.historia = this.Personajes[2].historia;
        this.Pertenencia1 = this.Personajes[2].Pertenencia1;
        this.Pertenencia2 = this.Personajes[2].Pertenencia2;
        this.Pertenencia3 = this.Personajes[2].Pertenencia3;
        this.Pertenencia4 = this.Personajes[2].Pertenencia4;
        this.arquetipo1 = this.Personajes[2].arquetipo1;
        this.arquetipo2 = this.Personajes[2].arquetipo2;
      } else if (this.contador == 4) {
        this.imgPersonaje = "imgDexter";
        this.nombrePJ = this.Personajes[3].nombrePJ;
        this.posicion = this.Personajes[3].posicion;
        this.vida = this.Personajes[3].vida;
        this.cordura = this.Personajes[3].cordura;
        this.saber = this.Personajes[3].saber;
        this.influencia = this.Personajes[3].influencia;
        this.observacion = this.Personajes[3].observacion;
        this.fuerza = this.Personajes[3].fuerza;
        this.voluntad = this.Personajes[3].voluntad;
        this.limConcentracion = this.Personajes[3].limConcentracion;
        this.efecto1 = this.Personajes[3].efecto1;
        this.efecto2 = this.Personajes[3].efecto2;
        this.frase = this.Personajes[3].frase;
        this.historia = this.Personajes[3].historia;
        this.Pertenencia1 = this.Personajes[3].Pertenencia1;
        this.Pertenencia2 = this.Personajes[3].Pertenencia2;
        this.Pertenencia3 = this.Personajes[3].Pertenencia3;
        this.Pertenencia4 = this.Personajes[3].Pertenencia4;
        this.arquetipo1 = this.Personajes[3].arquetipo1;
        this.arquetipo2 = this.Personajes[3].arquetipo2;
      } else if (this.contador == 5) {
        this.imgPersonaje = "imgWendy";
        this.nombrePJ = this.Personajes[4].nombrePJ;
        this.posicion = this.Personajes[4].posicion;
        this.vida = this.Personajes[4].vida;
        this.cordura = this.Personajes[4].cordura;
        this.saber = this.Personajes[4].saber;
        this.influencia = this.Personajes[4].influencia;
        this.observacion = this.Personajes[4].observacion;
        this.fuerza = this.Personajes[4].fuerza;
        this.voluntad = this.Personajes[4].voluntad;
        this.limConcentracion = this.Personajes[4].limConcentracion;
        this.efecto1 = this.Personajes[4].efecto1;
        this.efecto2 = this.Personajes[4].efecto2;
        this.frase = this.Personajes[4].frase;
        this.historia = this.Personajes[4].historia;
        this.Pertenencia1 = this.Personajes[4].Pertenencia1;
        this.Pertenencia2 = this.Personajes[4].Pertenencia2;
        this.Pertenencia3 = this.Personajes[4].Pertenencia3;
        this.Pertenencia4 = this.Personajes[4].Pertenencia4;
        this.arquetipo1 = this.Personajes[4].arquetipo1;
        this.arquetipo2 = this.Personajes[4].arquetipo2;
      } else if (this.contador == 6) {
        this.imgPersonaje = "imgRex";
        this.nombrePJ = this.Personajes[5].nombrePJ;
        this.posicion = this.Personajes[5].posicion;
        this.vida = this.Personajes[5].vida;
        this.cordura = this.Personajes[5].cordura;
        this.saber = this.Personajes[5].saber;
        this.influencia = this.Personajes[5].influencia;
        this.observacion = this.Personajes[5].observacion;
        this.fuerza = this.Personajes[5].fuerza;
        this.voluntad = this.Personajes[5].voluntad;
        this.limConcentracion = this.Personajes[5].limConcentracion;
        this.efecto1 = this.Personajes[5].efecto1;
        this.efecto2 = this.Personajes[5].efecto2;
        this.frase = this.Personajes[5].frase;
        this.historia = this.Personajes[5].historia;
        this.Pertenencia1 = this.Personajes[5].Pertenencia1;
        this.Pertenencia2 = this.Personajes[5].Pertenencia2;
        this.Pertenencia3 = this.Personajes[5].Pertenencia3;
        this.Pertenencia4 = this.Personajes[5].Pertenencia4;
        this.arquetipo1 = this.Personajes[5].arquetipo1;
        this.arquetipo2 = this.Personajes[5].arquetipo2;
      } else if (this.contador == 7) {
        this.imgPersonaje = "imgCalvin";
        this.nombrePJ = this.Personajes[6].nombrePJ;
        this.posicion = this.Personajes[6].posicion;
        this.vida = this.Personajes[6].vida;
        this.cordura = this.Personajes[6].cordura;
        this.saber = this.Personajes[6].saber;
        this.influencia = this.Personajes[6].influencia;
        this.observacion = this.Personajes[6].observacion;
        this.fuerza = this.Personajes[6].fuerza;
        this.voluntad = this.Personajes[6].voluntad;
        this.limConcentracion = this.Personajes[6].limConcentracion;
        this.efecto1 = this.Personajes[6].efecto1;
        this.efecto2 = this.Personajes[6].efecto2;
        this.frase = this.Personajes[6].frase;
        this.historia = this.Personajes[6].historia;
        this.Pertenencia1 = this.Personajes[6].Pertenencia1;
        this.Pertenencia2 = this.Personajes[6].Pertenencia2;
        this.Pertenencia3 = this.Personajes[6].Pertenencia3;
        this.Pertenencia4 = this.Personajes[6].Pertenencia4;
        this.arquetipo1 = this.Personajes[6].arquetipo1;
        this.arquetipo2 = this.Personajes[6].arquetipo2;
      } else if (this.contador == 8) {
        this.imgPersonaje = "imgAgnes";
        this.nombrePJ = this.Personajes[7].nombrePJ;
        this.posicion = this.Personajes[7].posicion;
        this.vida = this.Personajes[7].vida;
        this.cordura = this.Personajes[7].cordura;
        this.saber = this.Personajes[7].saber;
        this.influencia = this.Personajes[7].influencia;
        this.observacion = this.Personajes[7].observacion;
        this.fuerza = this.Personajes[7].fuerza;
        this.voluntad = this.Personajes[7].voluntad;
        this.limConcentracion = this.Personajes[7].limConcentracion;
        this.efecto1 = this.Personajes[7].efecto1;
        this.efecto2 = this.Personajes[7].efecto2;
        this.frase = this.Personajes[7].frase;
        this.historia = this.Personajes[7].historia;
        this.Pertenencia1 = this.Personajes[7].Pertenencia1;
        this.Pertenencia2 = this.Personajes[7].Pertenencia2;
        this.Pertenencia3 = this.Personajes[7].Pertenencia3;
        this.Pertenencia4 = this.Personajes[7].Pertenencia4;
        this.arquetipo1 = this.Personajes[7].arquetipo1;
        this.arquetipo2 = this.Personajes[7].arquetipo2;
      } else if (this.contador == 9) {
        this.imgPersonaje = "imgMichael";
        this.nombrePJ = this.Personajes[8].nombrePJ;
        this.posicion = this.Personajes[8].posicion;
        this.vida = this.Personajes[8].vida;
        this.cordura = this.Personajes[8].cordura;
        this.saber = this.Personajes[8].saber;
        this.influencia = this.Personajes[8].influencia;
        this.observacion = this.Personajes[8].observacion;
        this.fuerza = this.Personajes[8].fuerza;
        this.voluntad = this.Personajes[8].voluntad;
        this.limConcentracion = this.Personajes[8].limConcentracion;
        this.efecto1 = this.Personajes[8].efecto1;
        this.efecto2 = this.Personajes[8].efecto2;
        this.frase = this.Personajes[8].frase;
        this.historia = this.Personajes[8].historia;
        this.Pertenencia1 = this.Personajes[8].Pertenencia1;
        this.Pertenencia2 = this.Personajes[8].Pertenencia2;
        this.Pertenencia3 = this.Personajes[8].Pertenencia3;
        this.Pertenencia4 = this.Personajes[8].Pertenencia4;
        this.arquetipo1 = this.Personajes[8].arquetipo1;
        this.arquetipo2 = this.Personajes[8].arquetipo2;
      } else if (this.contador == 10) {
        this.imgPersonaje = "imgDaniela";
        this.nombrePJ = this.Personajes[9].nombrePJ;
        this.posicion = this.Personajes[9].posicion;
        this.vida = this.Personajes[9].vida;
        this.cordura = this.Personajes[9].cordura;
        this.saber = this.Personajes[9].saber;
        this.influencia = this.Personajes[9].influencia;
        this.observacion = this.Personajes[9].observacion;
        this.fuerza = this.Personajes[9].fuerza;
        this.voluntad = this.Personajes[9].voluntad;
        this.limConcentracion = this.Personajes[9].limConcentracion;
        this.efecto1 = this.Personajes[9].efecto1;
        this.efecto2 = this.Personajes[9].efecto2;
        this.frase = this.Personajes[9].frase;
        this.historia = this.Personajes[9].historia;
        this.Pertenencia1 = this.Personajes[9].Pertenencia1;
        this.Pertenencia2 = this.Personajes[9].Pertenencia2;
        this.Pertenencia3 = this.Personajes[9].Pertenencia3;
        this.Pertenencia4 = this.Personajes[9].Pertenencia4;
        this.arquetipo1 = this.Personajes[9].arquetipo1;
        this.arquetipo2 = this.Personajes[9].arquetipo2;
      } else if (this.contador == 11) {
        this.imgPersonaje = "imgNorman";
        this.nombrePJ = this.Personajes[10].nombrePJ;
        this.posicion = this.Personajes[10].posicion;
        this.vida = this.Personajes[10].vida;
        this.cordura = this.Personajes[10].cordura;
        this.saber = this.Personajes[10].saber;
        this.influencia = this.Personajes[10].influencia;
        this.observacion = this.Personajes[10].observacion;
        this.fuerza = this.Personajes[10].fuerza;
        this.voluntad = this.Personajes[10].voluntad;
        this.limConcentracion = this.Personajes[10].limConcentracion;
        this.efecto1 = this.Personajes[10].efecto1;
        this.efecto2 = this.Personajes[10].efecto2;
        this.frase = this.Personajes[10].frase;
        this.historia = this.Personajes[10].historia;
        this.Pertenencia1 = this.Personajes[10].Pertenencia1;
        this.Pertenencia2 = this.Personajes[10].Pertenencia2;
        this.Pertenencia3 = this.Personajes[10].Pertenencia3;
        this.Pertenencia4 = this.Personajes[10].Pertenencia4;
        this.arquetipo1 = this.Personajes[10].arquetipo1;
        this.arquetipo2 = this.Personajes[10].arquetipo2;
      } else if (this.contador == 12) {
        this.imgPersonaje = "imgMinh";
        this.nombrePJ = this.Personajes[11].nombrePJ;
        this.posicion = this.Personajes[11].posicion;
        this.vida = this.Personajes[11].vida;
        this.cordura = this.Personajes[11].cordura;
        this.saber = this.Personajes[11].saber;
        this.influencia = this.Personajes[11].influencia;
        this.observacion = this.Personajes[11].observacion;
        this.fuerza = this.Personajes[11].fuerza;
        this.voluntad = this.Personajes[11].voluntad;
        this.limConcentracion = this.Personajes[11].limConcentracion;
        this.efecto1 = this.Personajes[11].efecto1;
        this.efecto2 = this.Personajes[11].efecto2;
        this.frase = this.Personajes[11].frase;
        this.historia = this.Personajes[11].historia;
        this.Pertenencia1 = this.Personajes[11].Pertenencia1;
        this.Pertenencia2 = this.Personajes[11].Pertenencia2;
        this.Pertenencia3 = this.Personajes[11].Pertenencia3;
        this.Pertenencia4 = this.Personajes[11].Pertenencia4;
        this.arquetipo1 = this.Personajes[11].arquetipo1;
        this.arquetipo2 = this.Personajes[11].arquetipo2;
      }
    }, // end cambiaMapa
    VerDatos(verdato){
        if (verdato == 'Historia') {
          this.ModalHistoria = true;
      } else if (verdato == 'Pertenencias'){
          this.ModalPertenencias = true;
      } else if (verdato == 'Arquetipo'){
          this.ModalArquetipo = true;
      } else{
        this.ModalHistoria = false;
        this.ModalPertenencias = false;
        this.ModalArquetipo = false;
      }
    },
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
    Bendecido(){
      this.EstadoBendecido = !this.EstadoBendecido
      if (this.EstadoBendecido == true) {
        this.AvAcierto2 = 5;
        this.AvAcierto3 = 4
      } else {
        this.AvAcierto3 = null
      }
    },
    Maldito(){
      this.EstadoMaldito = !this.EstadoMaldito
      if (this.EstadoMaldito == true) {
        this.AvAcierto2 = null;
        this.AvAcierto3 = null
      }else {
        this.AvAcierto2 = 5
      }
    },
    tirarPacto(min){
      let max = 6; // maximo de lados de dados
      this.ResultadoPacto = Math.floor(Math.random() * (min, max)) + min;
      console.log(this.ResultadoPacto);
    },
    vaciarArray: function () {
      this.resultados = []; // vaciamos el array de resultado
      this.sumaResultado = 0;
    },
    reseteaTodo(){
      this.EstadoBendecido = false;
      this.EstadoMaldito = false;
      this.AvAcierto2 = 5;
      this.AvAcierto3 = null;
      this.PactoSiniestro  = false;
      this.NDadosAtributo = 0;
      this.NDeDadosExtra = 0
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

@font-face{
  font-family: NombrePJs;
  src: url('../assets/fonts/PJs/NombrePJs.ttf'), url('../assets/fonts/PJs/NombrePJsItalic.ttf')
}
@font-face{
  font-family: Pacto Siniestro;
  src: url('../assets/fonts/Pacto Siniestro/bloodcrow.ttf'), url('../assets/fonts/Pacto Siniestro/bloodcrowc.ttf'), url('../assets/fonts/Pacto Siniestro/bloodcrowci.ttf')
}

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
  box-shadow: 0px 0px 20px rgb(255, 255, 255);
}
.helpermaxheigth{
  max-height: 7vh;
}
.inputsAvanzado{
  max-width: 20vh;
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

#modalPactoSiniestro{
  min-width: 40vh;
  min-height: 40vh;
}
.titlePactosiniestro{
  font-family: "Pacto Siniestro";
  font-weight: 300;
  text-align: center;
}
.resultadoPactosiniestro{
  font-family: "Pacto Siniestro";
  font-weight: 300;
  font-size: 15vh;
  text-align: center;
}
.titleDecoration {
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "NombrePJs";
  font-weight: 300;
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
  box-shadow: 0px 0px 20px rgb(30, 255, 0);
}
.fatal {
  box-shadow: 0px 0px 20px rgb(255, 0, 0);
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
}
</style>>