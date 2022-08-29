<template>
  <div class="BGGeneralAH">
    
    <!-- SELECCION DE PJ -->
    <div v-if="viewPJ == true">
      <SeleccionPJcomponent
        :contador="contador"
        :datosPJactual ="datosPJactual"
        @cambioPersonaje ="cambiaPJ"
        @cambiarVistaHijo ="cambioVista"
        />
    </div><!-- end SELECCION DE PJ  -->

    <!-- VIEW PLAY!!!!! -->
    <div v-if="viewPJ == false">
      <PlayAHcomponent
      :datosPJactual ="datosPJactual"
      @cambiarVistaHijo ="cambioVista"
      />
    </div><!-- end VIEW PLAY -->

  </div>
</template>

<script>
import SeleccionPJcomponent from "@/components/AHClasico/seleccionPJAHClasico.vue";
import PlayAHcomponent from "@/components/AHClasico/playAHClasico.vue";

export default {
  name: "PersonajesAHClasico",
  components:{
    SeleccionPJcomponent,
    PlayAHcomponent
  },

  data() {
    return {
      datosPJactual:{
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
      },
      
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

    if (this.contador == 0)      {this.datosPJactual.imgPersonaje = "imgTommy"} 
    else if (this.contador == 1) {this.datosPJactual.imgPersonaje = "imgMarie"} 
    else if (this.contador == 2) {this.datosPJactual.imgPersonaje = "imgJenny"} 
    else if (this.contador == 3) {this.datosPJactual.imgPersonaje = "imgDexter"} 
    else if (this.contador == 4) {this.datosPJactual.imgPersonaje = "imgWendy"} 
    else if (this.contador == 5) {this.datosPJactual.imgPersonaje = "imgRex"} 
    else if (this.contador == 6) {this.datosPJactual.imgPersonaje = "imgCalvin"} 
    else if (this.contador == 7) {this.datosPJactual.imgPersonaje = "imgAgnes"} 
    else if (this.contador == 8) {this.datosPJactual.imgPersonaje = "imgMichael"} 
    else if (this.contador == 9) {this.datosPJactual.imgPersonaje = "imgDaniela"} 
    else if (this.contador == 10) {this.datosPJactual.imgPersonaje = "imgNorman"} 
    else if (this.contador == 11) {this.datosPJactual.imgPersonaje = "imgMinh"}
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