import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { deflateSync } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Background: dark teal gradient
function getGradientColor(x, y, size) {
  const t = (x + y) / (2 * (size - 1));
  // #061a14 → #091f18
  return {
    r: Math.round(0x06 + (0x09 - 0x06) * t),
    g: Math.round(0x1a + (0x1f - 0x1a) * t),
    b: Math.round(0x14 + (0x18 - 0x14) * t),
    a: 255,
  };
}

// Distance from point (px,py) to line segment (ax,ay)→(bx,by)
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

// K letterform at normalised coords [0,1]
function isKPixel(x, y, size) {
  const nx = x / size;
  const ny = y / size;
  const thick = 0.09;  // stroke thickness (half-width)

  // Vertical stroke — left pillar
  if (nx >= 0.20 && nx <= 0.20 + thick * 2 && ny >= 0.12 && ny <= 0.88) return true;

  // Upper diagonal arm: (0.38, 0.50) → (0.78, 0.12)
  if (distToSegment(nx, ny, 0.38, 0.50, 0.78, 0.12) < thick) return true;

  // Lower diagonal arm: (0.38, 0.50) → (0.78, 0.88)
  if (distToSegment(nx, ny, 0.38, 0.50, 0.78, 0.88) < thick) return true;

  return false;
}

// Rounded rect mask
function isInRoundedRect(x, y, size, radius) {
  if (x < radius && y < radius) return (x - radius) ** 2 + (y - radius) ** 2 <= radius ** 2;
  if (x >= size - radius && y < radius) return (x - (size - radius - 1)) ** 2 + (y - radius) ** 2 <= radius ** 2;
  if (x < radius && y >= size - radius) return (x - radius) ** 2 + (y - (size - radius - 1)) ** 2 <= radius ** 2;
  if (x >= size - radius && y >= size - radius) return (x - (size - radius - 1)) ** 2 + (y - (size - radius - 1)) ** 2 <= radius ** 2;
  return true;
}

function generatePNG(size) {
  const radius = Math.round(size * 0.1875);
  const pixels = Buffer.alloc(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const offset = (y * size + x) * 4;
      if (!isInRoundedRect(x, y, size, radius)) {
        pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = pixels[offset + 3] = 0;
      } else if (isKPixel(x, y, size)) {
        // Emerald #10b981
        pixels[offset] = 0x10;
        pixels[offset + 1] = 0xb9;
        pixels[offset + 2] = 0x81;
        pixels[offset + 3] = 255;
      } else {
        const c = getGradientColor(x, y, size);
        pixels[offset] = c.r;
        pixels[offset + 1] = c.g;
        pixels[offset + 2] = c.b;
        pixels[offset + 3] = c.a;
      }
    }
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    const table = new Int32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[i] = c;
    }
    for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function pngChunk(type, data) {
    const typeBuffer = Buffer.from(type, 'ascii');
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const crcData = Buffer.concat([typeBuffer, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcData));
    return Buffer.concat([length, typeBuffer, data, crc]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;

  const rawData = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    rawData[y * (1 + size * 4)] = 0;
    pixels.copy(rawData, y * (1 + size * 4) + 1, y * size * 4, (y + 1) * size * 4);
  }

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(rawData)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

const icons = [
  { name: 'favicon.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of icons) {
  const png = generatePNG(size);
  writeFileSync(join(publicDir, name), png);
  console.log(`Generated ${name} (${size}x${size}, ${png.length} bytes)`);
}

// ICO from 32×32
const png32 = generatePNG(32);
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); icoHeader.writeUInt16LE(1, 2); icoHeader.writeUInt16LE(1, 4);
const icoEntry = Buffer.alloc(16);
icoEntry[0] = 32; icoEntry[1] = 32;
icoEntry.writeUInt16LE(1, 4); icoEntry.writeUInt16LE(32, 6);
icoEntry.writeUInt32LE(png32.length, 8); icoEntry.writeUInt32LE(22, 12);
const ico = Buffer.concat([icoHeader, icoEntry, png32]);
writeFileSync(join(publicDir, 'favicon.ico'), ico);
console.log(`Generated favicon.ico (${ico.length} bytes)`);
console.log('\nAll icons generated!');
