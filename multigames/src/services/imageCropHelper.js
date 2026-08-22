// Recorta un archivo de imagen al cuadrado central (usando <canvas>) y lo devuelve
// como data URL en PNG. La compresión final al peso objetivo la hace el backend.
export function cropImageToSquareDataUrl(file, side = 256) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const tamanoRecorte = Math.min(img.width, img.height);
      const sx = (img.width - tamanoRecorte) / 2;
      const sy = (img.height - tamanoRecorte) / 2;

      const canvas = document.createElement('canvas');
      canvas.width = side;
      canvas.height = side;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, sx, sy, tamanoRecorte, tamanoRecorte, 0, 0, side, side);

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen'));
    };

    img.src = url;
  });
}
