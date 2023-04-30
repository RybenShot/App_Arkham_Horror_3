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
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        ENarquetipo1: "As a SURVIVOR, your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
        arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
        ENarquetipo2: "As an EXPERT, you possess an exclusive set of skills that allow you to specialize in a specific task. Silas' lineage shares a sinister kinship with certain creatures of the Mythos, which gives you the unusual ability to predict and control the movements of the Monsters that threaten you.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Red de pesca",
            ENnombre: "Fishing net",
            descripcion:"Objeto - Común Vinculable. Durante tu turno, puedes vincular este Objeto a un monstruo no épico que esté en tu espacio para agotar a este Monstruo. Vínculo: este Monstruo no puede prepararse. Después de que derrotes a este Monstruo ganas el Objeto que tiene vinculado.",
            ENdescripcion:"Item - Linkable Common. During your turn, you can link this Item to a non-epic monster in your space to exhaust this Monster. Link: This Monster cannot prepare. After you defeat this Monster you win the Item it has linked."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Camisa de franela",
            ENnombre: "Flannel shirt",
            descripcion:"Objeto - Común Extraordinario. Una vez por turno, cuando un investigador situado en tu espacio resuelve una prueba, puedes infligir un punto de Daño a este Objeto para añadir dos Éxitos al resultado de su prueba.",
            ENdescripcion:"Object - Extraordinary Common. Once per turn, when a researcher in your space solves a test, you can inflict a Damage point on this Object to add two Hits to its test result."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Espíritu aventurero",
            ENnombre: "Adventurous spirit",
            descripcion:"Talento - Innato. Durante la fase de Encuentros, todas tus habilidades se incrementan en un punto.",
            ENdescripcion:"Talent - Innate. During the Encounters phase, all your abilities increase by one point."
          },
          expansion: null
      },
      
      Personajes: [
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
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        ENarquetipo1: "As a SURVIVOR, your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
        arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
        ENarquetipo2: "As an EXPERT, you possess an exclusive set of skills that allow you to specialize in a specific task. Silas' lineage shares a sinister kinship with certain creatures of the Mythos, which gives you the unusual ability to predict and control the movements of the Monsters that threaten you.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Red de pesca",
            ENnombre: "Fishing net",
            descripcion:"Objeto - Común Vinculable. Durante tu turno, puedes vincular este Objeto a un monstruo no épico que esté en tu espacio para agotar a este Monstruo. Vínculo: este Monstruo no puede prepararse. Después de que derrotes a este Monstruo ganas el Objeto que tiene vinculado.",
            ENdescripcion:"Item - Linkable Common. During your turn, you can link this Item to a non-epic monster in your space to exhaust this Monster. Link: This Monster cannot prepare. After you defeat this Monster you win the Item it has linked."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Camisa de franela",
            ENnombre: "Flannel shirt",
            descripcion:"Objeto - Común Extraordinario. Una vez por turno, cuando un investigador situado en tu espacio resuelve una prueba, puedes infligir un punto de Daño a este Objeto para añadir dos Éxitos al resultado de su prueba.",
            ENdescripcion:"Object - Extraordinary Common. Once per turn, when a researcher in your space solves a test, you can inflict a Damage point on this Object to add two Hits to its test result."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Espíritu aventurero",
            ENnombre: "Adventurous spirit",
            descripcion:"Talento - Innato. Durante la fase de Encuentros, todas tus habilidades se incrementan en un punto.",
            ENdescripcion:"Talent - Innate. During the Encounters phase, all your abilities increase by one point."
          },
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
        arquetipo1: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Charlie tiene don de gentes. Puedes valerte de su labia para sortear la mayoría de los obstáculos, y siempre dispones de una ayudante solícita.",
        ENarquetipo1: "As an EXPERT, you have an exclusive set of skills that allow you to specialize in a specific task. Charlie has a talent for people. You can use his speech to overcome most obstacles, and you always have a helpful assistant.",
        arquetipo2: "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
        ENarquetipo2: "As a SEEKER, you are a fearless hound. You should concentrate on getting Clues and discovering their meaning. Your work is essential to thwarting the evil designs of the First Ones.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Figura de autoridad",
            ENnombre: "Authority figure",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba utilizando una habilidad en la que te hayas concentrado, puedes hacer una tirada de INFLUENCIA en lugar de la habilidad requerida. (Los modificadores originales se siguen aplicando).",
            ENdescripcion:"Talent - Innate. Once per round, when you are solving a test using a skill that you have focused on, you can make a spin of INFLUENCE instead of the required skill. (The original modifiers are still applied)."
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Bonnie Walsh",
          ENnombre: "Bonnie Walsh",
          descripcion:"Aliada - Fiel ayudante. Una vez por ronda, antes de que resuelvas una prueba, puedes concentrarte en una habilidad de tu elección.",
          ENdescripcion:"Ally - Faithful helper. Once per round, before you solve a test, you can focus on an ability of your choice."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Cobrar favores",
          ENnombre: "Call in favors",
          descripcion:"Talento - Empleo. Al comienzo de tu turno, descarta todo el Dinero que haya sobre esta carta y haz una prueba de INFLUENCIA. Por cada Éxito que obtengas, coloca 1$ sobre esta carta. Puedes gastar el Dinero que haya sobre esta carta. (No puedes intercambiarlo).",
          ENdescripcion:"Talent - Employment. At the beginning of your turn, discard all Money on this card and take an INFLUENCE test. For every Success you get, place $1 on this card. You can spend the Money on this card. (You cannot exchange it)."
        },
        },
        {nombrePJ: "Stella Clark",
        idPersonaje: 15,
        posicion: "Cartera",
        ENosicion: "Portfolio",
        vida: 5,
        cordura: 7,
        saber: 3,
        influencia: 2,
        observacion: 3,
        fuerza: 2,
        voluntad: 3,
        dinero: 3,
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
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        ENarquetipo1: "As a SURVIVOR, your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
        arquetipo2: null,
        ENarquetipo2: null,
        Pertenencia1:{
          urlFoto: "",
          nombre: "Furgoneta de reparto",
          ENnombre: "Delivery van",
          descripcion:"Objeto - Común Vehículo. Cada vez que salgas de un espacio, todo investigador situado en ese espacio que no esté enfrentado para moverse contigo. Acción: muévete un máximo de dos espacios. Puedes realizar una acción de intercambio antes o después de este movimiento como acción adicional.",
          ENdescripcion:"Object - Common Vehicle. Every time you leave a space, any researcher located in that space that is not faced to move with you. Action: Move up to two spaces. You can perform an exchange action before or after this move as an additional action."
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Llamada de las tinieblas",
          ENnombre: "Call of the darkness",
          descripcion:"Cuando vayas a robar una ficha de Mitos, en vez de eso puedes sufrir un punto de Horror directo y colocar una ficha de Perdición en tu espacio.",
          ENdescripcion:"When you go to steal a Myths tab, instead you can suffer a direct Horror point and place a Doom tab in your space."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Llueva o truene",
          ENnombre: "Rain or shine",
          descripcion:"Talento - Innato. Una vez por turno, cuando vayas a fallar una prueba, puedes descartar una ficha de Concentración de VOLUNTAD para añadir un Éxito al resultado de tu prueba.",
          ENdescripcion:"Talent - Innate. Once per turn, when you are going to fail a test, you can discard a WILL Concentration tab to add a Success to your test result."
        },
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
        arquetipo1: "Como DEFENSORA, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarlos a recuperarse de daños físicos o mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
        ENarquetipo1: "As an DEFENDER, your responsibility is to protect your fellow researchers. This could mean helping them recover from physical or mental damage, or dispatching Monsters before they become a threat.",
        arquetipo2: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
        ENarquetipo2: "As a MYSTIC, you stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You are the best defensive option against the Primitives.",
        Pertenencia1:{
          urlFoto: "",
          nombre: "Cuchillo de cocina",
          ENnombre: "Kitchen knife",
          descripcion:"Objeto - Común Arma. Recibes +2 de FUERZA como parte de una acción de ataque. Después de que vuelvas a tirar un dado al resolver una prueba, añade un punto al resultado al resultado de ese dado.",
          ENdescripcion:"Object - Common Weapon. You receive +2 FORCE as part of an attack action. After you roll a die again when solving a test, add a point to the result of that die."
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Arma encantada",
          ENnombre: "Enchanted weapon",
          descripcion:"Hechizo - Ritual Vinculable. Al comienzo de tu turno, puedes hacer una prueba de SABER. Si la superas, vincula esta carta a un Arma situada en tu espacio. Vínculo: Una vez por ronda, cuando estés realizando una acción de ataque, puedes volver a tirar un dado o todos los dados.",
          ENdescripcion:"Spell - Binding Ritual. At the beginning of your turn, you can take a KNOW test. If you overcome it, link this card to a Weapon in your space. Link: Once per round, when you are performing an attack action, you can re-roll a dice or all dice."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "El crucifijo de Zoey",
          ENnombre: "The crucifix of Zoey",
          descripcion:"Objeto - Extraordinario. Después de que te enfrentes a un Monstruo, puedes infligir un punto de Daño a este Objeto para hacer una prueba de VOLUNTAD. Infringe a este Monstruo tanto Daño como el resultado de esta prueba.",
          ENdescripcion:"Object - Extraordinary. After you face a Monster, you can inflict a Damage point on this Object to test WILL. Infringe on this Monster both Damage and the result of this test."
        },
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
          arquetipo1: "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          ENarquetipo1: "As a MYSTIC, you stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives",
          arquetipo2: "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          ENarquetipo2: "As an DEFENDER, your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Señal de la cruz",
            ENnombre: "Sign of the cross",
            descripcion:"Talento - Innato. Encuentro: haz una prueba de VOLUNTAD -1. Por cada Éxito que obtengas, un investigador de tu elección situado en cualquier espacio descarta un Estado, recupera un punto de Vida o recupera un punto de Cordura.",
            ENdescripcion:"Talent - Innate. Encounter: make a test of WILL -1. For every Success you achieve, a researcher of your choice located in any space discards a State, retrieves a Life point or retrieves a Sanity point."
          },
          Pertenencia2: {
            urlFoto: "",
            nombre: "Una ficha de restos",
            ENnombre: "A scrap sheet",
            descripcion:"",
            ENdescripcion: ""
          },
          Pertenencia3: {
            urlFoto: "",
            nombre: "Agua bendita",
            ENnombre: "Holy water",
            descripcion:"Objeto - Extraordinario. Puedes tratar los modificadores de ataque y evasión de los Monstruos no Humanos que haya en tu espacio como si fueran +1. Después de que infrinjas Daño a un Monstruo no Humano durante una acción de ataque, agota a ese Monstruo.",
            ENdescripcion:"Item - Extraordinary. You can treat the attack and evasion modifiers of non-human monsters in your space as +1. After you damage a non-Human Monster during an attack action, exhaust that Monster."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Alejar la oscuridad",
            ENnombre: "Drive away the darkness",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, antes de que se resuelva un efecto de Retribución, puedes hacer una prueba de SABER -1. Si la superas, ese efecto de Retribución no se resuelve en la actual fase de Mitos.",
            ENdescripcion:"Spell - Spell. Once per round, before a Retribution effect is resolved, you can do a SABER -1 test. If you overcome it, that Retribution effect is not resolved in the current Myths phase."
          },
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
          arquetipo1: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
          ENarquetipo1: "As a MYSTIC, you stand out by erecting arcane safeguards against evil. Your main occupation should be to remove Doom tiles from the board. You contribute the best defensive option against the Primitives.",
          arquetipo2: "Como BUSCADORA, eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          ENarquetipo2: "As a SEEKER, you are a fearless hound. You should concentrate on getting Clues and discovering their hidden meaning. Your work is essential to thwarting the evil designs of the First Ones.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "El violín de Patricie",
            ENnombre: "The violin of Patricie",
            descripcion:"Objeto - Extraordinario. Después de que realices una acción de conseguir fondos, elige una habilidad. Todos los investigadores que estén en tu barrio pueden concentrarse en esta habilidad.",
            ENdescripcion:"Object - Extraordinary. After you perform a fundraising action, choose a skill. All researchers in your neighborhood can focus on this ability."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Melodía cautivadora",
            ENnombre: "Captivating melody",
            descripcion:"Talento - Innato. Puedes realizar una acción de salvaguarda aunque estés enfrentado a un Monstruo. Como parte de una acción de salvaguarda, por cada Exito que obtengas, puedes agotar a un Monstruo situado en tu espacio en vez de quitar una ficha de perdición.",
            ENdescripcion:"Talent - Innate. You can perform a safeguard action even if you are facing a Monster. As part of a safeguard action, for every Success you get, you can exhaust a Monster located in your space instead of removing a doom tile."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Ganas Sueños ominosos, pero añades al Vigía al mazo de Monstruos.",
            ENnombre: "You win Ominous Dreams, but you add the Lookout to the deck of Monsters.",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba, puedes volver a lanzar un dado en el que hayas obtenido un éxito a cambio de revelar o hacer aparecer una pista. Si se descarta este Talento, devuelve el Vigía a la caja del juego.",
            ENdescripcion:"Talent - Innate. Once per round, when you are solving a test, you can re-roll a die in which you have obtained a success in exchange for revealing or making a clue appear. If this Talent is discarded, return the Lookout to the game box."
          },
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
          arquetipo1: "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          ENarquetipo1: "As a SEEKER, you are a fearless hound. You should concentrate on getting clues and discovering their meaning. Your work is essential to thwarting the evil designs of the First Ones.",
          arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          ENarquetipo2: "As a SURVIVOR, your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Anticipación",
            ENnombre: "Anticipation",
            descripcion:"Talento - Innato. Después de que realices una acción de Concentración, puedes concentrarte en una habilidad adicional por cada Pista que haya en tu Barrio.",
            ENdescripcion:"Talent - Innate. After you perform a Concentration action, you can focus on an additional skill for each Track in your Neighborhood."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Como usted mande",
            ENnombre: "As you command",
            descripcion:"Talento - Innato. Una vez por ronda, después que otro investigador situado en cualquier espacio realice una acción, puedes gastar una ficha de concentración para realizar esa misma acción(Se aplican las restricciones normales a dicha acción).",
            ENdescripcion:"Talent - Innate. Once per round, after another researcher located in any space performs an action, you can spend a concentration tab to perform the same action (normal restrictions apply to that action)."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Preparado para todo",
            ENnombre: "Prepared for everything",
            descripcion:"Talento - Innato. Una vez por ronda, cuando un investigador situado en cualquier espacio sufra cualquier cantidad de daño o de Horror, puedes descartar una ficha de Concentración para anular ese Daño o ese Horror.",
            ENdescripcion:"Talent - Innate. Once per round, when a researcher located in any space suffers any amount of damage or Horror, you can discard a Concentration tab to nullify that Damage or Horror."
          },
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
          arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          ENarquetipo1: "As a SURVIVOR, your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory.",
          arquetipo2: null,
          ENarquetipo2: null,
          Pertenencia1:{
            urlFoto: "",
            nombre: "Duque",
            ENnombre: "Duque",
            descripcion:"Aliado - Fiel Sabueso. Recibes +1 de FUERZA como parte de una acción de ataque. Como parte de una acción de intercambio, puedes realizar el intercambio con uno o con varios investigadores que estén en tu barrio.",
            ENdescripcion:"Ally - Faithful Hound. You receive +1 FORCE as part of an attack action. As part of an exchange action, you can make the exchange with one or several researchers who are in your neighborhood."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "La guitarra de Pete",
            ENnombre: "Pete’s guitar",
            descripcion:"Objeto - Común Extraordinario. Después de que realices una acción de conseguir fondos, tantos investigadores que estén en tu barrio cómo tu puntuación de INFLUENCIA pueden recuperar un punto de Cordura o concentrarse en una habilidad de su elección (cada jugador elige una opción).",
            ENdescripcion:"Object - Extraordinary Common. After you do a fundraising action, as many researchers in your neighborhood as your INFLUENCE score can regain a Sanity point or concentrate on a skill of their choice (each player chooses an option)."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Trotamundos",
            ENnombre: "Globetrotter",
            descripcion:"Talento - Innato. Encuentro: una vez por ronda, puedes elegir un espacio adyacente. Resuelve un encuentro como si estuvieras en ese espacio, Tirando un dado menos en todas las pruebas que debas realizar durante ese encuentro.",
            ENdescripcion:"Talent - Innate. Encounter: once per round, you can choose an adjacent space. Solve an encounter as if you were in that space, pulling a dice off all the tests you have to perform during that encounter."
          },
        },
      ],

      contador: "0",
      viewPJ: true,
      // viewPlay: false,
    }; // end return
  }, // end data
  updated(){
    this.datosPJactual = this.Personajes[this.contador];
    //this.datosPJactual.nombrePJ = this.Personajes[this.contador].nombrePJ;
    //this.datosPJactual.posicion = this.Personajes[this.contador].posicion;
    //this.datosPJactual.vida = this.Personajes[this.contador].vida;
    //this.datosPJactual.cordura = this.Personajes[this.contador].cordura;
    //this.datosPJactual.saber = this.Personajes[this.contador].saber;
    //this.datosPJactual.influencia = this.Personajes[this.contador].influencia;
    //this.datosPJactual.observacion = this.Personajes[this.contador].observacion;
    //this.datosPJactual.fuerza = this.Personajes[this.contador].fuerza;
    //this.datosPJactual.voluntad = this.Personajes[this.contador].voluntad;
    //this.datosPJactual.limConcentracion = this.Personajes[this.contador].limConcentracion;
    //this.datosPJactual.efecto1 = this.Personajes[this.contador].efecto1;
    //this.datosPJactual.efecto2 = this.Personajes[this.contador].efecto2;
    //this.datosPJactual.frase = this.Personajes[this.contador].frase;
    //this.datosPJactual.historia = this.Personajes[this.contador].historia;
    //this.datosPJactual.Pertenencia1 = this.Personajes[this.contador].Pertenencia1;
    //this.datosPJactual.Pertenencia2 = this.Personajes[this.contador].Pertenencia2;
    //this.datosPJactual.Pertenencia3 = this.Personajes[this.contador].Pertenencia3;
    //this.datosPJactual.Pertenencia4 = this.Personajes[this.contador].Pertenencia4;
    //this.datosPJactual.arquetipo1 = this.Personajes[this.contador].arquetipo1;
    //this.datosPJactual.arquetipo2 = this.Personajes[this.contador].arquetipo2;
    //this.datosPJactual.expansion = this.Personajes[this.contador].expansion;

    if (this.contador == 0)      {this.datosPJactual.imgPersonaje = "imgSilas"} 
    else if (this.contador == 1) {this.datosPJactual.imgPersonaje = "imgCharlie"} 
    else if (this.contador == 2) {this.datosPJactual.imgPersonaje = "imgStella"} 
    else if (this.contador == 3) {this.datosPJactual.imgPersonaje = "imgZoey"} 
    else if (this.contador == 4) {this.datosPJactual.imgPersonaje = "imgPadre"} 
    else if (this.contador == 5) {this.datosPJactual.imgPersonaje = "imgPatricie"} 
    else if (this.contador == 6) {this.datosPJactual.imgPersonaje = "imgCarson"} 
    else if (this.contador == 7) {this.datosPJactual.imgPersonaje = "imgPete"} 
    else if (this.contador == 8) {this.datosPJactual.imgPersonaje = "imgMandy"} 
    else if (this.contador == 9) {this.datosPJactual.imgPersonaje = "imgMontarrey"} 
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
.imgPete {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJ20.jpg);}
.imgMandy {background-image: url(@/assets/img/Games/AHOriginal/2imgInvestigadores/PJ23.jpg);}
.imgMontarrey {background-image: url(@/assets/img/Games/AHOriginal/2imgInvestigadores/PJ24.jpg);}

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