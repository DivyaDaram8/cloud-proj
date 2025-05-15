import * as THREE from 'three';

export function createTextTexture(text, options = {}) {
  const {
    width = 512,
    height = 256,
    font = 'bold 34px Arial',
    color = 'white',
    background = 'transparent',
    lineHeight = 40,
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  if (background !== 'transparent') {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';

  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const widthTest = ctx.measureText(currentLine + ' ' + word).width;
    if (widthTest < width - 40) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  const totalHeight = lines.length * lineHeight;
  const startY = (height - totalHeight) / 2 + lineHeight / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}
