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
        Pertenencia1: {
            urlFoto: "",
            nombre: "Becky",
            descripcion:"Objeto - Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque."
        }, 
          Pertenencia2: null,
          Pertenencia3:{
            urlFoto: "",
            nombre: "Esposas",
            descripcion:"Objeto - Común. Una vez por ronda, después de que infrinjas Daño, te separes o sufras Daño de un monstruo HUMANO que no sea épico, puedes derrotar a ese monstruo."
          } ,
          Pertenencia4:{
            urlFoto: "",
            nombre: "Motocicleta",
            descripcion:"Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte un espacio adicional."
          } ,
          HistoriaYT: null,
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
          Pertenencia1: {
            urlFoto: "",
            nombre: "Becky",
            descripcion:"Objeto - Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque."
        }, 
          Pertenencia2: null,
          Pertenencia3:{
            urlFoto: "",
            nombre: "Esposas",
            descripcion:"Objeto - Común. Una vez por ronda, después de que infrinjas Daño, te separes o sufras Daño de un monstruo HUMANO que no sea épico, puedes derrotar a ese monstruo."
          } ,
          Pertenencia4:{
            urlFoto: "",
            nombre: "Motocicleta",
            descripcion:"Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte un espacio adicional."
          } ,
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
          efecto1: "Voz Aterciopelada: Una vez por ronda, después de que realices una acción, otro investigador que esté en cualquier espacio puede realizar esa misma acción.(Se siguen aplicando las restricciones habituales a las acciones.)",
          efecto2: null,
          frase: "“Presta atención y déjate encandilar por mi voz”",
          historia: "Marie ignoraba por qué su grand-mère se había marchado a Arkham, pero sin duda la anciana tendría sus motivos. No sabía por qué el resto de su familia se había mantenido lejos de aquella ciudad, aún después de que su grand-mère falleciese. 'Deberías ir a visitarla', le dijo su padre. 'Seguro que le das una alegría'.  Como si la anciana no estuviese muerta y enterrada. Marie consiguió que la contratasen para actuar en un local de Arkham, Algo trivial para la VOZ ATERCIOPELADA del jazz. Y procuró no pensar en las canciones que invadían sus sueños, ni en sus terribles tonos inhumanos, ni en aquel horripilante caballero, tan parecido al mismísimo barón Samedi, que siempre estaba entre el público cuando actuaba ...",
          arquetipo1: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Intervención",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, cuando otro investigador situado en cualquier espacio esté resolviendo una prueba, puedes hacer una prueba de SABER -1. Añade el resultado de esta prueba al resultado de la prueba de ese otro investigador."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "El cuchillo de grande-mère",
            descripcion:"Objeto - Mágico Arma. Recibes +2 de FUERZA cuando estés realizando una acción de ataque. Recibes +2 de SABER cuando estés lanzando un hechizo"
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Sangre de bruja",
            descripcion:"Talento - Innato. Acción: Puedes realizar una acción que ya hayas utilizado en esta ronda. Puedes usar tu Voz aterciopelada para permitir que otro investigador realice esta acción. Una vez por ronda, después de que gastes una ficha de Restos, ganas una ficha de Restos."
          },
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
          Pertenencia1: {
            urlFoto: "",
            nombre: "Buscando a Izzie",
            descripcion:"Talento - Innato. Una vez por ronda, cuando estés resolviendo una prueba, puedes sufrir un punto de Daño y un punto de Horror para volver a tirar cualquier cantidad de dados."
          },
          Pertenencia2: null ,
          Pertenencia3:{
            urlFoto: "",
            nombre: ".45 gemelas de Jenny",
            descripcion:"Objeto - Común arma. Recibes +3 de FUERZA cuando estés realizando una acción de ataque. Puedes sumar uno al resultado de un dado cuando estés realizando una acción de ataque."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "De punta en blanco",
            descripcion:"Cuando gastes una ficha de Concentración para volver a tirar un dado, en vez de eso puedes volver a tirar cualquier cantidad de dados. Tu fondo fiduciario te proporciona 2$ adicionales."
          },
          HistoriaYT: "A3eG_3SDUTA"
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
          efecto1: "Don para la magia -- Una vez por ronda, cuando estés resolviendo una prueba de SABER, puedes volver a tirar uno o todos los dados",
          efecto2: null,
          frase: "“No te conviene ver la auténtica magia, chico. Nadie debería verla nunca.”",
          historia: "La magia, concretamente el ilusionismo, fué la principal afición de Dexter Drake en su infancia y durante la Gran Guerra. De pequeño soñaba con la auténtica hechicería, pero nunca logró pasar de escamotear monedas y realizar otros trucos de salón ... hasta que aquél viejo mago callejero desató su maldición. Así fué como Dexter averiguó la verdad: Que existía la magia auténtica, y era más terrible de lo que nunca imaginó. ¿Y qué podía hacer él sino estudiarla en la medida de sus posibilidades? Descubrir el truco, el conejo en la chistera, el secreto que hacía que todo cobrara sentido. Pero en este caso la chistera es la realidad, y el Gran Drake cada vez tiene menos claro que merezca la pena desvelar su secreto.",
          arquetipo1: "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2: null,
          Pertenencia1: {
            urlFoto: "",
            nombre: "Nieblas de R'lyeh",
            descripcion:"Hechizo - Ensalmo. Puedes hacer una prueba de SABER en lugar de OBSERVACIÓN cuando estés realizando una acción de evasión.(El modificador de evasión del Monstruo sigue aplicándose)"
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Bastón de mago",
            descripcion:"Objeto - Extraordinario. Recibes +2 de SABER cuando estés lanzando un hechizo."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Viaje astral",
            descripcion:"Hechizo - Ensalmo. En vez de realizar una acción de movimiento normal, puedes hacer una prueba de SABER para moverte tantos espacios como el resultado de la prueba más dos."
          },
          HistoriaYT: "nCDlFIKAKUw"
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
          Pertenencia1: {
            urlFoto: "",
            nombre: "Amuleto de mama" ,
            descripcion:"Objeto - Extraordinario. Una vez por ronda, puedes anular un punto de daño o de Horror que vayas a sufrir. “No olvides nunca que tu mamá te quiere mucho.”"
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Fotografía misteriosa",
            descripcion:"Objetivo - Extraordinario. Después de que ganes una Pista, puedes concentrarte en una habilidad de tu elección. “La Marea Roja se alzará pronto. Cuidate mucho, pequeña mía.”"
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Osito Pawterson",
            descripcion:"Objeto - Extraordinario. Antes de que uno o varios monstruos vayan a atacarte, puedes descartar esta carta para separarte de todos esos monstruos y agotarlos."
          } ,
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
          efecto1: "Maldición Familiar -- Cuando estés resolviendo una prueba, solamente cuentan como Éxitos los 6 que obtengas. No puedes ganar los estados de Bendición ni Maldición.",
          efecto2: "Obstinación -- Después de que falles una prueba, te concentras en una habilidad de tu elección",
          frase: "“¿Cómo me he metido en semejante embrollo? Vaya suerte la mía.”",
          historia: "Rex Murphy no creía en la suerte; lo cual estaba muy bien, porque la suya era nefasta. Tampoco creyó a aquella vieja en rumania que le dijo que estaba maldito. Pero debía admitir que todo tendía hacia salirle más mal que bien, en ocasiones con resultados catastróficos. Había perdido la cuenta de las veces que había descubierto pruebas de la existencia de un 'mundo oculto', para que luego se las llevase una rafaga de viento, les lloviera encima o se las comiera un rinoceronte. Pero la suerte no podía demostrarse ni tampoco se podía imprimir en el Arkham Advertised, así que Rex se convenció a sí mismo que no creía en ella. Aunque si las cosas le hubieran salido mejor, todos creerían que el mundo oculto existe de verdad.",
          arquetipo1: "Como BUSCADOR, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Rex ha vivido siempre con su maldición familiar. En consecuencia, has aprendido diversas maneras de paliar tu mala suerte.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Buscando la verdad",
            descripcion:"Después de que ganes una Pista, ganas 1$ y puedes concentrarte en una habilidad de tu elección."
          },
          Pertenencia2: {
            urlFoto: "",
            nombre: "La Torre",
            descripcion:"Objeto - Extraordinario. Una vez por ronda, cuando estés resolviendo una prueba puedes volver a tirar uno de tus dados o todos ellos."
          },
          Pertenencia3: {
            urlFoto: "",
            nombre: "Superar la adversidad",
            descripcion:"Puedes concentrarte hasta 2 veces en cada habilidad."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Todas las piezas encajan",
            descripcion:"Cuando estés realizando una acción de revelar Pistas, suma uno al resultado de cada dado que tires."
          },
          HistoriaYT: "2CNEDE9mJ-0"
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
          efecto1: "Un amigo seguro -- Acción: Puedes intercambiar cualquier cantidad de Vida y/o Cordura con otro investigador o Aliado que esté en cualquier espacio.",
          efecto2: null,
          frase: "“Sacrificaría lo que hiciera falta con tal de protegerte”",
          historia: "Lo más difícil que había hecho Calvin jamás fué dar la espalda a Joao, que siempre estuvo ahí para ayudarle a sobrellevarlo todo. Pero no tuvo elección. La imagen de Joao ardiendo hasta quedar reducido a cenizas, su mundo calcinado en un fogonazo de luz, la oscuridad que anidaba en su interior. Calvin no podía permitir que le arrebatase a su amante, por eso optó por despejarse de la ecuación. Así que hizo un trato. Dejó que la secta del Dios Enmascarado creyese que podía controlarlo, y aguardó el momento propio para revelarse contra el antiguo mal que amenazaba el mundo. Fueron tiempos difíciles, pero saber que Joao estaba a salvo le ayudó a superarlos. No es que Calvin no tuviese miedo (lo tenía), pero sabía lo que debía hacerse, y también que él era el único capaz de hacerlo.",
          arquetipo1: "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          arquetipo2: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. A Calvin se le da bien sanar a los demás, aunque esto también puede mantenerte con vida en los momentos más catastróficos.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Daga espiritual",
            descripcion:"Objeto - Mágico Extraordinario. Recibes +2 de FUERZA cuando estés realizando una acción de ataque. Recibes +2 de SABER cuando estés realizando una acción de salvaguarda."
          }  ,
          Pertenencia2: {
            urlFoto: "",
            nombre: "Hasta el fin de los tiempos",
            descripcion:"Esta carta no puede descartarse por ningún motivo. (Ni siquiera por daño u Horror.). RETRIBUCIÓN- Quita una ficha de Daño y una ficha de Horror de esta carta."
          }  ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "OPCIONAL == Voz del mensajero y también un PACTO SINIESTRO",
            descripcion:"Estado - Innato. Puedes sufrir un punto de Horror para volver a tirar cualquier cantidad de dados. (Este efecto sólo puede aplicarse una vez a cada tirada. Puedes utilizarlo para repetir la tirada de tu Pacto siniestro.)"
          }  ,
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
          efecto1: "La sangre es poder -- Cuando estés lanzando un Hechizo, si sufres Daño o gastas Restos, recibes +2 SABER",
          efecto2: "Magia de sangre -- Puedes sufrir Daño en vez de Horror cuando lances un Hechizo",
          frase: "“Las cosas no son siempre lo que parecen”",
          historia: "Agnes ya casi se había acostumbrado a las extrañas visiones que perturbaban sus sueños: Extraños con túnicas, cánticos rituales, monstruos aullantes de afiladas zarpas que solo alcanzaba a ver por el rabillo del ojo. Pero hace poco sufrió una mala caída y se golpeó en la cabeza. Desde entonces ha tenido visiones incluso estando despierta. En ella se vé a sí misma liderando los salmos de las figuras de las túnicas, ocultando una llave de plata en la argamasa de un pozo o lanzando sortilegios como hechicera en la mítica Hiperbórea. Agnes ha viajado a Arkham en busca de una explicación, pues la ciudad posee una larga tradición de juicios por brujería y además sucesos inexplicables. Consiguió trabajo en el restaurante de Velma, un buen día se topó con un viejo pozo que tenía los ladrillos flojos. Y entre los ladrillos, incrustada en la argamasa, encontró una antigua llave de plata, exactamente donde sabía que estaría.",
          arquetipo1: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2: "Como DEFENSORA, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Herencia de Hiperbórea",
            descripcion:"Objeto - Mágico Extraordinario. Después de que lances un Hechizo, puedes concentrarte en una habilidad de tu elección."
          }  ,
          Pertenencia2: null,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Protección corporal",
            descripcion:"Hechizo - Ensalmo. Una vez por ronda, si tú, otro investigador o un Aliado vais a sufrir Daño (sin importar en qué espacio esté el afectado), puedes hacer una prueba de SABER. Anulas tanto Daño como el resultado de esta prueba."
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Tormenta de espíritus",
            descripcion:"Hechizo - Ensalmo. Puedes hacer una prueba de SABER en vez de FUERZA cuando estés realizando una acción de ataque. (El modificador de ataque del Monstruo sigue aplicándose.)"
          },
          HistoriaYT: "Cx4GNKVIWHQ"
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
          efecto1: "Sed de venganza -- Después de que derrotes a un Monstruo con una acción de ataque, recuperas un punto de Cordura o bien te concentras en una habilidad de tu elección.",
          efecto2: null,
          frase: "“Esto es por Louie”",
          historia: "Michael McGlen era un hombre de pocas palabras. Tampoco tenía que decir mucho: para eso estaba Louie 'el Rápido'. Los dos eran los mejores soldados de los O´Bannion, y se aseguraban de que la banda fuese respetada en todo Arkham... hasta la noche en que aquella cosa emergió del río y se llevó a rastras a Louie del muelle para despedazarlo bajo el agua. Michael creyó que sus jefes lo tacharían de pirado en cuanto les contase lo sucedido, pero lo que pasó fué aún peor: dijeron que le creían y que lo mejor era olvidarse del tema. Pero Michael no puede dejar impune la muerte de su socio, ni tampoco olvidar a los seres que lo hicieron pedazos. Sigue siendo hombre de pocas palabras; ahora prefiere que su metralleta hable por él.",
          arquetipo1: "Como EXPERTO, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Michael emplea todo su talento para eliminar sin piedad a las grotescas criaturas que amenazan a Arkham.",
          arquetipo2: "Como DEFENSOR, tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Metralleta de tambor",
            descripcion:"Objeto - Común Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque."
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Automóvil de gángster",
            descripcion:"Objeto - Vehículo. Después de que realices una acción de movimiento, puedes infligir dos puntos de Daño a un Monstruo que esté enfrentado a ti y otros dos puntos de Daño a esta carta."
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Secuaz de O'Bannion",
            descripcion:"Talento - Empleo. Después de que realices una acción de conseguir fondos, puedes hacer una prueba de FUERZA. Si la superas, ganas 2$."
          }  ,
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
          efecto1:"Pasión por el trabajo -- Después de que realices una acción de conseguir fondos, puedes concentrarte en una habilidad de tu elección",
          efecto2: null,
          frase: "“Si necesitas un trabajo bien hecho, acude a mí”",
          historia: "Haciendo balance de su vida, Daniela podía darse por satisfecha: tenía una familia efusiva a la que adoraba, nunca le faltaba trabajo y siempre disponía de suficiente dinero para permitirse sus dos grandes pasiones (motocicletas y chicas guapas) incluso después de poner un plato en su mesa. Anque no todo era de color de rosa; por un lado, estaba su madre la santera, que no dejaba de augurarle un futuro sombrio sino se andaba con ojo. Por el otro su hermano Ramón, que se metía en líos constantemente. Y ahora Ramón volvía a tener problemas. El talismán de protección contra el mal que le regaló para complacer a su madre estaba hecho pedazos, y Daniela era la única que podía solucionarlo todo. Como de costumbre.",
          arquetipo1: "Como EXPERTA, posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. Daniela es una maestra de la eficacia; sacando el máximo partido de cada acción, podrás alcanzar tus objetivos con facilidad.",
          arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Gabriel",
            descripcion:"Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte 1 espacio adicional."
          },  
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "As de espadas",
            descripcion:"Objeto - Extraordinario. Cuando gastes una ficha de Concentración para volver a tirar un dado, puedes recuperar un punto de Cordura."
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Llave inglesa",
            descripcion:"Objeto - Común. Recibes +1 de FUERZA cuando estés realizando una acción de ataque. Si tienes una Mano libre, en vez de eso recibes +3."
          }  ,
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
          efecto1: "Escrito en las estrellas -- Después que quites al menos dos fichas de Perdición de tu espacio, puedes sufrir un punto de horror para revelar una Pista(colócala sobre la hoja de Escenario)",
          efecto2: null,
          frase: "“Decir que  algo es imposible no lo hace menos cierto. La verdad es indiferente a la opinión que uno tenga.”",
          historia: "Norman Withers era científico, un hombre racional consagrado a la exploración lógica del universo. Por eso, cuando su investigación reveló que el universo estaba próximo a su fin, contrastó sus resultados y estudió la situación desde la calma y el raciocinio. No cabía error posible: seis estrellas se habían desvanecido sin dejar rastro, y en su lugar algo imposible surcaba el vacío. Aunque la comunidad científica rechazó sus conclusiones tachandolas de los desvaríos de un lunático, Norman prosiguió con sus estudios, abordando el problema con la racionalidad que le caracterizaba. ¿Qué importaba que su investigación se centrase en conocimientos arcaicos largo tiempo olvidado, o incluso en la magia? No por ello era menos racional.",
          arquetipo1: "Como BUSCADOR, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2: "Como MÍSTICO, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "Encontrar portal",
            descripcion:"Hechizo - Ritual. Acción: Haz una prueba de SABER. Si la superas, muévete a un espacio de tu elección en el que haya al menos una ficha de Perdición."
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Recuerdo preciado",
            descripcion:"Objeto - Extraordinario. Después de que ganes una Pista, quita dos fichas de Horror de esta carta."
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Tratado de astronomía",
            descripcion:"Objeto - Extraordinario Tomo. Una vez por ronda, cuando estés resolviendo una prueba, puedes volver a tirar tantos dados coo el número de fichas de Perdición que haya en tu espacio (puedes tirar menos si lo prefieres.)"
          }  ,
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
          efecto1: "Pendiente de todo -- una vez por ronda, al resolver una prueba, tú u otro investigador que esté en tu espacio podéis volver a tirar tantos dados como el número de Pistas que haya en vuestro Barrio (podeis tirar menos si queréis).",
          efecto2: null,
          frase: "“Estoy convencida de que podemos hallar una solución si cooperamos.”",
          historia: "Minh nació en el seno de una familia vietnamita afincada en Corea que posteriormente se mudó a EEUU. Su don para los idiomas y sus excepcionales calificaciones le procuraron trabajo en una empresa de Arkham, y Minh encantada con su nuevo jefe, el Sr Thomas, buen hombre y mejor amigo. Hasta que Thomas adquirió un ejemplar de la blasfema obra El Rey de Amarillo. Su lectura lo volvió huraño e irascible. La conminó a leerla, pero a ella le resultó demasiado perturbadora. Y luego el Sr Thomas se quitó la vida. Minh está convencida de que, si consigue desentrañar el secreto de la obra maldita, podrá evitar que los otros sufran el mismo destino que su infortunado jefe.",
          arquetipo1: "Como BUSCADORA, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          Pertenencia1: {
            urlFoto: "",
            nombre: "El rey de amarillo",
            descripcion:"Una vez por ronda, después de que sufras al menos un punto de Horror, puedes revelar una Pista(se coloca sobre la hoja de escenario)."
          }  ,
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Mente analítica",
            descripcion:"Tiras un dado adicional cuando estés resolviendo una prueba de SABER o de OBSERVACIÓN si has igualado o excedido tu límite de concentración."
          }  ,
          Pertenencia4: {
            urlFoto: "",
            nombre: "Sinergia",
            descripcion:"Talento - Innato. Tu límite de concentración aumenta en un punto. Los demás investigadores que estén en tu espacio reciben un +1 para todas las habilidades en las que tú estés concentrada."
          }  ,
        },
        {nombrePJ: "Darrell Simmons",
          posicion: "Fotógrafo",
          vida: 7,
          cordura: 5,
          saber: 2,
          influencia: 2,
          observacion: 4,
          fuerza: 3,
          voluntad: 1,
          dinero: 2,
          limConcentracion: 2,
          efecto1: "Nativo de Arkham -- A la hora de robar un encuentro, Darrel puede robar 2 cartas y escojer la que desee. Después se devuelven las demas al fondo del mazo (excepto si la descartada es un evento).",
          efecto2: null,
          frase: "“Ya veréis, lo queráis o no.”",
          historia: "Ya mientras se criaba en Arkham, Darrell siempre supo que algo no marchaba bien en esta pequeña y extraña ciudad. Después de graduarse en el instituto entró a trabajar de fotógrafo para el Arkham Adviser, y durante los dos años siguientes se ha pateado hasta el último rincón de la ciudad. Sin embargo, la noche pasada Darrell vió algo horrible, algo que ha sacudido su mundo hasta los cimientos y que ha deshecho la ilusión de seguridad que todos creamos para proteger nuestras mentes y almas. Su editor dice que son imaginaciones suyas, pero aun cuando sale del edificio del periodico sabe que lo que vio era real, ¡y pretende mostrárselo al mundo! Esta vez será más precavido. Esta vez tomará fotos y demostrará que en Arkham no ocurren cosas normales.",
          arquetipo1: "Como BUSCADOR, eres un intrépido sabueso. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          arquetipo2: "Como SUPERVIVIENTE, tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. el trabajo en equipo os conducirá a la victoria.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Camara de Fotos",
            descripcion:"Acción - Pedes hacer una foto de cualquier criatura que NO SEA HUMANO siempre qe este en tu mismo espacio. Por cada 2 fotos que consigas ganas 1 aliado."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Cada foto cuenta",
            descripcion:"Talento - Por cada foto que consiguas te puedes concentrar en 1 habilidad de tu elección. Aunque superes tu limite de concentración."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Anticipo",
            descripcion:"Al principio de tu turno ganas 2 $, luego tira 1 dado. Si sacas un 1, se decarta esta carta."
          },
          expansion: "Original - SegundaEd."
        },
        {nombrePJ: "Gloria Goldberg",
          posicion: "Escritora",
          vida: 5,
          cordura: 7,
          saber: 3,
          influencia: 3,
          observacion: 3,
          fuerza: 2,
          voluntad: 2,
          dinero: 3,
          limConcentracion: 2,
          efecto1: "El futuro está escrito - En la fase de mitos,gastando 2 fichas de concentración, puedes ver y robar 1 ficha de tu elección.",
          efecto2: null,
          frase: "“”",
          historia: "De joven, Gloria se veía acosada por terribles visiones. Tras pasar años acudiendo a médicos y en la terapia aprendió a controlar en cierto modo sus visiones escribiendo historias. Sus extrañas e inquietantes novelas supieron llegar al público en estos tiempos tan angustiosos, y la convirtieron en una escritora de éxitos de venta. Esta noche, mientras se marchaba de una sesión de firma de libros en Arkham, la visión más potente que jamás había experimentado hizo que cayera al suelo desmayada. Gloria vio cómo se abría el cielo y una inmensa y monstruosa forma surgía del mismo aire, desatando un caos inenarrable y matando a miles de personas. Mientras se incorporaba con los brazos, Gloria supo que esta visión era real, y que llegaría a suceder de no hacer nada al respecto. Ahora se encuentra en un destartalado restaurante, sorbiendo café e intentando decidir qué hacer.",
          arquetipo1: "Como MÍSTICA, destacas erigiendo salvaguardas arcanas contra el mal. Tu principal ocupación debería ser eliminar fichas de Perdición del tablero. Contribuyes la mejor opción defensiva contra los Primigenios",
          arquetipo2: "Como BUSCADORA, eres una intrépida sabuesa. Deberías concentrarte en la obtención de Pistas y en descubrir su significado oculto. Tu labor es esencial para frustrar los malvados designios de los Primigenios.",
          Pertenencia1:{
            urlFoto: "",
            nombre: "Ya lo veía venir",
            descripcion:"Talento. Tienes +1 de SABER cuando vayas a hacer una tirada de salvaguarda."
          },
          Pertenencia2: null ,
          Pertenencia3: {
            urlFoto: "",
            nombre: "Letras prohibidas",
            descripcion:"Acción. Haz una tirada de SABER y resuelve según su resultado. 0: Solo recibes el daño. 1: Puedes agotar a un monstruo que esté en tu espacio. +2: Puedes agotar un monstruo de cualquier espacio."
          },
          Pertenencia4: {
            urlFoto: "",
            nombre: "Iluminación",
            descripcion:"Talento. Si consigues salvaguardar 2 fichas de perdición a la vez, podrás revelar pista sin necesidad de tirar."
          },
          HistoriaYT: "A3eG_3SDUTA" ,
          expansion: "Original - SegundaEd."
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
    this.datosPJactual.HistoriaYT = this.Personajes[this.contador].HistoriaYT;
    this.datosPJactual.expansion = this.Personajes[this.contador].expansion;


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
    else if (this.contador == 12) {this.datosPJactual.imgPersonaje = "imgDarrell"}
    else if (this.contador == 13) {this.datosPJactual.imgPersonaje = "imgGloria"}
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
.imgDarrell {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ13.jpg);}
.imgGloria {background-image: url(@/assets/img/Games/AHBase/2imgInvestigadores/PJ14.jpg);}

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