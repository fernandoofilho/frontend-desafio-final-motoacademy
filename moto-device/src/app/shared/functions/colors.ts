export function extractColorsFromImage(imageUrl: string) {
  return new Promise<string[]>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas não suportado');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

      const colors: string[] = [];
      for (let i = 0; i < imageData.length; i += 4 * 50) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        colors.push(`rgb(${r},${g},${b})`);
      }

      resolve(colors);
    };

    img.onerror = () => reject('Erro ao carregar a imagem');
  });
}

export function getTopColors(colors: string[], topN: number = 5): string[] {
  const colorCount: Record<string, number> = {};

  colors.forEach((color) => {
    const match = color.match(/\d+/g);
    if (!match) return;

    const [r, g, b] = match.map(Number);

    const threshold = 30;
    if (
      (r <= threshold && g <= threshold && b <= threshold) || // Preto
      (r >= 255 - threshold && g >= 255 - threshold && b >= 255 - threshold) // Branco
    ) {
      return;
    }

    colorCount[color] = (colorCount[color] || 0) + 1;
  });

  return Object.entries(colorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([color]) => color);
}
