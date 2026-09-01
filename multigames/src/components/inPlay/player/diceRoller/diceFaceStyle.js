/**
 * Utilidades compartidas para representar una cara de dado (valor 1-6) como
 * icono plano en CSS: un recorte del atlas de imágenes, o el color base del
 * dado con puntos clásicos y el logo del estudio en la cara del 6 para el
 * diseño 'pool'. La usa DiceFloatPreview, el dado 3D flotante del selector
 * de diseño en Ajustes.
 */
import { logoDado } from "@/services/diceFaceHelper.js";

// Posiciones normalizadas (-1,0,1) de los puntos, igual que PIPS en diceEngine.js
export const PIPS = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
  5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
  6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]]
};

// Recorta la cara `value` del atlas de `skin` para mostrarla en un cuadro de `size` px
function atlasFaceStyle(skin, value, size) {
  const { atlas } = skin;
  const [sx, sy] = atlas.rects[value];
  const { w: tw, h: th } = atlas.tile;
  const { w: nw, h: nh } = atlas.natural;
  const scaleX = size / tw;
  const scaleY = size / th;
  return {
    backgroundImage: `url(${atlas.src})`,
    backgroundSize: `${nw * scaleX}px ${nh * scaleY}px`,
    backgroundPosition: `-${sx * scaleX}px -${sy * scaleY}px`
  };
}

// Fondo de la cara para el diseño 'pool': color liso del dado, con el logo del
// estudio centrado en la cara del 6 (el resto se pinta con puntos aparte)
function poolFaceStyle(skin, value) {
  const dieColor = skin.theme?.die ? `rgb(${skin.theme.die.join(",")})` : "#f7f0de";
  if (value !== 6) return { backgroundColor: dieColor };
  return {
    backgroundColor: dieColor,
    backgroundImage: `url(${logoDado})`,
    backgroundSize: "62% 62%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };
}

export function faceStyle(skin, value, size) {
  return skin.type === "atlas" ? atlasFaceStyle(skin, value, size) : poolFaceStyle(skin, value);
}
