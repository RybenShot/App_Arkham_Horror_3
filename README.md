<div align="center">

🇪🇸 Español&nbsp;&nbsp;|&nbsp;&nbsp;[🇬🇧 English](README.en.md)

<img src="/README_FILES/bannerAH.png" width="100%" alt="App Arkham Horror">

# App Arkham Horror · 3ª Edición

Compañera digital del juego de mesa **Arkham Horror 3ª Edición**: gestiona investigadores, mapas y partidas online desde el móvil, sin perder el ritmo de la partida.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow?style=flat-square)
![Versión](https://img.shields.io/badge/versión-Beta%204-blue?style=flat-square)
![Hecho por](https://img.shields.io/badge/hecho%20por-1%20persona-critical?style=flat-square)

**[🎮 Probar la app](https://arkhamhorror-39297.web.app/#/)** ·
**[📸 Instagram](https://instagram.com/apparkhamhorror)** ·
**[☕ Apóyame](https://www.buymeacoffee.com/appArkhamHorror)** ·
**[💼 LinkedIn](https://linkedin.com/in/sebastian-jimenez-roman)**

</div>

<br>

> ### 👋 Nota para el equipo de Devir Play
>
> Me postulo al puesto de **TypeScript / Gameplay Developer**, y este proyecto es la pieza de portafolio que quiero que veáis. Algunas notas honestas sobre cómo encaja con lo que buscáis:
>
> - **Estado y casos límite**: el núcleo de esta app *es* lógica de estado de juego — pools de dados modificados por bendición/maldición, fichas de concentración, reservas compartidas de perdición/pista/mitos, recordatorios automáticos que saltan a mitad de partida. Es el tipo de pensamiento de máquina de estados y edge cases que disfruto.
> - **Contratos como API**: el backend es un servicio REST aparte (ruta → controlador → modelo) — **[pruebas_API-REST](https://github.com/RybenShot/pruebas_API-REST)** — que este cliente consume mediante endpoints versionados.
> - **Estado compartido entre clientes**: el modo de mapa online permite que varios investigadores lean/escriban el mismo estado de juego compartido a través de esa API — lo más parecido a un estado compartido autoritativo que he construido, aunque sea vía REST y no un motor en tiempo real server-authoritative.
> - **Disciplina de testing**: empecé a añadir tests unitarios con Vitest a medida que el proyecto maduraba.
> - **Trabajar con agentes a diario**: tanto el código como la documentación de este proyecto (este README, capturas, GIFs) se construyeron en colaboración estrecha y diaria con un agente de código IA (Claude Code). Estoy acostumbrado a dirigir, revisar y corregir lo que produce un agente, no solo a aceptarlo.
> - **Carencias, dichas de frente**: es JavaScript puro, no TypeScript, crecido en solitario durante más de un año — algunos archivos son más grandes de lo que diseñaría hoy. Estoy usando agentes activamente para partirlos en módulos más pequeños y basados en contratos, pero prefiero decirlo claramente antes que venderlo de más.
>
> Si esto merece una mirada más de cerca, el resto de este README recorre la app en sí.

<br>

## 📖 Índice

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Un vistazo por dentro](#-un-vistazo-por-dentro)
- [Cómo está hecho](#-cómo-está-hecho)
- [Autenticación y API](#-autenticación-y-api)
- [Pruébala](#-pruébala)

<br>

## 📖 Sobre el proyecto

Arkham Horror 3ª Edición es un juego de mesa maravilloso, pero también denso: decenas de cartas, fichas y estados que hay que llevar al día en cada turno. Esta app nació para quitarse de encima esa gestión manual y dejar sitio a la parte divertida: investigar, arriesgar y, casi siempre, perder la cordura en el intento.

La lleva adelante **una sola persona** en su tiempo libre, así que crece poco a poco. Ahora mismo está en su 4ª versión (Beta) y ya cubre todas las expansiones oficiales, además de contenido creado por la comunidad de BGG. En esta última tanda de cambios ha ganado un tirador de dados renovado, un tour guiado interactivo, tutoriales para quien empieza, personalización de dados y la posibilidad de instalarla como aplicación en el móvil.

<br>

## ✨ Funcionalidades

- 🗺️ **Mapas** de todos los escenarios, con dificultad, duración estimada y valoración de la comunidad
- 🕵️ **Investigadores** con ficha completa: salud, atributos, habilidades e historia narrada en audio
- 🎲 **Tirador de dados** con las reglas de bendición/maldición y fichas de concentración aplicadas automáticamente
- 🌀 **Estados de partida** (pactos, maldiciones, fatiga...) con recordatorios automáticos en el momento justo
- 📍 **Ubicación del investigador** sobre el mapa de la partida
- 🌐 **Partidas online**: crea o únete a un mapa compartido y juega en tiempo real con otros investigadores
- 🎓 **Tour guiado y tutoriales interactivos** para quien llega por primera vez
- 📲 **Instalable como app** (PWA) y con dados personalizables
- 🔊 Narración en off, efectos visuales y música ambiente configurable

<br>

## 🔎 Un vistazo por dentro

### 🏠 Inicio

La puerta de entrada a todo lo demás: acceso a Mapas e Investigadores, inicio de sesión, tutoriales, ajustes y la opción de instalar la app en el dispositivo.

<p align="center"><img src="/README_FILES/app/home.jpg" width="280" alt="Pantalla de inicio"></p>

### 🕵️ Investigadores

Filtra por expansión o arquetipo y elige a tu investigador. Cada ficha trae su historia, pertenencias iniciales, habilidades y estadísticas, con la valoración de otros jugadores.

<p align="center">
  <img src="/README_FILES/app/investigadores_lista.jpg" width="270" alt="Lista de investigadores">
  <img src="/README_FILES/app/investigador_detalle.jpg" width="270" alt="Detalle de investigador">
</p>

### 🎲 En partida

Al elegir investigador entras en la partida: tirador de dados, estados, habilidades y ajustes, todo pensado para manejarse con el pulgar durante el juego.

<p align="center"><img src="/README_FILES/app/tirador-dados.gif" width="300" alt="Tirada de dados animada"></p>

<p align="center">
  <img src="/README_FILES/app/estados.jpg" width="220" alt="Estados del investigador">
  <img src="/README_FILES/app/habilidades.jpg" width="220" alt="Habilidades y pertenencias">
  <img src="/README_FILES/app/ubicacion_jugador.jpg" width="220" alt="Ubicación del investigador">
</p>

### 🗺️ Mapas

Cada mapa es un escenario distinto, con su propia dificultad, duración estimada, enemigos y valoración de la comunidad. Se puede jugar en solitario o crear una partida online para jugar con más gente.

<p align="center">
  <img src="/README_FILES/app/mapas_lista.jpg" width="270" alt="Lista de mapas">
  <img src="/README_FILES/app/mapa_detalle.jpg" width="270" alt="Detalle de un mapa">
</p>

### 🎓 Aprende a jugar

Para quien llega por primera vez hay un tour guiado interactivo y una sección de tutoriales, pensados simplemente para enseñar a moverse por la app.

<p align="center">
  <img src="/README_FILES/app/tutoriales.jpg" width="220" alt="Sección de tutoriales">
  <img src="/README_FILES/app/tour-guiado.gif" width="220" alt="Tour guiado interactivo">
</p>

### 👤 Perfil y multijugador

Al iniciar sesión (con Clerk) se desbloquea el perfil privado, los mapas online que hayas creado, la personalización de dados y el modo multijugador para jugar en el mismo mapa que tus amigos.

<p align="center"><img src="/README_FILES/profile.jpg" width="260" alt="Perfil de usuario"></p>

<br>

## 🧩 Cómo está hecho

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vuex](https://img.shields.io/badge/Vuex-42b983?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

El front está construido en **Vue 3 + Vuex + Vue Router**, con **Bulma/Buefy** para la interfaz y **Howler** para el audio. Se despliega en **Firebase Hosting** y es instalable como **PWA**. El back sigue un patrón ruta–controlador–modelo desplegado en **Railway**, y las piezas más delicadas tienen pruebas unitarias con **Vitest**.

<br>

## 🔐 Autenticación y API

**Clerk** gestiona los usuarios: crear mapas online, controlar fichas de perdición/pista o la reserva de mitos, y ver en el perfil privado los mapas propios (identificados por el ID de usuario). Cualquiera con el ID de un mapa puede unirse a él si ha iniciado sesión. Gracias a Clerk, el acceso al perfil privado y a las partidas online queda restringido según el estado de la sesión.

El **backend** (API REST alojada en Railway) tiene su propio repositorio y documentación: **[pruebas_API-REST](https://github.com/RybenShot/pruebas_API-REST)**.

<br>

## 🚀 Pruébala

<div align="center">

**[👉 Abrir la app](https://arkhamhorror-39297.web.app/#/)**

¿Dudas o sugerencias? Escríbeme por [LinkedIn](https://linkedin.com/in/sebastian-jimenez-roman) o [Instagram](https://instagram.com/apparkhamhorror).

</div>
