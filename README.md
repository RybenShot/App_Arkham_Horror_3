<p align = "center">
  <a href= "#clerk">> Clerk < </a> |
  <a href= "#descripcion">Descripcion</a> |
  <a href= "#funcionalidades">Funcionalidades</a> |
  <a href= "#api">API</a> |
  <a href= "#especificaciones-técnicas">Especificaciones tecnicas</a> |
  <a href= "#enlace-a-la-app">Enlace a la app</a> 
</p>

<div align="center">
  <img src="/README_FILES/bannerAH.png" >
  <h1>App Arkham Horror 3ª Edición</h1>
</div>

# Introduccion
Bienvenido a la documentación de App Arkham Horror.
Esta app es una herramienta diseñada para facilitar la gestión y el seguimiento de partidas del juego de mesa Arkham Horror 3ª Edición, proporcionando una experiencia fluida y enriquecedora para los jugadores.

# Clerk
### ¿Como usamos Clerk?
Principalmente para la gestión de los usuarios, estos pueden crear mapas online y gestionar las variables de la partida, como las fichas de perdición y las pistas del escenario, o las fichas de la reserva de mitos. El usuario host (creador de la partida) podrá ver en su perfil privado los mapas online que haya creado gracias a su ID de usuario, que se imprime en el mapa al momento de crearlo.

También, un jugador que haya iniciado sesión podrá unirse a un mapa online siempre que tenga el ID del mapa.

Gracias a Clerk y su comprobación de sesión, podemos restringir el acceso al perfil privado, a la creación de mapas online o a unirse a ellos según el estado de autenticación.

# Descripcion
Esta aplicación acompaña el juego de mesa Arkham Horror 3ª Edición, cuya gran complejidad hace necesaria una ayuda digital. El juego incluye muchas cartas (eventos, enemigos, hechizos, objetos especiales), fichas (dinero, daño, terror, cordura, pistas) y mucha narrativa, que a menudo requieren reorganizar componentes en la mesa y pueden causar confusiones durante la partida.

Por ello nació este proyecto: SOLVENTAR esa complejidad y AUMENTAR la experiencia de juego. Con la app podrás:

- Gestionar todo lo anterior desde un único móvil.
- Ampliar el juego con nuevas cartas, personajes, mapas y enemigos.
- Incluir narrativa en off (voz en off para descripciones).
- Aplicar efectos especiales (manchas de sangre, auras de estado).
- Jugar online con otros investigadores.
- ¡Y mucho más!

# ¿Por donde vamos?
Actualmente el proyecto sigue en fase de desarrollo porque aún queda mucho por hacer.Estamos en la 4ª versión y ya es funcional con todas las expansiones (tanto oficiales como de la comunidad de BGG), con nuevas cartas y efectos visuales para los personajes.
También incluye:

- Ayuda para la creación de losetas de mapa.
- Asistente para generar el mazo de enemigos de cada escenario.
- Voz en off que narra las descripciones de mapas e historias de personajes.

Para cualquier duda o sugerencia más detallada sobre el proyecto, no dudes en contactarme en mi [LinkedIn](https://linkedin.com/in/sebastian-jimenez-roman)

# Funcionalidades

<div align="center"><h2>Interfaces</h2></div>

<table align="center">
    <td>
      <h2>Home</h2>
      <ul>
        <li>1- Visitas totales de la app desde la creación del back-end.</li>
        <li>2- Avatar de Clerk. Aquí se pueden gestionar los datos de usuario a través de la interfaz de Clerk.</li>
        <li>3- Botón para abrir el panel de Perfil privado. Si no está logueado, este botón se transforma en el botón de login.</li>
        <li>4- Botón que te redirecciona a la lista de mapas o a la de investigadores.</li>
        <li>5- Botón para abrir la ventana de créditos.</li>
        <li>6- Botones de redirección a BuyMeACoffee y a Instagram.</li>
        <li>7- Apartado de noticias sobre la app.</li>
        <li>8- Botones de cambio de idioma.</li>
        <li>Para toda la web, entre página y página hay una página de carga.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/Home.jpg" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<table align="center">
    <td>
      <h2>Perfil</h2>
      <ul>
        <li>1- Botón de log out.</li>
        <li>2- Apartado de trofeos. Actualmente no hay trofeos disponibles; vendrán con futuras actualizaciones.</li>
        <li>3- ID de tu usuario, para poder añadir amigos en el futuro.</li>
        <li>4- Lista de mapas online creados por el usuario.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/profile.jpg" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
</table>

<div align="center"><h2>Investigadores</h2></div>

<table align="center">
  <td>
    <h2>Lista de personajes</h2>
    <ul>
      <li>1- Buscar por expansiones o por arquetipo de personaje.</li>
      <li>2- Activar o desactivar las expansiones. El borde de color de cada investigador indica de qué expansión proviene.</li>
      <li>3- Vida y cordura de cada personaje.</li>
      <li>4- Hacer tap para ver en detalle al investigador seleccionado.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/personajes/listaPersonajes.jpg" alt="Personajes" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<table align="center">
  <tr>
    <td style="max-width: 684px">
      <h2>Detalle de personaje</h2>
      <ul>
        <li>1- Nombre y posición social del personaje.</li>
        <li>2- Pertenencias iniciales del personaje. Al hacer tap se abre una ventana con las pertenencias; cada carta, al tocarla, se ve en grande para facilitar su lectura.</li>
        <li>3- Historia del investigador. Al hacer tap en el megáfono se reproducirá un audio narrando su trayectoria. Algunos investigadores tienen además un video de YouTube con más detalles.</li>
        <li>4- Arquetipo de personaje. Aquí se muestra la especialidad principal del investigador.</li>
        <li>5- Salud. Cada investigador tiene dos barras: vida física y salud mental. Si alguna llega a 0, el investigador muere o enloquece.</li>
        <li>6- Atributos. Se usan durante la partida para tiradas específicas. Por ejemplo, para convencer al inspector de policía, Marie Lambeau lanzaría dados de INFLUENCIA (+bonificadores correspondientes).</li>
        <li>7- Habilidades únicas. Cada investigador comienza con hasta dos habilidades especiales que otorgan bonificaciones o condiciones de juego (por ejemplo, "Maldición familiar" de Rex Murphy).</li>
        <li>8- Frase del personaje.</li>
        <li>9- Límite de concentración. Permite aumentar un atributo en 1 punto temporalmente; algunas cartas pueden superar este límite.</li>
        <li>10- Controles: "Lista" vuelve a la lista de investigadores; "Comenzar" inicia la partida con el investigador seleccionado.</li>
      </ul>
    </td>
    <td>
      <img src="/README_FILES/personajes/Personajes-2.JPG" alt="Personajes" style="max-width: 100%; max-height: 700px;">
    </td>
  </tr>
</table>

<table align="center">
    <td><img style="max-width: 100%; max-height: 700px" src="/README_FILES/personajes/Personajes-3.JPG"></td>
    <td><img style="max-width: 100%; max-height: 700px" src="/README_FILES/personajes/Personajes-4.JPG"></td>
    <td><img style="max-width: 100%; max-height: 700px" src="/README_FILES/personajes/Personajes-5.JPG"></td>
</table>

<div align="center"><h2>In Play</h2></div>

<table align="center">
  <td style="max-width: 684px">
    <p>La parte de juego está dividida en 2.</p>
    <p><strong>Ventana de Investigador:</strong> aquí cada jugador gestiona su propio investigador; esta parte es offline.</p>
    <p><strong>Ventana de Mapa:</strong> esta ventana es común para todos los jugadores, ya que es donde se gestionan las fichas de la historia principal donde están todos, por ejemplo la gestión de fichas de perdición o de pistas, o la reserva de mitos. Esta parte es online.</p>
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>In play – Player</h2>
    <p>En la parte de jugador, por ahora es completamente offline. Aquí se gestiona todo lo relativo al personaje: fichas variables como dinero, vida, cordura…, tiradas de atributos y estados del personaje. Junto a esto hay recordatorios, ya que si el personaje tiene un estado como, por ejemplo, “Pacto siniestro”, durante la partida ocurren sucesos (gestionados por la aplicación en la parte de “Map”) que requieren que el jugador realice alguna acción; para evitar que pase desapercibido, hay recordatorios automáticos en la app que aparecerán en forma de modal.</p>
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>In play – Player – Datos base y tirador de dados</h2>
    <p>Las tiradas pueden verse afectadas por agentes externos; por ejemplo, si el investigador tiene el estado “bendecido”, los aciertos pasan de ser 5 y 6 a 4, 5 y 6.</p>
    <ul>
      <li><strong>1. Imagen y nombre de investigador.</strong> El marco puede cambiar de color según los estados “Bendecido” o “Maldito”.</li>
      <li><strong>2. Contadores del investigador.</strong> Seleccionando uno y luego pulsando + o –, el contador sube o baja, con la limitación de que no puede ser inferior a 0 ni, en el caso de vida y cordura, superar el máximo inicial.</li>
      <li><strong>3. Navegación.</strong> El primero es la ventana de tirada de dados; la segunda, la ventana de estados; la tercera, la de habilidades únicas y pertenencias iniciales; y la última, para salir/terminar la partida.</li>
      <li><strong>4. Atributos.</strong> Al tocar uno de los atributos, seleccionas sobre qué quieres tirar; justo abajo a la derecha aparecerá el número de dados que se lanzará, junto a un campo que permite sumar dados adicionales.<br>Por ejemplo: si tienes un arma que te da +3 de fuerza y el personaje ya tiene 2 de fuerza, para hacer una tirada de fuerza tocarías el atributo de fuerza y pondrías 3 dados extra, de modo que se lanzarían 5 dados.</li>
      <li><strong>5. Fichas de concentración.</strong> Cada personaje tiene un límite de concentración; estas fichas te permiten tirar 1 dado. Normalmente no se puede superar el máximo, pero durante la partida hay cartas que permiten saltarse este límite. Al tener alguna ficha, si pulsas el botón “Usar 1”, se usará aleatoriamente una ficha para hacer una tirada de 1 dado. Las fichas de concentración se pueden usar para cualquier atributo.</li>
      <li><strong>6. Resultados.</strong> Aquí aparecerán los dados lanzados: se marcarán en verde los aciertos y sin borde los que no lo son. Por defecto, los aciertos suelen ser 5 o 6, pero si el personaje está “bendecido” también contará el 4; en cambio, si está “maldito”, solo contará el 6.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/personajes/tiradorDados.jpg" alt="Personajes" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>In play – Player – Estados</h2>
    <p>Todos los estados tienen su propio modal. Como hay muchos con varias variantes, solo haré un pequeño resumen. Todos se consiguen por motivos de la partida; por ejemplo, el pacto siniestro se obtiene en un encuentro que indica “si quieres conseguir este hechizo tan bueno, tendrás que aceptar un pacto siniestro”. Entonces aceptas el hechizo y activas el estado “pacto siniestro” y, cuando aparezca la ficha de mitos de “Retribución”, automáticamente la aplicación te recordará que debes hacer una tirada por el pacto siniestro que tiene activo tu personaje.</p>
    <ul>
      <li><strong>1. Activos – Todos.</strong> En la ventana “Activos” solo aparecen los que el investigador tiene activos; en “Todos” aparecen todos los estados posibles y se marcarán en verde (a modo orientativo) los estados que estén activos.</li>
      <li><strong>2. Pacto siniestro.</strong> Cuando tengas este estado, en cierto momento de la partida aparecerá una ficha llamada “Retribución”. En ese momento la aplicación abrirá un modal para que hagas la tirada para resolver este pacto y, si el dado resulta un 1, se revelará una de las 15 cartas almacenadas.<br>Una vez adquirido el pacto, este no desaparecerá hasta haberse cumplido.</li>
      <li><strong>3. Mancillado.</strong> Funciona de forma similar al pacto siniestro, pero actúa cuando sale la ficha “Vacía” o de “Pista 2”: se abrirá un recordatorio al investigador para hacer X cosa, y cuando salga la ficha de “Retribución” deberá revelar la carta; la aplicación seleccionará una de las cartas disponibles. El castigo de esta carta suele ser más leve.</li>
      <li><strong>4. Maldición – Bendición.</strong> Con la bendición los aciertos serán 4, 5 y 6; con la maldición, solo 6. No se pueden tener ambas a la vez: si una está activa y activas la otra, la que tenías se desactivará automáticamente. Además, al activarse una u otra, la imagen del investigador brillará con un aura verde o roja.</li>
      <li><strong>5. Fatigado – Determinado – Perseguido.</strong> Estados que otorgan bonificaciones varias.</li>
      <li><strong>6. Estados secundarios.</strong> Consecuencias de otros estados, creados por la comunidad o por mí mismo; por ejemplo, que el investigador quede manco porque un tentáculo de una cámara fotográfica le rebanó el brazo… en el universo de Lovecraft podría pasar perfectamente.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/personajes/vistaEstados.jpg" alt="Estados del jugador" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>In play – Player – Habilidades</h2>
    <ul>
      <li><strong>1. Habilidades únicas.</strong> Aquí aparecen las habilidades únicas del investigador.</li>
      <li><strong>2. Pertenencias iniciales.</strong> Aquí aparecen las cartas de pertenencias que tiene desde el principio. En un futuro se implantará la opción de añadir cartas, ya que durante la partida se consiguen más objetos.</li>
      <li>Cada carta se puede ver en detalle si se toca.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/inplay/habilidades.jpg" alt="Habilidades del investigador" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>In play – Ajustes</h2>
    <ul>
      <li><strong>1. Botones de preview.</strong> Estos dos botones actualmente no son funcionales, pero muestran un avance de lo que harán y se verá.</li>
      <li><strong>2. Código de mapa.</strong> Esta parte solo aparece si el mapa en juego es online.</li>
      <li><strong>3. Volver a la lista de personajes o terminar la partida.</strong> Vuelve al inicio.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/inplay/Ajustes.jpg" alt="Ajustes de la aplicación" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<table align="center">
  <td>
    <h2>In play – Mapa</h2>
    <p>Esta parte es completamente online. Todo lo que se modifique aquí realizará llamadas a la API para cambiar los estados de las variables, de modo que todos los que estén jugando este mismo mapa puedan ver los datos actualizados, ya sean las fichas de perdición y pista del mapa (estas fichas se usan para avanzar en la historia, para bien o para mal) o la reserva de mitos. En la práctica, esto simula una bolsa de fichas de la que, en determinados momentos de la partida, todos los jugadores deben sacar fichas; según lo que saquen, suceden eventos en el mapa y en la historia.</p>
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>In play – Mapa – Datos base y reserva de mitos</h2>
    <ul>
      <li><strong>1. Botones de variables:</strong> control de perdición y pista en el mapa.</li>
      <li><strong>2. Navegación.</strong></li>
      <li><strong>3. Botón de resetear la reserva de mitos:</strong> devuelve todas las fichas reveladas a la bolsa.</li>
      <li><strong>4. Botón para añadir ficha a la reserva:</strong> al hacer clic, se abre un modal para seleccionar el tipo de ficha a añadir.</li>
      <li><strong>5. Botón para borrar ficha de mitos:</strong> abre un modal para elegir la ficha a eliminar.</li>
      <li><strong>6. Botón para retornar ficha:</strong> abre un modal con todas las fichas ya reveladas; permite devolver una ficha a la reserva.</li>
      <li><strong>7. Reserva de mitos:</strong> muestra todas las fichas; las tachadas indican las ya reveladas.</li>
      <li><strong>8. Botón para pedir ficha de mitos:</strong> al solicitarla, no solo extrae la ficha, sino que también actualiza la reserva en el servidor.</li>
      <li><strong>9. Ficha de mitos extraída:</strong> muestra en grande la ficha obtenida.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/inplay/MapaInPlay.jpg" alt="Habilidades del investigador" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<div align="center"><h2>Mapas</h2></div>

<table align="center">
  <td style="max-width: 684px">
    <h2>Lista de mapas</h2>
    <ul>
      <li><strong>1. Activar o desactivar expansiones.</strong> El borde de cada mapa indica su expansión.</li>
      <li><strong>2. Botón de modo online.</strong> Abre el modal para entrar en partidas online.</li>
      <li><strong>3. Mapa.</strong> Al tocarlo, accedes a la página de detalle de ese mapa.</li>
      <li>Para acceder al modo online, el usuario debe estar logueado. Aparecerá una barra para introducir la ID de un mapa online ya creado.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/mapas/lista de mapas.jpg" alt="Lista de mapas" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

<table align="center">
  <td style="max-width: 684px">
    <h2>Detalle de mapas</h2>
    <p>Actualmente los datos en la sección de especificaciones (votos de usuario, dificultad, duración) son estimaciones basadas en partidas propias. Próximamente habrá un sistema de votación e interacción con los usuarios para calcular una media colectiva.</p>
    <ul>
      <li><strong>1. Datos básicos.</strong> Incluyen título, descripción y, en algunos mapas, una locución (toca el icono del megáfono para activarla si está disponible).</li>
      <li><strong>2. Especificaciones.</strong> Datos adicionales del mapa; de momento son estimaciones, pero pronto se obtendrán de la media de todos los usuarios.</li>
      <li><strong>3. Mapa de losetas.</strong> Guía para colocar las losetas; al tocar se amplía para ver mejor.</li>
      <li><strong>4. Enemigos.</strong> Muestra la lista de enemigos de la historia; varía según el mapa. Toca un enemigo para ver sus detalles.</li>
      <li><strong>5. Inv. recomendados y comunidad.</strong> La sección de investigadores recomendados está en desarrollo; mostrará qué investigadores convienen según el mapa. “Comunidad” redirige a la página de BGG de Arkham Horror 3.ª edición.</li>
      <li><strong>6. Crear mapa online.</strong> Solo visible si el usuario está logueado; crea una partida online con el mapa seleccionado y devuelve la ID para compartir.</li>
      <li><strong>7. Seleccionar mapa.</strong> Botón para elegir el mapa con el que jugar.</li>
      <li><strong>8. Volver a la lista.</strong> Regresa a la lista de mapas.</li>
      <li><strong>9. Contador.</strong> Muestra cuántos mapas hay en total y cuál está seleccionado.</li>
      <li><strong>10. Seleccionar investigador.</strong> Lleva a la lista de investigadores.</li>
    </ul>
  </td>
  <td>
    <img src="/README_FILES/mapas/detalleMapa.jpg" alt="Detalle de mapas" style="max-width: 100%; max-height: 700px;">
  </td>
</table>

# API

<p>Sin entrar en profundidad, esto es lo que gestiona la API:</p>
<ul>
  <li>Bases de datos de investigadores, mapas, mapas online, enemigos y cartas de objetos.</li>
  <li>Gestión de endpoints basada en modelo ruta–controlador–modelo.</li>
</ul>
<p>La API está alojada en Railway.</p>
<p>Si quieres saber más, el repositorio está público en mi perfil.</p>

# Especificaciones técnicas

### Tecnologías usadas
- **Lenguaje de programación:** JavaScript, HTML, CSS, Node.js, Express  
- **Frameworks y bibliotecas:** Vue, Vue Router, Vuex, Howler  
- **Herramientas de desarrollo:** Bulma, Buefy, Clerk  
- **Despliegue:** Firebase para el front y Railway para el back  

# Enlace a la app

Pruebala! -> [Click aqui](https://arkhamhorror-39297.web.app/#/) <-



