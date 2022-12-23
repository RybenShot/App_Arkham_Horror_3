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
        efecto1: "Sangre contaminada - Una vez por ronda, cuando se active un Monstruo preparado, puedes designar a cualquier investigador como su presa. Si ese Monstruo se enfrenta a ti, puedes recuperar dos puntos de Cordura.",
        efecto2: null,
        frase: '“He navegado por los siete mares, pero algo siempre acaba atrayéndome a este lugar.”',
        historia: "Silas se sentía atraído por el mar. A los catorce años respondió a su llamada y abandonó su pueblo natal, Innsmouth, para enrolarse en un buque mercante. Emprendió su nueva vida desenvolviéndose como pez en el agua, pues tenía un talento innato para la náutica, y juró que nunca regresaría. Lo cierto es que estaba ansioso por marcharse de aquel pueblo decrépito y corrupto, donde se le conocía por su parentesco lejano con la vieja familia Marsh que había sumido al pueblo en la decadencia. Silas se hallaba en una taberna del pueblo de Singapur cuando recibió la noticia del fallecimiento de sus padres. Ni siquiera volvió para asistir al funeral; se convenció a sí mismo de que era lo mejor. Se alegraba de haber dejado atrás aquel terrible lugar. Pero ahora sueña a menudo con su difunta madre, y así como el mar le atraía cuando era joven, algo en Innsmouth le había impulsado a volver.",
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Red de pesca",
            descripcion:"Objeto - Común Vinculable. Durante tu turno, puedes vincular este Objeto a un monstruo no épico que esté en tu espacio para agotar a este Monstruo. Vínculo: este Monstruo no puede prepararse. Después de que derrotes a este Monstruo ganas el Objeto que tiene vinculado."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Camisa de franela",
            descripcion:"Objeto - Común Extraordinario. Una vez por turno, cuando un investigador situado en tu espacio resuelve una prueba, puedes infligir un punto de Daño a este Objeto para añadir dos Éxitos al resultado de su prueba."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Espíritu aventurero",
            descripcion:"Talento - Innato. Durante la fase de Encuentros, todas tus habilidades se incrementan en un punto."
          },
          expansion: null
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
        efecto1: "Sangre contaminada - Una vez por ronda, cuando se active un Monstruo preparado, puedes designar a cualquier investigador como su presa. Si ese Monstruo se enfrenta a ti, puedes recuperar dos puntos de Cordura.",
        efecto2: null,
        frase: '“He navegado por los siete mares, pero algo siempre acaba atrayéndome a este lugar.”',
        historia: "Silas se sentía atraído por el mar. A los catorce años respondió a su llamada y abandonó su pueblo natal, Innsmouth, para enrolarse en un buque mercante. Emprendió su nueva vida desenvolviéndose como pez en el agua, pues tenía un talento innato para la náutica, y juró que nunca regresaría. Lo cierto es que estaba ansioso por marcharse de aquel pueblo decrépito y corrupto, donde se le conocía por su parentesco lejano con la vieja familia Marsh que había sumido al pueblo en la decadencia. Silas se hallaba en una taberna del pueblo de Singapur cuando recibió la noticia del fallecimiento de sus padres. Ni siquiera volvió para asistir al funeral; se convenció a sí mismo de que era lo mejor. Se alegraba de haber dejado atrás aquel terrible lugar. Pero ahora sueña a menudo con su difunta madre, y así como el mar le atraía cuando era joven, algo en Innsmouth le había impulsado a volver",
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. El linaje de Silas comparte un siniestro lazo de parentesco con ciertas criaturas de los Mitos, lo cual te confiere la insólita capacidad de predecir y controlar los movimientos de los Monstruos que os amenazan.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Red de pesca",
            descripcion:"Objeto - Común Vinculable. Durante tu turno, puedes vincular este Objeto a un monstruo no épico que esté en tu espacio para agotar a este Monstruo. Vínculo: este Monstruo no puede prepararse. Después de que derrotes a este Monstruo ganas el Objeto que tiene vinculado."
          },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Camisa de franela",
          descripcion:"Objeto - Común Extraordinario. Una vez por turno, cuando un investigador situado en tu espacio resuelve una prueba, puedes infligir un punto de Daño a este Objeto para añadir dos Éxitos al resultado de su prueba."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Espíritu aventurero",
          descripcion:"Talento - Innato. Durante la fase de Encuentros, todas tus habilidades se incrementan en un punto."
        },
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
        limConcentracion: "Tu límite es igual al número de Aliados que tengas.",
        efecto1: "Comisión de expertos - ACCIÓN: gasta 2$, más 1$ adicional por cada aliado que tengas, para ganar un Aliado.",
        efecto2: "Liderazgo - Cada vez que descarten a uno de tus Aliados, sufres un punto de Horror directo.",
        frase: '“Confíen en mí, y confíen en Arkham.”',
        historia: "Prestar servicio a una comunidad tan peculiar como la de Arkham requiere malabares, pero el alcalde Charlie Kane ha maniobrado hábilmente para establecer contactos y alianzas entre las fuerzas vivas de la ciudad: la Universidad y la Sociedad Histórica, la Orden del Crepúsculo de Plata y los gitanos de la plaza de la Independencia, incluso entre las fuerzas de la ley y el crimen organizado. El pequeño diario encuadernado en cuero que Charlie recibió de su predecesor advertía contra amenazas antiguas y criaturas inefables que solamente podían mantenerse a raya con una vigilancia constante. El diario le sugería que algo colosal acechaba en los confines de este mundo, y aquella visión no dejaba lugar a dudas. Las estrellas son propicias. Ese algo se está acercando.",
	      arquetipo1: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Charlie tiene don de gentes. Puedes valerte de su labia para sortear la mayoría de los obstáculos, y siempre dispones de una ayudante solícita.",
        arquetipo2: "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Figura de autoridad",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba utilizando una habilidad en la que te hayas concentrado, puedes hacer una tirada de INFLUENCIA en lugar de la habilidad requerida. (Los modificadores originales se siguen aplicando)."
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Bonnie Walsh",
          descripcion:"Aliada - Fiel ayudante. Una vez por ronda, antes de que resuelvas una prueba, puedes concentrarte en una habilidad de tu elección."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Cobrar favores",
          descripcion:"Talento - Empleo. Al comienzo de tu turno, descarta todo el Dinero que haya sobre esta carta y haz una prueba de INFLUENCIA. Por cada Éxito que obtengas, coloca 1$ sobre esta carta. Puedes gastar el Dinero que haya sobre esta carta. (No puedes intercambiarlo)."
        },
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
        historia: "Antes de empezar a trabajar para el servicio de correos de Arkham, Stella ya tenía dos cosas claras. En primer lugar, que sus padres había cometido un error al tratarla como a un niño y ponerle nombre de varón. En segundo lugar, que aquella casa en la cima del peñón que dominaba Kingsport le susurraba por la noches, llamándola por su verdadero nombre, el nombre que ella misma había escogido ´Stella´. Repartir el correo seis días a la semana hiciera el tiempo que hiciera no era un trabajo sencillo, pero stella estaba encantada porque sabía que ayudaba a mantener el contacto entre las personas. Hasta que empezó a encontrarse las cartas. Cuando terminaba el reparto, siempre le sobraba una carta. Siempre dirigida a ella. Siempre con matasellos de Kingsport. Y siempre contenía una sola palabra manuscrita con esmero: ´Stella´.",
        arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        arquetipo2: null,
        Pertenencia1:{
            urlFoto: "",
            nombre: "Furgoneta de reparto",
            descripcion:"Objeto - Común Vehículo. Cada vez que salgas de un espacio, todo investigador situado en ese espacio que no esté enfrentado para moverse contigo. Acción: muévete un máximo de dos espacios. Puedes realizar una acción de intercambio antes o después de este movimiento como acción adicional."
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Llamada de las tinieblas",
          descripcion:"Cuando vayas a robar una ficha de Mitos, en vez de eso puedes sufrir un punto de Horror directo y colocar una ficha de Perdición en tu espacio."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "Llueva o truene",
          descripcion:"Talento - Innato. Una vez por turno, cuando vayas a fallar una prueba, puedes descartar una ficha de Concentración de VOLUNTAD para añadir un Éxito al resultado de tu prueba."
        },
        },
        {nombrePJ: "Zoey Samaras",
        posicion: "Cocinera",
        vida: 5,
        cordura: 7,
        saber: 3,
        influencia: 2,
        observacion: 1,
        fuerza: 3,
        voluntad: 4,
        dinero: 3,
        limConcentracion: 2,
        efecto1: "Por la gracia de san Jorge - Después de que derrotes a un Monstruo, puedes quitar una ficha de Perdición de tu espacio o bien recuperar un punto de vida.",
        efecto2: "Sentir la llamada - Después de que derrotes a un Monstruo que tenga la palabra clave Élite, ganas una Bendición.",
        frase: '“Por fin sé cuál es mi cometido.”',
        historia: "Zoey Samaras procuraba que sus cuchillos siempre estuviesen afilados. Al principio lo hacía por costumbre, un hábito inculcado tras pasar años como pinche de los mejores chefs del mundo. Ellos le enseñaron que las herramientas del cocinero eran sus cuchillos y los fogones que transforman lo sencillo en algo divino, algo trascendental. Una noche sintió como un impulso, como una voz en su cabeza que le dijo que tomase un camino diferente para volver a casa. y entonces se le cayó la venda de los ojos cuando vió a unos seres horribles de dientes afilados y ensangrentados que devoraban a un hombre en un callejón. la voz de su cabeza, la voz del mismísimo Dios, la apremió a purgar el mundo de su maligna voracidad, y con ello a purgar los horrores que acechaban entre las sombras. Sus herramientas le sirvieron bien.",
        arquetipo1: "Como DEFENSORA, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarlos a recuperarse de daños físicos o mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
        arquetipo2: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Constituyes la mejor opción defensiva contra los Primigenios.",
        Pertenencia1:{
            urlFoto: "",
            nombre: "Cuchillo de cocina",
            descripcion:"Objeto - Común Arma. Recibes +2 de FUERZA como parte de una acción de ataque. Después de que vuelvas a tirar un dado al resolver una prueba, añade un punto al resultado al resultado de ese dado."
        },
        Pertenencia2: null ,
        Pertenencia3: {
          urlFoto: "",
          nombre: "Arma encantada",
          descripcion:"Hechizo - Ritual Vinculable. Al comienzo de tu turno, puedes hacer una prueba de SABER. Si la superas, vincula esta carta a un Arma situada en tu espacio. Vínculo: Una vez por ronda, cuando estés realizando una acción de ataque, puedes volver a tirar un dado o todos los dados."
        },
        Pertenencia4: {
          urlFoto: "",
          nombre: "El crucifijo de Zoey",
          descripcion:"Objeto - Extraordinario. Después de que te enfrentes a un Monstruo, puedes infligir un punto de Daño a este Objeto para hacer una prueba de VOLUNTAD. Infringe a este Monstruo tanto Daño como el resultado de esta prueba."
        },
        },
        {nombrePJ: "Padre Mateo",
          posicion: "Sacerdote",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 1,
          fuerza: 2,
          voluntad: 4,
          dinero: 2,
          limConcentracion: 3,
          efecto1: "La sangre de los mártiles - después de que sufras al menos un punto de Daño, ganas una ficha de Restos.",
          efecto2: "Memento mori - Una vez por ronda, cuando estés resolviendo una prueba, puedes gastar una ficha de Restos para volver a lanzar uno de tus dados o todos ellos.",
          frase:"“Et ne nos inducas in tentationem: sed libera nos a malo.”",
          historia: "Cuando era joven, el Padre Mateo Castile encontraba consuelo en la convicción de vivir en un mundo justo, al amparo de un Dios bueno y misericordioso. Aunque las cosas que vió antes de la abandonar la misión le causaron una profunda impresión, se aferró a la idea de que toda aquella locura, las espantosas criaturas que hostigaban a los lugareños y la grotesca estatua que halló en aquella cueva no eran sinó amenazas mundanas, pero no podía evitar que la duda le corroyese: si semejantes demonios eran reales, ¿Porqué las oraciones de Mateo nunca recibían respuesta? En algún lugar de este universo frío y despiadado, infestado de demonios, monstruos y fuerzas aún más terribles, debía de manifestarse la verdadera gracia de Diós. Mateo se propuso buscar de nuevo Su luz. Tenía que hacerlo.",
          arquetipo1: "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2: "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Señal de la cruz",
            descripcion:"Talento - Innato. Encuentro: haz una prueba de VOLUNTAD -1. Por cada Éxito que obtengas, un investigador de tu elección situado en cualquier espacio descarta un Estado, recupera un punto de Vida o recupera un punto de Cordura."
          },
          Pertenencia2: {
            urlFoto: "",
            nombre: "Una ficha de restos",
            descripcion:""
          },
          Pertenencia3: {
            urlFoto: "",
            nombre: "Agua bendita",
            descripcion:"Objeto - Extraordinario. Puedes tratar los modificadores de ataque y evasión de los Monstruos no Humanos que haya en tu espacio como si fueran +1. Después de que infrinjas Daño a un Monstruo no Humano durante una acción de ataque, agota a ese Monstruo."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Alejar la oscuridad",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, antes de que se resuelva un efecto de Retribución, puedes hacer una prueba de SABER -1. Si la superas, ese efecto de Retribución no se resuelve en la actual fase de Mitos."
          },
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
          historia: "La música reconfortaba a Patricie Hathaway cuando era niña. Mientras sujetaba su violín bajo su mentón aseguraba experimentar visiones de mundos fantásticos y paisajes mágicos. Lo diagnosticaron como sinestesia, y sus tutores le explicaron que era capaz de ver la música de un modo que nadie podía; aquello la convertiría en un prodigio. Pero durante su adolescencia, una entidad que habitaba en el mundo mágico vislumbrado a través de su música le devolvió la mirada, y entonces todo cambió. Patricie sabía que todo cuanto percibía era real, y sus visiones se volvieron ominosas. El Vigía apenas se apartaba de ella. Acudía a su mente cuando tocaba, y a través de sus ojos ella veía el mundo en ruinas. ¿Sería ella quien provocase aquella catástrofe, o acaso el Vigía trataba de advertirla? Patricie tenía que averiguarlo.",
          arquetipo1: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
          arquetipo2: "Como BUSCADORA, eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "El violín de Patricie",
            descripcion:"Objeto - Extraordinario. Después de que realices una acción de conseguir fondos, elige una habilidad. Todos los investigadores que estén en tu barrio pueden concentrarse en esta habilidad."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Melodía cautivadora",
            descripcion:"Talento - Innato. Puedes realizar una acción de salvaguarda aunque estés enfrentado a un Monstruo. Como parte de una acción de salvaguarda, por cada Exito que obtengas, puedes agotar a un Monstruo situado en tu espacio en vez de quitar una ficha de perdición."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Ganas Sueños ominosos, pero añades al Vigía al mazo de Monstruos.",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba, puedes volver a lanzar un dado en el que hayas obtenido un éxito a cambio de revelar o hacer aparecer una pista. Si se descarta este Talento, devuelve el Vigía a la caja del juego."
          },
        },
        {nombrePJ: "Carson Sinclair",
          posicion: "Mayordomo",
          vida: 6,
          cordura: 6,
          saber: 2,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 3,
          dinero: 2,
          limConcentracion: 3,
          efecto1: "Imprescindible pero discreto - Una vez por ronda, mientras un investigador situado en cualquier espacio esté realizando una prueba, puedes gastar una ficha de Concentración para que pueda volver a tirar un dado. Si lo haces, recuperas un punto de Cordura.",
          efecto2: null,
          frase: "“No dejaré que se enfrente a esto sin mi ayuda. No le fallaré como le fallé a él.”",
          historia: "Carson Sinclair ha trabajado al servicio de la familia Webb durante 3 generaciones, ocupándose de las tareas domésticas y proporcionando valiosos consejos. Hasta la intromisión de aquel forastero. Pese a las protestas de Carson, Dupuis inició a Hercule Webb, el señor de la casa, en perniciosas y arriesgadas prácticas ocultistas. Carson temía lo que pudiese suceder cuando los dos hombres se enclaustraban en el estudio durante días, enfrascados en la lectura de volúmenes arcanos y celebrando blasfemos rituales. Cuando el amo Webb desapareció durante una de esas ceremonias Carson juró que protegerá8 a sus descendientes, Lydia y Eugene, de la amenaza persistente de Dupuis, de sus perversos asociados y a la oscuridad a la que sirven.",
          arquetipo1: "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Anticipación",
            descripcion:"Talento - Innato. Después de que realices una acción de Concentración, puedes concentrarte en una habilidad adicional por cada Pista que haya en tu Barrio."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Como usted mande",
            descripcion:"Talento - Innato. Una vez por ronda, después que otro investigador situado en cualquier espacio realice una acción, puedes gastar una ficha de concentración para realizar esa misma acción(Se aplican las restricciones normales a dicha acción)."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Preparado para todo",
            descripcion:"Talento - Innato. Una vez por ronda, cuando un investigador situado en cualquier espacio sufra cualquier cantidad de daño o de Horror, puedes descartar una ficha de Concentración para anular ese Daño o ese Horror."
          },
        },
        {nombrePJ: "Pete Cubo de Basura",
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
          historia: "Hace ya bastantes años que Pete se echó a la carretera con su fiel compañero Duque. Pete no tiene familia ni hogar; viaja de ciudad en ciudad ganándose la vida como puede, aunque su principal ocupación consiste en admirar el paisaje; normalmente se deja guiar por sus visiones que le conducen hasta quienes le necesitan, gente que vive en lugares que él puede visitar pero en los que no hay lugar para él. Pero últimamente estas visiones han tomado un cariz más siniestro. Ahora son visiones de oscuridad y de una maldad indescriptible. Visiones de muerte y descomposición. De locura ante la faz de lo infinito. Visiones que le han conducido hasta aquí, hasta la ciudad de Arkham. Y esta vez no tiene claro si podrá ayudar a nadie, ni siquiera si vivirá para contarlo. ",
          arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          arquetipo2: null,
          Pertenencia1:{
            urlFoto: "",
            nombre: "Duque",
            descripcion:"Aliado - Fiel Sabueso. Recibes +1 de FUERZA como parte de una acción de ataque. Como parte de una acción de intercambio, puedes realizar el intercambio con uno o con varios investigadores que estén en tu barrio."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "La guitarra de Pete",
            descripcion:"Objeto - Común Extraordinario. Después de que realices una acción de conseguir fondos, tantos investigadores que estén en tu barrio cómo tu puntuación de INFLUENCIA pueden recuperar un punto de Cordura o concentrarse en una habilidad de su elección (cada jugador elige una opción)."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Trotamundos",
            descripcion:"Talento - Innato. Encuentro: una vez por ronda, puedes elegir un espacio adyacente. Resuelve un encuentro como si estuvieras en ese espacio, Tirando un dado menos en todas las pruebas que debas realizar durante ese encuentro."
          },
        },
        {nombrePJ: "Mandy Thompson",
          posicion: "Investigadora",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 4,
          fuerza: 1,
          voluntad: 2,
          dinero: 3,
          limConcentracion: 3,
          efecto1: "Investigacion en profundidad - Para activar esta habilidad tendrás que coger una carta de Mancillado. Si ya estás mancillado, no puedes activar esta habilidad. Una vez por ronda, puedes elegir al principio del turno a un investigador. Durante esa ronda,ese investigador puede volver a lanzar todos los dados de las pruebas que haya fallado.",
          efecto2: null,
          frase: "“No puede morir lo que yace eternamente... Quizas sea esto a lo que se refería.”",
          historia: "Mandy llegó a Arkham hace varios años buscando trabajo de investigadora en la Universidad de Miskatonic. Desde entonces ha trabajado con muchos de los profesores de la universidad, profundizando en tomos esotéricos plagados de información científica, archivos históricos y a veces incluso desvaríos ocultistas. La semana pasada, mientras leía un viejo libro de profecías, sintió por primera vez que se había topado con algo gordo. Mandy llegó a creer que ciertos signos y augurios descritos en el libro estaban teniendo lugar en Arkham en ese mismo momento: presagios que anunciaban el regreso de un ser terrible al que se denominaba Primigenio, que aplastaría las ciudades del Hombre bajo su abominable paso. Esta noche, la luna llena se ha vuelto de color rojo sangre, el último augurio de la llegada del Primigenio. Deslizándose en la noche, armada con su conocimiento de la profecía, Mandy ha decidido ver si puede desafiar al destino e impedir que ocurran tales acontecimientos.",
          arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          arquetipo2: "Como BUSCADOR , eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Cuaderno de notas",
            descripcion:"Objeto. Si en la fase de Mitos sacas una ficha de explosion de portal. Ganas 2 pistas de la caja de pistas."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "El camino corto.",
            descripcion:"Talento. Si empiezas tu turno en una calle, puedes moverte directamente a cualquier calle del mapa y empezar tu turno desde allí."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Pruebas irrefutables",
            descripcion:"Acción: Haz una tirada de INFLUENCIA , si consigues 2 aciertos, consigues un aliado."
          },
          expansion: "Original - SegundaEd."
        },
        {nombrePJ: "Montarrey Jack",
          posicion: "Arqueologo",
          vida: 4,
          cordura: 8,
          saber: 2,
          influencia: 2,
          observacion: 3,
          fuerza: 3,
          voluntad: 3,
          dinero: 3,
          limConcentracion: 2,
          efecto1: "Amuleto antiguo - objeto Extraordinario. Una vez por turno,puedes cambiar 2 puntos de daño que vayas a recibir por 1 punto de horror.",
          efecto2: null,
          frase: "“Esa estatua significaba algo, estoy seguro.”",
          historia: "Monterrey lleva muchos años trabajando como aventurero trotamundos y cazador de tesoros. Siguiendo los pasos de su padre, siempre ha intentado asegurarse de preservar el valor científico de sus hallazgos. Recientemente siguió una pista que le condujo a una antigua estatua prehistórica en Arkham. Cuando llegó, sin embarğo, el hombre al que iba a comprar dicha estatuilla estaba encerrado en el manicomio. Monterrey estaba a punto de rendirse e irse a casa disgustado cuando una figura envuelta en una túnica pasó junto a él. Durante un instante, Monterrey vislumbró el destello de un colgante de plata con un símbolo que jamás olvidará. Ese símbolo había sido grabado en la frente de su padre cuando lo asesinaron, y le ha perseguido en sus sueños durante años. Persiguió a la misteriosa figura hasta que, al girar una esquina, comprobó que su presa se había desvanecido. No obstante, Monterrey sabe que en algun lugar de Arkham se halla la respuesta al misterio del asesinato de su padre, y no piensa marcharse hasta encontrarla.",
          arquetipo1: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          arquetipo2: null,
          Pertenencia1:{
            urlFoto: "",
            nombre: "Látigo de la película",
            descripcion:"Arma - Extraordinario. Te da +2 de FUERZA en las tiradas de ataque. Puedes atacar cuantas veces quieras usando este arma."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Hechizo de Sacrificio.",
            descripcion:"Vinculado - hechizo Extraordinario. Asigna esta carta a un arma, por cada 6 que saque usando dicha arma, pon un contador de +1, cuando el contador llegue a +10 podrás usar todo el poder acumulado en 1 solo ataque, PERO perderás 2 de Vida debido a la desmesurada fuerza del ataque,el ataque afecta a todos lo enemigos de la misma zona. Después descarta la carta de hechizo y el arma."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Hasta el último aliento.",
            descripcion:"Talento - Innato.Por turno puedes sufrir 2 puntos de Horror para volver a tirar cualquier cantidad de dados."
          },
          expansion: "Original - SegundaEd."
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
    this.datosPJactual.expansion = this.Personajes[this.contador].expansion;

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
.imgMandy {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJo21.jpg);}
.imgMontarrey {background-image: url(@/assets/img/Games/AHMareasTenebrosas/2imgInvestigadores/PJo22.jpg);}

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