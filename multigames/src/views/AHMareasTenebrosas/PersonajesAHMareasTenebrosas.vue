<template>
  <div class="BGGeneralAH">
    
    <!-- SELECCION DE PJ -->
    <div v-if="viewPJ == true">
      <SeleccionPJcomponentMT
        :contador="contador"
        :datosPJactual ="datosPJactual"
        @cambioPersonaje ="cambiaPJ"
        @cambiarVistaHijo ="cambioVista"
        />
    </div><!-- end SELECCION DE PJ  -->

    <!-- VIEW PLAY!!!!! -->
    <div v-if="viewPJ == false">
      <PlayAHcomponentMT
      :datosPJactual ="datosPJactual"
      @cambiarVistaHijo ="cambioVista"
      />
    </div><!-- end VIEW PLAY -->

  </div>
</template>

<script>
import SeleccionPJcomponentMT from "@/components/AHMareasTenebrosas/seleccionPJAHMareasTenebrosas.vue";
import PlayAHcomponentMT from "@/components/AHMareasTenebrosas/playAHMareasTenebrosas.vue";

export default {
  name: "PersonajesAHClasico",
  components:{
    SeleccionPJcomponentMT,
    PlayAHcomponentMT
  },

  data() {
    return {
      datosPJactual:{
        imgPersonaje: "imgSilas",
        nombrePJ: "Silas Marsh",
        posicion: "Marinero",
        vida: 8,
        cordura: 4,
        saber: 1,
        influencia: 3,
        observacion: 3,
        fuerza: 3,
        voluntad: 3,
        dinero: 3,
        limConcentracion: 2,
        efecto1: "Sangre contaminada - Una vez por ronda, cuando se active un Monstruo preparado, puedes designar a cualquier investigador como su presa. Si ese Mostruo se enfrenta a ti, puedes recuperar dos puntos de Cordura.",
        efecto2: null,
        frase: '“He navegado por los siete mares, pero algo siempre acaba atrayéndome a este lugar.”',
        historia: "Silas se sentía atraído por el mar. A los catorece años respondió a su llamada y abandonó su pueblo natal, Insmouth, para enrolarse en un buque mercante. Enprendió su nueva vida desenvolviendose como pez en el agua, pues tenía un talento innato para la náutica, y juró que nunca regresaría. Lo cierto es que estaba ansioso por marcharse de aquel pueblo decrépito y corrupto, donde se le conocía por su parentesco lejano con la vieja familia Marsh que había sumido al pueblo en la decadencia. Silas se hayaba en una taberna del pueblo de Singapur cuando recibió la noticia del fallecimiento de sus padres. Ni siquiera volvió para asistir al funeral; se convenció a sí mismo de que era lo mejor. Se alegraba de haber dejado atrás aquel terrible lugar. Pero ahora sueña a menudo con su difunta madre, y así coo el mar le atraía cuando era joven, algo en Innsmouth le habia impulsado a volver.",
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
        Pertenencia1: "Red de pesca",
        Pertenencia2: null,
        Pertenencia3: "Camisa de franela",
        Pertenencia4: "Espíritu aventurero",
      },
      
      Personajes: [
        {nombrePJ: "Silas Marsh",
        posicion: "Marinero",
        vida: 8,
        cordura: 4,
        saber: 1,
        influencia: 3,
        observacion: 3,
        fuerza: 3,
        voluntad: 3,
        dinero: 3,
        limConcentracion: 2,
        efecto1: "Sangre contaminada - Una vez por ronda, cuando se active un Monstruo preparado, puedes designar a cualquier investigador como su presa. Si ese Mostruo se enfrenta a ti, puedes recuperar dos puntos de Cordura.",
        efecto2: null,
        frase: '“He navegado por los siete mares, pero algo siempre acaba atrayéndome a este lugar.”',
        historia: "Silas se sentía atraído por el mar. A los catorece años respondió a su llamada y abandonó su pueblo natal, Insmouth, para enrolarse en un buque mercante. Enprendió su nueva vida desenvolviendose como pez en el agua, pues tenía un talento innato para la náutica, y juró que nunca regresaría. Lo cierto es que estaba ansioso por marcharse de aquel pueblo decrépito y corrupto, donde se le conocía por su parentesco lejano con la vieja familia Marsh que había sumido al pueblo en la decadencia. Silas se hayaba en una taberna del pueblo de Singapur cuando recibió la noticia del fallecimiento de sus padres. Ni siquiera volvió para asistir al funeral; se convenció a sí mismo de que era lo mejor. Se alegraba de haber dejado atrás aquel terrible lugar. Pero ahora sueña a menudo con su difunta madre, y así coo el mar le atraía cuando era joven, algo en Innsmouth le habia impulsado a volver.",
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
        Pertenencia1: "Red de pesca",
        Pertenencia2: null,
        Pertenencia3: "Camisa de franela",
        Pertenencia4: "Espíritu aventurero",
        },
        {nombrePJ: "Charlie Kane",
        posicion: "Político",
        vida: 4,
        cordura: 8,
        saber: 2,
        influencia: 4,
        observacion: 3,
        fuerza: 2,
        voluntad: 2,
        dinero: 2,
        limConcentracion: "Tu limite es igual al número de Aliados que tengas.",
        efecto1: "Comisión de expertos - ACCCIÓN: gasta 2$, más 1$ adicional por cada aliado que tengas, para ganar un Aliado.",
        efecto2: "Liderazgo - Cada vez que descarten a uno de tus Aliados, sufres un punto de Horror directo.",
        frase: '“Confíen en mí, y confíen en Arkham.”',
        historia: "Prestar servicio a una comunidad tan peculiar como la de Arkham requiere malabares, pero el alcalde Charlie Kane ha maiobrado hábilmente para establecer contactos y alianzas entre las fuerzas vivas de la ciudad: la Universidad y la Sociedad Histórica, la Orden del Crepúsculo de Plata y los gitanos de la plaza de la Independencia, incluso entre las fuerzas de la ley y el crimen organizado. El pequeño diario encuadernado en cuero que Charlie recibió de su predecesor advertía contra amenazas antíguas y criaturas inefables que solamente podían mantenerse a raya con una vigilancia constante. El diario le sugería que algo colosal acechaba en los confines de este mundo, y aquella visión no dejaba lugar a dudas. Las estrellas son propicias. Ese algo se está acercando.",
	      arquetipo1: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta.Charlie tiene don de gentes. Puedes valerte de su labia para sortear la mayoría de los obtáculos, y siempre dispones de una ayudante slícita.",
        arquetipo2: "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
        Pertenencia1: "Figura de autoridad",
        Pertenencia2: null,
        Pertenencia3: "Bonnie Walsh",
        Pertenencia4: "Cobrar favores",
        },
        {nombrePJ: "Stella Clark",
        posicion: "Cartera",
        vida: 5,
        cordura: 7,
        saber: 3,
        influencia: 2,
        observacion: 3,
        fuerza: 2,
        voluntad: 3,
        dinero: 3,
        limConcentracion: 2,
        efecto1: "En plena faena - Al comienzo de tu primera fase de Acción de la partida, puedes moverte directamente a cualquier espacio.",
        efecto2: "Ruta de reparto - Después de moverte al menos tres espacios en una sola ronda, concéntrate en una habilidad de tu elección.",
        frase: '“Yo sé lo que es real, y no tengo tiempo para esto.”',
        historia: "Antes de empezar a trabajar para el servicio de correos de Arkham, Stella ya tenía dos cosas claras. En primer lugar, que sus padres había cometido un error al tratarla como a un niño y ponerle nombre de varón. En segundo lugar, que aquella casa en la cima del peñón que dominaba Kingsport le susurraba por la noches, llaándola por su verdadero nombre, el nombre que ella misma había escojido´Stella´. Repartir el correo seis dias a la semana hiciera el tiempo que hiciera no era un trabajo sencillo, pero stella estaba encantada porque sabía que ayudaba a mantener el contacto entre las personas. Hasta que empezó a encontrarse las cartas. Cuando terminaba el reparto, siempre le sobraba una carta. Siempre dirigida a ella. Siempre con matasellos de Kingsport. Y siempre contenia una sola palabra manuscrita con esmero: ´Stella´.",
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        arquetipo2: null,
        Pertenencia1: "Furgoneta de reparto",
        Pertenencia2: null,
        Pertenencia3: "Llamada de las tinieblas",
        Pertenencia4: "Llueva o truene",
        },
        {nombrePJ: "Zoey Samaras",
        posicion: "Cocinera",
        vida: 5,
        cordura: 7,
        saber: 1,
        influencia: 2,
        observacion: 1,
        fuerza: 3,
        voluntad: 4,
        dinero: 3,
        limConcentracion: 2,
        efecto1: "Por la gracia de san Jorge - Después de que derrotes a un Monstruo, puedes quitar una ficha de Perdición de tu espacio o bien recuperar un punto de vida.",
        efecto2: "Dentir la llamada - Después de que derrotes a un Mostruo que tenga la palabra clave Élite, ganas una Bendición.",
        frase: '“Por fín sé cuál es mi cometido.”',
        historia: "Zoey Samaras procuraba que sus cuchillos siempre estuviesen afilados. Al principio lo hacía por comsumbre, un hábito inculcado tras pasar años como pinche de los mejores chefs del mundo. Ellos le enseñadon que las herramientas del cocinero eran sus cuchillos y los fogones que transformaban lo sencillo en algo divino, algo trascendental. Una noche sintió como un impulso, como una voz en su cabeza que le dijo que tomase un camino diferente para volver a casa. y entonces se le cayó la venda de los ojos cuando vió a unos seres horribles de dientes afilados y ensangrentados que devoraban a un hombre en un callejón. la voz de su cabeza, la voz del mismisimo Dios, la apremió a purgar el mundo de su maligna voracidad, y con ello a purgar los horrores que acechaban entre las sombras. Sus herramientas le sirvieron bien.",
        arquetipo1: "Como DEFENSORA, tu responsavilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarlos a recuperarse de daños fisicos o mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
        arquetipo2: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
        Pertenencia1: "Cuchillo de cocina",
        Pertenencia2: null,
        Pertenencia3: "Arma encantada",
        Pertenencia4: "El crucifijo de Zoey1 ",
        },
        {nombrePJ: "Padre Mateo",
          posicion: "Sacerdote",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 1,
          fuerza: 2,
          voluntad: 2,
          dinero: 2,
          limConcentracion: 3,
          efecto1:
            "La sangre de los martiles - después de que sufras al menos un punto de Daño, ganas una ficha de Restos.",
          efecto2: "Memento mori - Una vez por ronda, cuando estés resolviendo una prueba, puedes gastar una ficha de Restos para volver a lanzar uno de tus dados o todos ellos.",
          frase:
            "“Et ne nos inducas in tentationem: sed libera nos a malo.”",
          historia: "BLA BLA BLA",
          arquetipo1:
            "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2:
            "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: "Señal de la cruz" ,
          Pertenencia2: "Una ficha de restos" ,
          Pertenencia3: "Agua bendita" ,
          Pertenencia4: "Alejar la oscuridad",
        },
        {nombrePJ: "Patricie Hathaway",
          posicion: "Violinista",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 2,
          observacion: 3,
          fuerza: 1,
          voluntad: 4,
          dinero: 3,
          limConcentracion: 3,
          efecto1: "Con los ojos del Vigía - Cada vez que se coloque o mueva Perdición de la hoja de Escenario, puedes concentrarte en una habilidad de tu elección (incluso aunque al hacerlo sobrepases tu límite de Concentración).",
          efecto2: null,
          frase: "“Escuchad la música del universo.”",
          historia: "BLA BLA BLA",
          arquetipo1:
            "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2:
            "Como BUSCADORA, eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          Pertenencia1: "El violín de Patricie" ,
          Pertenencia2: "Melodía cautivadora" ,
          Pertenencia3: "Ganas Sueños ominosos, pero añades al Vigía al mazo de Monstruos." ,
          Pertenencia4: null ,
        },
        {nombrePJ: "Carson Sinclair",
          posicion: "Tipo atormentado",
          vida: 6,
          cordura: 6,
          saber: 2,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 3,
          dinero: 2,
          limConcentracion: 3,
          efecto1: "Imprescindible pero discreto - Una vez por ronda, mientras un investigador sitado en cualquier espacio esté realizando na preba, puedes gastar una ficha de Concentración para que pueda volver a tirar un dado. Si lo haces, recuperas un punto de Cordura.",
          efecto2: null,
          frase: "“No dejaré que se enfrente a esto sin mi ayuda. No le fallaré como le fallé a él.”",
          historia: "BLA BLA BLA",
          arquetipo1:
            "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          Pertenencia1: "Anticipación" ,
          Pertenencia2: null ,
          Pertenencia3: "Como usted mande" ,
          Pertenencia4: "Preparado para todo",
        },
        {nombrePJ: "Pete Cubo de Basura ",
          posicion: "Vagabundo",
          vida: 7,
          cordura: 5,
          saber: 3,
          influencia: 1,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 1,
          limConcentracion: 3,
          efecto1: "Buscavidas - Después de que realices una acción de conseguir fondos, puedes ganar un Objeto del Catálogo con un precio impreso de 2 o menos.",
          efecto2: null,
          frase: "“Pierdan cuidado. Duque y yo estamos aquí para ayudar.”",
          historia: "BLA BLA BLKA",
          arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          arquetipo2: null,
          Pertenencia1: "Duque" ,
          Pertenencia2: null,
          Pertenencia3: "La guitarra de Pete" ,
          Pertenencia4: "Trotamundos" ,
        },
      ],

      contador: "0",
      viewPJ: true,
      // viewPlay: false,
    }; // end return
  }, // end data
  updated(){
    this.datosPJactual.nombrePJ = this.Personajes[this.contador].nombrePJ;
    this.datosPJactual.posicion = this.Personajes[this.contador].posicion;
    this.datosPJactual.vida = this.Personajes[this.contador].vida;
    this.datosPJactual.cordura = this.Personajes[this.contador].cordura;
    this.datosPJactual.saber = this.Personajes[this.contador].saber;
    this.datosPJactual.influencia = this.Personajes[this.contador].influencia;
    this.datosPJactual.observacion = this.Personajes[this.contador].observacion;
    this.datosPJactual.fuerza = this.Personajes[this.contador].fuerza;
    this.datosPJactual.voluntad = this.Personajes[this.contador].voluntad;
    this.datosPJactual.limConcentracion = this.Personajes[this.contador].limConcentracion;
    this.datosPJactual.efecto1 = this.Personajes[this.contador].efecto1;
    this.datosPJactual.efecto2 = this.Personajes[this.contador].efecto2;
    this.datosPJactual.frase = this.Personajes[this.contador].frase;
    this.datosPJactual.historia = this.Personajes[this.contador].historia;
    this.datosPJactual.Pertenencia1 = this.Personajes[this.contador].Pertenencia1;
    this.datosPJactual.Pertenencia2 = this.Personajes[this.contador].Pertenencia2;
    this.datosPJactual.Pertenencia3 = this.Personajes[this.contador].Pertenencia3;
    this.datosPJactual.Pertenencia4 = this.Personajes[this.contador].Pertenencia4;
    this.datosPJactual.arquetipo1 = this.Personajes[this.contador].arquetipo1;
    this.datosPJactual.arquetipo2 = this.Personajes[this.contador].arquetipo2;

    if (this.contador == 0)      {this.datosPJactual.imgPersonaje = "imgSilas"} 
    else if (this.contador == 1) {this.datosPJactual.imgPersonaje = "imgCharlie"} 
    else if (this.contador == 2) {this.datosPJactual.imgPersonaje = "imgStella"} 
    else if (this.contador == 3) {this.datosPJactual.imgPersonaje = "imgZoey"} 
    else if (this.contador == 4) {this.datosPJactual.imgPersonaje = "imgPadre"} 
    else if (this.contador == 5) {this.datosPJactual.imgPersonaje = "imgPatricie"} 
    else if (this.contador == 6) {this.datosPJactual.imgPersonaje = "imgCarson"} 
    else if (this.contador == 7) {this.datosPJactual.imgPersonaje = "imgAgnes"} 
  },

  methods: {
    cambiaPJ(seleccionMenosMas) {
      if (seleccionMenosMas == 'mas') {
        this.contador ++
      } else if(seleccionMenosMas == 'menos'){
        this.contador --
      } else {
        alert("Algo ha ido mal..")
      }
    }, // end cambiaPJ
    cambioVista(ValueCambiarVista){
      this.viewPJ = ValueCambiarVista
    } // end cambioVista

  }, // end methods
};
</script>


<style >
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");

@font-face{
  font-family: NombrePJs;
  src: url('@/assets/fonts/PJs/NombrePJs.ttf'), url('@/assets/fonts/PJs/NombrePJsItalic.ttf')
}
@font-face{
  font-family: Pacto Siniestro;
  src: url('@/assets/fonts/Pacto Siniestro/bloodcrow.ttf'), url('@/assets/fonts/Pacto Siniestro/bloodcrowc.ttf'), url('@/assets/fonts/Pacto Siniestro/bloodcrowci.ttf')
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
  background-image: url(@/assets/img/ZZOtros/BGGeneralAH.jpg);
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
.imgSilas {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ13.jpg);}
.imgCharlie {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ14.jpg);}
.imgStella {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ15.jpg);}
.imgZoey {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ16.jpg);}
.imgPadre {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ17.jpg);}
.imgPatricie {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ18.jpg);}
.imgCarson {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ19.jpg);}

.imgAgnes {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ20.jpg);}

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