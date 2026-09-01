/**
 * Registro de diseños ("skins") del lanzador de dados a pantalla completa.
 * Para añadir uno nuevo basta con meter una entrada aquí: ni AjustesPlay.vue
 * (el modal de selección) ni DiceRollerCanvas.vue necesitan tocarse.
 *
 * Cada entrada es:
 *   id           clave guardada en $store.state.tipoDadoSkin
 *   nombre       { español, ingles }
 *   descripcion  { español, ingles }
 *   theme        tema de DiceEngine: { ink, board, die, dieMarked, pipOne, confetti }
 *   type         'atlas' — un único PNG con las 6 caras, se recorta por rects
 *                'pool'  — una imagen (o varias, elegidas al azar por dado) sólo
 *                          en la cara del 6; el resto se dibuja con puntos clásicos
 *
 * 'atlas' necesita: atlas: { src, tile:{w,h}, natural:{w,h}, rects:{1:[sx,sy], ..., 6:[sx,sy]}, inset? }
 *                   (natural es el tamaño real del PNG, para recortar caras vía CSS
 *                   background-position/-size en DiceFloatPreview)
 * 'pool' necesita:  buildPool(store) -> array de src de imagen
 */

import { logoDado } from "@/services/diceFaceHelper.js";
import gothicDiceNet from "@/assets/img/5-dados/GothicDice.png";
import bloodborneDiceNet from "@/assets/img/5-dados/BloodborneDice.png";
import lovecraftDiceNet from "@/assets/img/5-dados/DadoLovecraft.png";
import galaxyDiceNet from "@/assets/img/5-dados/GalaxyDice.png";
import oniricoDiceNet from "@/assets/img/5-dados/OniricoDice.png";
import reyDeAmarilloDiceNet from "@/assets/img/5-dados/ReyDeAmarilloDice.png";
import wbDiceNet from "@/assets/img/5-dados/WBDice.png";

// Dado clásico: pergamino claro, tinta oscura. El acierto es un aura de
// estrella en azul eléctrico oscuro sobre el vacío (halo + motas girando,
// ver el bloque "Aura de acierto" en diceEngine.js) — hipnótico, no un
// tinte alegre. El marcador verde de la zona de resultados no cambia (ver
// .acierto en TiradorDadosPlay.vue). Sin tapete: el fondo lo pone el
// overlay a pantalla completa que lo envuelve.
const THEME_CLASICO = {
  ink: "#2c2c2a",
  board: "transparent",
  die: [247, 240, 222],
  dieMarked: [46, 38, 130],
  pipOne: "#e0342c",
  confetti: ["#4b3df0", "#8fd6ff", "#6f42f5", "#150f3d"]
};

// Dado gótico: piedra oscura tallada; el acierto se ve como si las runes
// grabadas se abrieran a un vacío estrellado en vez de teñirse.
const THEME_GOTICO = {
  ink: "#0d0c0a",
  board: "transparent",
  die: [46, 42, 36],
  dieMarked: [40, 32, 110],
  pipOne: "#e0342c",
  confetti: ["#4b3df0", "#8fd6ff", "#6f42f5", "#150f3d"]
};

// El resto de diseños comparten la misma aura de acierto (azul eléctrico
// hipnótico) que clásico y gótico, para que el efecto de acierto sea
// consistente sin importar el dado elegido; sólo cambia el tono base de la
// piedra/página tallada bajo el diseño (visible como un fino borde, ya que
// el atlas casi cubre toda la cara, inset 0.995).
const AURA_ACIERTO = { dieMarked: [40, 32, 110], pipOne: "#e0342c", confetti: ["#4b3df0", "#8fd6ff", "#6f42f5", "#150f3d"] };

const THEME_BLOODBORNE = { ink: "#0d0c0a", board: "transparent", die: [45, 42, 46], ...AURA_ACIERTO };
const THEME_LOVECRAFT = { ink: "#0a0f0c", board: "transparent", die: [26, 36, 32], ...AURA_ACIERTO };
const THEME_GALAXIA = { ink: "#0c0a14", board: "transparent", die: [30, 24, 46], ...AURA_ACIERTO };
const THEME_ONIRICO = { ink: "#0b0d10", board: "transparent", die: [34, 36, 40], ...AURA_ACIERTO };
const THEME_REY_AMARILLO = { ink: "#0c0a04", board: "transparent", die: [40, 36, 20], ...AURA_ACIERTO };
// Grimorio: página de pergamino clara, tinta oscura (como el clásico)
const THEME_GRIMORIO = { ink: "#2c2c2a", board: "transparent", die: [225, 220, 200], ...AURA_ACIERTO };

export const DICE_SKINS = [
  {
    id: "clasico",
    nombre: { español: "Clásico", ingles: "Classic" },
    descripcion: {
      español: "Puntos y el logo del estudio o tus dados propios en la cara del 6.",
      ingles: "Pips, with the studio logo or your own dice on the 6 face."
    },
    theme: THEME_CLASICO,
    type: "pool",
    buildPool(store) {
      const propias = (store.state.diceImages || []).map((img) => img.data);
      return [logoDado, ...propias];
    }
  },
  {
    id: "gotico",
    nombre: { español: "Gótico", ingles: "Gothic" },
    descripcion: {
      español: "Diseño numerado grabado en piedra en las 6 caras.",
      ingles: "Stone-carved numbered design on all 6 faces."
    },
    theme: THEME_GOTICO,
    type: "atlas",
    atlas: {
      src: gothicDiceNet,
      // Tira en cruz de 1132x1390, teselas de 328x324. Caras opuestas suman 7,
      // igual que el orden de FACES en diceEngine.js.
      tile: { w: 328, h: 324 },
      natural: { w: 1132, h: 1390 },
      rects: {
        1: [398, 74],
        2: [70, 398],
        3: [398, 398],
        5: [726, 398],
        6: [398, 722],
        4: [398, 1046]
      },
      inset: 0.995
    }
  },
  {
    id: "bloodborne",
    nombre: { español: "Cazador", ingles: "Hunter" },
    descripcion: {
      español: "Piedra de catedral bajo la luna llena; la marca del cazador arde en la cara del 6.",
      ingles: "Cathedral stone under a full moon; the hunter's mark burns on the 6 face."
    },
    theme: THEME_BLOODBORNE,
    type: "atlas",
    // Tira en cruz de 1162x1353, teselas de 381x334.
    atlas: {
      src: bloodborneDiceNet,
      tile: { w: 381, h: 334 },
      natural: { w: 1162, h: 1353 },
      rects: {
        1: [389, 12],
        2: [8, 346],
        3: [389, 346],
        5: [770, 346],
        6: [389, 681],
        4: [389, 1016]
      },
      inset: 0.995
    }
  },
  {
    id: "lovecraft",
    nombre: { español: "Lovecraft", ingles: "Lovecraft" },
    descripcion: {
      español: "Piedra verdosa grabada con tentáculos y símbolos imposibles.",
      ingles: "Greenish stone carved with tentacles and impossible symbols."
    },
    theme: THEME_LOVECRAFT,
    type: "atlas",
    // Tira en cruz de 1138x1382, teselas de 355x332.
    atlas: {
      src: lovecraftDiceNet,
      tile: { w: 355, h: 332 },
      natural: { w: 1138, h: 1382 },
      rects: {
        1: [390, 37],
        2: [35, 368],
        3: [390, 368],
        5: [744, 368],
        6: [390, 700],
        4: [390, 1032]
      },
      inset: 0.995
    }
  },
  {
    id: "galaxia",
    nombre: { español: "Galaxia", ingles: "Galaxy" },
    descripcion: {
      español: "Cada cara es un rincón distinto del cosmos: nebulosas, agujeros negros y estrellas.",
      ingles: "Each face is a different corner of the cosmos: nebulae, black holes and stars."
    },
    theme: THEME_GALAXIA,
    type: "atlas",
    // Tira en cruz de 1133x1388, teselas de 374x333.
    atlas: {
      src: galaxyDiceNet,
      tile: { w: 374, h: 333 },
      natural: { w: 1133, h: 1388 },
      rects: {
        1: [378, 45],
        2: [4, 378],
        3: [378, 378],
        5: [752, 378],
        6: [378, 710],
        4: [378, 1043]
      },
      inset: 0.995
    }
  },
  {
    id: "onirico",
    nombre: { español: "Onírico", ingles: "Oneiric" },
    descripcion: {
      español: "Tinta de pesadilla sobre piedra brumosa, como recordada de un sueño.",
      ingles: "Nightmare ink over misty stone, as if remembered from a dream."
    },
    theme: THEME_ONIRICO,
    type: "atlas",
    // Tira en cruz de 1132x1390, teselas de 349x328.
    atlas: {
      src: oniricoDiceNet,
      tile: { w: 349, h: 328 },
      natural: { w: 1132, h: 1390 },
      rects: {
        1: [391, 43],
        2: [42, 372],
        3: [391, 372],
        5: [740, 372],
        6: [391, 700],
        4: [391, 1028]
      },
      inset: 0.995
    }
  },
  {
    id: "reyDeAmarillo",
    nombre: { español: "Rey de Amarillo", ingles: "King in Yellow" },
    descripcion: {
      español: "Trazos dorados sobre piedra negra; el Rey aguarda en la cara del 6.",
      ingles: "Golden strokes on black stone; the King waits on the 6 face."
    },
    theme: THEME_REY_AMARILLO,
    type: "atlas",
    // Tira en cruz de 1149x1369, teselas de 375x334.
    atlas: {
      src: reyDeAmarilloDiceNet,
      tile: { w: 375, h: 334 },
      natural: { w: 1149, h: 1369 },
      rects: {
        1: [387, 15],
        2: [12, 348],
        3: [387, 348],
        5: [761, 348],
        6: [387, 682],
        4: [387, 1016]
      },
      inset: 0.995
    }
  },
  {
    id: "grimorio",
    nombre: { español: "Grimorio", ingles: "Grimoire" },
    descripcion: {
      español: "Página de pergamino envejecido, tinta de tentáculos y una sombra al acecho.",
      ingles: "Aged parchment page, tentacle ink and a lurking shadow."
    },
    theme: THEME_GRIMORIO,
    type: "atlas",
    // Tira en cruz de 1138x1382, teselas de 370x342.
    atlas: {
      src: wbDiceNet,
      tile: { w: 370, h: 342 },
      natural: { w: 1138, h: 1382 },
      rects: {
        1: [382, 4],
        2: [12, 346],
        3: [382, 346],
        5: [753, 346],
        6: [382, 688],
        4: [382, 1031]
      },
      inset: 0.995
    }
  }
];

export function getDiceSkin(id) {
  return DICE_SKINS.find((s) => s.id === id) || DICE_SKINS[0];
}

// Cache de imágenes cargadas por src, compartida entre tiradas y componentes
const imageCache = new Map();
export function loadImage(src) {
  let img = imageCache.get(src);
  if (!img) {
    img = new Image();
    img.src = src;
    imageCache.set(src, img);
  }
  return img;
}
