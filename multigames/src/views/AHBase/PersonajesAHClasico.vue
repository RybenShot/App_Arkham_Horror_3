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
import SeleccionPJcomponent from "@/components/AHBase/seleccionPJAHBase.vue";
import PlayAHcomponent from "@/components/AHBase/playAHBase.vue";

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
        efecto1: "Protector: Si un Monstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tú a ese Monstruo en su lugar.",
        efecto2: null,
        frase: '“Vamos allá, Tommy. Es hora de hacerse el héroe.”',
        historia: "Los Muldoon habían servido en el cuerpo de policía durante generaciones, y Tommy no iba a ser menos. Fue el orgullo de su familia cuando se graduó en la academia de Boston. Por eso no hizo mucha gracia que lo trasladasen a la comisaría de Arkham; después de todo ¿qué podía ocurrir en aquel pueblucho comparado con los crímenes que habría sido capaz de resolver en Boston? Al final resultó que el trabajo policial en Arkham no estaba exento de interés, después de todo. Había muchos sucesos inexplicables, y la policía local parecía más interesada en aparentar normalidad que en buscar una solución. Así que Tommy echó mano a Becky, el rifle de su abuelo, y se dispuso a buscar soluciones por su cuenta ...",
        arquetipo1: "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
        arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria",
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
            "Protector: Si un Monstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tú a ese Monstruo en su lugar.",
          efecto2: null,
          frase: "“Vamos alla, Tommy. Es hora de hacerse el Heroe”",
          historia:
            "Los Muldoon habían servido en el cuerpo de policía durante generaciones, y Tommy no iba a ser menos. Fue el orgullo de su familia cuando se graduó en la academia de Boston. Por eso no hizo mucha gracia que lo trasladasen a la comisaría de Arkham; después de todo ¿qué podía ocurrir en aquel pueblucho comparado con los crímenes que habría sido capaz de resolver en Boston? Al final resultó que el trabajo policial en Arkham no estaba exento de interés, después de todo. Había muchos sucesos inexplicables, y la policía local parecía más interesada en aparentar normalidad que en buscar una solución. Así que Tommy echó mano a Becky, el rifle de su abuelo, y se dispuso a buscar soluciones por su cuenta ...",
          arquetipo1:
            "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria",
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
            "Voz Aterciopelada: Una vez por ronda, después de que realices una acción, otro investigador que esté en cualquier espacio puede realizar esa misma acción.(Se siguen aplicando las restricciones habituales a las acciones.)",
          efecto2: null,
          frase: "“Presta atención y déjate encandilar por mi voz”",
          historia: "Marie ignoraba por qué su grand-mère se había marchado a Arkham, pero sin duda la anciana tendría sus motivos. No sabía por qué el resto de su familia se había mantenido lejos de aquella ciudad, aún después de que su grand-mère falleciese. 'Deberías ir a visitarla', le dijo su padre. 'Seguro que le das una alegría'.  Como si la anciana no estuviese muerta y enterrada. Marie consiguió que la contratasen para actuar en un local de Arkham, Algo trivial para la VOZ ATERCIOPELADA del jazz. Y procuró no pensar en las canciones que invadían sus sueños, ni en sus terribles tonos inhumanos, ni en aquel horripilante caballero, tan parecido al mismísimo barón Samedi, que siempre estaba entre el público cuando actuaba ...",
          arquetipo1:
            "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          Pertenencia1: "Intervención" ,
          Pertenencia2: null ,
          Pertenencia3: "El cuchillo de grande-mère" ,
          Pertenencia4: "Sangre de bruja",
          HistoriaYT: "nLVtMyycF2A"
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
            "Fondo fiduciario -- Acción: Si tienes menos de 3$, ganas 3$",
          efecto2: null,
          frase:
            "“No me importa solucionar problemas a golpe de talonario; y si eso no funciona, ya los golpearé con alguna otra cosa”",
          historia: "Aunque le apasionaban los lujos y el dinero, Jenny siempre ha tenido una vena curiosa y aventurera. Adora la moda y la alta sociedad de París y Venecia, pero se mueve con la misma soltura cazando en los campos de Escocia que juega en los clubes de Nueva Orleans. Incluso financió una excavación arqueológica por el mero hecho de ser la primera en entrar en aquella tumba antigua. Por eso, cuando se enteró de que su hermana Isabelle había desaparecido, Jenny viajó a Arkham para tomar cartas en el asunto personalmente. Puede que vivir en medio de tanta opulencia y poder la hubiese vuelto demasiado confiada ... o tal vez los rufianes que secuestraron a su hermana habían cometido su último error.",
          arquetipo1:
            "Como EXPERTA, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Jenny no tiene ningún reparo a la hora de solventar sus problemas con Dinero; no dudes en gastarlo cuando te venga bien.",
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
          limConcentracion: "Es igual al número de hechizos que tengas",
          efecto1:
            "Don para la magia -- Una vez por ronda, cuando estés resolviendo una prueba de SABER, puedes volver a tirar uno o todos los dados",
          efecto2: null,
          frase:
            "“No te conviene ver la auténtica magia, chico. Nadie debería verla nunca.”",
          historia: "La magia, concretamente el ilusionismo, fué la principal afición de Dexter Drake en su infancia y durante la Gran Guerra. De pequeño soñaba con la auténtica hechicería, pero nunca logró pasar de escamotear monedas y realizar otros trucos de salón ... hasta que aquél viejo mago callejero desató su maldición. Así fué como Dexter averiguó la verdad: Que existía la magia auténtica, y era más terrible de lo que nunca imaginó. ¿Y qué podía hacer él sino estudiarla en la medida de sus posibilidades? Descubrir el truco, el conejo en la chistera, el secreto que hacía que todo cobrara sentido. Pero en este caso la chistera es la realidad, y el Gran Drake cada vez tiene menos claro que merezca la pena desvelar su secreto.",
          arquetipo1:
            "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2: null,
          Pertenencia1: "Nieblas de R'lyeh" ,
          Pertenencia2: null ,
          Pertenencia3: "Bastón de mago" ,
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
            "“Algún día encontraré a papá, y mamá vendrá a casa con nosotros y volveremos a ser felices. Ya lo veréis.”",
          historia: "Después de que su padre desapareciese en alta mar y su madre fuese ingresada en un psiquiátrico, Wendy acabó en un orfanato. Ella sabía que su madre no estaba loca: los cánticos que recitaba, los símbolos que garabateaba, todo lo hacía para protegerla. Por eso le había dado aquél amuleto que tenía dibujada una estrella de cinco puntas torcida, pero Wendy sabía que no estaba a salvo en el orfanato sin la protección de su madre, así que se fugó. Un día encontró una fotografía de su padre con una nota escrita en ruso. Por detrás había un mensaje: 'La Marea Roja se alzará pronto. Cuidate mucho, pequeña mia'. De repente, Wendy se sintió embargada por una emoción que no sentía desde hacía mucho tiempo: esperanza.",
          arquetipo1:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          arquetipo2:
            "Como BUSCADORA, eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          Pertenencia1: "Amuleto de mama" ,
          Pertenencia2: null ,
          Pertenencia3: "Fotografía misteriosa" ,
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
            "Maldición Familiar -- Cuando estés resolviendo una prueba, solamente cuentan como Éxitos los 6 que obtengas. No puedes ganar los estados de Bendición ni Maldición.",
          efecto2:
            "Obstinación -- Después de que falles una prueba, te concentras en una habilidad de tu elección",
          frase:
            "“¿Cómo me he metido en semejante embrollo? Vaya suerte la mía.”",
          historia: "Rex Murphy no creía en la suerte; lo cual estaba muy bien, porque la suya era nefasta. Tampoco creyó a aquella vieja en rumania que le dijo que estaba maldito. Pero debía admitir que todo tendía hacia salirle más mal que bien, en ocasiones con resultados catastróficos. Había perdido la cuenta de las veces que había descubierto pruebas de la existencia de un 'mundo oculto', para que luego se las llevase una rafaga de viento, les lloviera encima o se las comiera un rinoceronte. Pero la suerte no podía demostrarse ni tampoco se podía imprimir en el Arkham Advertised, así que Rex se convenció a sí mismo que no creía en ella. Aunque si las cosas le hubieran salido mejor, todos creerían que el mundo oculto existe de verdad.",
          arquetipo1:
            "Como BUSCADOR, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Rex ha vivido siempre con su maldición familiar. En consecuencia, has aprendido diversas maneras de paliar tu mala suerte.",
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
            "Un amigo seguro -- Acción: Puedes intercambiar cualquier cantidad de Vida y/o Cordura con otro investigador o Aliado que esté en cualquier espacio.",
          efecto2: null,
          frase: "“Sacrificaría lo que hiciera falta con tal de protegerte”",
          historia: "Lo más difícil que había hecho Calvin jamás fué dar la espalda a Joao, que siempre estuvo ahí para ayudarle a sobrellevarlo todo. Pero no tuvo elección. La imagen de Joao ardiendo hasta quedar reducido a cenizas, su mundo calcinado en un fogonazo de luz, la oscuridad que anidaba en su interior. Calvin no podía permitir que le arrebatase a su amante, por eso optó por despejarse de la ecuación. Así que hizo un trato. Dejó que la secta del Dios Enmascarado creyese que podía controlarlo, y aguardó el momento propio para revelarse contra el antiguo mal que amenazaba el mundo. Fueron tiempos difíciles, pero saber que Joao estaba a salvo le ayudó a superarlos. No es que Calvin no tuviese miedo (lo tenía), pero sabía lo que debía hacerse, y también que él era el único capaz de hacerlo.",
          arquetipo1:
            "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          arquetipo2:
            "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. A Calvin se le da bien sanar a los demás, aunque esto también puede mantenerte con vida en los momentos más catastróficos.",
          Pertenencia1: "Daga espiritual" ,
          Pertenencia2: "Hasta el fin de los tiempos" ,
          Pertenencia3: "OPCIONAL == Voz del mensajero y también un PACTO SINIESTRO" ,
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
            "La sangre es poder -- Cuando estés lanzando un Hechizo, si sufres Daño o gastas Restos, recibes +2 SABER",
          efecto2:
            "Magia de sangre -- Puedes sufrir Daño en vez de Horror cuando lances un Hechizo",
          frase: "“Las cosas no son siempre lo que parecen”",
          historia: "Agnes ya casi se había acostumbrado a las extrañas visiones que perturbaban sus sueños: Extraños con túnicas, cánticos rituales, monstruos aullantes de afiladas zarpas que solo alcanzaba a ver por el rabillo del ojo. Pero hace poco sufrió una mala caída y se golpeó en la cabeza. Desde entonces ha tenido visiones incluso estando despierta. En ella se vé a sí misma liderando los salmos de las figuras de las túnicas, ocultando una llave de plata en la argamasa de un pozo o lanzando sortilegios como hechicera en la mítica Hiperbórea. Agnes ha viajado a Arkham en busca de una explicación, pues la ciudad posee una larga tradición de juicios por brujería y además sucesos inexplicables. Consiguió trabajo en el restaurante de Velma, un buen día se topó con un viejo pozo que tenía los ladrillos flojos. Y entre los ladrillos, incrustada en la argamasa, encontró una antigua llave de plata, exactamente donde sabía que estaría.",
          arquetipo1:
            "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2:
            "Como DEFENSORA, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: "Herencia de Hiperbórea" ,
          Pertenencia2: null,
          Pertenencia3: "Protección corporal" ,
          Pertenencia4: "Tormenta de espíritus" ,
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
            "Sed de venganza -- Después de que derrotes a un Monstruo con una acción de ataque, recuperas un punto de Cordura o bien te concentras en una habilidad de tu elección.",
          efecto2: null,
          frase: "“Esto es por Louie”",
          historia: "Michael McGlen era un hombre de pocas palabras. Tampoco tenía que decir mucho: para eso estaba Louie 'el Rápido'. Los dos eran los mejores soldados de los O´Bannion, y se aseguraban de que la banda fuese respetada en todo Arkham... hasta la noche en que aquella cosa emergió del río y se llevó a rastras a Louie del muelle para despedazarlo bajo el agua. Michael creyó que sus jefes lo tacharían de pirado en cuanto les contase lo sucedido, pero lo que pasó fué aún peor: dijeron que le creían y que lo mejor era olvidarse del tema. Pero Michael no puede dejar impune la muerte de su socio, ni tampoco olvidar a los seres que lo hicieron pedazos. Sigue siendo hombre de pocas palabras; ahora prefiere que su metralleta hable por él.",
          arquetipo1:
            "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Michael emplea todo su talento para eliminar sin piedad a las grotescas criaturas que amenazan a Arkham.",
          arquetipo2:
            "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: "Metralleta de tambor" ,
          Pertenencia2: null ,
          Pertenencia3: "Automóvil de gángster" ,
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
          frase: "“Si necesitas un trabajo bien hecho, acude a mí”",
          historia: "Haciendo balance de su vida, Daniela podía darse por satisfecha: tenía una familia efusiva a la que adoraba, nunca le faltaba trabajo y siempre disponía de suficiente dinero para permitirse sus dos grandes pasiones (motocicletas y chicas guapas) incluso después de poner un plato en su mesa. Anque no todo era de color de rosa; por un lado, estaba su madre la santera, que no dejaba de augurarle un futuro sombrio sino se andaba con ojo. Por el otro su hermano Ramón, que se metía en líos constantemente. Y ahora Ramón volvía a tener problemas. El talismán de protección contra el mal que le regaló para complacer a su madre estaba hecho pedazos, y Daniela era la única que podía solucionarlo todo. Como de costumbre.",
          arquetipo1:
            "Como EXPERTA, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Daniela es una maestra de la eficacia; sacando el máximo partido de cada acción, podrás alcanzar tus objetivos con facilidad.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria",
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
            "Escrito en las estrellas -- Después que quites al menos dos fichas de Perdición de tu espacio, puedes sufrir un punto de horror para revelar una Pista(colócala sobre la hoja de Escenario)",
          efecto2: null,
          frase:
            "“Decir que  algo es imposible no lo hace menos cierto. La verdad es indiferente a la opinión que uno tenga.”",
          historia: "Norman Withers era científico, un hombre racional consagrado a la exploración lógica del universo. Por eso, cuando su investigación reveló que el universo estaba próximo a su fin, contrastó sus resultados y estudió la situación desde la calma y el raciocinio. No cabía error posible: seis estrellas se habían desvanecido sin dejar rastro, y en su lugar algo imposible surcaba el vacío. Aunque la comunidad científica rechazó sus conclusiones tachandolas de los desvaríos de un lunático, Norman prosiguió con sus estudios, abordando el problema con la racionalidad que le caracterizaba. ¿Qué importaba que su investigación se centrase en conocimientos arcaicos largo tiempo olvidado, o incluso en la magia? No por ello era menos racional.",
          arquetipo1:
            "Como BUSCADOR, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
          Pertenencia1: "Encontrar portal" ,
          Pertenencia2: null ,
          Pertenencia3: "Recuerdo preciado" ,
          Pertenencia4: "Tratado de astronomía" ,
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
            "Pendiente de todo -- una vez por ronda, al resolver una prueba, tú u otro investigador que esté en tu espacio podéis volver a tirar tantos dados como el número de Pistas que haya en vuestro Barrio (podeis tirar menos si queréis).",
          efecto2: null,
          frase:
            "“Estoy convencida de que podemos hallar una solución si cooperamos.”",
          historia: "Minh nació en el seno de una familia vietnamita afincada en Corea que posteriormente se mudó a EEUU. Su don para los idiomas y sus excepcionales calificaciones le procuraron trabajo en una empresa de Arkham, y Minh encantada con su nuevo jefe, el Sr Thomas, buen hombre y mejor amigo. Hasta que Thomas adquirió un ejemplar de la blasfema obra El Rey de Amarillo. Su lectura lo volvió huraño e irascible. La conminó a leerla, pero a ella le resultó demasiado perturbadora. Y luego el Sr Thomas se quitó la vida. Minh está convencida de que, si consigue desentrañar el secreto de la obra maldita, podrá evitar que los otros sufran el mismo destino que su infortunado jefe.",
          arquetipo1:
            "Como BUSCADORA, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2:
            "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          Pertenencia1: "El rey de amarillo" ,
          Pertenencia2: null ,
          Pertenencia3: "Mente analítica" ,
          Pertenencia4: "Sinergia" ,
        },
      ],

      contador: this.$store.state.contadorPJBase,
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
.imgTommy {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ1.png);}
.imgMarie {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ2.jpg);}
.imgJenny {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ3.png);}
.imgDexter {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ4.png);}
.imgWendy {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ5.jpg);}
.imgRex {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ6.jpg);}
.imgCalvin {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ7.jpg);}
.imgAgnes {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ8.jpg);}
.imgMichael {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ9.jpg);}
.imgDaniela {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ10.jpg);}
.imgNorman {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ11.jpg);}
.imgMinh {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ12.jpg);}

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