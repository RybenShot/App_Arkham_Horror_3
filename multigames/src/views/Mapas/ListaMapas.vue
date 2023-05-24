<template>
  <div class="BGGeneralAH">
    <div class="">

      <div class="columns is-mobile mb-0 pt-3 centrarHero" >
        <div class="column is-3 p-0" style="text-align: center;" @click="goBack"><i class="fa-2x fas fa-undo-alt has-text-white"></i></div>
        <div class="column " style="margin: 0 auto;"><p class="has-text-centered title has-text-white">Seleccionar Mapa</p></div>
        <div class="column is-3 p-0" style="text-align: center;"><router-link class="" to="/"><i class="fa-2x fas fa-home has-text-white"></i></router-link></div>
      </div>

      <hr class="m-1 mx-4 linea-separacion"> 

      <h2 class="title is-4 has-text-white has-text-centered">Colecciones</h2>
      <p class="subtitle is-6 has-text-white has-text-centered mb-2">Haz click para añadir o quitar la expansión que quieras y luego elige un mapa para verlo en detalle.</p>
      <div class="columns is-mobile pt-3 mx-1">
        <button class="column mx-1" @click="this.$store.state.ActivarBase =! this.$store.state.ActivarBase">AH Base</button>

        <button class="column mx-1" @click="this.$store.state.ActivarMareasTenebrosas =! this.$store.state.ActivarMareasTenebrosas">AH Mareas</button>
      </div>
    </div>


<br>






<!-- EXPANSIONES // PERSONAJES -->

    <div v-if="this.$store.state.ActivarBase">
      <hr class="m-1 mx-4">
      <h1 class="has-text-white title my-2 ml-1 is-4">Arkham Horror Base</h1>
      <div class="PersonajesList">
        <div v-for="mapa in MapasBase" :key="mapa">
          <router-link to="/DetallePersonaje">
            <div @click="this.$store.state.datosMAPAactual = mapa" class="cajaDePersonajesBase has-background-light m-1 p-2" >
              <img :src="mapa.BGMapa" :alt="mapa.title" class="cajaimg">
              <p class="has-text-centered subtitle has-text-weight-bold is-7">{{mapa.title}}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="this.$store.state.ActivarMareasTenebrosas">
      <hr class="m-1 mx-4">
      <h1 class="has-text-white title my-2 ml-1 is-4">Arkham Horror Mareas Tenebrosas</h1>
      <div class="PersonajesList">
        <div v-for="mapa in MapasMareasTenebrosas" :key="mapa">
          <router-link to="/DetallePersonaje">
            <div @click="(this.$store.state.datosMAPAactual = mapa)" class="cajaDePersonajesMareasTenebrosas has-background-light m-1" >
              <img :src="mapa.BGMapa" :alt="mapa.title" class="cajaimg">
              <p class="has-text-centered subtitle has-text-weight-bold is-7">{{mapa.title}}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "listaDePersonajes",
  components:{},

  data() {
    return {

      datosMAPAactual:{
        imgPersonaje: "imgTommy",
        nombrePJ: "Tommy MulDoon",
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
        limConcentracion: 2,
        efecto1: "Protector: Si un Monstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tú a ese Monstruo en su lugar.",
        ENefecto1: "Protector: If a Monster is going to face another researcher in your space, you can face that Monster instead.",
        efecto2: null,
        frase: '“Vamos allá, Tommy. Es hora de hacerse el héroe.”',
        ENfrase: '“Come on, Tommy. It’s time to become a hero.”',
        historia: "Los Muldoon habían servido en el cuerpo de policía durante generaciones, y Tommy no iba a ser menos. Fue el orgullo de su familia cuando se graduó en la academia de Boston. Por eso no hizo mucha gracia que lo trasladasen a la comisaría de Arkham; después de todo ¿qué podía ocurrir en aquel pueblucho comparado con los crímenes que habría sido capaz de resolver en Boston? Al final resultó que el trabajo policial en Arkham no estaba exento de interés, después de todo. Había muchos sucesos inexplicables, y la policía local parecía más interesada en aparentar normalidad que en buscar una solución. Así que Tommy echó mano a Becky, el rifle de su abuelo, y se dispuso a buscar soluciones por su cuenta ...",
        ENhistoria: "The Muldoons had served in the police force for generations, and Tommy was no less. He was the pride of his family when he graduated from the Boston Academy. That’s why it wasn’t very funny to be transferred to the Arkham police station; after all, what could happen in that small town compared to the crimes I would have been able to solve in Boston? It turned out that police work in Arkham was not without interest after all. There were many unexplained events, and the local police seemed more interested in appearing normal than in finding a solution. So Tommy reached for Becky, his grandfather’s rifle, and set out to find solutions on his own ...",
        arquetipo1: "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
        ENarquetipo1: "As an DEFENDER, your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
        arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        ENarquetipo2: "As a SURVIVOR, your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
        Pertenencia1: {
            urlFoto: "",
            nombre: "Becky",
            ENnombre: "Becky",
            descripcion:"Objeto - Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque.",
            ENdescripcion:"Object - Weapon. You receive +4 FORCE when performing an attack action."
        }, 
          Pertenencia2: null,
          Pertenencia3:{
            urlFoto: "",
            nombre: "Esposas",
            ENnombre: "handcuffs",
            descripcion:"Objeto - Común. Una vez por ronda, después de que infrinjas Daño, te separes o sufras Daño de un monstruo HUMANO que no sea épico, puedes derrotar a ese monstruo.",
            ENdescripcion:"Object - Common. Once per round, after you break Damage, separate or take Damage from a non-epic HUMAN monster, you can defeat that monster."
          } ,
          Pertenencia4:{
            urlFoto: "",
            nombre: "Motocicleta",
            ENnombre: "motorcycle",
            descripcion:"Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte un espacio adicional.",
            ENdescripcion:"Object - Vehicle. Instead of a normal motion action, you move a maximum of 3 spaces and can spend $1 to move an extra space."
          } 
      },
      
      MapasBase:[
        { idMapa: 0,
          title:  "La llegada de Azathoth",
          ENtitle: "The arrival of Azathoth",
          description: "En el corazón del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...",
          ENdescription: "In the heart of infinity dwells the lethargic Azathoth, lulled by the incessant notes of ominous flutes. But there are mortals who wish to invoke the immeasurable power and calamity of the Blind and Idiot God, even if it means condemning humanity ...",
          imgMapa: require("@/assets/img/Games/AHBase/1imgMapas/mapa1.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG1MapaArkham.jpg")
        },
        { idMapa: 1,
          title:  "Festin para Umordhoth",
          ENtitle: "Feast for Umordhoth",
          description: "Los gules que habitan en el mundo subterráneo se alimentan de la carne de los muertos: con todo, incluso ellos viven temerosos del Devorador de las Profundidades al que reverencian. Pero los gules no son los únicos en Arkham que veneran a Umórdhoth...",
          ENdescription: "The Gules who dwell in the underworld feed on the flesh of the dead: yet even they live in fear of the Devourer of the Deep whom they revere. But the Gules are not the only ones in Arkham who worship Umórdhoth...",
          imgMapa: require("@/assets/img/Games/AHBase/1imgMapas/mapa2.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG2MapaArkham.jpg")
        },
        { idMapa: 2,
          title:  "El velo del Crepusculo",
          ENtitle: "The veil of the Twilight",
          description: "Algo acecha en el gélido vacío que separa nuestros mundos. Susurra desde el otro lado del velo, llamando a todos los que tengan el poder necesario para liberarlo de su confinamiento. Quienes sucumben a su influjo obtienen un gran poder, pero el precio que pagan es terrible. Y con cada día que pasa su liberación está más próxima...",
          ENdescription: "Something lurks in the icy void that separates our worlds. He whispers from the other side of the veil, calling all who have the power to release him from confinement. Those who succumb to their influence gain great power, but the price they pay is terrible. And with each passing day their liberation is closer...",
          imgMapa: require("@/assets/img/Games/AHBase/1imgMapas/mapa3.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG3MapaArkham.jpg")
        },
        { idMapa: 3,
          title:  "Ecos de las profundidades",
          ENtitle: "Echoes of the deep",
          description: "En su morada de R’lyeh, el difunto Cthulhu aguarda soñando. Se agita en su letargo y espera a que las estrellas sean propicias para que R’lyeh emerja de su hogar bajo las olas y los primigenios regresen. Pues no está muerto lo que puede yacer eternamente, y con los evos extraños aun la muerte puede morir...",
          ENdescription: "In his abode of R'lyeh, the late Cthulhu waits dreaming. He agitates in his lethargy and waits for the stars to be propitious for R'lyeh to emerge from his home under the waves and the primeval ones to return. For what can lie eternally is not dead, and with the strange evos even death can die...",
          imgMapa: require("@/assets/img/Games/AHBase/1imgMapas/mapa4.png"),
          BGMapa: require("@/assets/img/Games/AHBase/1imgMapas/BG4MapaArkham.jpg")
        },
      ],

      MapasMareasTenebrosas:[
        { idMapa: 0,
          title:  "Tiranos de la desolación",
          ENtitle: "Tyrants of desolation",
          description: "En las profundidades submarinas del Arredice del Diablo, los tiranos de Y´hanthlei gobiernan las mareas tenebrosas mientras sueñan con transcender ses vetustas formas mortales. Se agitan bajo las aguas y envían a sus profundos para que corrompan el mundo de la superficie.",
          ENdescription: "In the underwater depths of the Devil’s Arredice, the tyrants of Y hanthlei rule the dark tides as they dream of transcending these ancient mortal forms. They stir under the waters and send them deep to corrupt the surface world.",
          imgMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa1MareasTenebrosas.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG1MapaAHMareasTenebrosas.jpg")
        },
        { idMapa: 1,
          title:  "La lámpara Mortecina",
          ENtitle: "The Mortecina lamp",
          description: "En el brumoso pueblo de Kingsport, la clase alta prospera en el seno de una nueva sociedad conocida como el Club de la Lámpara. En callejones y barrios bajos, muchas personas que habían desaparecido regresan despojados de sus recuerdos, como meras sombras de lo que fueron.",
          ENdescription: "In the foggy town of Kingsport, the upper class thrives within a new society known as the Lamp Club. In alleys and slums, many disappeared people return stripped of their memories, like mere shadows of what they were.",
          imgMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa2MareasTenebrosas.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG2MapaAHMareasTenebrosas.jpg")
        },
        { idMapa: 2,
          title:  "La progenie de Ithaqua",
          ENtitle: "The progeny of Ithaqua",
          description: "Ithaqua, el que camina en el viento, acecha en el gélido norte. Es el viento helado que cala hasta el alma, el hielo voras que aprisiona a los incautos. Olvidado y solitario, Ithaqua propaga si influencia coo la cruel esteranza de engendrar una progenie terrible, un nuevo vástago capaz de venzer a los mismísimos dioses arquetípicos.",
          ENdescription: "Ithaqua, who walks in the wind, lurks in the icy north. It is the icy wind that reaches to the soul, the vore ice that imprisons the unwary. Forgotten and lonely, Ithaqua propagates if it influences the cruel sterility of begetting a terrible progeny, a new offspring capable of defeating the archetypal gods themselves.",
          imgMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa3MareasTenebrosas.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG3MapaAHMareasTenebrosas.jpg")
        },
        { idMapa: 3,
          title:  "Sueños de R´lyeh",
          ENtitle: "Dreams of R´lyeh",
          description: "La fresca brisa otoñal arrastra consigo una melodía sobrenatural, prácticamente imperceptible para al mente despierta. En sueños, visitáis una fantástica ciudad submarina y os deleitáis en la gloria de una entidad ciclópea que no alcanzáis a ver.",
          ENdescription: "The fresh autumn breeze carries with it a supernatural melody, practically imperceptible to the awake mind. In dreams, you visit a fantastic underwater city and delight in the glory of a cyclopean entity that you cannot see.",
          imgMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/mapa4MareasTenebrosas.png"),
          BGMapa: require("@/assets/img/Games/AHMareasTenebrosas/1imgMapas/BG4MapaAHMareasTenebrosas.jpg")
        },
      ],


    }; // end return
  }, // end data
  updated(){},

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }, // end methods
};
</script>


<style scoped>
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
  grid-template-columns: auto auto;
}
.cajaDePersonajesBase{
  border: 2px solid green;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgb(30, 255, 0);
}
.cajaDePersonajesMareasTenebrosas{
  border: 2px solid rgb(255, 87, 87);
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgb(255, 0, 34);
}
.cajaDePersonajesOriginal{
  border: 2px solid rgb(87, 87, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgb(0, 47, 255);
}
.cajaimg{
  object-fit: cover;
  min-height: 80px;
}


</style>>