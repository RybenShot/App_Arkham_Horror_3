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
      <!-- Seleccionar Mapa -->
      <div class="columns is-mobile mb-0 pt-3 centrarHero" >
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack"><i class="fa-2x fas fa-undo-alt has-text-white"></i></div>
        <div class="column " style="margin: 0 auto;"><p class="has-text-centered title has-text-white"> {{ textoInterfaz.titulo }}</p></div>
        <div class="column is-3 p-0" style="text-align: center;"><router-link class="" to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link></div>
      </div>

      <hr class="m-1 mx-4 linea-separacion"> 

      <!-- Colecciones y botones -->
      <h2 class="title is-4 has-text-white has-text-centered">{{ textoInterfaz.subtitulo }}</h2>
      <p class="subtitle is-6 has-text-white has-text-centered mb-2"> {{ textoInterfaz.descripcion }}</p>
      <div class="columns is-mobile pt-3 mx-1 buttons pl-4 pr-2">

        <button v-if="this.$store.state.ActivarBase == true" class=" button  is-success" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarBase = false)">{{ textoInterfaz.botones.base }}</button>
        <button v-if="this.$store.state.ActivarBase == false" class="button is-success is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarBase = true)">{{ textoInterfaz.botones.base }}</button>

        <button v-if="this.$store.state.ActivarMareasTenebrosas == true" class="button  is-info" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarMareasTenebrosas = false)">{{ textoInterfaz.botones.mareas }}</button>
        <button v-if="this.$store.state.ActivarMareasTenebrosas == false" class="button is-info is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarMareasTenebrosas = true)">{{ textoInterfaz.botones.mareas }}</button>

        <button v-if="this.$store.state.ActivarNocheCerrada == true" class="button  is-warning" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarNocheCerrada = false)">{{ textoInterfaz.botones.noche }}</button>
        <button v-if="this.$store.state.ActivarNocheCerrada == false" class="button is-warning is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarNocheCerrada = true)">{{ textoInterfaz.botones.noche }}</button>

        <button v-if="this.$store.state.ActivarNSecretosDeLaOrden == true" class="button  is-link" @click="(SonidoTecla()), (mostrarNotificacionDesactivar()), (this.$store.state.ActivarNSecretosDeLaOrden = false)">{{ textoInterfaz.botones.secretos }}</button>
        <button v-if="this.$store.state.ActivarNSecretosDeLaOrden == false" class="button is-link is-outlined" @click="(SonidoTecla()), (mostrarNotificacionActivar()), (this.$store.state.ActivarNSecretosDeLaOrden = true)">{{ textoInterfaz.botones.secretos }}</button>

      </div>
    </div>
<br>

<!-- EXPANSIONES // Mapas -->

    <div v-if="this.$store.state.ActivarBase">
      <div class="PersonajesList">
        <div v-for="mapa in MapasBase" :key="mapa">
          <router-link to="/DetalleMapa">
            <div @click="this.$store.state.datosMapa = mapa" class="p-1" >

              <div class="card cajaDePersonajesBase">
                <div class="card-image-wrapper">
                  <img :src="mapa.BGMapa" :alt="mapa.title" class="card-image" />
                </div>
                <div class="card-overlay has-text-centered">
                  
                  <p v-if="this.$store.state.lenguaje == 'español'" class="title is-7 tipografiaElegante">{{mapa.title}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="title is-7 tipografiaElegante">{{mapa.ENtitle}}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarMareasTenebrosas">
      <div class="PersonajesList">
        <div v-for="mapa in MapasMareasTenebrosas" :key="mapa">
          <router-link to="/DetalleMapa">
            <div @click="this.$store.state.datosMapa = mapa" class="p-1" >

              <div class="card cajaDePersonajesMareasTenebrosas">
                <div class="card-image-wrapper">
                  <img :src="mapa.BGMapa" :alt="mapa.title" class="card-image" />
                </div>
                <div class="card-overlay has-text-centered">
                  <p v-if="this.$store.state.lenguaje == 'español'" class="title is-7 tipografiaElegante">{{mapa.title}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="title is-7 tipografiaElegante">{{mapa.ENtitle}}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarNocheCerrada">
      <div class="PersonajesList">
        <div v-for="mapa in MapasNocheCerrada" :key="mapa">
          <router-link to="/DetalleMapa">
            <div @click="this.$store.state.datosMapa = mapa" class="p-1" >

              <div class="card cajaDePersonajesNocheCerrada">
                <div class="card-image-wrapper">
                  <img :src="mapa.BGMapa" :alt="mapa.title" class="card-image" />
                </div>
                <div class="card-overlay has-text-centered">
                  <p v-if="this.$store.state.lenguaje == 'español'" class="title is-7 tipografiaElegante">{{mapa.title}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="title is-7 tipografiaElegante">{{mapa.ENtitle}}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarNSecretosDeLaOrden">
      <div class="PersonajesList">
        <div v-for="mapa in MapasSecretosDeLaOrden" :key="mapa">
          <router-link to="/DetalleMapa">
            <div @click="this.$store.state.datosMapa = mapa" class="p-1" >

              <div class="card cajaDePersonajesSecretosDeLaOrden">
                <div class="card-image-wrapper">
                  <img :src="mapa.BGMapa" :alt="mapa.title" class="card-image" />
                </div>
                <div class="card-overlay has-text-centered">
                  <p v-if="this.$store.state.lenguaje == 'español'" class="title is-7 tipografiaElegante">{{mapa.title}}</p>
                  <p v-if="this.$store.state.lenguaje == 'ingles'" class="title is-7 tipografiaElegante">{{mapa.ENtitle}}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Howl } from 'howler';

const sound = new Howl({
  src: require('@/assets/sound/SonidoTecla.mp3'),
});
export default {
  name: "lista_De_Mapas",
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
        botones: {
          base: "",
          mareas: "",
          noche: "",
          secretos: "",
        },
      },

      tituloMapa: "",
      
      MapasBase:[
        { idMapa: 0,
          title:  "La llegada de Azathoth",
          ENtitle: "The arrival of Azathoth",
          description: "En el corazón del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...",
          ENdescription: "In the heart of infinity dwells the lethargic Azathoth, lulled by the incessant notes of ominous flutes. But there are mortals who wish to invoke the immeasurable power and calamity of the Blind and Idiot God, even if it means condemning humanity ...",
          dificultadMapa: 1,
          expansionMapa: "AHBase",
          ducacionMapa: 130,
          votosUsuariosMapa: 4 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa0.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG1MapaArkham.jpg")
        },
        { idMapa: 1,
          title:  "Festin para Umordhoth",
          ENtitle: "Feast for Umordhoth",
          description: "Los gules que habitan en el mundo subterráneo se alimentan de la carne de los muertos: con todo, incluso ellos viven temerosos del Devorador de las Profundidades al que reverencian. Pero los gules no son los únicos en Arkham que veneran a Umórdhoth...",
          ENdescription: "The Gules who dwell in the underworld feed on the flesh of the dead: yet even they live in fear of the Devourer of the Deep whom they revere. But the Gules are not the only ones in Arkham who worship Umórdhoth...",
          dificultadMapa: 1,
          expansionMapa: "AHBase",
          ducacionMapa: 150,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa1.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG2MapaArkham.jpg")
        },
        { idMapa: 2,
          title:  "El velo del Crepusculo",
          ENtitle: "The veil of the Twilight",
          description: "Algo acecha en el gélido vacío que separa nuestros mundos. Susurra desde el otro lado del velo, llamando a todos los que tengan el poder necesario para liberarlo de su confinamiento. Quienes sucumben a su influjo obtienen un gran poder, pero el precio que pagan es terrible. Y con cada día que pasa su liberación está más próxima...",
          ENdescription: "Something lurks in the icy void that separates our worlds. He whispers from the other side of the veil, calling all who have the power to release him from confinement. Those who succumb to their influence gain great power, but the price they pay is terrible. And with each passing day their liberation is closer...",
          dificultadMapa: 2,
          expansionMapa: "AHBase",
          ducacionMapa: 90,
          votosUsuariosMapa: 2 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa2.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG3MapaArkham.jpg")
        },
        { idMapa: 3,
          title:  "Ecos de las profundidades",
          ENtitle: "Echoes of the deep",
          description: "En su morada de R’lyeh, el difunto Cthulhu aguarda soñando. Se agita en su letargo y espera a que las estrellas sean propicias para que R’lyeh emerja de su hogar bajo las olas y los primigenios regresen. Pues no está muerto lo que puede yacer eternamente, y con los evos extraños aun la muerte puede morir...",
          ENdescription: "In his abode of R'lyeh, the late Cthulhu waits dreaming. He agitates in his lethargy and waits for the stars to be propitious for R'lyeh to emerge from his home under the waves and the primeval ones to return. For what can lie eternally is not dead, and with the strange evos even death can die...",
          dificultadMapa: 3,
          expansionMapa: "AHBase",
          ducacionMapa: 240,
          votosUsuariosMapa: 5 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa3.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG4MapaArkham.jpg")
        },
      ],
      MapasMareasTenebrosas:[
        { idMapa: 4,
          title:  "Tiranos de la desolación",
          ENtitle: "Tyrants of desolation",
          description: "En las profundidades submarinas del Arredice del Diablo, los tiranos de Y´hanthlei gobiernan las mareas tenebrosas mientras sueñan con transcender ses vetustas formas mortales. Se agitan bajo las aguas y envían a sus profundos para que corrompan el mundo de la superficie.",
          ENdescription: "In the underwater depths of the Devil’s Arredice, the tyrants of Y hanthlei rule the dark tides as they dream of transcending these ancient mortal forms. They stir under the waters and send them deep to corrupt the surface world.",
          dificultadMapa: 3,
          expansionMapa: "AH Mareas",
          ducacionMapa: 150,
          votosUsuariosMapa: 4 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa4MT.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG1MapaAHMareasTenebrosas.jpg")
        },
        { idMapa: 5,
          title:  "La lámpara Mortecina",
          ENtitle: "The Mortecina lamp",
          description: "En el brumoso pueblo de Kingsport, la clase alta prospera en el seno de una nueva sociedad conocida como el Club de la Lámpara. En callejones y barrios bajos, muchas personas que habían desaparecido regresan despojados de sus recuerdos, como meras sombras de lo que fueron.",
          ENdescription: "In the foggy town of Kingsport, the upper class thrives within a new society known as the Lamp Club. In alleys and slums, many disappeared people return stripped of their memories, like mere shadows of what they were.",
          dificultadMapa: 2,
          expansionMapa: "AH Mareas",
          ducacionMapa: 170,
          votosUsuariosMapa: 4 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa5MT.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG2MapaAHMareasTenebrosas.jpg")
        },
        { idMapa: 6,
          title:  "La progenie de Ithaqua",
          ENtitle: "The progeny of Ithaqua",
          description: "Ithaqua, el que camina en el viento, acecha en el gélido norte. Es el viento helado que cala hasta el alma, el hielo voras que aprisiona a los incautos. Olvidado y solitario, Ithaqua propaga si influencia coo la cruel esteranza de engendrar una progenie terrible, un nuevo vástago capaz de venzer a los mismísimos dioses arquetípicos.",
          ENdescription: "Ithaqua, who walks in the wind, lurks in the icy north. It is the icy wind that reaches to the soul, the vore ice that imprisons the unwary. Forgotten and lonely, Ithaqua propagates if it influences the cruel sterility of begetting a terrible progeny, a new offspring capable of defeating the archetypal gods themselves.",
          dificultadMapa: 4,
          expansionMapa: "AH Mareas",
          ducacionMapa: 230,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa6MT.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG3MapaAHMareasTenebrosas.jpg")
        },
        { idMapa: 7,
          title:  "Sueños de R´lyeh",
          ENtitle: "Dreams of R´lyeh",
          description: "La fresca brisa otoñal arrastra consigo una melodía sobrenatural, prácticamente imperceptible para al mente despierta. En sueños, visitáis una fantástica ciudad submarina y os deleitáis en la gloria de una entidad ciclópea que no alcanzáis a ver.",
          ENdescription: "The fresh autumn breeze carries with it a supernatural melody, practically imperceptible to the awake mind. In dreams, you visit a fantastic underwater city and delight in the glory of a cyclopean entity that you cannot see.",
          dificultadMapa: 5,
          expansionMapa: "AH Mareas",
          ducacionMapa: 200,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa7MT.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG4MapaAHMareasTenebrosas.jpg")
        },
      ],
      MapasNocheCerrada:[
        {idMapa: 8,
          title: "El silencio de Tsathoggua",
          ENtitle:"The Silence of Tsathoggua",
          description: "La bestia de Voormithabreth dormita mientras los adeptos que abandonó en la lejana Yuggoth preparan sus ofrendas devocionales para colmarsu voraz apetito. Si el Durmiente de N'Kai llegase a despertar, estaríamos todos condenados.",
          ENdescription: "The beast of Voormithabreth slumbers while the adepts it abandoned in distant Yuggoth prepare their devotional offerings to sate its voracious appetite. If the Sleeper of N'Kai were to awaken, we would all be doomed.",
          dificultadMapa: 4,
          expansionMapa: "AH Noche Cerrada",
          ducacionMapa: 240,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa8NC.png"),
          BGMapa: require("@/assets/img/3-Mapas/BG8MapaAHNocheCerrada.jpg")
        },
        {idMapa: 9,
          title: "Disparos en la oscuridad",
          ENtitle:"Shots in the Dark",
          description: "Las mafias de Arkham tienen una larga historia, y la tregua entre los O'Bannion y los Sheldon ha sido, en el mejor de los casos, frájil. Durante en caluroso verano de 1926, una sombra tenebrosa los empuja a una cruenta guerra de bandas.",
          ENdescription: "The mafias of Arkham have a long history, and the truce between the O'Bannions and the Sheldons has been, at best, fragile. During the sweltering summer of 1926, a sinister shadow drives them into a brutal gang war.",
          dificultadMapa: 3,
          expansionMapa: "AH Noche Cerrada",
          ducacionMapa: 230,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa9NC.png"),
          BGMapa: require("@/assets/img/3-Mapas/BG9MapaAHNocheCerrada.jpg")
        }
      ],
      MapasSecretosDeLaOrden:[
        {idMapa: 10,
          title: "La LLave y la Puerta",
          ENtitle:"The Key and the Gate",
          description: "Durante eones, Yog-Sothoth ha observado el universo desde más allá del tiempo y del espacio. El que Acecha en l Umbral se agita, pues ya no se conforma con limitarse a observar y esperar. Innumerables siervos se afan por abrir la puerta que encierra al Primigenio fuera de nuestro universo.",
          ENdescription: "For eons, Yog-Sothoth has watched the universe from beyond time and space. The Lurker at the Threshold stirs, no longer content to merely watch and wait. Countless servants toil to open the gate that keeps the Ancient One sealed outside our universe.",
          dificultadMapa: 2,
          expansionMapa: "AH Secretos",
          ducacionMapa: 330,
          votosUsuariosMapa: 2 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa10SO.png"),
          BGMapa: require("@/assets/img/3-Mapas/BG10MapaAHSecretos.jpg")
        },
        {idMapa: 11,
          title: "Obligados a servir",
          ENtitle:"Forced to Serve",
          description: "Una plaga de espíritus inquietos invade Arkham, creando una perturbación psíquica que no se puede ignorar. Estas almas perdidas están estan atrapadas por un antiguo pacto y es necesario liberarlas del mal que las ata por toda la enernidad.",
          ENdescription: "A plague of restless spirits invades Arkham, creating a psychic disturbance that cannot be ignored. These lost souls are trapped by an ancient pact, and it is necessary to free them from the evil that binds them for all eternity.",
          dificultadMapa: 2,
          expansionMapa: "AH Secretos",
          ducacionMapa: 130,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa11SO.png"),
          BGMapa: require("@/assets/img/3-Mapas/BG11MapaAHSecretos.jpg")
        },
        {idMapa: 12,
          title: "Los muertos gritan",
          ENtitle:"The Dead Scream",
          description: "Una antigua magia ha rasgado el velo que protege Arkham de los mundos que hay más allá. Terribles criaturas surgen del Mundo subterraneo para amenazar todo lo que te importa.",
          ENdescription: "An ancient magic has torn the veil that protects Arkham from the worlds beyond. Terrible creatures emerge from the Underdark to threaten everything you hold dear.",
          dificultadMapa: 3,
          expansionMapa: "AH Secretos",
          ducacionMapa: 140,
          votosUsuariosMapa: 3 ,
          imgMapa: require("@/assets/img/3-Mapas/losetas/LosetasMapa12SO.png"),
          BGMapa: require("@/assets/img/3-Mapas/BG12MapaAHSecretos.jpg")
        },
      ]


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
    SonidoTecla() {sound.play();},

    rellenarTextosegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
        this.textoInterfaz.titulo = "Seleccionar Mapa";
        this.textoInterfaz.subtitulo = "Colecciones";
        this.textoInterfaz.descripcion = "Haz click para añadir o quitar la expansión que quieras y luego elige un mapa para verlo en detalle.";
        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Mareas";
        this.textoInterfaz.botones.noche = "AH Noche";
        this.textoInterfaz.botones.secretos = "AH Secretos";

      }else if(this.$store.state.lenguaje == 'ingles'){
        this.textoInterfaz.titulo = "Select Map";
        this.textoInterfaz.subtitulo = "Collections";
        this.textoInterfaz.descripcion = "Click to add or remove the expansion you want and then choose a map to view it in detail.";
        this.textoInterfaz.botones.base = "AH Base";
        this.textoInterfaz.botones.mareas = "AH Waves";
        this.textoInterfaz.botones.noche = "AH Nigth";
        this.textoInterfaz.botones.secretos = "AH Secrets";
      }
    }
  }, // end methods
  mounted(){
    this.rellenarTextosegunIdioma();
  },
};
</script>

<style scoped>
/* Helers */
.centrarHero{
  display: flex; 
  justify-content: center; 
  align-items: center
}

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
  grid-template-columns: auto auto auto ;
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
.cajaimg{
  object-fit: cover;
  min-height: 80px;
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
.tipografiaElegante{
  font-family: "Cinzel";
}
</style>>