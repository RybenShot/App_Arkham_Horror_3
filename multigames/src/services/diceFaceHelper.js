import logoDado from "@/assets/img/ZZOtros/LogoSimple.png";

export { logoDado };

// Elige al azar la imagen de la cara 6 para una tirada: el logo del estudio por
// defecto o cualquiera de las imágenes personalizadas que el usuario tenga guardadas.
export function pickRandomFace6(store) {
  const imagenes = store?.state?.diceImages || [];
  const pool = [logoDado, ...imagenes.map(img => img.data)];
  return pool[Math.floor(Math.random() * pool.length)];
}
