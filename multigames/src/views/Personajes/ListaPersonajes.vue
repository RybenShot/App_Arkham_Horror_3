<template>
  <div class="BGGeneralAH">
    <!-- notificacion de activar o desactivar -->
    <transition name="fade">
      <div v-if="mostrarNotifDesactivar" class="notificacion has-text-light has-background-danger">
        <span>{{ mensajeDesactivado }}</span>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="mostrarNotifActivar" class="notificacion has-background-success">
        <span>{{ mensajeActivado }}</span>
      </div>
    </transition>

    <div>
      <!-- Seleccionar Investigador -->
      <div class="columns is-mobile mb-0 pt-3 centrarHero" >
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack"> <i class="fa-2x fas fa-arrow-left has-text-white"></i> </div>
        <div class="column " style="margin: 0 auto;"> <p class="has-text-centered title has-text-white">{{ textoInterfaz.titulo }}</p> </div>
        <div class="column is-3 p-0" style="text-align: center;"> <router-link class="" to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link> </div>
      </div>

      <hr class="m-1 mx-4 linea-separacion"> 

      <!-- Colecciones y botones -->
      <h2 class="title is-4 has-text-white has-text-centered">{{ textoInterfaz.subtitulo }}</h2>
      <p class="subtitle is-6 has-text-white has-text-centered mb-2">{{ textoInterfaz.descripcion }}</p>
      <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2">

        <button v-if="this.$store.state.ActivarBase == true" class=" button  is-success" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarBase = false)">{{ textoInterfaz.botones.base }}</button>
        <button v-if="this.$store.state.ActivarBase == false" class="button is-success is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarBase = true)">{{ textoInterfaz.botones.base }}</button>

        <button v-if="this.$store.state.ActivarMareasTenebrosas == true" class="button  is-info" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarMareasTenebrosas = false)">{{ textoInterfaz.botones.mareas }}</button>
        <button v-if="this.$store.state.ActivarMareasTenebrosas == false" class="button is-info is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarMareasTenebrosas = true)">{{ textoInterfaz.botones.mareas }}</button>

        <button v-if="this.$store.state.ActivarNocheCerrada == true" class="button  is-warning" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarNocheCerrada = false)">{{ textoInterfaz.botones.noche }}</button>
        <button v-if="this.$store.state.ActivarNocheCerrada == false" class="button is-warning is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarNocheCerrada = true)">{{ textoInterfaz.botones.noche }}</button>

        <button v-if="this.$store.state.ActivarNSecretosDeLaOrden == true" class="button  is-link" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarNSecretosDeLaOrden = false)">{{ textoInterfaz.botones.secretos }}</button>
        <button v-if="this.$store.state.ActivarNSecretosDeLaOrden == false" class="button is-link is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarNSecretosDeLaOrden = true)">{{ textoInterfaz.botones.secretos }}</button>
        
        <button v-if="this.$store.state.ActivarOriginal == true" class="button  is-danger" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarOriginal = false)">{{ textoInterfaz.botones.original }}</button>
        <button v-if="this.$store.state.ActivarOriginal == false" class="button is-danger is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarOriginal = true)">{{ textoInterfaz.botones.original }}</button>

      </div>
    </div>

<br>

<!-- EXPANSIONES // PERSONAJES -->
    <div v-if="this.$store.state.ActivarBase">
      <div class="PersonajesList">
        <div v-for="personaje in PersonajesBase" :key="personaje">
          <router-link to="/DetallePersonaje">
            <div @click="this.$store.state.datosPJactual = personaje" class="p-1" >

              <div class="card cajaDePersonajesBase">
                <div class="card-icon top-left has-text-danger"><i class="fas fa-heartbeat"></i></div>
                <div class="card-icon top-right has-text-info"><i class="fas fa-brain"></i></div>

                <p class="card-number pl-2 pt-1 top-left">{{personaje.vida}}</p>
                <p class="card-number pr-2 pt-1 top-right">{{personaje.cordura}}</p>

                <div class="card-image-wrapper">
                  <img :src="personaje.fotoUrl" :alt="personaje.nombrePJ" class="card-image" />
                </div>
                
                <div class="card-overlay has-text-centered">
                  <p class="title is-7 tipografiaElegante">{{personaje.nombrePJ}}</p>

                  <p v-if="this.$store.state.lenguaje == 'español'" class="subtitle is-7">{{personaje.posicion}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle is-7">{{personaje.ENposicion}}</p>
                </div>
              </div>

            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarMareasTenebrosas">
      <div class="PersonajesList">
        <div v-for="personaje in PersonajesMareasTenebrosas" :key="personaje">
          <router-link to="/DetallePersonaje">
            <div @click="this.$store.state.datosPJactual = personaje" class="p-1" >

              <div class="card cajaDePersonajesMareasTenebrosas">
                <div class="card-icon top-left has-text-danger"><i class="fas fa-heartbeat"></i></div>
                <div class="card-icon top-right has-text-info"><i class="fas fa-brain"></i></div>

                <p class="card-number pl-2 pt-1 top-left">{{personaje.vida}}</p>
                <p class="card-number pr-2 pt-1 top-right">{{personaje.cordura}}</p>

                <div class="card-image-wrapper">
                  <img :src="personaje.fotoUrl" :alt="personaje.nombrePJ" class="card-image" />
                </div>
                
                <div class="card-overlay has-text-centered">
                  <p class="title is-7 tipografiaElegante">{{personaje.nombrePJ}}</p>

                  <p v-if="this.$store.state.lenguaje == 'español'" class="subtitle is-7">{{personaje.posicion}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle is-7">{{personaje.ENposicion}}</p>
                </div>
              </div>

            </div>
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-if="this.$store.state.ActivarNocheCerrada">
      <div class="PersonajesList">
        <div v-for="personaje in PersonajesNocheCerrada" :key="personaje">
          <router-link to="/DetallePersonaje">
            <div @click="this.$store.state.datosPJactual = personaje" class="p-1" >

              <div class="card cajaDePersonajesNocheCerrada">
                <div class="card-icon top-left has-text-danger"><i class="fas fa-heartbeat"></i></div>
                <div class="card-icon top-right has-text-info"><i class="fas fa-brain"></i></div>

                <p class="card-number pl-2 pt-1 top-left">{{personaje.vida}}</p>
                <p class="card-number pr-2 pt-1 top-right">{{personaje.cordura}}</p>

                <div class="card-image-wrapper">
                  <img :src="personaje.fotoUrl" :alt="personaje.nombrePJ" class="card-image" />
                </div>
                
                <div class="card-overlay has-text-centered">
                  <p class="title is-7 tipografiaElegante">{{personaje.nombrePJ}}</p>

                  <p v-if="this.$store.state.lenguaje == 'español'" class="subtitle is-7">{{personaje.posicion}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle is-7">{{personaje.ENposicion}}</p>
                </div>
              </div>

            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarNSecretosDeLaOrden">
      <div class="PersonajesList">
        <div v-for="personaje in PersonajesSecretosDeLaOrden" :key="personaje">
          <router-link to="/DetallePersonaje">
            <div @click="this.$store.state.datosPJactual = personaje" class="p-1" >

              <div class="card cajaDePersonajesSecretosDeLaOrden">
                <div class="card-icon top-left has-text-danger"><i class="fas fa-heartbeat"></i></div>
                <div class="card-icon top-right has-text-info"><i class="fas fa-brain"></i></div>

                <p class="card-number pl-2 pt-1 top-left">{{personaje.vida}}</p>
                <p class="card-number pr-2 pt-1 top-right">{{personaje.cordura}}</p>

                <div class="card-image-wrapper">
                  <img :src="personaje.fotoUrl" :alt="personaje.nombrePJ" class="card-image" />
                </div>
                
                <div class="card-overlay has-text-centered">
                  <p class="title is-7 tipografiaElegante">{{personaje.nombrePJ}}</p>
                  
                  <p v-if="this.$store.state.lenguaje == 'español'" class="subtitle is-7">{{personaje.posicion}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle is-7">{{personaje.ENposicion}}</p>
                </div>
              </div>

            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarOriginal">
      <div class="PersonajesList">
        <div v-for="personaje in PersonajesOriginal" :key="personaje">
          <router-link to="/DetallePersonaje">
            <div @click="this.$store.state.datosPJactual = personaje" class="p-1" >

              <div class="card cajaDePersonajesOriginal">
                <div class="card-icon top-left has-text-danger"><i class="fas fa-heartbeat"></i></div>
                <div class="card-icon top-right has-text-info"><i class="fas fa-brain"></i></div>

                <p class="card-number pl-2 pt-1 top-left">{{personaje.vida}}</p>
                <p class="card-number pr-2 pt-1 top-right">{{personaje.cordura}}</p>

                <div class="card-image-wrapper">
                  <img :src="personaje.fotoUrl" :alt="personaje.nombrePJ" class="card-image" />
                </div>
                
                <div class="card-overlay has-text-centered">
                  <p class="title is-7 tipografiaElegante">{{personaje.nombrePJ}}</p>
                  
                  <p v-if="this.$store.state.lenguaje == 'español'" class="subtitle is-7">{{personaje.posicion}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle is-7">{{personaje.ENposicion}}</p>
                </div>
              </div>

            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="(this.$store.state.ActivarBase == false) && (this.$store.state.ActivarMareasTenebrosas == false) && (this.$store.state.ActivarOriginal == false) && (this.$store.state.ActivarNocheCerrada == false) && (this.$store.state.ActivarNSecretosDeLaOrden == false)">
      <section class="hero is-halfheigh is-danger">
        <div class="hero-body">
          <p class="title has-text-centered">{{textoInterfaz.sinExpansion}}</p>
          <p class="subtitle has-text-centered">{{ textoInterfaz.seleccionaExpansion }}</p>
        </div>
      </section>
    </div>

    <br>
  </div>
</template>

<script>
import { Howl } from 'howler';

const sonidoTecla = new Howl({
  src: require('@/assets/sound/SonidoTecla.mp3'),
});

export default {
  name: "listaDePersonajes",
  components:{},

  data() {
    return {
      mostrarNotifDesactivar: false,
      mensajeDesactivado: "Expansión desactivada!",
      mostrarNotifActivar: false,
      mensajeActivado: "Expansión Activada!",

      textoInterfaz:{
        titulo: "",
        subtitulo: "",
        descripcion: "",
        sinExpansion: "",
        seleccionaExpansion: "",
        botones: {
          base: "",
          mareas: "",
          noche: "",
          secretos: "",
          original:""
        },
      },

      PersonajesBase: [
        {nombrePJ: "Tommy Muldoon",
          idPersonaje: 1,
          posicion: "Poli Novato",
          ENposicion: "Rookie cop",
          vida: 7,
          cordura: 5,
          saber: 2,
          influencia: 2,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1:"Protector: Si un Monstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tú a ese Monstruo en su lugar.",
          ENefecto1: "Protector: If a Monster is going to face another researcher in your space, you can face that Monster instead.",
          efecto2: null,
          frase: "“Vamos alla, Tommy. Es hora de hacerse el Heroe”",
          ENfrase: '“Come on, Tommy. It’s time to become a hero.”',
          locucionURL: require('@/assets/sound/Locucion/personajes/1-Tommy.mp3'),
          historia:"Los Muldoon habían servido en el cuerpo de policía durante generaciones, y Tommy no iba a ser menos. Fue el orgullo de su familia cuando se graduó en la academia de Boston. Por eso no hizo mucha gracia que lo trasladasen a la comisaría de Arkham; después de todo ¿qué podía ocurrir en aquel pueblucho comparado con los crímenes que habría sido capaz de resolver en Boston? Al final resultó que el trabajo policial en Arkham no estaba exento de interés, después de todo. Había muchos sucesos inexplicables, y la policía local parecía más interesada en aparentar normalidad que en buscar una solución. Así que Tommy echó mano a Becky, el rifle de su abuelo, y se dispuso a buscar soluciones por su cuenta ...",
          ENhistoria: "The Muldoons had served in the police force for generations, and Tommy was no less. He was the pride of his family when he graduated from the Boston Academy. That’s why it wasn’t very funny to be transferred to the Arkham police station; after all, what could happen in that small town compared to the crimes I would have been able to solve in Boston? It turned out that police work in Arkham was not without interest after all. There were many unexplained events, and the local police seemed more interested in appearing normal than in finding a solution. So Tommy reached for Becky, his grandfather’s rifle, and set out to find solutions on his own ...",
          arquetipos: {
            tituloArquetipo1: "Defensor",
            ENtituloArquetipo1:"Defender",
            descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo1: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
            tituloArquetipo2:"Superviviente",
            ENtituloArquetipo2:"Survivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory."
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Becky",
            ENnombre: "Becky",
            descripcion:"Objeto - Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque.",
            ENdescripcion:"Object - Weapon. You receive +4 FORCE when performing an attack action.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
        }, 
          Pertenencia2: null,
          Pertenencia3:{
            urlFoto: "",
            nombre: "Esposas",
            ENnombre: "handcuffs",
            descripcion:"Objeto - Común. Una vez por ronda, después de que infrinjas Daño, te separes o sufras Daño de un monstruo HUMANO que no sea épico, puedes derrotar a ese monstruo.",
            ENdescripcion:"Object - Common. Once per round, after you break Damage, separate or take Damage from a non-epic HUMAN monster, you can defeat that monster.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy3.jpg")
          } ,
          Pertenencia4:{
            urlFoto: "",
            nombre: "Motocicleta",
            ENnombre: "motorcycle",
            descripcion:"Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte un espacio adicional.",
            ENdescripcion:"Object - Vehicle. Instead of a normal motion action, you move a maximum of 3 spaces and can spend $1 to move an extra space.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy1.jpg")
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/1-Tommy.jpg"),
          expansion: "Base"
        },
        {nombrePJ: "Marie Lambeau",
          idPersonaje: 2,
          posicion: "Cantante",
          ENposicion: "Singer",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 4,
          observacion: 2,
          fuerza: 2,
          voluntad: 2,
          dinero: 4,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "Voz Aterciopelada: Una vez por ronda, después de que realices una acción, otro investigador que esté en cualquier espacio puede realizar esa misma acción.(Se siguen aplicando las restricciones habituales a las acciones.)",
          ENefecto1: "Velvety Voice: Once per round, after you perform an action, another researcher who is in any space can perform the same action.(The usual restrictions on actions continue to apply.)",
          efecto2: null,
          frase: "“Presta atención y déjate encandilar por mi voz”",
          ENfrase: "“Pay attention and let my voice charm you”",
          historia: "Marie ignoraba por qué su grand-mère se había marchado a Arkham, pero sin duda la anciana tendría sus motivos. No sabía por qué el resto de su familia se había mantenido lejos de aquella ciudad, aún después de que su grand-mère falleciese. 'Deberías ir a visitarla', le dijo su padre. 'Seguro que le das una alegría'.  Como si la anciana no estuviese muerta y enterrada. Marie consiguió que la contratasen para actuar en un local de Arkham, Algo trivial para la VOZ ATERCIOPELADA del jazz. Y procuró no pensar en las canciones que invadían sus sueños, ni en sus terribles tonos inhumanos, ni en aquel horripilante caballero, tan parecido al mismísimo barón Samedi, que siempre estaba entre el público cuando actuaba ...",
          ENhistoria: "Marie did not know why her grand-mère had gone to Arkham, but surely the old woman would have her reasons. He did not know why the rest of his family had stayed away from that city, even after his grand-mère passed away. 'You should go visit her,' her father said. 'I’m sure you make her happy'.  As if the old lady wasn’t dead and buried. Marie got her hired to perform at a local in Arkham, something trivial for the VELVETY VOICE of jazz. And he tried not to think of the songs that invaded his dreams, nor of his terrible inhuman tones, nor of that horrifying gentleman, so similar to Baron Samedi himself, who was always in the audience when he acted ...",
          arquetipos: {
            tituloArquetipo1: "Mistico",
            ENtituloArquetipo1:"Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives.",
            tituloArquetipo2:"Superviviente",
            ENtituloArquetipo2:"Survivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory."
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Intervención",
            ENnombre: "intervention",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, cuando otro investigador situado en cualquier espacio esté resolviendo una prueba, puedes hacer una prueba de SABER -1. Añade el resultado de esta prueba al resultado de la prueba de ese otro investigador.",
            ENdescripcion:"Spell - Spell. Once per round, when another researcher located in any space is solving a test, you can do a SABER -1 test. Add the result of this test to the test result of that other investigator.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMarie3.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "El cuchillo de grande-mère",
            ENnombre: "The knife of grande-mère",
            descripcion:"Objeto - Mágico Arma. Recibes +2 de FUERZA cuando estés realizando una acción de ataque. Recibes +2 de SABER cuando estés lanzando un hechizo",
            ENdescripcion:"Object - Magic Weapon. You receive +2 FORCE when you are performing an attack action. You receive +2 SABER when you are casting a spell",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMarie1.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Sangre de bruja",
            ENnombre: "Sangre de bruja",
            descripcion:"Talento - Innato. Acción: Puedes realizar una acción que ya hayas utilizado en esta ronda. Puedes usar tu Voz aterciopelada para permitir que otro investigador realice esta acción. Una vez por ronda, después de que gastes una ficha de Restos, ganas una ficha de Restos.",
            ENdescripcion:"Talent - Innate. Action: You can perform an action that you have already used in this round. You can use your Velvety Voice to allow another researcher to do this. Once per round, after you spend a Remains tab, you win a Remains tab.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMarie2.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/2-Marie.jpg"),
          HistoriaYT: "nLVtMyycF2A",
          expansion: "Base"
        },
        {nombrePJ: "Jenny Barnes",
          idPersonaje: 3,
          posicion: "Diletante",
          ENposicion: "Dilettante",
          vida: 7,
          cordura: 5,
          saber: 1,
          influencia: 4,
          observacion: 2,
          fuerza: 3,
          voluntad: 3,
          restos: 0,
          pistas: 0,
          dinero: 5,
          limConcentracion: 1,
          ENlimConcentracion: 1,
          efecto1:"Fondo fiduciario -- Acción: Si tienes menos de 3$, ganas 3$",
          ENefecto1:"Trust Fund -- Action: If you have less than $3, you earn $3",
          efecto2: null,
          frase:"“No me importa solucionar problemas a golpe de talonario; y si eso no funciona, ya los golpearé con alguna otra cosa”",
          ENfrase:"“I don’t mind solving problems with a checkbook; and if that doesn’t work, I’ll hit them with something else”",
          historia: "Aunque le apasionaban los lujos y el dinero, Jenny siempre ha tenido una vena curiosa y aventurera. Adora la moda y la alta sociedad de París y Venecia, pero se mueve con la misma soltura cazando en los campos de Escocia que juega en los clubes de Nueva Orleans. Incluso financió una excavación arqueológica por el mero hecho de ser la primera en entrar en aquella tumba antigua. Por eso, cuando se enteró de que su hermana Isabelle había desaparecido, Jenny viajó a Arkham para tomar cartas en el asunto personalmente. Puede que vivir en medio de tanta opulencia y poder la hubiese vuelto demasiado confiada ... o tal vez los rufianes que secuestraron a su hermana habían cometido su último error.",
          ENhistoria: "Although passionate about luxury and money, Jenny has always had a curious and adventurous streak. He loves the fashion and high society of Paris and Venice, but moves with the same ease hunting in the fields of Scotland playing in the clubs of New Orleans. She even financed an archaeological excavation for the mere fact of being the first to enter that ancient tomb. So, when she learned that her sister Isabelle had disappeared, Jenny traveled to Arkham to take matters into her own hands. Maybe living in the midst of such opulence and power would have made her too confident ... or maybe the thugs who kidnapped her sister had made their last mistake.",
          arquetipos: {
            tituloArquetipo1: "Experto",
            ENtituloArquetipo1:"Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningún reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
            ENdescripcionArquetipo1: "You possess an exclusive set of skills that allow you to specialize in a specific task. Jenny has no qualms about solving her problems with Money; don’t hesitate to spend it when it suits you.",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Buscando a Izzie",
            ENnombre: "Looking for Izzie",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba, puedes sufrir un punto de Daño y un punto de Horror para volver a tirar cualquier cantidad de dados.",
            ENdescripcion:"Talent - Innate. Once per round, when you are solving a test, you can take a Damage point and a Horror point to re-roll any number of dice.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerJenny1.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3:{
            urlFoto: "",
            nombre: ".45 gemelas de Jenny",
            ENnombre: ".45 twins of Jenny",
            descripcion:"Objeto - Común arma. Recibes +3 de FUERZA cuando estés realizando una acción de ataque. Puedes sumar uno al resultado de un dado cuando estés realizando una acción de ataque.",
            ENdescripcion:"Object - Common weapon. You receive +3 FORCE when performing an attack action. You can add one to the result of a die when you are performing an attack action.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerJenny2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "De punta en blanco",
            ENnombre: "To the nines",
            descripcion:"Talento - Cuando gastes una ficha de Concentración para volver a tirar un dado, en vez de eso puedes volver a tirar cualquier cantidad de dados. Tu fondo fiduciario te proporciona 2$ adicionales.",
            ENdescripcion:"When you spend a Concentration tab to re-roll a dice, you can instead re-roll any number of dice. Your trust fund provides you with an additional $2.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerJenny3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/3-Jenny.jpg"),
          HistoriaYT: "A3eG_3SDUTA",
          expansion: "Base"
        },
        {nombrePJ: "Dexter Drake",
          idPersonaje: 4,
          posicion: "Mago",
          ENposicion: "Witch",
          vida: 5,
          cordura: 7,
          saber: 4,
          influencia: 3,
          observacion: 2,
          fuerza: 2,
          voluntad: 2,
          restos: 0,
          pistas: 0,
          dinero: 2,
          limConcentracion: "Es igual al número de hechizos que tengas",
          ENlimConcentracion: "It’s equal to the number of spells you have",
          efecto1: "Don para la magia -- Una vez por ronda, cuando estés resolviendo una prueba de SABER, puedes volver a tirar uno o todos los dados",
          ENefecto1: "Gift for magic -- Once per round, when you are solving a SABER test, you can throw one or all of the dice again",
          efecto2: null,
          frase: "“No te conviene ver la auténtica magia, chico. Nadie debería verla nunca.”",
          ENfrase: "“You don’t want to see the real magic, kid. No one should ever see it.”",
          historia: "La magia, concretamente el ilusionismo, fué la principal afición de Dexter Drake en su infancia y durante la Gran Guerra. De pequeño soñaba con la auténtica hechicería, pero nunca logró pasar de escamotear monedas y realizar otros trucos de salón ... hasta que aquél viejo mago callejero desató su maldición. Así fué como Dexter averiguó la verdad: Que existía la magia auténtica, y era más terrible de lo que nunca imaginó. ¿Y qué podía hacer él sino estudiarla en la medida de sus posibilidades? Descubrir el truco, el conejo en la chistera, el secreto que hacía que todo cobrara sentido. Pero en este caso la chistera es la realidad, y el Gran Drake cada vez tiene menos claro que merezca la pena desvelar su secreto.",
          ENhistoria: "Magic, specifically illusionism, was the main hobby of Dexter Drake in his childhood and during the Great War. As a child he dreamed of authentic sorcery, but he never managed to go beyond stealing coins and performing other parlor tricks ... until that old street magician unleashed his curse. That’s how Dexter found out the truth: that real magic existed, and it was more terrible than he ever imagined. And what could he do but study it to the best of his ability? Discovering the trick, the rabbit in the hat, the secret that made everything make sense. But in this case the hat is the reality, and the Big Drake is less and less clear that it is worth revealing his secret.",
          arquetipos: {
            tituloArquetipo1: "Mistico",
            ENtituloArquetipo1:"Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives.",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null
          },
          arquetipo1: "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          ENarquetipo1: "As a MYSTIC, you stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives",
          arquetipo2: null,
          Pertenencia1: {
            urlFoto: "",
            nombre: "Nieblas de R'lyeh",
            ENnombre: "Mists of R'lyeh",
            descripcion:"Hechizo - Ensalmo. Puedes hacer una prueba de SABER en lugar de OBSERVACIÓN cuando estés realizando una acción de evasión.(El modificador de evasión del Monstruo sigue aplicándose)",
            ENdescripcion:"Spell - Spell. You can do a KNOW test instead of OBSERVATION when you are performing an evasion action.(Monster Evasion Modifier still applies)",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDexter1.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Bastón de mago",
            ENnombre: "Mage staff",
            descripcion:"Objeto - Extraordinario. Recibes +2 de SABER cuando estés lanzando un hechizo.",
            ENdescripcion:"Item - Extraordinary. You receive +2 of KNOW when you are casting a spell.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDexter2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Viaje astral",
            ENnombre: "Astral travel",
            descripcion:"Hechizo - Ensalmo. En vez de realizar una acción de movimiento normal, puedes hacer una prueba de SABER para moverte tantos espacios como el resultado de la prueba más dos.",
            ENdescripcion:"Spell - Spell. Instead of performing a normal motion action, you can do a SABER test to move as many spaces as the test result plus two.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDexter3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/4-Dexter.jpg"),
          HistoriaYT: "nCDlFIKAKUw",
          expansion: "Base"
        },
        {nombrePJ: "Wendy Adams",
          idPersonaje: 5,
          posicion: "Niña callejera",
          ENposicion: "Street girl",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 1,
          observacion: 4,
          fuerza: 2,
          voluntad: 3,
          restos: 0,
          pistas: 0,
          dinero: 1,
          limConcentracion: 3,
          ENlimConcentracion: 3,
          efecto1:"Atajo -- Antes o después de que realices una acción, adicional como parte de una acción de evasión, puedes moverte un máximo de dos espacios (este movimiento es gratuito).",
          ENefecto1:"Shortcut -- Before or after you perform an action, additional as part of an evasion action, you can move a maximum of two spaces (this movement is free).",
          efecto2: null,
          frase:"“Algún día encontraré a papá, y mamá vendrá a casa con nosotros y volveremos a ser felices. Ya lo veréis.”",
          ENfrase:'"Someday I’ll find Dad, and Mom will come home with us and we’ll be happy again. You’ll see."',
          historia: "Después de que su padre desapareciese en alta mar y su madre fuese ingresada en un psiquiátrico, Wendy acabó en un orfanato. Ella sabía que su madre no estaba loca: los cánticos que recitaba, los símbolos que garabateaba, todo lo hacía para protegerla. Por eso le había dado aquél amuleto que tenía dibujada una estrella de cinco puntas torcida, pero Wendy sabía que no estaba a salvo en el orfanato sin la protección de su madre, así que se fugó. Un día encontró una fotografía de su padre con una nota escrita en ruso. Por detrás había un mensaje: 'La Marea Roja se alzará pronto. Cuidate mucho, pequeña mia'. De repente, Wendy se sintió embargada por una emoción que no sentía desde hacía mucho tiempo: esperanza.",
          ENhistoria: "After her father disappeared at sea and her mother was admitted to a psychiatric institution, Wendy ended up in an orphanage. She knew her mother was not crazy: the chants she recited, the symbols she scribbled, she did everything to protect her. That’s why I had given her that amulet that had a five-pointed star drawn, but Wendy knew she wasn’t safe in the orphanage without her mother’s protection, so she ran away. One day he found a photograph of his father with a note written in Russian. From behind was a message: 'The Red Tide will rise soon. Be very careful, my little one'. Suddenly, Wendy was overwhelmed by an emotion she hadn’t felt for a long time: hope.",
          arquetipos: {
            tituloArquetipo1:"Superviviente",
            ENtituloArquetipo1:"Survivor",
            descripcionArquetipo1: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo1: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
            tituloArquetipo2: "Buscador",
            ENtituloArquetipo2:"Seeker",
            descripcionArquetipo2: "Eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo2: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Amuleto de mama" ,
            ENnombre: "Mama’s charm" ,
            descripcion:"Objeto - Extraordinario. Una vez por ronda, puedes anular un punto de daño o de Horror que vayas a sufrir. “No olvides nunca que tu mamá te quiere mucho.”",
            ENdescripcion:"Item - Extraordinary. Once per round, you can override a damage or Horror point that you will suffer. 'Never forget that your mother loves you very much.'",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerWendy1.jpg")
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Fotografía misteriosa",
            ENnombre: "Mysterious photograph",
            descripcion:"Objetivo - Extraordinario. Después de que ganes una Pista, puedes concentrarte en una habilidad de tu elección. “La Marea Roja se alzará pronto. Cuidate mucho, pequeña mía.”",
            ENdescripcion:"Objective - Extraordinary. After you win a Clue, you can focus on an ability of your choice. 'The Red Tide will rise soon. Take good care, my little one.'",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerWendy3.jpg")
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Osito Pawterson",
            ENnombre: "Pawterson bear",
            descripcion:"Objeto - Extraordinario. Antes de que uno o varios monstruos vayan a atacarte, puedes descartar esta carta para separarte de todos esos monstruos y agotarlos.",
            ENdescripcion:"Object - Extraordinary. Before one or several monsters attack you, you can discard this card to separate from all those monsters and exhaust them.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerWendy2.jpg")
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/5-Wendy.jpg"),
          expansion: "Base"
        },
        {nombrePJ: "Rex Murphy",
          idPersonaje: 6,
          posicion: "Reportero",
          ENposicion: "Reporter",
          vida: 7,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 2,
          restos: 0,
          pistas: 0,
          dinero: 3,
          limConcentracion: "Sin limite",
          ENlimConcentracion: "No limits",
          efecto1: "Maldición Familiar -- Cuando estés resolviendo una prueba, solamente cuentan como Éxitos los 6 que obtengas. No puedes ganar los estados de Bendición ni Maldición.",
          ENefecto1: "Family Curse -- When you are solving a test, only the 6 you get count as Successes. You cannot win the Blessing or Curse states.",
          efecto2: "Obstinación -- Después de que falles una prueba, te concentras en una habilidad de tu elección",
          ENefecto2: "Stubbornness -- After you fail a test, you focus on a skill of your choice",
          frase: "“¿Cómo me he metido en semejante embrollo? Vaya suerte la mía.”",
          ENfrase: "“How did I get into such a mess? Well, my luck.”",
          historia: "Rex Murphy no creía en la suerte; lo cual estaba muy bien, porque la suya era nefasta. Tampoco creyó a aquella vieja en rumania que le dijo que estaba maldito. Pero debía admitir que todo tendía hacia salirle más mal que bien, en ocasiones con resultados catastróficos. Había perdido la cuenta de las veces que había descubierto pruebas de la existencia de un 'mundo oculto', para que luego se las llevase una rafaga de viento, les lloviera encima o se las comiera un rinoceronte. Pero la suerte no podía demostrarse ni tampoco se podía imprimir en el Arkham Advertised, así que Rex se convenció a sí mismo que no creía en ella. Aunque si las cosas le hubieran salido mejor, todos creerían que el mundo oculto existe de verdad.",
          ENhistoria: "Rex Murphy didn’t believe in luck, which was great, because his was bad. He didn’t believe that old woman in Romania who told him he was cursed either. But I had to admit that everything tended to go wrong, sometimes with catastrophic results. I had lost count of the times I had discovered proof of the existence of a 'hidden world', to then be carried away by a gust of wind, But luck couldn’t be proven nor could it be printed on the Arkham Advertised. So Rex convinced himself that he didn’t believe in it. Although if things had gone better, everyone would believe that the hidden world really exists.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1:"Seeker",
            descripcionArquetipo1: "Eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
            tituloArquetipo2:"Experto",
            ENtituloArquetipo2:"Expert",
            descripcionArquetipo2: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Rex ha vivido siempre con su maldición familiar. En consecuencia, has aprendido diversas maneras de paliar tu mala suerte.",
            ENdescripcionArquetipo2: "You possess an exclusive set of skills that allow you to specialize in a specific task. Rex has always lived with his family curse. As a result, you’ve learned several ways to ease your bad luck.",
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Buscando la verdad",
            ENnombre: "looking for the truth",
            descripcion:"Después de que ganes una Pista, ganas 1$ y puedes concentrarte en una habilidad de tu elección.",
            ENdescripcion:"After you win a Track, you earn $1 and can focus on a skill of your choice.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRex2.jpg")
          },
          Pertenencia2: {
            urlFoto: "",
            nombre: "La Torre",
            ENnombre: "La Tower",
            descripcion:"Objeto - Extraordinario. Una vez por ronda, cuando estés resolviendo una prueba puedes volver a tirar uno de tus dados o todos ellos.",
            ENdescripcion:"Item - Extraordinary. Once per round, when you are solving a test you can re-roll one or all of your dice.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRex3.jpg")
          },
          Pertenencia3: {
            urlFoto: "",
            nombre: "Superar la adversidad",
            ENnombre: "Overcome adversity",
            descripcion:"Puedes concentrarte hasta 2 veces en cada habilidad.",
            ENdescripcion:"You can focus up to 2 times on each skill.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRex4.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Todas las piezas encajan",
            ENnombre: "All the pieces fit together",
            descripcion:"Cuando estés realizando una acción de revelar Pistas, suma uno al resultado de cada dado que tires.",
            ENdescripcion:"When you are performing an action to reveal Hints, add one to the result of each dice you throw.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRex1.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/6-Rex.jpg"),
          HistoriaYT: "2CNEDE9mJ-0",
          expansion: "Base"
        },
        {nombrePJ: "Calvin Wrigth",
          idPersonaje: 7,
          posicion: "Tipo atormentado",
          ENposicion: "Tormented men",
          vida: 6,
          cordura: 6,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 3,
          voluntad: 1,
          restos: 0,
          pistas: 0,
          dinero: 3,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "Un amigo seguro -- Acción: Puedes intercambiar cualquier cantidad de Vida y/o Cordura con otro investigador o Aliado que esté en cualquier espacio.",
          ENefecto1: "A Safe Friend -- Action: You can exchange any amount of Life and/or Sanity with another researcher or Ally who is in any space.",
          efecto2: null,
          frase: "“Sacrificaría lo que hiciera falta con tal de protegerte”",
          ENfrase: "“I’d sacrifice whatever it takes to protect you”",
          historia: "Lo más difícil que había hecho Calvin jamás fué dar la espalda a Joao, que siempre estuvo ahí para ayudarle a sobrellevarlo todo. Pero no tuvo elección. La imagen de Joao ardiendo hasta quedar reducido a cenizas, su mundo calcinado en un fogonazo de luz, la oscuridad que anidaba en su interior. Calvin no podía permitir que le arrebatase a su amante, por eso optó por despejarse de la ecuación. Así que hizo un trato. Dejó que la secta del Dios Enmascarado creyese que podía controlarlo, y aguardó el momento propio para revelarse contra el antiguo mal que amenazaba el mundo. Fueron tiempos difíciles, pero saber que Joao estaba a salvo le ayudó a superarlos. No es que Calvin no tuviese miedo (lo tenía), pero sabía lo que debía hacerse, y también que él era el único capaz de hacerlo.",
          ENhistoria: "The hardest thing Calvin had ever done was to turn my back on Joao, who was always there to help him cope. But he had no choice. The image of Joao burning to ashes, his world burned in a flash of light, the darkness that nested inside. Calvin couldn’t allow himself to be snatched from his lover, so he chose to clear himself of the equation. So he made a deal. He let the Masked God sect believe that it could control him, and waited for his own moment to reveal himself against the ancient evil that threatened the world. It was difficult times, but knowing that Joao was safe helped him overcome them. Not that Calvin wasn’t afraid (he was), but he knew what had to be done, and also that he was the only one capable of doing it.",
          arquetipos: {
            tituloArquetipo1: "Defensor",
            ENtituloArquetipo1:"Defender",
            descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo1: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
            tituloArquetipo2:"Experto",
            ENtituloArquetipo2:"Expert",
            descripcionArquetipo2: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. A Calvin se le da bien sanar a los demás, aunque esto también puede mantenerte con vida en los momentos más catastróficos.",
            ENdescripcionArquetipo2: "You possess an exclusive set of skills that allow you to specialize in a specific task. Calvin is good at healing others, although this can also keep you alive in the most catastrophic moments."
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Daga espiritual",
            ENnombre: "Spiritual dagger",
            descripcion:"Objeto - Mágico Extraordinario. Recibes +2 de FUERZA cuando estés realizando una acción de ataque. Recibes +2 de SABER cuando estés realizando una acción de salvaguarda.",
            ENdescripcion:"Objeto - Mágico Extraordinario. Recibes +2 de FUERZA cuando estés realizando una acción de ataque. Recibes +2 de SABER cuando estés realizando una acción de salvaguarda.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCalvin1.jpg")
          }  ,
          Pertenencia2: {
            urlFoto: "",
            nombre: "Hasta el fin de los tiempos",
            ENnombre: "Till the end of time",
            descripcion:"Esta carta no puede descartarse por ningún motivo. (Ni siquiera por daño u Horror.). RETRIBUCIÓN- Quita una ficha de Daño y una ficha de Horror de esta carta.",
            ENdescripcion:"This letter cannot be discarded for any reason. (Not even for damage or Horror). RETRIBUTION- Remove a Damage tab and a Horror tab from this card.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCalvin2.jpg")
          }  ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "OPCIONAL == Voz del mensajero y también un PACTO SINIESTRO",
            ENnombre: "OPTIONAL == Messenger’s voice and also a SINISTER PACT",
            descripcion:"Estado - Innato. Puedes sufrir un punto de Horror para volver a tirar cualquier cantidad de dados. (Este efecto sólo puede aplicarse una vez a cada tirada. Puedes utilizarlo para repetir la tirada de tu Pacto siniestro.)",
            ENdescripcion:"State - Innate. You can get a Horror point to re-roll any number of dice. (This effect can only be applied once to each roll. You can use it to re-roll your sinister Pact.)",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCalvin3.jpg")
          }  ,
          Pertenencia4: null,
          fotoUrl: require("@/assets/img/1-Personajes/7-Calvin.jpg"),
          expansion: "Base"
        },
        {nombrePJ: "Agnes Baker",
          idPersonaje: 8,
          posicion: "Camarera",
          ENposicion: "Waitress",
          vida: 6,
          cordura: 6,
          saber: 4,
          influencia: 2,
          observacion: 2,
          fuerza: 2,
          voluntad: 3,
          restos: 0,
          pistas: 0,
          dinero: 3,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "La sangre es poder -- Cuando estés lanzando un Hechizo, si sufres Daño o gastas Restos, recibes +2 SABER",
          ENefecto1: "Blood is power -- When you are casting a spell, if you suffer Damage or spend Remains, you receive +2 KNOW",
          efecto2: "Magia de sangre -- Puedes sufrir Daño en vez de Horror cuando lances un Hechizo",
          ENefecto2: "Blood Magic -- You can take Damage instead of Horror when casting a Spell",
          frase: "“Las cosas no son siempre lo que parecen”",
          ENfrase: "“Things aren’t always what they seem”",
          historia: "Agnes ya casi se había acostumbrado a las extrañas visiones que perturbaban sus sueños: Extraños con túnicas, cánticos rituales, monstruos aullantes de afiladas zarpas que solo alcanzaba a ver por el rabillo del ojo. Pero hace poco sufrió una mala caída y se golpeó en la cabeza. Desde entonces ha tenido visiones incluso estando despierta. En ella se vé a sí misma liderando los salmos de las figuras de las túnicas, ocultando una llave de plata en la argamasa de un pozo o lanzando sortilegios como hechicera en la mítica Hiperbórea. Agnes ha viajado a Arkham en busca de una explicación, pues la ciudad posee una larga tradición de juicios por brujería y además sucesos inexplicables. Consiguió trabajo en el restaurante de Velma, un buen día se topó con un viejo pozo que tenía los ladrillos flojos. Y entre los ladrillos, incrustada en la argamasa, encontró una antigua llave de plata, exactamente donde sabía que estaría.",
          ENhistoria: "Agnes had almost gotten used to the strange visions that disturbed her dreams: Strangers in robes, ritual chants, monsters howling with sharp paws that she could only see from the corner of her eye. But she recently had a bad fall and hit her head. Since then she has had visions even while awake. In it she sees herself leading the psalms of the figures of the robes, hiding a silver key in the mortar of a well or casting spells as a sorceress in the mythical Hyperborea. Agnes has traveled to Arkham in search of an explanation, as the city has a long tradition of witchcraft trials and unexplained events. He got a job at Velma’s restaurant, one day he ran into an old well with loose bricks. And among the bricks, embedded in the mortar, he found an ancient silver key, exactly where he knew it would be.",
          arquetipos: {
            tituloArquetipo1: "Mistico",
            ENtituloArquetipo1:"Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives.",
            tituloArquetipo2: "Defensor",
            ENtituloArquetipo2:"Defender",
            descripcionArquetipo2: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo2: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Herencia de Hiperbórea",
            ENnombre: "Hyperborean inheritance",
            descripcion:"Objeto - Mágico Extraordinario. Después de que lances un Hechizo, puedes concentrarte en una habilidad de tu elección.",
            ENdescripcion:"Item - Magical Extraordinary. After you cast a Spell, you can focus on an ability of your choice.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgnes1.jpg")
          }  ,
          Pertenencia2: null,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Protección corporal",
            ENnombre: "Body protection",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, si tú, otro investigador o un Aliado vais a sufrir Daño (sin importar en qué espacio esté el afectado), puedes hacer una prueba de SABER. Anulas tanto Daño como el resultado de esta prueba.",
            ENdescripcion:"Spell - Spell. Once per round, if you, another researcher or an Ally are going to suffer Damage (no matter what space the affected person is in), you can do a SABER test. You nullify both Damage and the result of this test.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgnes2.jpg")
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Tormenta de espíritus",
            ENnombre: "Spirit storm",
            descripcion:"Hechizo - Ensalmo. Puedes hacer una prueba de SABER en vez de FUERZA cuando estés realizando una acción de ataque. (El modificador de ataque del Monstruo sigue aplicándose.)",
            ENdescripcion:"Spell - Spell. You can do a SABER test instead of FORCE when you are performing an attack action. (Monster Attack Modifier still applies.)",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgnes3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/8-Agnes.jpg"),
          HistoriaYT: "Cx4GNKVIWHQ",
          expansion: "Base"
        },
        {nombrePJ: "Michael McGlen",
          idPersonaje: 9,
          posicion: "Mafioso",
          ENposicion: "Gangster",
          vida: 8,
          cordura: 4,
          saber: 2,
          influencia: 3,
          observacion: 1,
          fuerza: 4,
          voluntad: 3,
          restos: 0,
          pistas: 0,
          dinero: 3,
          limConcentracion: 1,
          ENlimConcentracion: 1,
          efecto1: "Sed de venganza -- Después de que derrotes a un Monstruo con una acción de ataque, recuperas un punto de Cordura o bien te concentras en una habilidad de tu elección.",
          ENefecto1: "Thirst for Vengeance -- After you defeat a Monster with an attack action, you either regain a point of Sanity or concentrate on an ability of your choice.",
          efecto2: null,
          frase: "“Esto es por Louie”",
          ENfrase: "“This is for Louie”",
          historia: "Michael McGlen era un hombre de pocas palabras. Tampoco tenía que decir mucho: para eso estaba Louie 'el Rápido'. Los dos eran los mejores soldados de los O´Bannion, y se aseguraban de que la banda fuese respetada en todo Arkham... hasta la noche en que aquella cosa emergió del río y se llevó a rastras a Louie del muelle para despedazarlo bajo el agua. Michael creyó que sus jefes lo tacharían de pirado en cuanto les contase lo sucedido, pero lo que pasó fué aún peor: dijeron que le creían y que lo mejor era olvidarse del tema. Pero Michael no puede dejar impune la muerte de su socio, ni tampoco olvidar a los seres que lo hicieron pedazos. Sigue siendo hombre de pocas palabras; ahora prefiere que su metralleta hable por él.",
          ENhistoria: "Michael McGlen was a man of few words. He didn’t have to say much either: that’s what Louie 'the Fast' was for. They were both the O Bannion’s best soldiers, And they made sure that the gang was respected all over Arkham... until the night that thing emerged from the river and dragged Louie off the pier to rip him apart under the water. Michael thought his bosses would call him crazy as soon as he told them, but what happened was even worse: they said they believed him and that the best thing was to forget about it. But Michael cannot let his partner’s death go unpunished, nor can he forget the beings who tore him apart. He is still a man of few words; Now he prefers his machine gun to speak for him.",
          arquetipos: {
            tituloArquetipo1:"Experto",
            ENtituloArquetipo1:"Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Michael emplea todo su talento para eliminar sin piedad a las grotescas criaturas que amenazan a Arkham.",
            ENdescripcionArquetipo1: "You possess an exclusive set of skills that allow you to specialize in a specific task. Michael uses all his talent to mercilessly eliminate the grotesque creatures that threaten Arkham.",
            tituloArquetipo2: "Defensor",
            ENtituloArquetipo2:"Defender",
            descripcionArquetipo2: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo2: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Metralleta de tambor",
            ENnombre: "Drum machine gun",
            descripcion:"Objeto - Común Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque.",
            ENdescripcion:"Object - Common Weapon. You receive +4 FORCE when performing an attack action.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMichael1.jpg")
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Automóvil de gángster",
            ENnombre: "Gangster car",
            descripcion:"Objeto - Vehículo. Después de que realices una acción de movimiento, puedes infligir dos puntos de Daño a un Monstruo que esté enfrentado a ti y otros dos puntos de Daño a esta carta.",
            ENdescripcion:"Object - Vehicle. After you perform a move action, you can deal two Damage points to a Monster facing you and two other Damage points to this card.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMichael2.jpg")
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Secuaz de O'Bannion",
            ENnombre: "O'Bannion’s henchman",
            descripcion:"Talento - Empleo. Después de que realices una acción de conseguir fondos, puedes hacer una prueba de FUERZA. Si la superas, ganas 2$.",
            ENdescripcion:"Talento - Empleo. Después de que realices una acción de conseguir fondos, puedes hacer una prueba de FUERZA. Si la superas, ganas 2$.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMichael3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/9-Michael.jpg"),
          expansion: "Base"
        },
        {nombrePJ: "Daniela Reyes",
          idPersonaje: 10,
          posicion: "Mecánica",
          ENposicion: "Mechanical",
          vida: 7,
          cordura: 5,
          saber: 3,
          influencia: 3,
          observacion: 1,
          fuerza: 3,
          voluntad: 3,
          restos: 0,
          pistas: 0,
          dinero: 3,
          limConcentracion: 3,
          ENlimConcentracion: 3,
          efecto1:"Pasión por el trabajo -- Después de que realices una acción de conseguir fondos, puedes concentrarte en una habilidad de tu elección",
          ENefecto1:"Passion for work -- After you do a fundraising action, you can focus on a skill of your choice",
          efecto2: null,
          frase: "“Si necesitas un trabajo bien hecho, acude a mí”",
          ENfrase: "“If you need a job well done, come to me”",
          historia: "Haciendo balance de su vida, Daniela podía darse por satisfecha: tenía una familia efusiva a la que adoraba, nunca le faltaba trabajo y siempre disponía de suficiente dinero para permitirse sus dos grandes pasiones (motocicletas y chicas guapas) incluso después de poner un plato en su mesa. Anque no todo era de color de rosa; por un lado, estaba su madre la santera, que no dejaba de augurarle un futuro sombrio sino se andaba con ojo. Por el otro su hermano Ramón, que se metía en líos constantemente. Y ahora Ramón volvía a tener problemas. El talismán de protección contra el mal que le regaló para complacer a su madre estaba hecho pedazos, y Daniela era la única que podía solucionarlo todo. Como de costumbre.",
          ENhistoria: "Taking stock of her life, Daniela could be satisfied: she had an effusive family she adored, she never lacked work and always had enough money to afford her two great passions (motorcycles and beautiful girls) even after putting a plate on your table. But not everything was rosy; on the one hand, there was his mother, the santera, who did not stop promising him a bleak future but kept an eye on him. On the other hand his brother Ramón, who was constantly getting into trouble. And now Ramón was in trouble again. The talisman of protection against evil she gave her to please her mother was in pieces, and Daniela was the only one who could solve everything. As usual.",
          arquetipos: {
            tituloArquetipo1:"Experto",
            ENtituloArquetipo1:"Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Michael emplea todo su talento para eliminar sin piedad a las grotescas criaturas que amenazan a Arkham.",
            ENdescripcionArquetipo1: "You possess an exclusive set of skills that allow you to specialize in a specific task. Michael uses all his talent to mercilessly eliminate the grotesque creatures that threaten Arkham.",
            tituloArquetipo2:"Superviviente",
            ENtituloArquetipo2:"Survivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory."
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Gabriel",
            ENnombre: "Gabriel",
            descripcion:"Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte 1 espacio adicional.",
            ENdescripcion:"Object - Vehicle. Instead of performing a normal motion action, you move a maximum of 3 spaces and can spend $1 to move 1 additional space.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDaniela2.jpg")
          },  
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "As de espadas",
            ENnombre: "Ace of spades",
            descripcion:"Objeto - Extraordinario. Cuando gastes una ficha de Concentración para volver a tirar un dado, puedes recuperar un punto de Cordura.",
            ENdescripcion:"Item - Extraordinary. When you spend a Concentration tab to re-roll a die, you can recover a Sanity point.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDaniela3.jpg")
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Llave inglesa",
            ENnombre: "Wrench",
            descripcion:"Objeto - Común. Recibes +1 de FUERZA cuando estés realizando una acción de ataque. Si tienes una Mano libre, en vez de eso recibes +3.",
            ENdescripcion:"Item - Common. You receive +1 FORCE when you are performing an attack action. If you have a free Hand, you receive +3 instead.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDaniela1.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/10-Daniela.jpg"),
          expansion: "Base"
        },
        {nombrePJ: "Norman Withers",
          idPersonaje: 11,
          posicion: "Astrónomo",
          ENposicion: "Astronomer",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 1,
          observacion: 3,
          fuerza: 2,
          voluntad: 4,
          restos: 0,
          pistas: 0,
          dinero: 1,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "Escrito en las estrellas -- Después que quites al menos dos fichas de Perdición de tu espacio, puedes sufrir un punto de horror para revelar una Pista(colócala sobre la hoja de Escenario)",
          ENefecto1: "Written in the stars -- After you remove at least two Doom tiles from your space, you may suffer a point of horror to reveal a Clue (place it on the Scenario sheet)",
          efecto2: null,
          frase: "“Decir que  algo es imposible no lo hace menos cierto. La verdad es indiferente a la opinión que uno tenga.”",
          ENfrase: '"To say that something is impossible makes it no less true. Truth is indifferent to one’s opinion."',
          historia: "Norman Withers era científico, un hombre racional consagrado a la exploración lógica del universo. Por eso, cuando su investigación reveló que el universo estaba próximo a su fin, contrastó sus resultados y estudió la situación desde la calma y el raciocinio. No cabía error posible: seis estrellas se habían desvanecido sin dejar rastro, y en su lugar algo imposible surcaba el vacío. Aunque la comunidad científica rechazó sus conclusiones tachandolas de los desvaríos de un lunático, Norman prosiguió con sus estudios, abordando el problema con la racionalidad que le caracterizaba. ¿Qué importaba que su investigación se centrase en conocimientos arcaicos largo tiempo olvidado, o incluso en la magia? No por ello era menos racional.",
          ENhistoria: "Norman Withers was a scientist, a rational man devoted to the logical exploration of the universe. So when his research revealed that the universe was near its end, he contrasted his results and studied the situation from the standpoint of calm and reasoning. There was no mistake: six stars had vanished without a trace, and in their place something impossible ran through the void. Although the scientific community rejected his conclusions by dismissing them from the ravings of a lunatic, Norman continued his studies, addressing the problem with the rationality that characterized him. What did it matter that his research focused on long-forgotten archaic knowledge, or even magic? It was no less rational.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1:"Seeker",
            descripcionArquetipo1: "Eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
            tituloArquetipo2: "Mistico",
            ENtituloArquetipo2:"Mystic",
            descripcionArquetipo2: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo2: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives.",
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "Encontrar portal",
            ENnombre: "Find a portal",
            descripcion:"Hechizo - Ritual. Acción: Haz una prueba de SABER. Si la superas, muévete a un espacio de tu elección en el que haya al menos una ficha de Perdición.",
            ENdescripcion:"Spell - Ritual. Action: Take a SABER test. If you pass it, move to a space of your choice where there is at least one Doom token.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerNorman1.jpg")
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Recuerdo preciado",
            ENnombre: "Treasured memory",
            descripcion:"Objeto - Extraordinario. Después de que ganes una Pista, quita dos fichas de Horror de esta carta.",
            ENdescripcion:"Item - Extraordinary. After you win a Hint, remove two Horror tokens from this card.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerNorman2.jpg")
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Tratado de astronomía",
            ENnombre: "Astronomical treatise",
            descripcion:"Objeto - Extraordinario Tomo. Una vez por ronda, cuando estés resolviendo una prueba, puedes volver a tirar tantos dados coo el número de fichas de Perdición que haya en tu espacio (puedes tirar menos si lo prefieres.)",
            ENdescripcion:"Object - Extraordinary Tome. Once per round, when you are solving a test, you can re-roll as many dice as the number of Doom chips in your space (you can shoot less if you prefer.)",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerNorman3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/11-Norman.jpg"),
          expansion: "Base"
        },
        {nombrePJ: "Minh Thi Phan",
          idPersonaje: 12,
          posicion: "Secretaria",
          ENposicion: "Secretary",
          vida: 6,
          cordura: 6,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 2,
          restos: 0,
          pistas: 0,
          dinero: 3,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "Pendiente de todo -- una vez por ronda, al resolver una prueba, tú u otro investigador que esté en tu espacio podéis volver a tirar tantos dados como el número de Pistas que haya en vuestro Barrio (podeis tirar menos si queréis).",
          ENefecto1: "Pending everything -- once per round, when you solve a test, you or another researcher who is in your space can throw as many dice as the number of tracks in your neighborhood (you can throw less if you want).",
          efecto2: null,
          frase: "“Estoy convencida de que podemos hallar una solución si cooperamos.”",
          ENfrase: "“I am convinced that we can find a solution if we cooperate.”",
          historia: "Minh nació en el seno de una familia vietnamita afincada en Corea que posteriormente se mudó a EEUU. Su don para los idiomas y sus excepcionales calificaciones le procuraron trabajo en una empresa de Arkham, y Minh encantada con su nuevo jefe, el Sr Thomas, buen hombre y mejor amigo. Hasta que Thomas adquirió un ejemplar de la blasfema obra El Rey de Amarillo. Su lectura lo volvió huraño e irascible. La conminó a leerla, pero a ella le resultó demasiado perturbadora. Y luego el Sr Thomas se quitó la vida. Minh está convencida de que, si consigue desentrañar el secreto de la obra maldita, podrá evitar que los otros sufran el mismo destino que su infortunado jefe.",
          ENhistoria: "Minh was born into a Vietnamese family living in Korea who later moved to the US. Her gift for languages and her exceptional qualifications gave her a job at an Arkham company, and Minh delighted with her new boss, Mr Thomas, a good man and best friend. Until Thomas acquired a copy of the blasphemous work The King of Yellow. His reading made him sullen and irascible. He urged her to read it, but it was too disturbing for her. And then Mr Thomas took his own life. Minh is convinced that if she manages to unravel the secret of the cursed work, she will be able to prevent others from suffering the same fate as her unfortunate boss.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1:"Seeker",
            descripcionArquetipo1: "Eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
            tituloArquetipo2:"Superviviente",
            ENtituloArquetipo2:"Survivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory."
          },
          Pertenencia1: {
            urlFoto: "",
            nombre: "El rey de amarillo",
            ENnombre: "The king of yellow",
            descripcion:"Una vez por ronda, después de que sufras al menos un punto de Horror, puedes revelar una Pista(se coloca sobre la hoja de escenario).",
            ENdescripcion:"Once per round, after you suffer at least one Horror point, you can reveal a Hint (placed on the stage sheet).",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMinh2.jpg")
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Mente analítica",
            ENnombre: "Analytical mind",
            descripcion:"Tiras un dado adicional cuando estés resolviendo una prueba de SABER o de OBSERVACIÓN si has igualado o excedido tu límite de concentración.",
            ENdescripcion:"You roll an additional die when you are solving a KNOWING or OBSERVATION test if you have matched or exceeded your concentration limit.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMinh1.jpg")
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Sinergia",
            ENnombre: "Synergy",
            descripcion:"Talento - Innato. Tu límite de concentración aumenta en un punto. Los demás investigadores que estén en tu espacio reciben un +1 para todas las habilidades en las que tú estés concentrada.",
            ENdescripcion:"Talent - Innate. Your concentration limit increases by one point. Other researchers in your space receive a +1 for all skills you are focused on.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMinh3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/12-Minh.jpg"),
          expansion: "Base"
        },
      ],
      PersonajesMareasTenebrosas: [
        {nombrePJ: "Silas Marsh",
        idPersonaje: 13,
        posicion: "Marinero",
        ENposicion: "Sailor",
        vida: 8,
        cordura: 4,
        saber: 1,
        influencia: 3,
        observacion: 3,
        fuerza: 3,
        voluntad: 3,
        dinero: 3,
        restos: 0,
        pistas: 0,
        limConcentracion: 2,
        ENlimConcentracion: 2 ,
        efecto1: "Sangre contaminada - Una vez por ronda, cuando se active un Monstruo preparado, puedes designar a cualquier investigador como su presa. Si ese Monstruo se enfrenta a ti, puedes recuperar dos puntos de Cordura.",
        ENefecto1: "Contaminated Blood - Once per round, when a prepared Monster is activated, you can designate any researcher as its prey. If that Monster faces you, you can regain two points of Sanity.",
        efecto2: null,
        ENefecto2: null ,
        frase: '“He navegado por los siete mares, pero algo siempre acaba atrayéndome a este lugar.”',
        ENfrase: '"I have sailed the seven seas, but something always ends up drawing me to this place."',
        historia: "Silas se sentía atraído por el mar. A los catorce años respondió a su llamada y abandonó su pueblo natal, Innsmouth, para enrolarse en un buque mercante. Emprendió su nueva vida desenvolviéndose como pez en el agua, pues tenía un talento innato para la náutica, y juró que nunca regresaría. Lo cierto es que estaba ansioso por marcharse de aquel pueblo decrépito y corrupto, donde se le conocía por su parentesco lejano con la vieja familia Marsh que había sumido al pueblo en la decadencia. Silas se hallaba en una taberna del pueblo de Singapur cuando recibió la noticia del fallecimiento de sus padres. Ni siquiera volvió para asistir al funeral; se convenció a sí mismo de que era lo mejor. Se alegraba de haber dejado atrás aquel terrible lugar. Pero ahora sueña a menudo con su difunta madre, y así como el mar le atraía cuando era joven, algo en Innsmouth le había impulsado a volver.",
        ENhistoria: "Silas was drawn to the sea. At the age of fourteen he answered his call and left his hometown of Innsmouth to join a merchant ship. He began his new life as a fish in the water, because he had an innate talent for sailing, and swore that he would never return. The truth is that he was eager to leave that decrepit and corrupt town, where he was known for his distant kinship with the old Marsh family that had plunged the people into decay. Silas was in a tavern in the village of Singapore when he received news of the death of his parents. He didn’t even come back to attend the funeral; he convinced himself it was for the best. He was glad to have left that terrible place behind. But now he often dreams of his late mother, and just as the sea attracted him when he was young, something in Innsmouth had prompted him to return.",
        arquetipos: {
            tituloArquetipo1: "Superviviente",
            ENtituloArquetipo1:"Survivor",
            descripcionArquetipo1: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo1: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
            tituloArquetipo2:"Experto",
            ENtituloArquetipo2:"Expert",
            descripcionArquetipo2: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
            ENdescripcionArquetipo2: "You possess an exclusive set of skills that allow you to specialize in a specific task. Silas' lineage shares a sinister kinship with certain creatures of the Mythos, which gives you the unusual ability to predict and control the movements of the Monsters that threaten you."
        },
        Pertenencia1:{
            urlFoto: "",
            nombre: "Red de pesca",
            ENnombre: "Fishing net",
            descripcion:"Objeto - Común Vinculable. Durante tu turno, puedes vincular este Objeto a un monstruo no épico que esté en tu espacio para agotar a este Monstruo. Vínculo: este Monstruo no puede prepararse. Después de que derrotes a este Monstruo ganas el Objeto que tiene vinculado.",
            ENdescripcion:"Item - Linkable Common. During your turn, you can link this Item to a non-epic monster in your space to exhaust this Monster. Link: This Monster cannot prepare. After you defeat this Monster you win the Item it has linked.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerSilas1.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Camisa de franela",
            ENnombre: "Flannel shirt",
            descripcion:"Objeto - Común Extraordinario. Una vez por turno, cuando un investigador situado en tu espacio resuelve una prueba, puedes infligir un punto de Daño a este Objeto para añadir dos Éxitos al resultado de su prueba.",
            ENdescripcion:"Object - Extraordinary Common. Once per turn, when a researcher in your space solves a test, you can inflict a Damage point on this Object to add two Hits to its test result.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerSilas2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Espíritu aventurero",
            ENnombre: "Adventurous spirit",
            descripcion:"Talento - Innato. Durante la fase de Encuentros, todas tus habilidades se incrementan en un punto.",
            ENdescripcion:"Talent - Innate. During the Encounters phase, all your abilities increase by one point.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerSilas3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/13-Silas.jpg"),
          expansion: null
        },
        {nombrePJ: "Charlie Kane",
        idPersonaje: 14,
        posicion: "Político",
        ENposicion: "Political",
        vida: 4,
        cordura: 8,
        saber: 2,
        influencia: 4,
        observacion: 3,
        fuerza: 2,
        voluntad: 2,
        dinero: 2,
        restos: 0,
        pistas: 0,
        limConcentracion: "Tu límite es igual al número de Aliados que tengas.",
        ENlimConcentracion: "Your limit is equal to the number of Allies you have." ,
        efecto1: "Comisión de expertos - ACCIÓN: gasta 2$, más 1$ adicional por cada aliado que tengas, para ganar un Aliado.",
        ENefecto1: "Expert Commission - ACTION: Spend $2, plus an additional $1 for each ally you have, to earn an Ally.",
        efecto2: "Liderazgo - Cada vez que descarten a uno de tus Aliados, sufres un punto de Horror directo.",
        ENefecto2: "Leadership - Each time you discard one of your Allies, you suffer a point of direct Horror.",
        frase: '“Confíen en mí, y confíen en Arkham.”',
        ENfrase: '"Trust me, and trust Arkham."',
        historia: "Prestar servicio a una comunidad tan peculiar como la de Arkham requiere malabares, pero el alcalde Charlie Kane ha maniobrado hábilmente para establecer contactos y alianzas entre las fuerzas vivas de la ciudad: la Universidad y la Sociedad Histórica, la Orden del Crepúsculo de Plata y los gitanos de la plaza de la Independencia, incluso entre las fuerzas de la ley y el crimen organizado. El pequeño diario encuadernado en cuero que Charlie recibió de su predecesor advertía contra amenazas antiguas y criaturas inefables que solamente podían mantenerse a raya con una vigilancia constante. El diario le sugería que algo colosal acechaba en los confines de este mundo, y aquella visión no dejaba lugar a dudas. Las estrellas son propicias. Ese algo se está acercando.",
	      ENhistoria: "Serving a community as peculiar as Arkham requires juggling, but Mayor Charlie Kane has cleverly maneuvered to establish contacts and alliances between the city’s living forces: the University and the Historical Society, the Silver Twilight Order and the Gypsies of Independence Square, even between law enforcement and organized crime. The small leather-bound diary that Charlie received from his predecessor warned against ancient threats and ineffable creatures that could only be kept at bay with constant vigilance. The diary suggested that something colossal lurked at the ends of this world, and that vision left no doubt. The stars are propitious. That something is coming.",
        arquetipos: {
            tituloArquetipo1: "Experto",
            ENtituloArquetipo1:"Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Charlie tiene don de gentes. Puedes valerte de su labia para sortear la mayoría de los obstáculos, y siempre dispones de una ayudante solícita.",
            ENdescripcionArquetipo1: "You have an exclusive set of skills that allow you to specialize in a specific task. Charlie has a talent for people. You can use his speech to overcome most obstacles, and you always have a helpful assistant.",
            tituloArquetipo2:"Buscador",
            ENtituloArquetipo2:"Seeker",
            descripcionArquetipo2: "Eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo2: "You are a fearless hound. You should concentrate on getting Clues and discovering their meaning. Your work is essential to thwarting the evil designs of the First Ones."
        },
        Pertenencia1:{
            urlFoto: "",
            nombre: "Figura de autoridad",
            ENnombre: "Authority figure",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba utilizando una habilidad en la que te hayas concentrado, puedes hacer una tirada de INFLUENCIA en lugar de la habilidad requerida. (Los modificadores originales se siguen aplicando).",
            ENdescripcion:"Talent - Innate. Once per round, when you are solving a test using a skill that you have focused on, you can make a spin of INFLUENCE instead of the required skill. (The original modifiers are still applied).",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCharlie1.jpg")
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Bonnie Walsh",
          ENnombre: "Bonnie Walsh",
          descripcion:"Aliada - Fiel ayudante. Una vez por ronda, antes de que resuelvas una prueba, puedes concentrarte en una habilidad de tu elección.",
          ENdescripcion:"Ally - Faithful helper. Once per round, before you solve a test, you can focus on an ability of your choice.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCharlie2.jpg")
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Cobrar favores",
          ENnombre: "Call in favors",
          descripcion:"Talento - Empleo. Al comienzo de tu turno, descarta todo el Dinero que haya sobre esta carta y haz una prueba de INFLUENCIA. Por cada Éxito que obtengas, coloca 1$ sobre esta carta. Puedes gastar el Dinero que haya sobre esta carta. (No puedes intercambiarlo).",
          ENdescripcion:"Talent - Employment. At the beginning of your turn, discard all Money on this card and take an INFLUENCE test. For every Success you get, place $1 on this card. You can spend the Money on this card. (You cannot exchange it).",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCharlie3.jpg")
          },
        fotoUrl: require("@/assets/img/1-Personajes/14-Charlie.jpg"),
        },
        {nombrePJ: "Stella Clark",
        idPersonaje: 15,
        posicion: "Cartera",
        ENposicion: "Portfolio",
        vida: 5,
        cordura: 7,
        saber: 3,
        influencia: 2,
        observacion: 3,
        fuerza: 2,
        voluntad: 3,
        dinero: 3,
        restos: 0,
        pistas: 0,
        limConcentracion: 2,
        ENlimConcentracion: 2 ,
        efecto1: "En plena faena - Al comienzo de tu primera fase de Acción de la partida, puedes moverte directamente a cualquier espacio.",
        ENefecto1: "At work - At the beginning of your first Action phase of the game, you can move directly to any space.",
        efecto2: "Ruta de reparto - Después de moverte al menos tres espacios en una sola ronda, concéntrate en una habilidad de tu elección.",
        ENefecto2: "Deal Path - After moving at least three spaces in a single round, focus on a skill of your choice." ,
        frase: '“Yo sé lo que es real, y no tengo tiempo para esto.”',
        ENfrase: '"I know what’s real, and I don’t have time for this."',
        historia: "Antes de empezar a trabajar para el servicio de correos de Arkham, Stella ya tenía dos cosas claras. En primer lugar, que sus padres había cometido un error al tratarla como a un niño y ponerle nombre de varón. En segundo lugar, que aquella casa en la cima del peñón que dominaba Kingsport le susurraba por la noches, llamándola por su verdadero nombre, el nombre que ella misma había escogido ´Stella´. Repartir el correo seis días a la semana hiciera el tiempo que hiciera no era un trabajo sencillo, pero stella estaba encantada porque sabía que ayudaba a mantener el contacto entre las personas. Hasta que empezó a encontrarse las cartas. Cuando terminaba el reparto, siempre le sobraba una carta. Siempre dirigida a ella. Siempre con matasellos de Kingsport. Y siempre contenía una sola palabra manuscrita con esmero: ´Stella´.",
        ENhistoria: "Before she started working for the Arkham post office, Stella had two things straight. First, that her parents had made a mistake in treating her like a child and naming her as a boy. Secondly, that house on the top of the rock overlooking Kingsport whispered to her at night, calling her by her real name, the name she herself had chosen Stella. Delivering mail six days a week whatever time I did was not an easy job, but Stella was delighted because she knew it helped keep people in touch. Until the letters began to be found. When the deal was over, he always had a spare letter. Always addressed to her. It was always postmarked Kingsport. And it always contained a single handwritten word with care:  Stella.",

        arquetipos: {
            tituloArquetipo1: "Superviviente",
            ENtituloArquetipo1:"Survivor",
            descripcionArquetipo1: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo1: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null
        },
        Pertenencia1:{
          urlFoto: "",
          nombre: "Furgoneta de reparto",
          ENnombre: "Delivery van",
          descripcion:"Objeto - Común Vehículo. Cada vez que salgas de un espacio, todo investigador situado en ese espacio que no esté enfrentado para moverse contigo. Acción: muévete un máximo de dos espacios. Puedes realizar una acción de intercambio antes o después de este movimiento como acción adicional.",
          ENdescripcion:"Object - Common Vehicle. Every time you leave a space, any researcher located in that space that is not faced to move with you. Action: Move up to two spaces. You can perform an exchange action before or after this move as an additional action.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerStella1.jpg")
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Llamada de las tinieblas",
          ENnombre: "Call of the darkness",
          descripcion:"Cuando vayas a robar una ficha de Mitos, en vez de eso puedes sufrir un punto de Horror directo y colocar una ficha de Perdición en tu espacio.",
          ENdescripcion:"When you go to steal a Myths tab, instead you can suffer a direct Horror point and place a Doom tab in your space.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerStella2.jpg")
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Llueva o truene",
          ENnombre: "Rain or shine",
          descripcion:"Talento - Innato. Una vez por turno, cuando vayas a fallar una prueba, puedes descartar una ficha de Concentración de VOLUNTAD para añadir un Éxito al resultado de tu prueba.",
          ENdescripcion:"Talent - Innate. Once per turn, when you are going to fail a test, you can discard a WILL Concentration tab to add a Success to your test result.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerStella3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/15-Stella.jpg"),
        },
        {nombrePJ: "Zoey Samaras",
        idPersonaje: 16,
        posicion: "Cocinera",
        ENposicion: "Chef",
        vida: 5,
        cordura: 7,
        saber: 3,
        influencia: 2,
        observacion: 1,
        fuerza: 3,
        voluntad: 4,
        dinero: 3,
        restos: 0,
        pistas: 0,
        limConcentracion: 2,
        ENlimConcentracion: 2 ,
        efecto1: "Por la gracia de san Jorge - Después de que derrotes a un Monstruo, puedes quitar una ficha de Perdición de tu espacio o bien recuperar un punto de vida.",
        ENefecto1: "By George’s Grace - After you defeat a Monster, you can remove a Doom token from your space or regain a point of life.",
        efecto2: "Sentir la llamada - Después de que derrotes a un Monstruo que tenga la palabra clave Élite, ganas una Bendición.",
        ENefecto2: "Feel the call - After you defeat a Monster with the keyword Elite, you gain a Blessing." ,
        frase: '“Por fin sé cuál es mi cometido.”',
        ENfrase: '"I finally know what my job is."',
        historia: "Zoey Samaras procuraba que sus cuchillos siempre estuviesen afilados. Al principio lo hacía por costumbre, un hábito inculcado tras pasar años como pinche de los mejores chefs del mundo. Ellos le enseñaron que las herramientas del cocinero eran sus cuchillos y los fogones que transforman lo sencillo en algo divino, algo trascendental. Una noche sintió como un impulso, como una voz en su cabeza que le dijo que tomase un camino diferente para volver a casa. y entonces se le cayó la venda de los ojos cuando vió a unos seres horribles de dientes afilados y ensangrentados que devoraban a un hombre en un callejón. la voz de su cabeza, la voz del mismísimo Dios, la apremió a purgar el mundo de su maligna voracidad, y con ello a purgar los horrores que acechaban entre las sombras. Sus herramientas le sirvieron bien.",
        ENhistoria: "Zoey Samaras made sure his knives were always sharp. At first he did it out of habit, a habit instilled after spending years as a pinche of the best chefs in the world. They taught him that the tools of the cook were his knives and the stoves that transform the simple into something divine, something transcendental. One night he felt like an impulse, like a voice in his head telling him to take a different path home. And then he dropped the blindfold when he saw some horrible beings with sharp, bloody teeth devouring a man in an alley. the voice of her head, the voice of God himself, urged her to purge the world of her evil voracity, and thereby to purge the horrors lurking in the shadows. His tools served him well.",
        arquetipos: {
            tituloArquetipo1: "Defensor",
            ENtituloArquetipo1:"Defender",
            descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarlos a recuperarse de daños físicos o mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo1: "Your responsibility is to protect your fellow researchers. This could mean helping them recover from physical or mental damage, or dispatching Monsters before they become a threat.",
            tituloArquetipo2:"Mistico",
            ENtituloArquetipo2:"Mystic",
            descripcionArquetipo2: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo2: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You are the best defensive option against the Primitives."
        },
        Pertenencia1:{
          urlFoto: "",
          nombre: "Cuchillo de cocina",
          ENnombre: "Kitchen knife",
          descripcion:"Objeto - Común Arma. Recibes +2 de FUERZA como parte de una acción de ataque. Después de que vuelvas a tirar un dado al resolver una prueba, añade un punto al resultado al resultado de ese dado.",
          ENdescripcion:"Object - Common Weapon. You receive +2 FORCE as part of an attack action. After you roll a die again when solving a test, add a point to the result of that die.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerZoey1.jpg")
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Arma encantada",
          ENnombre: "Enchanted weapon",
          descripcion:"Hechizo - Ritual Vinculable. Al comienzo de tu turno, puedes hacer una prueba de SABER. Si la superas, vincula esta carta a un Arma situada en tu espacio. Vínculo: Una vez por ronda, cuando estés realizando una acción de ataque, puedes volver a tirar un dado o todos los dados.",
          ENdescripcion:"Spell - Binding Ritual. At the beginning of your turn, you can take a KNOW test. If you overcome it, link this card to a Weapon in your space. Link: Once per round, when you are performing an attack action, you can re-roll a dice or all dice.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerZoey2.jpg")
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "El crucifijo de Zoey",
          ENnombre: "The crucifix of Zoey",
          descripcion:"Objeto - Extraordinario. Después de que te enfrentes a un Monstruo, puedes infligir un punto de Daño a este Objeto para hacer una prueba de VOLUNTAD. Infringe a este Monstruo tanto Daño como el resultado de esta prueba.",
          ENdescripcion:"Object - Extraordinary. After you face a Monster, you can inflict a Damage point on this Object to test WILL. Infringe on this Monster both Damage and the result of this test.",
          fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerZoey3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/16-Zoey.jpg"),
        },
        {nombrePJ: "Padre Mateo",
          idPersonaje: 17,
          posicion: "Sacerdote",
          ENposicion: "Priest",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 1,
          fuerza: 2,
          voluntad: 4,
          dinero: 2,
          restos: 1,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3 ,
          efecto1: "La sangre de los mártiles - después de que sufras al menos un punto de Daño, ganas una ficha de Restos.",
          ENefecto1: "The blood of the Marbles - after you suffer at least one Damage point, you gain a Remains tab.",
          efecto2: "Memento mori - Una vez por ronda, cuando estés resolviendo una prueba, puedes gastar una ficha de Restos para volver a lanzar uno de tus dados o todos ellos.",
          ENefecto2: "Memento mori - Once per round, when you are solving a test, you can spend a Remains tab to re-roll one or all of your dice." ,
          frase:"“Et ne nos inducas in tentationem: sed libera nos a malo.”",
          ENfrase: '“Et ne nos inducas in tentationem: sed libera nos a malo.”',
          historia: "Cuando era joven, el Padre Mateo Castile encontraba consuelo en la convicción de vivir en un mundo justo, al amparo de un Dios bueno y misericordioso. Aunque las cosas que vió antes de la abandonar la misión le causaron una profunda impresión, se aferró a la idea de que toda aquella locura, las espantosas criaturas que hostigaban a los lugareños y la grotesca estatua que halló en aquella cueva no eran sinó amenazas mundanas, pero no podía evitar que la duda le corroyese: si semejantes demonios eran reales, ¿Porqué las oraciones de Mateo nunca recibían respuesta? En algún lugar de este universo frío y despiadado, infestado de demonios, monstruos y fuerzas aún más terribles, debía de manifestarse la verdadera gracia de Diós. Mateo se propuso buscar de nuevo Su luz. Tenía que hacerlo.",
          ENhistoria: "When he was young, Father Matthew Castile found comfort in the conviction of living in a just world, under the protection of a good and merciful God. Although the things he saw before leaving the mission made a deep impression on him, he clung to the idea that all that madness, the dreadful creatures that harassed the locals and the grotesque statue he found in that cave were not worldly threats, but he could not prevent doubt from gnawing at him: if such demons were real, why were Matthew’s prayers never answered? Somewhere in this cold and merciless universe, infested with even more terrible demons, monsters and forces, the true grace of God was to manifest. Matthew set out to seek His light again. He had to.",
          arquetipos: {
            tituloArquetipo1:"Mistico",
            ENtituloArquetipo1:"Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You are the best defensive option against the Primitives.",
            tituloArquetipo2: "Defensor",
            ENtituloArquetipo2:"Defender",
            descripcionArquetipo2: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarlos a recuperarse de daños físicos o mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo2: "Your responsibility is to protect your fellow researchers. This could mean helping them recover from physical or mental damage, or dispatching Monsters before they become a threat.",
        },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Señal de la cruz",
            ENnombre: "Sign of the cross",
            descripcion:"Talento - Innato. Encuentro: haz una prueba de VOLUNTAD -1. Por cada Éxito que obtengas, un investigador de tu elección situado en cualquier espacio descarta un Estado, recupera un punto de Vida o recupera un punto de Cordura.",
            ENdescripcion:"Talent - Innate. Encounter: make a test of WILL -1. For every Success you achieve, a researcher of your choice located in any space discards a State, retrieves a Life point or retrieves a Sanity point.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPadre1.jpg")
          },
          Pertenencia2: {
            urlFoto: "",
            nombre: "Una ficha de restos",
            ENnombre: "A scrap sheet",
            descripcion:"",
            ENdescripcion: "",
            fotoCartaPertenenciaURL: null
          },
          Pertenencia3: {
            urlFoto: "",
            nombre: "Agua bendita",
            ENnombre: "Holy water",
            descripcion:"Objeto - Extraordinario. Puedes tratar los modificadores de ataque y evasión de los Monstruos no Humanos que haya en tu espacio como si fueran +1. Después de que infrinjas Daño a un Monstruo no Humano durante una acción de ataque, agota a ese Monstruo.",
            ENdescripcion:"Item - Extraordinary. You can treat the attack and evasion modifiers of non-human monsters in your space as +1. After you damage a non-Human Monster during an attack action, exhaust that Monster.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPadre2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Alejar la oscuridad",
            ENnombre: "Drive away the darkness",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, antes de que se resuelva un efecto de Retribución, puedes hacer una prueba de SABER -1. Si la superas, ese efecto de Retribución no se resuelve en la actual fase de Mitos.",
            ENdescripcion:"Spell - Spell. Once per round, before a Retribution effect is resolved, you can do a SABER -1 test. If you overcome it, that Retribution effect is not resolved in the current Myths phase.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPadre3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/17-Padre.jpg"),
        },
        {nombrePJ: "Patricie Hathaway",
          idPersonaje: 18,
          posicion: "Violinista",
          ENposicion: "Violinist",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 2,
          observacion: 3,
          fuerza: 1,
          voluntad: 4,
          dinero: 3,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3 ,
          efecto1: "Con los ojos del Vigía - Cada vez que se coloque o mueva Perdición de la hoja de Escenario, puedes concentrarte en una habilidad de tu elección (incluso aunque al hacerlo sobrepases tu límite de Concentración).",
          ENefecto1: "With the Lookout’s Eyes - Every time Doom is placed or moved from the Scenario Sheet, you can focus on an ability of your choice (even if by doing so you exceed your Concentration limit).",
          efecto2: null,
          ENefecto2: null ,
          frase: "“Escuchad la música del universo.”",
          ENfrase: '"Listen to the music of the universe."',
          historia: "La música reconfortaba a Patricie Hathaway cuando era niña. Mientras sujetaba su violín bajo su mentón aseguraba experimentar visiones de mundos fantásticos y paisajes mágicos. Lo diagnosticaron como sinestesia, y sus tutores le explicaron que era capaz de ver la música de un modo que nadie podía; aquello la convertiría en un prodigio. Pero durante su adolescencia, una entidad que habitaba en el mundo mágico vislumbrado a través de su música le devolvió la mirada, y entonces todo cambió. Patricie sabía que todo cuanto percibía era real, y sus visiones se volvieron ominosas. El Vigía apenas se apartaba de ella. Acudía a su mente cuando tocaba, y a través de sus ojos ella veía el mundo en ruinas. ¿Sería ella quien provocase aquella catástrofe, o acaso el Vigía trataba de advertirla? Patricie tenía que averiguarlo.",
          ENhistoria: "The music comforted Patricie Hathaway as a child. While holding his violin under his chin, he was sure to experience visions of fantastic worlds and magical landscapes. He was diagnosed as synesthesia, and his tutors explained that he was able to see music in a way that no one could; that would make him a prodigy. But during his adolescence, an entity that lived in the magical world glimpsed through his music looked back at him, and then everything changed. Patricie knew that everything he perceived was real, and his visions became ominous. The Watcher barely left her. She came to her mind when she touched, and through her eyes she saw the world in ruins. Was it she who caused that catastrophe, or was the Watchman trying to warn her? Patricie had to find out.",
          arquetipos: {
            tituloArquetipo1:"Mistico",
            ENtituloArquetipo1:"Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You are the best defensive option against the Primitives.",
            tituloArquetipo2: "Buscador",
            ENtituloArquetipo2:"Seeker",
            descripcionArquetipo2: "Eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo2: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "El violín de Patricie",
            ENnombre: "The violin of Patricie",
            descripcion:"Objeto - Extraordinario. Después de que realices una acción de conseguir fondos, elige una habilidad. Todos los investigadores que estén en tu barrio pueden concentrarse en esta habilidad.",
            ENdescripcion:"Object - Extraordinary. After you perform a fundraising action, choose a skill. All researchers in your neighborhood can focus on this ability.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPatricie1.jpg")
          },
          Pertenencia2: {
            urlFoto: "",
            nombre: "Melodía cautivadora",
            ENnombre: "Captivating melody",
            descripcion:"Talento - Innato. Puedes realizar una acción de salvaguarda aunque estés enfrentado a un Monstruo. Como parte de una acción de salvaguarda, por cada Exito que obtengas, puedes agotar a un Monstruo situado en tu espacio en vez de quitar una ficha de perdición.",
            ENdescripcion:"Talent - Innate. You can perform a safeguard action even if you are facing a Monster. As part of a safeguard action, for every Success you get, you can exhaust a Monster located in your space instead of removing a doom tile.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPatricie2.jpg")
          } ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Melodía cautivadora",
            ENnombre: "Captivating melody",
            descripcion:"Talento - Innato. Puedes realizar una acción de salvaguarda aunque estés enfrentado a un Monstruo. Como parte de una acción de salvaguarda, por cada Exito que obtengas, puedes agotar a un Monstruo situado en tu espacio en vez de quitar una ficha de perdición.",
            ENdescripcion:"Talent - Innate. You can perform a safeguard action even if you are facing a Monster. As part of a safeguard action, for every Success you get, you can exhaust a Monster located in your space instead of removing a doom tile.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPatricie3.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Ganas Sueños ominosos, pero añades al Vigía al mazo de Monstruos.",
            ENnombre: "You win Ominous Dreams, but you add the Lookout to the deck of Monsters.",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba, puedes volver a lanzar un dado en el que hayas obtenido un éxito a cambio de revelar o hacer aparecer una pista. Si se descarta este Talento, devuelve el Vigía a la caja del juego.",
            ENdescripcion:"Talent - Innate. Once per round, when you are solving a test, you can re-roll a die in which you have obtained a success in exchange for revealing or making a clue appear. If this Talent is discarded, return the Lookout to the game box.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPatricie4.2.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/18-Patricie.jpg"),
        },
        {nombrePJ: "Carson Sinclair",
          idPersonaje: 19,
          posicion: "Mayordomo",
          ENposicion: "Butler",
          vida: 6,
          cordura: 6,
          saber: 2,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 3,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3 ,
          efecto1: "Imprescindible pero discreto - Una vez por ronda, mientras un investigador situado en cualquier espacio esté realizando una prueba, puedes gastar una ficha de Concentración para que pueda volver a tirar un dado. Si lo haces, recuperas un punto de Cordura.",
          ENefecto1: "Essential but discreet - Once per round, while a researcher located in any space is performing a test, you can spend a Concentration tab so that he can re-roll a die. If you do, you get a point of sanity back.",
          efecto2: null,
          ENefecto2: null ,
          frase: "“No dejaré que se enfrente a esto sin mi ayuda. No le fallaré como le fallé a él.”",
          ENfrase: '"I will not let you face this without my help. I will not fail you as I failed him."',
          historia: "Carson Sinclair ha trabajado al servicio de la familia Webb durante 3 generaciones, ocupándose de las tareas domésticas y proporcionando valiosos consejos. Hasta la intromisión de aquel forastero. Pese a las protestas de Carson, Dupuis inició a Hercule Webb, el señor de la casa, en perniciosas y arriesgadas prácticas ocultistas. Carson temía lo que pudiese suceder cuando los dos hombres se enclaustraban en el estudio durante días, enfrascados en la lectura de volúmenes arcanos y celebrando blasfemos rituales. Cuando el amo Webb desapareció durante una de esas ceremonias Carson juró que protegerá8 a sus descendientes, Lydia y Eugene, de la amenaza persistente de Dupuis, de sus perversos asociados y a la oscuridad a la que sirven.",
          ENhistoria: "Carson Sinclair has worked in the service of the Webb family for 3 generations, taking care of household chores and providing valuable advice. Even the intrusion of that stranger. Despite Carson’s protests, Dupuis initiated Hercule Webb, the lord of the house, into pernicious and risky occult practices. Carson feared what might happen when the two men were cloistered in the studio for days, engaged in reading arcane volumes and celebrating blasphemous rituals. When Master Webb disappeared during one of these ceremonies Carson swore he would protect his descendants, Lydia and Eugene, from the persistent threat of Dupuis, from his evil associates and the darkness they serve.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1:"Seeker",
            descripcionArquetipo1: "Eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
            tituloArquetipo2:"Superviviente",
            ENtituloArquetipo2:"Surbivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.", 
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Anticipación",
            ENnombre: "Anticipation",
            descripcion:"Talento - Innato. Después de que realices una acción de Concentración, puedes concentrarte en una habilidad adicional por cada Pista que haya en tu Barrio.",
            ENdescripcion:"Talent - Innate. After you perform a Concentration action, you can focus on an additional skill for each Track in your Neighborhood.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCarson1.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Como usted mande",
            ENnombre: "As you command",
            descripcion:"Talento - Innato. Una vez por ronda, después que otro investigador situado en cualquier espacio realice una acción, puedes gastar una ficha de concentración para realizar esa misma acción(Se aplican las restricciones normales a dicha acción).",
            ENdescripcion:"Talent - Innate. Once per round, after another researcher located in any space performs an action, you can spend a concentration tab to perform the same action (normal restrictions apply to that action).",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCarson2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Preparado para todo",
            ENnombre: "Prepared for everything",
            descripcion:"Talento - Innato. Una vez por ronda, cuando un investigador situado en cualquier espacio sufra cualquier cantidad de daño o de Horror, puedes descartar una ficha de Concentración para anular ese Daño o ese Horror.",
            ENdescripcion:"Talent - Innate. Once per round, when a researcher located in any space suffers any amount of damage or Horror, you can discard a Concentration tab to nullify that Damage or Horror.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerCarson3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/19-Carson.jpg"),
        },
        {nombrePJ: "Pete Cubo de Basura",
          idPersonaje: 20,
          posicion: "Vagabundo",
          ENposicion: "Tramp",
          vida: 7,
          cordura: 5,
          saber: 3,
          influencia: 1,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 1,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3 ,
          efecto1: "Buscavidas - Después de que realices una acción de conseguir fondos, puedes ganar un Objeto del Catálogo con un precio impreso de 2 o menos.",
          ENefecto1: "Hustler - After you perform a fundraising action, you can win a Catalog Item with a printed price of 2 or less.",
          efecto2: null,
          ENefecto2: null ,
          frase: "“Pierdan cuidado. Duque y yo estamos aquí para ayudar.”",
          ENfrase: '"Beware. Duke and I are here to help."',
          historia: "Hace ya bastantes años que Pete se echó a la carretera con su fiel compañero Duque. Pete no tiene familia ni hogar; viaja de ciudad en ciudad ganándose la vida como puede, aunque su principal ocupación consiste en admirar el paisaje; normalmente se deja guiar por sus visiones que le conducen hasta quienes le necesitan, gente que vive en lugares que él puede visitar pero en los que no hay lugar para él. Pero últimamente estas visiones han tomado un cariz más siniestro. Ahora son visiones de oscuridad y de una maldad indescriptible. Visiones de muerte y descomposición. De locura ante la faz de lo infinito. Visiones que le han conducido hasta aquí, hasta la ciudad de Arkham. Y esta vez no tiene claro si podrá ayudar a nadie, ni siquiera si vivirá para contarlo. ",
          ENhistoria: "It’s been years since Pete took to the road with his faithful companion Duke. Pete has no family or home; he travels from city to city making his living as he can, although his main occupation is admiring the landscape; he is usually guided by his visions that lead him to those who need him, people who live in places he can visit but where there is no place for him. But lately these visions have taken a more sinister look. Now they are visions of darkness and of unspeakable evil. Visions of death and decomposition. Of madness before the face of the infinite. Visions that have led him here, to the city of Arkham. And this time he is not sure if he can help anyone, not even if he will live to tell. ",
          arquetipos: {
            tituloArquetipo1:"Superviviente",
            ENtituloArquetipo1:"Surbivor",
            descripcionArquetipo1: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo1: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.", 
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null,
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Duque",
            ENnombre: "Duque",
            descripcion:"Aliado - Fiel Sabueso. Recibes +1 de FUERZA como parte de una acción de ataque. Como parte de una acción de intercambio, puedes realizar el intercambio con uno o con varios investigadores que estén en tu barrio.",
            ENdescripcion:"Ally - Faithful Hound. You receive +1 FORCE as part of an attack action. As part of an exchange action, you can make the exchange with one or several researchers who are in your neighborhood.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPete1.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "La guitarra de Pete",
            ENnombre: "Pete’s guitar",
            descripcion:"Objeto - Común Extraordinario. Después de que realices una acción de conseguir fondos, tantos investigadores que estén en tu barrio cómo tu puntuación de INFLUENCIA pueden recuperar un punto de Cordura o concentrarse en una habilidad de su elección (cada jugador elige una opción).",
            ENdescripcion:"Object - Extraordinary Common. After you do a fundraising action, as many researchers in your neighborhood as your INFLUENCE score can regain a Sanity point or concentrate on a skill of their choice (each player chooses an option).",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPete2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Trotamundos",
            ENnombre: "Globetrotter",
            descripcion:"Talento - Innato. Encuentro: una vez por ronda, puedes elegir un espacio adyacente. Resuelve un encuentro como si estuvieras en ese espacio, Tirando un dado menos en todas las pruebas que debas realizar durante ese encuentro.",
            ENdescripcion:"Talent - Innate. Encounter: once per round, you can choose an adjacent space. Solve an encounter as if you were in that space, pulling a dice off all the tests you have to perform during that encounter.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPete3.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/20-Pete.jpg"),
        },
      ],
      PersonajesNocheCerrada: [
        {nombrePJ: "Roland Banks",
          idPersonaje: 25,
          posicion: "Agente federal",
          ENposicion: "Federal Agent",
          vida: 7,
          cordura: 5,
          saber: 2,
          influencia: 2,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 3,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2 ,
          efecto1:"Lucha por la verdad - Como parte de una acción de ataque, puedes sumar uno al resultado de tantos dados como Pistas haya en tu Barrio.",
          ENefecto1: "Fight for the Truth – As part of an attack action, you may add 1 to the result of as many dice as there are Clues in your Neighborhood.",
          efecto2: null,
          frase: "“Yo tampoco quería creer.”",
          ENfrase: '“"I didn’t want to believe either."”',
          historia:"Roland siempre había hallado consuelo en las normas, pautas y procedimientos reglamentarios; por muy complejo que fuese un caso, el manual de la agencia siempre le brindaba un contexto familiar y predecible. Todo encajaba. Aquello debería haber sido una investigación rutinaria: una chica había desaparecido, y Roland dedujo que la habría secuestrado algún criado descontento. Su adiestramiento le permitía identificar facilmente el móvil, el medio y la oportunidad. Blanco y en botella. Pero ni toda su formacíon preparó a Ronald para el ritual que interrumpió cuando encontró a la chica, y no había nada en el reglamento sobre la criatura que acechaba al otro lado de aquel refulgente umbral. Alguien tendría que redactar un manual nuevo.",
          ENhistoria: "Roland had always found comfort in rules, guidelines, and standard procedures; no matter how complex a case was, the agency's manual always provided a familiar and predictable context. Everything fit together. This should have been a routine investigation: a girl had gone missing, and Roland deduced that some disgruntled servant had likely kidnapped her. His training allowed him to easily identify motive, means, and opportunity. Clear as day. But all his training hadn’t prepared him for the ritual he interrupted when he found the girl, nor was there anything in the manual about the creature lurking beyond that shimmering threshold. Someone would have to write a new manual.",
          arquetipos: {
            tituloArquetipo1:"Defensor",
            ENtituloArquetipo1:"Defender",
            descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Eso podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo1: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dealing with Monsters before they become a threat.", 
            tituloArquetipo2: "Buscador",
            ENtituloArquetipo2: "Seeker",
            descripcionArquetipo2: "Eres un intrepido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designos de los Primigenios.",
            ENdescripcionArquetipo2: "You are a fearless hound. You should focus on gathering Clues and uncovering their hidden meaning. Your work is essential to thwarting the evil schemes of the Great Old Ones.",
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRoland1.jpg"),
            nombre: ".38 Special",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRoland2.jpg"),
            nombre: "Implacable",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerRoland3.jpg"),
            nombre: "Indagaciones",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/25-Roland.jpg"),
          expansion: "Noche Cerrada"
        },
        {nombrePJ: "Kate Winthrop",
          idPersonaje: 26,
          posicion: "Cientifica",
          ENposicion: "Scientific",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 2,
          observacion: 4,
          fuerza: 2,
          voluntad: 2,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3,
          efecto1:"Visión de conjunto - Después de que realices una acción de revelar Pistas, puedes concentrarte en tantas habilidades de tu elección como el resultado de tu prueba.",
          ENefecto1: "Overview – After you perform a Clue reveal action, you may focus on as many skills of your choice as the result of your test.",
          efecto2: null,
          frase: "“No hacemos preguntas porque nos gusten las respuestas. Las hacemos porque la ignorancia es letal.”",
          ENfrase: '“"We don’t ask questions because we like the answers. We ask them because ignorance is lethal."”',
          historia:"Kate y su mentor, el profesor Young,eran pioneros en investigaciones dimensionales hasta que se produjo una avería en un emisor de ondas experimental que abrió una brecha en el tejido del espacio, un portal a otro mundo. La criatura que lo atravesó hizo pedazos a sus amigos ante la mirada impotente de Kate. Atormentada por el sangriento recuerdo, y armada con lo que quedaba de la investigación de Young, Kate ha realizado descubrimientos increiblesy ha contemplado la espantosa realidad que acecha en los margenes de nuestra propia dimensión.Aunque sus colegas de la Universidad Miskatonik sigen sin recordar su nombre, Kate ha consagrado su formidable intelecto a evitar futuras tragedias.",
          ENhistoria: "Kate and her mentor, Professor Young, were pioneers in dimensional research until a malfunction in an experimental wave emitter opened a rift in the fabric of space, a portal to another world. The creature that passed through tore her friends apart before Kate’s helpless gaze. Tormented by the bloody memory, and armed with what remained of Young’s research, Kate has made incredible discoveries and witnessed the horrifying reality lurking at the edges of our own dimension. Although her colleagues at Miskatonic University still fail to remember her name, Kate has dedicated her formidable intellect to preventing future tragedies.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1: "Seeker",
            descripcionArquetipo1: "Eres un intrepida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designos de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should focus on gathering Clues and uncovering their hidden meaning. Your work is essential to thwarting the evil schemes of the Great Old Ones.",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null,
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerKate1.jpg"),
            nombre: "Notas de investigación",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerKate2.jpg"),
            nombre: "Estabilizador de flujo",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerKate3.jpg"),
            nombre: "Resultados consistentes",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/26-Kate.jpg"),
          expansion: "Noche Cerrada"
        },
        {nombrePJ: "Diana Stanley",
          idPersonaje: 27,
          posicion: "Sectaria redimida",
          ENposicion: "Redeemed Cultist",
          vida: 7,
          cordura: 5,
          saber: 4,
          influencia: 2,
          observacion: 3,
          fuerza: 3,
          voluntad: 1,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1:"Prácticas prohibidas - Cuando vayas a sufrir Horror (incluido Horror directo), puedes colocar hasta dos fichas de Perdición en tu espacio para anular la misma cantidad de ese Horror.",
          ENefecto1: "Forbidden Practices – When you are about to suffer Horror (including direct Horror), you may place up to two Doom tokens in your space to cancel the same amount of that Horror.",
          efecto2: null,
          frase: "“Tanto si confían en mí como si no, necesitarán mi ayuda. Yo sé bien de lo que son capaces.”",
          ENfrase: '“"Whether they trust me or not, they will need my help. I know well what they are capable of."”',
          historia:"Tarde o temprano, las pesadillas siempre acaban por volver. Diana había entrado en la Orden del Crepusculo de Plata motivada por lo que ella consideraba simple y llena ambición, la necesidad desesperada de sentirse aceptada por la élite de los cuidadanos más augustos de Arkham. Pero ya no podía echacarlo a una inofensiva ingenuidad; no después de haber presenciado los rituales celebrados en las camaras de la Logia. No despues de haber visto comulgar con lo que acechaba al otro lado del tenebroso umbral. No después de haber sido testigo de las sanguinarias atrocidades perpetradas en el santuario interior de la Orden. La visión del rostro desencajado del pobre Walter Evans no le permitía ignorar, como al parecer sí hacían los demás, la maldad que crecía y se enconaba en Arkham. Diana ya no podía seguir siendo cómplice de aquello.",
          ENhistoria: "Sooner or later, nightmares always come back. Diana had joined the Order of the Silver Twilight driven by what she considered simple and full ambition, the desperate need to feel accepted by the elite of Arkham's most august citizens. But she could no longer chalk it up to harmless naivety; not after witnessing the rituals held in the chambers of the Lodge. Not after seeing communion with what lurked beyond the dark threshold. Not after bearing witness to the bloody atrocities committed in the inner sanctuary of the Order. The vision of poor Walter Evans' contorted face wouldn't allow her to ignore, as others seemingly did, the evil that was growing and festering in Arkham. Diana could no longer remain complicit in it.",
          arquetipos: {
            tituloArquetipo1: "Mistico",
            ENtituloArquetipo1: "Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main task should be to remove Doom tokens from the board. You are the best defensive option against the Great Old Ones.",
            tituloArquetipo2: "Defensor",
            ENtituloArquetipo2: "Defender",
            descripcionArquetipo2: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Eso podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo2: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dealing with Monsters before they become a threat.",
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDiana1.jpg"),
            nombre: "Revelación siniestra",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDiana2.jpg"),
            nombre: "Amuleto robado",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerDiana3.jpg"),
            nombre: "Invocar tormenta",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/27-Diana.jpg"),
          expansion: "Noche Cerrada"
        },
        {nombrePJ: "“Malasombra” O'Toole",
          idPersonaje: 28,
          posicion: "Ex presidiario",
          ENposicion: "Ex-Convict",
          vida: 6,
          cordura: 6,
          saber: 2,
          influencia: 1,
          observacion: 3,
          fuerza: 3,
          voluntad: 4,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 0,
          ENlimConcentracion: 0,
          efecto1:"No pienso volver - Una vez por ronda, después de uan prueba en la que hayas sacado un 1, puedes concentrarte en una habilidad de tu elección, incluso aunque al hacerlo sobrepases tu límite de Concentración.",
          ENefecto1: "I Won't Go Back – Once per round, after a test in which you rolled a 1, you may focus on a skill of your choice, even if doing so exceeds your Concentration limit.",
          efecto2: null,
          frase: "“En mi situación uno ve toda clase de cosas, detective. ¿Cuánto vale eso para usted?”",
          ENfrase: '“"In my situation, you see all kinds of things, detective. How much is that worth to you?"”',
          historia:"Malasombra siempre procuró tomar decisiones que hicieran que su madre se sintiese orgullosa de él, pero la suerte le duraba bastante poco. Siempre salía algo mal, y cada nueva decisión que tomaba parecía limitar aun más sus opciónes. Y entonces su madre enfermó, y sus “pocas opciones” se convirtieron rapidamente en “ninguna opción”. Tras dar con sus huesos en la cárcel por atracar un banco para pagar las facturas del hospital acumuladas, Malasombra no tardó en comprobar que las cosas podían torcerse aun más: su compañero de celda, que no paraba de desvariar por unos “Primigenios”, garabateo docenas de mensajes enigmáticos en las paredes justo antes de estallar en llamas. Cuando por fin salió de la trena, Malasombra halló otro modo de hacer que su madre se sintiese orgullosa. Tras arodillarse para depositar un ramo de flores en su tumba, juró hacer cuanto estuviese en su mano para protejer el mundo de aquellos horrores ancestrales.",
          ENhistoria: "Malasombra always tried to make decisions that would make his mother proud of him, but his luck never lasted long. Something always went wrong, and each new decision he made seemed to limit his options even more. Then his mother fell ill, and his “few options” quickly turned into “no options.” After landing in jail for robbing a bank to pay the accumulated hospital bills, Malasombra soon realized things could get even worse: his cellmate, who wouldn’t stop rambling about some “Great Old Ones,” scribbled dozens of cryptic messages on the walls just before bursting into flames. When he finally got out of prison, Malasombra found another way to make his mother proud. After kneeling to lay a bouquet on her grave, he swore to do whatever it took to protect the world from those ancient horrors.",
          arquetipos: {
            tituloArquetipo1: "Experto",
            ENtituloArquetipo1: "Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. “Malasombra” tiene por costumbre sacar partido de situaciones ariesgadas; aprovecha esta capacidad para realizar pruebas complicadas que en otras circunstancias supongan malgastar una acción.",
            ENdescripcionArquetipo1: 'You possess a unique set of skills that allows you to specialize in a specific task. "Malasombra" is accustomed to making the most of risky situations; use this ability to perform complicated tests that, under other circumstances, would waste an action.',
            tituloArquetipo2: "Superviviente",
            ENtituloArquetipo2: "Survivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your strength lies in surviving the relentless assault of the Mythos and helping your fellow investigators do the same. Teamwork will lead you to victory.",
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMalasombra1.jpg"),
            nombre: "Prófugo",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMalasombra2.jpg"),
            nombre: "Manos largas",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMalasombra1.jpg"),
            nombre: "Navaja automática",
            ENnombre: "",
            descripcion:"",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/28-Malasombra.jpg"),
          expansion: "Noche Cerrada"
        }
      ],
      PersonajesSecretosDeLaOrden:[
        {nombrePJ: "Mark Harrigan",
          idPersonaje: 29,
          posicion: "El soldado",
          ENposicion: "The Soldier",
          vida: 8,
          cordura: 4,
          saber: 1,
          influencia: 2,
          observacion: 2,
          fuerza: 4,
          voluntad: 4,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 1,
          ENlimConcentracion: 1,
          efecto1:"Tenaz - Al comienzo de tu turno, si estás rezagado, puedes concentrarte en una habilidad de tu elección o recuperar un punto de Cordura.",
          ENefecto1: "Tenacious – At the start of your turn, if you are behind, you may focus on a skill of your choice or recover one point of Sanity.",
          efecto2: "Inquebrantable - Puedes realizar la acción de ataque cualquier cantidad de veces por ronda.",
          ENefecto2: "Unyielding – You may perform the attack action any number of times per round.",
          frase: "“Todos tenemos cicatrices. Las mías me recuerdan que siga luchando.”",
          ENfrase: '“We all have scars. Mine remind me to keep fighting.”',
          historia:"Nadie volvió de la Gran Guerra siendo la misma persona que al ir, pero los cuerpos destrozados y los alaridos de agonía de sus camaradas no fueron los únicos horrores que vio Mark Harrigan en las trincheras. En tierra de nadie acechaban otras cosas, cosas que Mark no podía explicar. Sólo Sophie, su brillante lucro, creía sus relatos de bestias al acecho y sombras monstruosas, y fue su fe en él lo que lo mantuvo firme entre las bombas y el gas. Volvería a verla. Oiría su risa y vería sus ojos resplandecer al sol. Pero cuando por fin volvio a casa, a ella, no era la misma. Había algo en su interior que la devoraba desde dentro, y él no pudo hacer nada más que asistir al desvanecimiento de la luz en sus ojos. Ahora, Mark no descansará hata que todos esos horrores paguen por lo que le han arrebatado.",
          ENhistoria: "No one returned from the Great War as the same person who went, but the shattered bodies and the screams of agony from his comrades were not the only horrors Mark Harrigan witnessed in the trenches. In no man's land, other things lurked—things Mark could not explain. Only Sophie, his brilliant love, believed his tales of lurking beasts and monstrous shadows, and it was her faith in him that kept him steady amidst the bombs and gas. He would see her again. He would hear her laughter and see her eyes shine in the sun. But when he finally returned home to her, she was not the same. There was something inside her that devoured her from within, and he could do nothing but watch the light fade from her eyes. Now, Mark will not rest until all those horrors pay for what they have stolen from him.",
          arquetipos: {
            tituloArquetipo1: "Defensor",
            ENtituloArquetipo1: "Defender",
            descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
            ENdescripcionArquetipo1: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dealing with Monsters before they become a threat.",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null,
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMark1.jpg"),
            nombre: "Ejército de un solo hombre",
            ENnombre: "",
            descripcion:"Después de que acabes tu movimiento en el espacio de un Monstruo, o después de que un Monstruo se mueva a tu Espacio o aparezca en él, puedes quedar rezagado para realizar una acción de ataque como acción adicional.",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMark2.jpg"),
            nombre: "Retrato de Sophie",
            ENnombre: "",
            descripcion:"Una vez por ronda, cuando estés resolviendo una prueba, puedes sufrir un punto de Daño para volver a tirar un dado o todos los dados. Cuando uses tu capacidad Tenaz, este Objeto recupera un punto de Cordura.",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerMark3.jpg"),
            nombre: "Guerra de desgaste",
            ENnombre: "",
            descripcion:"Al final de tu turno, puedes sufrir cualquier cantidad de Daño directo para inflingir a cada Monstruo enfrentado a ti una cantidad de Daño igual a esa cantidad menos uno. (No puedes sufrir voluntariamente una cantidad de Daño superior a tu Vida.)",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/29-Mark.jpg"),
          expansion: "Secretos De La Orden"
        },
        {nombrePJ: "Preston Fairmont",
          idPersonaje: 30,
          posicion: "El millonario",
          ENposicion: "The Millionaire",
          vida: 7,
          cordura: 5,
          saber: 2,
          influencia: 5,
          observacion: 2,
          fuerza: 3,
          voluntad: 1,
          dinero: 4,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 2,
          efecto1:"Comodidades materiales - Al comienzo de tu turno, puedes gastar 1$ para recuperar un punto de Vida o un punto de Cordura.",
          ENefecto1: "Material Comforts – At the start of your turn, you may spend $1 to recover one point of Health or one point of Sanity.",
          efecto2: null,
          frase: "“Claro, la nobleza obliga a salvar al mundo de pesadillas vivientes, ¿no es así?”",
          ENfrase: '“"Sure, nobility obliges one to save the world from living nightmares, doesn’t it?"”',
          historia:"Preston Fairmont nació rodeado de lujos y nunca tuvo que preguntarse mucho cuál sería el origen de la riqueza y los privilegios de su familia. Era muy sencillo: tenía dinero y lo disfrutaba. Su padre gestionaba los asuntosy el legado del negocio familiar, mientras Preston ignoraba casi por completo las frecuentes visitas de hombres de rostro abusto y trajes oscuros. Tras la reciente muerte de su padre, toda la responsabilidad ha caído sobre los hambros de Preston, y éste ha empezado a cuestionarse su lugar en la vida por primera vez. ¿Qué hizo su abuelo para ganar todo ese dinero? ¿Por qué se interesan tanto por su familia Carl Sanford y la Orden del Crepúsculo de Plata? ¿Fue realmente un accidente la muerte de su padre? Tal vez sea el momento de emplear su riqueza, venga de donde venga, para marcar una difereccia.",
          ENhistoria: "Preston Fairmont was born surrounded by luxury and never had to question much about the origin of his family’s wealth and privileges. It was simple: he had money and he enjoyed it. His father managed the affairs and legacy of the family business, while Preston was almost completely oblivious to the frequent visits of grim-faced men in dark suits. After the recent death of his father, all responsibility has fallen on Preston’s shoulders, and for the first time, he has begun to question his place in life. What did his grandfather do to amass all that wealth? Why are Carl Sanford and the Order of the Silver Twilight so interested in his family? Was his father’s death really an accident? Perhaps it’s time to use his wealth, no matter where it came from, to make a difference.",
          arquetipos: {
            tituloArquetipo1: "Experto",
            ENtituloArquetipo1: "Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Preston tiene un suministro de dinero casi ilimitado. Emplea tus capacidades para preparar una racha de turnos potentes.",
            ENdescripcionArquetipo1: "You possess a unique set of skills that allows you to specialize in a specific task. Preston has an almost unlimited supply of money. Use your abilities to set up a powerful streak of turns.",
            tituloArquetipo2: "Superviviente",
            ENtituloArquetipo2: "Survivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your strength lies in surviving the relentless assault of the Mythos and helping your fellow investigators do the same. Teamwork will lead you to victory.",
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPreston1.jpg"),
            nombre: "Herencia familiar",
            ENnombre: "",
            descripcion:"Después de que realices una acción de conseguir fondos, coloca 2$ adicionales sobre esta carta. (No puedes gastar, usar o intercambiar el dinero de esta carta.)",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPreston2.jpg"),
            nombre: "El dinero habla",
            ENnombre: "",
            descripcion:"Cuando estés resolviendo una prueba, puedes gastar 1$ para volver a tirar un dado. (Puedes usar este Talento cualquier cantidad de veces por prueba.)",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerPreston3.jpg"),
            nombre: "Vida privilegiada",
            ENnombre: "",
            descripcion:"Después de que te concentres en una habilidad como parte de una ación de concentración, puedes gastar 1$ para concentrarte en esa habilidad una vez adicional.",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/30-Preston.jpg"),
          expansion: "Secretos De La Orden"
        },
        {nombrePJ: "Agatha Crane",
          idPersonaje: 31,
          posicion: "La parapsicóloga",
          ENposicion: "The Parapsychologist",
          vida: 5,
          cordura: 7,
          saber: 4,
          influencia: 3,
          observacion: 3,
          fuerza: 1,
          voluntad: 2,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1:"Un nuevo campo de estudio - Después de que sufras uno o más puntos de Horror, puedes concentrarte en una habilidad de tu elección y ganar una ficha de Restos.",
          ENefecto1: "A New Field of Study – After you suffer one or more points of Horror, you may focus on a skill of your choice and gain a Remnant token.",
          efecto2: null,
          frase: "“Las cosas no encajan en categorías sencillas de forma tan ordenada como nos cuentan.”",
          ENfrase: '“"Things don’t fit into simple categories in such an orderly way as they tell us."”',
          historia:"Agatha Crane es licenciada en Matemáticas y Psicología y siempre les ha dodo un gran valor al pensamiento lógico y a la ciencia fundamentada en las pruebas. En su juventud, tenía poco aprecio por las supersticiones y las historias de fantasmas, pero la acumulación de pruebas ha llevado a Agatha a concluir que existe un poso de verdad inconfundible en los relatos sobre monstruos, espiritus y magia que impregnan la historia de Arkham. Si esas cosas son reales. entonces deben seguir unas reglas consistentes, igual que las ciencias físicas. Como le gusta explicar a cualquiera que la escuche el tiempo suficiente, y como su marido Wilbur ha oído muchas veces, este nuevo campo de estudio se llama “parapsicología”. Agatha quiere emplear métodos científicos de eficacia demostrada para salvar la distancia entre lo místico y lo racional, entre el ocultismo y la ciencia.",
          ENhistoria: "Agatha Crane holds degrees in Mathematics and Psychology, and has always placed great value on logical thinking and science based on evidence. In her youth, she had little regard for superstitions and ghost stories, but the accumulation of proof has led Agatha to conclude that there is an unmistakable kernel of truth in the tales of monsters, spirits, and magic that permeate the history of Arkham. If these things are real, then they must follow consistent rules, just like the physical sciences. As she likes to explain to anyone who will listen long enough, and as her husband Wilbur has heard many times, this new field of study is called “parapsychology.” Agatha aims to use scientifically proven methods to bridge the gap between the mystical and the rational, between occultism and science.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1: "Seeker",
            descripcionArquetipo1: "Eres un intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvado designios de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should focus on gathering Clues and uncovering their hidden meanings. Your work is essential in thwarting the evil schemes of the Ancient Ones.",
            tituloArquetipo2: "Mistico",
            ENtituloArquetipo2: "Mystic",
            descripcionArquetipo2: "Destacas erigiendo salvaguardas arcanas contra el mal. Tunprincipal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
            ENdescripcionArquetipo2: "You excel at erecting arcane safeguards against evil. Your primary occupation should be removing Doom tokens from the board. You are the best defensive option against the Ancient Ones.",
          },
          ENarquetipo2: "",
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgatha1.jpg"),
            nombre: "Principio de ocultismo ",
            ENnombre: "",
            descripcion:"Después de que ganes una Pista de tu Barrio, puedes colocar una ficha de Perdición en tu espacio para ganar una Pista adicional de la reserva de fichas. Si lo haces, dale la vuelta a este Talento.",
            ENdescripcion:""
          }, 
          Pertenencia2: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgatha2.jpg"),
            nombre: "Método científico",
            ENnombre: "",
            descripcion:"Después de que realices una acción de salvaguarda, si el resultado fue dos o más, puedes realizar una acción de investigación como acción adicional. Si lo haces, dale la vuelta a este Talento.",
            ENdescripcion:""
          }, 
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgatha3.jpg"),
            nombre: "LLamar a los muertos",
            ENnombre: "",
            descripcion:"Acción: Realiza una prueba de -1 Saber. Si superas la prueba, descarta la primera carta del mazo de Encuentros de tu localización. Si descartas un Evento de esta forma, ganas una Pista de tu Barrio.",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerAgatha4.jpg"),
            nombre: "Cámara de espíritus",
            ENnombre: "",
            descripcion:"Una vez por ronda, cuando fueses a robar y resolver una ficha de Mitos, puedes gastar dos fichas de Restos para que en vez de eso aparezca una Pista. Coloca la carta de Evento de esa Pista en la parte superior de su mazo de Encuentros (en lugar de barajarla junto con las dos primeras cartas).",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/31-Agatha.jpg"),
          expansion: "Secretos De La Orden"
        },
        {nombrePJ: "Winifred Habbamock",
          idPersonaje: 32,
          posicion: "La aviadora",
          ENposicion: "The Aviator",
          vida: 6,
          cordura: 6,
          saber: 1,
          influencia: 2,
          observacion: 4,
          fuerza: 2,
          voluntad: 4,
          dinero: 3,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3,
          efecto1:"Así de buena - Una vez por ronda, cuando fuese a fallar en una prueba, puedes gastar una ficha de Concentración para tirar un dado adicional. Si aun así fallas esa prueba, elige una habilidad en la que no te hayas concentrado; concéntrate dos veces en esa habilidad.",
          ENefecto1: "So Good – Once per round, when you are about to fail a test, you can spend a Focus token to roll an additional die. If you still fail the test, choose a skill in which you haven’t focused; focus on that skill twice.",
          efecto2: null,
          frase: "“Mientras salgas con vida, da igual.”",
          ENfrase: '“As long as you come out alive, it doesnt matter.”',
          historia:"Winifred Habbamock, a quienes sus padres llaman por su nombre wampanoag, Weethao, siempre fue demasiado lista para su prorio bien. Descubrió su casual indiferencia frente a la autoridad cuando los profesores del colegio de su reserva empezaron a tener problemas para estar a su altura, y desarolló una despreocupada temeridad cuando salía mayormente indemne incluso de sus andanzas más impetuosas. Cuando le robó un viejo biplano a un piloto veterano de la Gran Guerra, el propietario quedó impresionado por su talentonatural y le enseñó a pilotar. Cuando empleó ese avión para realizar acrobacias en exhibiciones aéreas por la Costa Este, se ganó una marecida reputación como “la mujer sin miedo”. Cuando estrelló ese avión tras un encuentro con una bestia similar a un murciélago que tenía un enorme ojo purulento, encontró un nuevo reto que afrontar.",
          ENhistoria: 'Winifred Habbamock, whom her parents call by her Wampanoag name, Weethao, was always too clever for her own good. She discovered her casual indifference toward authority when the teachers at her reservation school began struggling to keep up with her, and developed a carefree recklessness when she emerged mostly unscathed from her most impulsive escapades. When she stole an old biplane from a World War I veteran, the owner was impressed by her natural talent and taught her to fly. When she used that plane to perform aerobatics at airshows along the East Coast, she earned a well-deserved reputation as "the fearless woman." When she crashed that plane after an encounter with a bat-like creature with a massive, festering eye, she found a new challenge to face.',
          arquetipos: {
            tituloArquetipo1: "Experto",
            ENtituloArquetipo1: "Expert",
            descripcionArquetipo1: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Winifred destaca cuando puede lucirse enfrentándose a desafios imposibles, y a menudo puede potenciarse a costa de poner en peligro sus éxitos futuros.",
            ENdescripcionArquetipo1: "",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null,
          },
          Pertenencia1: {
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerWinifred1.jpg"),
            nombre: "Lo mismo que hagas",
            ENnombre: "",
            descripcion:"Después de que un investigador que esté en cualquier espacio realize una acción, puedes quedar rezagado pararealizar esa misma acción. Si esa acción requiere una prueba, tira un dado más de los que tiró ese investigador en lugar de tu reserva de dados normal. (Se siguen aplicando las restricciones de acción normales.)",
            ENdescripcion:""
          }, 
          Pertenencia2: null,
          Pertenencia3:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerWinifred2.jpg"),
            nombre: "Acrobacias aéreas",
            ENnombre: "",
            descripcion:"Una vez por ronda, cuando fueses a superar una prueba, puedes volver a tirar todos los dados. Si lo haces, ganas Determinado. Si ya tienes Determinado, en vez de eso puedes recuperar un punto de Vida o de Cordura.",
            ENdescripcion:""
          } ,
          Pertenencia4:{
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerWinifred3.jpg"),
            nombre: "Determinación imprudente",
            ENnombre: "",
            descripcion:"Después de que tires los dados, puedess quedar rezagado para tirar un dado adicional por cada dado que no sea un éxito.",
            ENdescripcion:""
          } ,
          fotoUrl: require("@/assets/img/1-Personajes/32-Winifred.jpg"),
          expansion: "Secretos De La Orden"
        }
          
      ],
      PersonajesOriginal:[
        {nombrePJ: "Darrell Simmons",
          idPersonaje: 21,
          posicion: "Fotógrafo",
          ENposicion: "Photographer",
          vida: 7,
          cordura: 5,
          saber: 2,
          influencia: 2,
          observacion: 4,
          fuerza: 3,
          voluntad: 1,
          dinero: 2,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "Nativo de Arkham -- A la hora de robar un encuentro, Darrel puede robar 2 cartas y escojer la que desee. Después se devuelven las demas al fondo del mazo (excepto si la descartada es un evento).",
          ENefecto1: "Arkham Native -- At the time of stealing a match, Darrel can draw 2 cards and choose the one he wants. The others are then returned to the bottom of the deck (except if the discarded is an event).",
          efecto2: null,
          frase: "“Ya veréis, lo queráis o no.”",
          ENfrase: "“You’ll see, whether you like it or not.”",
          historia: "Ya mientras se criaba en Arkham, Darrell siempre supo que algo no marchaba bien en esta pequeña y extraña ciudad. Después de graduarse en el instituto entró a trabajar de fotógrafo para el Arkham Adviser, y durante los dos años siguientes se ha pateado hasta el último rincón de la ciudad. Sin embargo, la noche pasada Darrell vió algo horrible, algo que ha sacudido su mundo hasta los cimientos y que ha deshecho la ilusión de seguridad que todos creamos para proteger nuestras mentes y almas. Su editor dice que son imaginaciones suyas, pero aun cuando sale del edificio del periodico sabe que lo que vio era real, ¡y pretende mostrárselo al mundo! Esta vez será más precavido. Esta vez tomará fotos y demostrará que en Arkham no ocurren cosas normales.",
          ENhistoria: "While growing up in Arkham, Darrell always knew something wasn’t right in this strange little town. After graduating from high school he went on to work as a photographer for the Arkham Adviser, and for the next two years he has been kicked to the very bottom of the city. Yet last night Darrell saw something horrible, something that has shaken his world to the ground and undone the illusion of security that we all create to protect our minds and souls. His editor says it’s his imagination, but even when he leaves the newspaper building he knows what he saw was real, and he intends to show it to the world! This time he’ll be more cautious. This time he’ll take pictures and prove that normal things don’t happen in Arkham.",
          arquetipos: {
            tituloArquetipo1: "Buscador",
            ENtituloArquetipo1:"Seeker",
            descripcionArquetipo1: "Eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo1: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
            tituloArquetipo2:"Superviviente",
            ENtituloArquetipo2:"Surbivor",
            descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.", 
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Camara de Fotos",
            ENnombre: "Camera",
            descripcion:"Acción - Pedes hacer una foto de cualquier criatura que NO SEA HUMANO siempre que esté en tu mismo espacio. Por cada 2 fotos que consigas ganas 1 aliado.",
            ENdescripcion:"Action - You can take a photo of any creature that is NOT HUMAN as long as it is in your same space. For every 2 photos you get you gain 1 ally.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Cada foto cuenta",
            ENnombre: "Each photo tells",
            descripcion:"Talento - Por cada foto que consiguas te puedes concentrar en 1 habilidad de tu elección. Aunque superes tu limite de concentración.",
            ENdescripcion:"Talent - For every photo you get, you can focus on 1 skill of your choice. Even if you exceed your concentration limit.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Anticipo",
            ENnombre: "Advance",
            descripcion:"Al principio de tu turno ganas 2 $, luego tira 1 dado. Si sacas un 1, se decarta esta carta.",
            ENdescripcion:"At the beginning of your turn you win $2, then you roll a dice. If you roll a 1, this card is drawn.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/21-Darrel.jpg"),
          expansion: "Original - SegundaEd."
        },
        {nombrePJ: "Gloria Goldberg",
          idPersonaje: 22,
          posicion: "Escritora",
          ENposicion: "Writer",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 2,
          dinero: 3,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2,
          efecto1: "El futuro está escrito - En la fase de mitos,gastando 2 fichas de concentración, puedes ver y robar 1 ficha de tu elección.",
          ENefecto1: "The future is written - In the myths phase, spending 2 concentration chips, you can see and steal 1 tile of your choice.",
          efecto2: null,
          frase: "“”",
          ENfrase: "“”",
          historia: "De joven, Gloria se veía acosada por terribles visiones. Tras pasar años acudiendo a médicos y en la terapia aprendió a controlar en cierto modo sus visiones escribiendo historias. Sus extrañas e inquietantes novelas supieron llegar al público en estos tiempos tan angustiosos, y la convirtieron en una escritora de éxitos de venta. Esta noche, mientras se marchaba de una sesión de firma de libros en Arkham, la visión más potente que jamás había experimentado hizo que cayera al suelo desmayada. Gloria vio cómo se abría el cielo y una inmensa y monstruosa forma surgía del mismo aire, desatando un caos inenarrable y matando a miles de personas. Mientras se incorporaba con los brazos, Gloria supo que esta visión era real, y que llegaría a suceder de no hacer nada al respecto. Ahora se encuentra en un destartalado restaurante, sorbiendo café e intentando decidir qué hacer.",
          ENhistoria: "As a young woman, Gloria was beset by terrible visions. After years of going to doctors and therapy, she learned to control her visions in a certain way by writing stories. Her strange and disturbing novels knew how to reach the public in these distressing times, and made her a bestseller. Tonight, as she walked away from a book signing session in Arkham, the most powerful vision she had ever experienced caused her to fall to the ground faint. Gloria saw the sky open and an immense and monstrous form emerged from the same air, unleashing unspeakable chaos and killing thousands of people. As she reached up with her arms, Gloria knew that this vision was real, and that it would happen if she did nothing about it. Now he finds himself in a ramshackle restaurant, sipping coffee and trying to decide what to do.",
          arquetipos: {
            tituloArquetipo1: "Mistico",
            ENtituloArquetipo1:"Mystic",
            descripcionArquetipo1: "Destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
            ENdescripcionArquetipo1: "You stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives",
            tituloArquetipo2:"Buscador",
            ENtituloArquetipo2:"Seeker",
            descripcionArquetipo2: "Eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo2: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.", 
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Ya lo veía venir",
            ENnombre: "I saw it coming",
            descripcion:"Talento. Tienes +1 de SABER cuando vayas a hacer una tirada de salvaguarda.",
            ENdescripcion:"Talent. You have +1 of KNOW when you go to make a roll of safeguard.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Letras prohibidas",
            ENnombre: "Forbidden letters",
            descripcion:"Acción. Haz una tirada de SABER y resuelve según su resultado. 0: Solo recibes el daño. 1: Puedes agotar a un monstruo que esté en tu espacio. +2: Puedes agotar un monstruo de cualquier espacio.",
            ENdescripcion:"Action. Make a SABER spin and solve according to its result. 0: You only take damage. 1: You can exhaust a monster in your space. + 2: You can exhaust a monster from any space.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Iluminación",
            ENnombre: "Illumination",
            descripcion:"Talento. Si consigues salvaguardar 2 fichas de perdición a la vez, podrás revelar pista sin necesidad de tirar.",
            ENdescripcion:"Talent. If you manage to safeguard 2 pieces of perdition at once, you can reveal a clue without having to shoot.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          HistoriaYT: "A3eG_3SDUTA" ,
          fotoUrl: require("@/assets/img/1-Personajes/22-Gloria.jpg"),
          expansion: "Original - SegundaEd."
        },
        {nombrePJ: "Mandy Thompson",
          idPersonaje: 23,
          posicion: "Investigadora",
          ENposicion: "Investigator",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 4,
          fuerza: 1,
          voluntad: 2,
          dinero: 3,
          restos: 0,
          pistas: 0,
          limConcentracion: 3,
          ENlimConcentracion: 3 ,
          efecto1: "Investigacion en profundidad - Para activar esta habilidad tendrás que coger una carta de Mancillado. Si ya estás mancillado, no puedes activar esta habilidad. Una vez por ronda, puedes elegir al principio del turno a un investigador. Durante esa ronda,ese investigador puede volver a lanzar todos los dados de las pruebas que haya fallado.",
          ENefecto1: "In-depth research - To activate this ability you will need to take a Mancillado card. If you are already sullied, you cannot activate this ability. Once per round, you can choose a researcher at the beginning of the turn. During that round, that investigator can re-roll all the evidence dice that have failed.",
          efecto2: null,
          ENefecto2: null ,
          frase: "“No puede morir lo que yace eternamente... Quizas sea esto a lo que se refería.”",
          ENfrase: '"What lies forever cannot die... Perhaps this is what he meant."',
          historia: "Mandy llegó a Arkham hace varios años buscando trabajo de investigadora en la Universidad de Miskatonic. Desde entonces ha trabajado con muchos de los profesores de la universidad, profundizando en tomos esotéricos plagados de información científica, archivos históricos y a veces incluso desvaríos ocultistas. La semana pasada, mientras leía un viejo libro de profecías, sintió por primera vez que se había topado con algo gordo. Mandy llegó a creer que ciertos signos y augurios descritos en el libro estaban teniendo lugar en Arkham en ese mismo momento: presagios que anunciaban el regreso de un ser terrible al que se denominaba Primigenio, que aplastaría las ciudades del Hombre bajo su abominable paso. Esta noche, la luna llena se ha vuelto de color rojo sangre, el último augurio de la llegada del Primigenio. Deslizándose en la noche, armada con su conocimiento de la profecía, Mandy ha decidido ver si puede desafiar al destino e impedir que ocurran tales acontecimientos.",
          ENhistoria: "Mandy came to Arkham several years ago looking for research work at Miskatonic University. Since then he has worked with many of the university’s professors, delving into esoteric volumes full of scientific information, historical archives and sometimes even occult ravings. Last week, while reading an old book of prophecies, he felt for the first time that he had stumbled upon something big. Mandy came to believe that certain signs and omens described in the book were taking place in Arkham at that very moment: omens that heralded the return of a terrible being called Primeval, who would crush Man’s cities under his abominable step. Tonight, the full moon has turned blood red, the last omen of the Primal’s arrival. Slipping through the night, armed with her knowledge of prophecy, Mandy has decided to see if she can challenge fate and prevent such events from occurring.",
          arquetipos: {
            tituloArquetipo1:"Superviviente",
            ENtituloArquetipo1:"Surbivor",
            descripcionArquetipo1: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo1: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
            tituloArquetipo2:"Buscador",
            ENtituloArquetipo2:"Seeker",
            descripcionArquetipo2: "Eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
            ENdescripcionArquetipo2: "You are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.", 
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Cuaderno de notas",
            ENnombre: "Notebook",
            descripcion:"Objeto. Si en la fase de Mitos sacas una ficha de explosion de portal. Ganas 2 pistas de la caja de pistas.",
            ENdescripcion:"Object. If in the Myths phase you get a portal explosion tab. You win 2 tracks from the clue box.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "El camino corto",
            ENnombre: "The short way",
            descripcion:"Talento. Si empiezas tu turno en una calle, puedes moverte directamente a cualquier calle del mapa y empezar tu turno desde allí.",
            ENdescripcion:"Talent. If you start your shift on a street, you can move directly to any street on the map and start your shift from there.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Pruebas irrefutables",
            ENnombre: "Irrefutable evidence",
            descripcion:"Acción: Haz una tirada de INFLUENCIA , si consigues 2 aciertos, consigues un aliado.",
            ENdescripcion:"Action: Make a spin of INFLUENCE , if you get 2 hits, you get an ally.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/23-Mandy.jpg"),
          expansion: "Original - SegundaEd."
        },
        {nombrePJ: "Montarrey Jack",
          idPersonaje: 24,
          posicion: "Arqueologo",
          ENposicion: "Archeologist",
          vida: 4,
          cordura: 8,
          saber: 2,
          influencia: 2,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 3,
          restos: 0,
          pistas: 0,
          limConcentracion: 2,
          ENlimConcentracion: 2 ,
          efecto1: "Amuleto antiguo - objeto Extraordinario. Una vez por turno,puedes cambiar 2 puntos de daño que vayas a recibir por 1 punto de horror.",
          ENefecto1: "Antique Amulet - Extraordinary item. Once per turn, you can change 2 damage points you will receive by 1 horror point.",
          efecto2: null,
          ENefecto2: null ,
          frase: "“Esa estatua significaba algo, estoy seguro.”",
          ENfrase: '"That statue meant something, I’m sure."',
          historia: "Monterrey lleva muchos años trabajando como aventurero trotamundos y cazador de tesoros. Siguiendo los pasos de su padre, siempre ha intentado asegurarse de preservar el valor científico de sus hallazgos. Recientemente siguió una pista que le condujo a una antigua estatua prehistórica en Arkham. Cuando llegó, sin embarğo, el hombre al que iba a comprar dicha estatuilla estaba encerrado en el manicomio. Monterrey estaba a punto de rendirse e irse a casa disgustado cuando una figura envuelta en una túnica pasó junto a él. Durante un instante, Monterrey vislumbró el destello de un colgante de plata con un símbolo que jamás olvidará. Ese símbolo había sido grabado en la frente de su padre cuando lo asesinaron, y le ha perseguido en sus sueños durante años. Persiguió a la misteriosa figura hasta que, al girar una esquina, comprobó que su presa se había desvanecido. No obstante, Monterrey sabe que en algun lugar de Arkham se halla la respuesta al misterio del asesinato de su padre, y no piensa marcharse hasta encontrarla.",
          ENhistoria: "Monterrey has worked as a globetrotter and treasure hunter for many years. Following in his father’s footsteps, he has always tried to ensure that the scientific value of his findings is preserved. He recently followed a trail that led him to an ancient prehistoric statue in Arkham. When he arrived, however, the man to whom he was going to buy the statue was locked in the asylum. Monterrey was about to give up and go home upset when a figure wrapped in a robe passed by him. For a moment, Monterrey glimpsed the glint of a silver pendant with a symbol he will never forget. That symbol had been engraved on his father’s forehead when he was murdered, and it has haunted him in his dreams for years. He chased the mysterious figure until, turning a corner, he found that his prey had vanished. However, Monterrey knows that somewhere in Arkham lies the answer to the mystery of her father’s murder, and does not intend to leave until she is found.",
          arquetipos: {
            tituloArquetipo1:"Superviviente",
            ENtituloArquetipo1:"Surbivor",
            descripcionArquetipo1: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
            ENdescripcionArquetipo1: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
            tituloArquetipo2: null,
            ENtituloArquetipo2: null,
            descripcionArquetipo2: null,
            ENdescripcionArquetipo2: null, 
          },
          Pertenencia1:{
            urlFoto: "",
            nombre: "Látigo de la película",
            ENnombre: "Whip of the film",
            descripcion:"Arma - Extraordinario. Te da +2 de FUERZA en las tiradas de ataque. Puedes atacar cuantas veces quieras usando este arma.",
            ENdescripcion:"Weapon - Extraordinary. It gives you +2 FORCE on attack spins. You can attack as many times as you want using this weapon.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Hechizo de Sacrificio",
            ENnombre: "Sacrifice spell",
            descripcion:"Vinculado - hechizo Extraordinario. Asigna esta carta a un arma, por cada 6 que saque usando dicha arma, pon un contador de +1, cuando el contador llegue a +10 podrás usar todo el poder acumulado en 1 solo ataque, PERO perderás 2 de Vida debido a la desmesurada fuerza del ataque,el ataque afecta a todos lo enemigos de la misma zona. Después descarta la carta de hechizo y el arma.",
            ENdescripcion:"Linked - Extraordinary spell. Assign this card to a weapon, for every 6 you draw using this weapon, put a counter of +1, when the counter reaches +10 you can use all the power accumulated in 1 single attack, BUT you will lose 2 of Life due to the excessive strength of the attack,the attack affects all enemies in the same area. Then discard the spell card and weapon.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Hasta el último aliento",
            ENnombre: "Until the last breath",
            descripcion:"Talento - Innato.Por turno puedes sufrir 2 puntos de Horror para volver a tirar cualquier cantidad de dados.",
            ENdescripcion:"Talento - Innato.Por turno puedes sufrir 2 puntos de Horror para volver a tirar cualquier cantidad de dados.",
            fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
          },
          fotoUrl: require("@/assets/img/1-Personajes/24-Monterrey.jpg"),
          expansion: "Original - SegundaEd."
        },
      ],

    }; // end return
  }, // end data

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    mostrarNotificacionDesactivar() {
      this.mostrarNotifDesactivar = true;
      setTimeout(() => {
        this.mostrarNotifDesactivar = false;
      }, 2000);
    },
    mostrarNotificacionActivar() {
      this.mostrarNotifActivar = true;
      setTimeout(() => {
        this.mostrarNotifActivar = false;
      }, 2000);
    },
    SonidoTecla() {sonidoTecla.play();},

    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Seleccionar Investigador";
        this.textoInterfaz.subtitulo = "Colecciones";
        this.textoInterfaz.descripcion = "Haz click para añadir o quitar la expansión que quieras y luego elige un investigador para verlo en detalle.";
        this.textoInterfaz.sinExpansion = "Sin expansiones seleccionadas";
        this.textoInterfaz.seleccionaExpansion = "Por favor selecciona alguna expansion para ver los personajes.";

        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Mareas";
        this.textoInterfaz.botones.noche = "AH Noche";
        this.textoInterfaz.botones.secretos = "AH Secretos";
        this.textoInterfaz.botones.original = "AH Original";

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Select Investigator";
        this.textoInterfaz.subtitulo = "Collections";
        this.textoInterfaz.descripcion = "Click to add or remove the expansion you want and then choose a investigator to view it in detail.";
        this.textoInterfaz.sinExpansion = "No expansions selected";
        this.textoInterfaz.seleccionaExpansion = "Please select an expansion to view the characters."

        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Waves";
        this.textoInterfaz.botones.noche = "AH Nigth";
        this.textoInterfaz.botones.secretos = "AH Secrets";
        this.textoInterfaz.botones.original = "AH Original";
      }
    }
  }, // end methods
  mounted(){
    this.rellenarTextoSegunIdioma();
  },
};
</script>


<style scoped>
/* Notificacion de expansion activa*/
.notificacion {
  position: fixed;
  top: 50vh;
  left: 15vh;
  width: 40%;
  background-color: #f1f1f1;
  box-shadow: 0px 0px 50px 50px rgb(255, 255, 255);
  border-style: inset;
  padding: 10px;
  z-index: 20;
  opacity: 1;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Helers */
.centrarHero{
  display: flex; 
  justify-content: center; 
  align-items: center
}

/* Usado */
.BGGeneralAH {
  background-image: url(@/assets/img/ZZOtros/BGAH.jpg)!important;
  min-height: 110vh;
  background-position: center;
  background-size: cover;
}

/* Lista de Personajes */
.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
}
.cajaDePersonajesBase{
  border: 2px solid #48c78e;
  border-radius: 3px;
}
.cajaDePersonajesMareasTenebrosas{
  border: 2px solid #3e8ed0;
  border-radius: 3px;
}
.cajaDePersonajesNocheCerrada{
  border: 2px solid #ffdc7d;
  border-radius: 3px;
}
.cajaDePersonajesSecretosDeLaOrden{
  border: 2px solid #485fc7;
  border-radius: 3px;
}
.cajaDePersonajesOriginal{
  border: 2px solid #f14668;
  border-radius: 5px;
}
.cajaimg{
  object-fit: cover;
  min-height: 80px;
}

.contadorVidaCordura{
  position: relative;
  top: -35px;
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
}

/* CLASES PARA TARJETAS */
.card {
  width: 115px;
  height: 140px;
  background: #ffffff00;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0) ;
}

.card-image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  z-index: 2;
  
}

.card-icon {
  position: absolute;
  font-size: 25px;
  color: #ffffff;
  z-index: 3;
}

.top-left {
  top: -3px;
  left: 3px;
}

.top-right {
  top: -3px;
  right: 3px;
}

.card-number {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  z-index: 3;
}

.tipografiaElegante{
  font-family: "Cinzel";
}

</style>