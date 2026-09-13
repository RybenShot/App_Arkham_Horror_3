<div align="center">

[🇪🇸 Español](README.md)&nbsp;&nbsp;|&nbsp;&nbsp;🇬🇧 English

<img src="/README_FILES/bannerAH.png" width="100%" alt="App Arkham Horror">

# App Arkham Horror · 3rd Edition

A digital companion for the **Arkham Horror 3rd Edition** board game: manage investigators, maps and online sessions from your phone, without breaking the pace of the game.

![Status](https://img.shields.io/badge/status-in%20development-yellow?style=flat-square)
![Version](https://img.shields.io/badge/version-Beta%204-blue?style=flat-square)
![Built by](https://img.shields.io/badge/built%20by-1%20person-critical?style=flat-square)

**[🎮 Try the app](https://arkhamhorror-39297.web.app/#/)** ·
**[📸 Instagram](https://instagram.com/apparkhamhorror)** ·
**[☕ Support me](https://www.buymeacoffee.com/appArkhamHorror)** ·
**[💼 LinkedIn](https://linkedin.com/in/sebastian-jimenez-roman)**

</div>

<br>

> ### 👋 Note for the Devir Play team
>
> I'm applying for the **TypeScript / Gameplay Developer** role, and this project is the portfolio piece I want you to look at. A few honest notes on how it maps to what you're looking for:
>
> - **State & edge cases**: the core of this app *is* game-state logic — dice pools modified by blessed/cursed conditions, concentration tokens, shared doom/clue/mythos pools, automatic status reminders firing mid-game. That's the kind of state-machine and edge-case thinking I enjoy.
> - **Contracts as API**: the backend is a separate REST service (route → controller → model) — **[pruebas_API-REST](https://github.com/RybenShot/pruebas_API-REST)** — consumed by this client over versioned endpoints.
> - **Shared state across clients**: online-map mode lets several investigators read/write the same shared game state through that API — the closest thing I've built to authoritative shared state, even if it's REST-based rather than a real-time server-authoritative engine.
> - **Testing discipline**: started adding unit tests with Vitest as the codebase matured.
> - **Working with agents daily**: this project's code *and* its documentation (this README, screenshots, GIFs) were built in close, daily collaboration with an AI coding agent (Claude Code). I'm used to directing, reviewing and correcting agent output, not just accepting it.
> - **Gaps, stated upfront**: it's plain JavaScript, not TypeScript, grown solo over more than a year — a few files are bigger than I'd design today. I'm actively using agents to break those into smaller, contract-first modules, but I'd rather say that plainly than oversell it.
>
> If that's worth a closer look, the rest of this README walks through the app itself.

<br>

## 📖 Contents

- [About the project](#-about-the-project)
- [Features](#-features)
- [A look inside](#-a-look-inside)
- [How it's built](#-how-its-built)
- [Auth & API](#-auth--api)
- [Try it](#-try-it)

<br>

## 📖 About the project

Arkham Horror 3rd Edition is a wonderful board game, but also a dense one: dozens of cards, tokens and statuses to keep track of every turn. This app exists to take that manual bookkeeping off your plate and leave room for the fun part: investigating, taking risks and, almost always, losing your sanity along the way.

It's built by **a single person** in their spare time, so it grows gradually. It's currently on its 4th version (Beta) and already covers every official expansion, plus content created by the BGG community. This latest round of changes added a rebuilt dice roller, an interactive guided tour, tutorials for newcomers, custom dice, and the option to install the app on your phone.

<br>

## ✨ Features

- 🗺️ **Maps** for every scenario, with difficulty, estimated duration and community ratings
- 🕵️ **Investigators** with a full sheet: health, attributes, abilities, and an audio-narrated backstory
- 🎲 **Dice roller** that automatically applies blessed/cursed rules and concentration tokens
- 🌀 **In-game statuses** (pacts, curses, fatigue...) with automatic reminders right when they matter
- 📍 **Investigator location** tracked on the session's map
- 🌐 **Online sessions**: create or join a shared map and play in real time with other investigators
- 🎓 **Guided tour and interactive tutorials** for first-time players
- 📲 **Installable as an app** (PWA), with customizable dice
- 🔊 Voice-over narration, visual effects and configurable ambient music

<br>

## 🔎 A look inside

### 🏠 Home

The entry point to everything else: access to Maps and Investigators, sign-in, tutorials, settings, and the option to install the app on your device.

<p align="center"><img src="/README_FILES/app/home.jpg" width="280" alt="Home screen"></p>

### 🕵️ Investigators

Filter by expansion or archetype and pick your investigator. Each sheet brings their backstory, starting possessions, abilities and stats, plus other players' ratings.

<p align="center">
  <img src="/README_FILES/app/investigadores_lista.jpg" width="270" alt="Investigator list">
  <img src="/README_FILES/app/investigador_detalle.jpg" width="270" alt="Investigator detail">
</p>

### 🎲 In-game

Once you pick an investigator you enter the session: dice roller, statuses, abilities and settings, all designed to be run with a thumb during play.

<p align="center"><img src="/README_FILES/app/tirador-dados.gif" width="300" alt="Animated dice roll"></p>

<p align="center">
  <img src="/README_FILES/app/estados.jpg" width="220" alt="Investigator statuses">
  <img src="/README_FILES/app/habilidades.jpg" width="220" alt="Abilities and possessions">
  <img src="/README_FILES/app/ubicacion_jugador.jpg" width="220" alt="Investigator location">
</p>

### 🗺️ Maps

Each map is a different scenario, with its own difficulty, estimated duration, enemies and community rating. Play it solo, or create an online session to play with more people.

<p align="center">
  <img src="/README_FILES/app/mapas_lista.jpg" width="270" alt="Map list">
  <img src="/README_FILES/app/mapa_detalle.jpg" width="270" alt="Map detail">
</p>

### 🎓 Learn to play

For first-time players there's an interactive guided tour and a tutorials section, simply meant to teach you your way around the app.

<p align="center">
  <img src="/README_FILES/app/tutoriales.jpg" width="220" alt="Tutorials section">
  <img src="/README_FILES/app/tour-guiado.gif" width="220" alt="Interactive guided tour">
</p>

### 👤 Profile & multiplayer

Signing in (via Clerk) unlocks your private profile, the online maps you've created, dice customization, and multiplayer mode to play the same map as your friends.

<p align="center"><img src="/README_FILES/profile.jpg" width="260" alt="User profile"></p>

<br>

## 🧩 How it's built

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vuex](https://img.shields.io/badge/Vuex-42b983?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

The front end is built with **Vue 3 + Vuex + Vue Router**, styled with **Bulma/Buefy**, with **Howler** for audio. It deploys to **Firebase Hosting** and installs as a **PWA**. The backend follows a route–controller–model pattern deployed on **Railway**, with the more delicate pieces covered by **Vitest** unit tests.

<br>

## 🔐 Auth & API

**Clerk** handles users: creating online maps, controlling doom/clue tokens or the mythos pool, and showing your own online maps in your private profile (keyed by your user ID). Anyone signed in with a map's ID can join it. Thanks to Clerk, access to the private profile and to online sessions is gated by session state.

The **backend** (a REST API hosted on Railway) has its own repository and documentation: **[pruebas_API-REST](https://github.com/RybenShot/pruebas_API-REST)**.

<br>

## 🚀 Try it

<div align="center">

**[👉 Open the app](https://arkhamhorror-39297.web.app/#/)**

Questions or suggestions? Reach me on [LinkedIn](https://linkedin.com/in/sebastian-jimenez-roman) or [Instagram](https://instagram.com/apparkhamhorror).

</div>
