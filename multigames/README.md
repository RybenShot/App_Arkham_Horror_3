<p align = "center">
  <a href= "#que-hace">Que hace?</a> |
  <a href= "#funcionalidades">Funcionalidades</a> |
  <a href= "#enlace-a-la-app">Enlace a la app</a> 
</p>

<div align="center">
  <img src="/README_FILES/bannerAH.png" >
  <h1>Arkham Horror 3 Edicion - Juego de mesa</h1>
</div>

## Introduccion
Bienvenido a la documentación de App Arkhma Horror. 
Esta app es una herramienta diseñada para facilitar la gestión y el seguimiento de partidas del juego de mesa de Arkham Horror Tercera edicion, proporcionando una experiencia fluida y enriquecedora para los jugadores.

## Que hace?

Es una herramienta para el juego de mesa "Arkham horror 3ª edicion". 
Hay un pequeño problema en este juego y es su gran complejidad, pero no seria lo mismo sin esto mismo. Muchas cartas de eventos, cartas de enemigos, cartas de efectos personales de cada personaje, fichas de dinero/restos/daño/terror/cordura, cartas de hechizos, cartas especiales de objetos ... y mucho mucho mas.
Al final siempre, **SIEMPRE** falta mesa y tienes que pasar mas tiempo en reorganizar el juego para que todo quepa que jugando en si.
Y por eso nació este proyecto, para solventar ese problema Y AUMENTAR LA EXPERIENCIA DE JUEGO.

Con esta aplicacion no solo podras gestionar todo lo anteriomente dicho en un solo movil, sino que encima, abre la posibilidad de ampliar su juego con nuevas cartas, nuevos personajes, nuevos mapas, nuevos enemigos, INCLUIR UNA NARRATIVA EN VOZ EN OFF, efectos especiales para cuando el personaje pierda vida/cordura, añadir valoraciones de otros usuarios para elegir mapa o personaje, estrategias compartidas por otros usuarios, y mucho MUCHISIMO MAS.

## ¿Por donde vamos?
Ahoramismo el proyecto sigue en fase de desarrollo, estamos en la 4ª version, actualmente ya es completamente funcional con TODAS LAS EXPANSIONES, con nuevas cartas incluidas y efectos visuales para los personajes, ayuda a la creacion de losetas de mapa, ayuda para crear el mazo de enemigos para el mapa, voz en off que lee la descripciones de mapas e historia de los personajes.

Para cualquier duda, sugerencia o explicacion mas detallada del proyecto no dudes en contactarme por mi [LinkedIn](https://linkedin.com/in/sebastian-jimenez-roman)

# Funcionalidades

<div align="center"><h2>Investigadores</h2></div>

<table align="center">
    <td>
      <h2>Lista de personajes</h2>
      <ul>
        <li>1- Activar o desactivar las expansiones. El borde de color de cada investigador indica de qué expansión proviene.</li>
        <li>2- Vida y cordura de cada personaje.</li>
        <li>3- Hacer tap para ver en detalle al investigador seleccionado.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/personajes/Personajes-1.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<table align="center">
  <tr>
    <td style="max-width: 684px">
      <h2>Detalle de personaje.</h2>
      <ul>
        <li>1- Nombre y posición social del personaje.</li>
        <li>2- Pertenencias iniciales del personaje. Al hacer tap revela una ventana con las pertenencias, cada carta si se le hace tap se ve en grande para facilitar su lectura.</li>
        <li>3- Historia hasta ahora del investigador. Al hacer tap en el megáfono se reproducirá un audio narrando la historia del personaje. Por supuesto, está la propia historia del personaje. Algunos investigadores tienen una historia más detallada en un video de YouTube.</li>
        <li>4- Arquetipo de personaje. Aquí se puede ver para lo que es mejor el personaje.</li>
        <li>5- Salud. Cada personaje tiene 2 vidas, la salud física y salud mental, si en cualquier momento alguna de las 2 llega a 0 el investigador muere o cae preso a la locura.</li>
        <li>6- Atributos. Cada uno de los 5 atributos se usan durante la partida. Por ejemplo: "Quieres convencer al inspector de policía para que te acompañe, tira de INFLUENCIA" en el caso de Marie Lambeau debería tirar 4 dados de 6 caras (+ los bonificadores que pueda tener).</li>
        <li>7- Habilidades únicas. Cada personaje empieza con habilidades únicas que te dan bonificaciones para la partida, cada personaje es un mundo y no solo puede tener 1, algunos tienen hasta 2. Algunas veces en este apartado también aparecen condiciones del personaje como es el caso de Rex Murphy y su estado de "Maldición familiar" que solo podrá acertar las tiradas con 5 y 6.</li>
        <li>8- Frase del personaje.</li>
        <li>9- Límite de concentración. La concentración se usa para aumentar 1 punto temporalmente uno de los atributos del investigador para ayudar a que la tirada pueda ser más favorable.</li>
        <li>10- Lista - Comenzar. Si haces tap en "Lista" vuelves a la lista de investigadores. Si haces tap en "Comenzar" entrarás en juego con el personaje que estabas viendo en detalle.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/personajes/Personajes-2.JPG" alt="Personajes">
    </td>
  </tr>
</table>

<table align="center">
    <td><img style="max-width: 100%; max-height: 700px" src="/README_FILES/personajes/Personajes-3.JPG"></td>
    <td><img style="max-width: 100%; max-height: 700px" src="/README_FILES/personajes/Personajes-4.JPG"></td>
    <td><img style="max-width: 100%; max-height: 700px" src="/README_FILES/personajes/Personajes-5.JPG"></td>
</table>

<table align="center">
    <td style="max-width: 684px">
      <h2>In play - Tirador de dados</h2>
      <p>Las tiradas pueden verse afectadas por ajentes externos, por ejemplo: Si el investigador tiene el estado <br> "bendecido" los aciertos pasaran de ser de 5 y 6 a 4, 5 y 6</p>
      <ul>
        <li>1- Salud. Estos son contadores de vida (SAlud y cordura), si en algun momento alguno de los 2 llega a 0 el investigador habra muerto.</li>
        <li>2- Navegacion. El primero es la ventana de tirada de dados, > la segunda es la ventana de estados, > la tercera es la ventana de habilidades unicas y > la ultima es para salir/terminar la partida.</li>
        <li>3- Atributos. al hacer tap en alguno de los atributos, seleccionas de que quieres tirar, justo abajo a la izquierda aparecera el N de dados que se va a lanzar y a la derecha puedes sumar N de dados. <br> Por ejemplo: tienes un arma que te da +3 de fuerza, y este personaje tiene ya de por si 2 de Fuerza, pues para hacer una tirada de fuerza harias tap al atributo de fuerza y pondrias en dados extras 3, asi se lanzaria 5 dados.</li>
        <li>4- Tirardor. Simple, un submit para tirar el N de dados que pone arriba a la izquierda.</li>
        <li>5- Resultados. Aqui apareceran los dados lanzados, se pondran en verde los que sean aciertos, en rojo los que sean pifia (que en este juego no tienen gran importancia, pero que bien) y sin borde que no son aciertos. Por defecto los aciertos suelen ser si se saca 5 o 6, pero si el personaje esta bendecido tambien contara el 4, en cambio si esta Maldito, solo contara el 6.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/inplay/play.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<table align="center">
    <td style="max-width: 684px">
      <h2>In play - Estados</h2>
      <p>Todos los estados tienen su propio modal. Como hay muchos con muchas variantes solo hare un pequeño resumen. Todos se consiguen por razones de la partida asi que omitire esa parte.</p>
      <ul>
        <li>1- Activos - Todos. En la ventana "Activos" solo aparecen los que el investigador tiene activo, en la de Todos, pues aparecen todos los estados posibles y se pondran en verde (a modo orientativo) los estados que esten activos.</li>
        <li>2- Pacto siniestro. Cuando tengas este estado, en cierto momento de la partida aparecera una ficha llamada retribucion, en ese momento debes abrir este estado y tirar 1 dado, si sale 1, se debera cumplir con el pacto (se revelara 1 de las 15 cartas que hay guardadas). <br> > Una vez adquirido el estado de pacto, este no desaparecera hasta haberlo cumplido.</li>
        <li>3- Mancillado. funciona mas o menos como el pacto siniestro, pero cuando salga fichas blancas, se tendra que hacer una cosa y cuando salga la retribucion (sin tirar ningun dado a diferencia de pacto siniestro) se debera cumplir con lo que diga la carta (normalmente algo malo). El castigo de esta carta suele ser mas flojo.</li>
        <li>4- Maldicion - Bendicion. Con la bencicion los aciertos seran 4, 5 y 6. Con la maldicion sera solo 6. No se pueden tener las 2 cartas a la vez, si una esta activa y quieres activar la otra, la que tenias activa se desactivara automaticamente.</li>
        <li>5- Fatigado - Determinado - Perseguido. Estados que te dan bonificaciones varias </li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/inplay/play_1.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<table align="center">
    <td style="max-width: 684px">
      <h2>In play - Habilidades</h2>
      <ul>
        <li>1- Habilidades unicas. Aqui aparece a modo de recordatorio las habilidades unicas del investigador.</li>
        <li>2- Limite de concetracion. Aqui aparece hasta cuanto se puede concentrar en sus habilidades.</li>
        <li>3- Moneda. 2 contadores, uno de dinero y el otro de restos que dejan las criaturas que se pueden usar como moenda de cambio durante la aprtida.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/inplay/play_2.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<table align="center">
    <td style="max-width: 684px">
      <h2>In play - Ajustes</h2>
      <ul>
        <li>1- Botones preview. Estos dos botones actualmente no son funcional pero son un preview de lo que hara y se vera.</li>
        <li>2- Volver a la lista de personajes.</li>
        <li>3- Termina la partida y vuelve al home.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/inplay/play_3.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<div align="center"><h2>Mapas</h2></div>

<table align="center">
    <td style="max-width: 684px">
      <h2>Lista de mapas</h2>
      <ul>
        <li>1- Activar o desactivar las expansiones. El borde de color de cada mapa indica de qué expansión proviene.</li>
        <li>2- Mapa. Al hacer tap, va a la pagina de detalle de ese mapa.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/mapas/mapas_1.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<table align="center">
    <td style="max-width: 684px">
      <h2>Detalle de mapas</h2>
      <p>Actualmente los datos que estan en la parte de Especificaciones (Votos de usuario, dificultad, duracion.), son datos estiumados por jugada propia, proximamente habra sistema de vocacion e interaccion con el usuario para que se haga una media entre todos los usuarios.</p>
      <ul>
        <li>1- Datos basicos. Aqui tenemos titulo, descripcion y en algunos mapas, una locucion(si haces tap en el icono del megafono se acivara la locucion, si esta disponible en este mapa).</li>
        <li>2- Especificaciones. Sin mas, son datos extras para cada mapa, actualmente son estimaciones, proximamente los datos saldran de hacer una media por los mismos usuarios.</li>
        <li>3- Mapa de losetas. Ayuda para la colocacion de las losetas, al hacer tap se ampliara para verse mejor.</li>
        <li>4- Enemigos. aqui abre la lista de enmigos de esta historia, porque segun cual haya elegido cambian los enemigos que aparecen. En la lista puedes hacer tap a algun enemigo para verlo mas en detalle.</li>
        <li>5- Inv. Rec. y Comunidad. La parte de inv. rec. esta aun en proceso, esta pensada para segun el mapa que hayas elegido, hay algunos investigadores que son mas convenientes elegirlos que otros. La comunidad te redirecciona a la pagina de Arkham Horror 3 edicion de BGG.</li>
        <li>6- Lista. Vuelve al apartado de lista de mapas.</li>
        <li>7- Contador. Para que el usuario se haga una idea de cuantos mapa hay en total y cual ha selecionado.</li>
        <li>8- Seleccionar inv. Para saltar directamente a la lista de investigadores.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/mapas/mapas_2.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

## Enlace a la app

Pruebala! -> [Click aqui](https://arkhamhorror-39297.web.app/#/) <-

OJO! La aplicacion no es responsive aun, se esta trabajando en ello pero por ahora es unicamente con vista movil.
Si estan en PC puedes hacer lo siguiente:

- Cick derecho > Inspeccionar. Se abre una ventana a la derecha de la pantalla.

<div align="center" style="width: 400px"><img src="/README_FILES/1.JPG"></div>

- Clicamos en el icono de cambio de vista.

<div align="center" style="width: 400px"><img src="/README_FILES/2.JPG"></div>

- Ajustamos la anchura de la pantalla. Recomendacion propia, poner las dimensiones de Iphone 12 Pro.

<div align="center" style="width: 400px"><img src="/README_FILES/3.JPG"></div>


