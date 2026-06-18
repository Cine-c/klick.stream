const sharp = require('sharp');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="500" viewBox="0 0 1500 500">
  <defs>
    <!-- Main emerald glow from left -->
    <radialGradient id="glow" cx="22%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#07090e" stop-opacity="0"/>
    </radialGradient>
    <!-- Right accent glow -->
    <radialGradient id="glow2" cx="85%" cy="40%" r="38%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#07090e" stop-opacity="0"/>
    </radialGradient>
    <!-- Horizontal scan line gradient -->
    <linearGradient id="scanLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#10b981" stop-opacity="0"/>
      <stop offset="20%"  stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="80%"  stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </linearGradient>
    <!-- Film frame clip -->
    <clipPath id="frameClip">
      <rect x="950" y="40" width="520" height="420" rx="12"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1500" height="500" fill="#07090e"/>

  <!-- Subtle dot grid -->
  <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
    <circle cx="20" cy="20" r="1" fill="#ffffff" fill-opacity="0.025"/>
  </pattern>
  <rect width="1500" height="500" fill="url(#dots)"/>

  <!-- Glow overlays -->
  <rect width="1500" height="500" fill="url(#glow)"/>
  <rect width="1500" height="500" fill="url(#glow2)"/>

  <!-- Thin horizontal accent line -->
  <rect x="0" y="249" width="1500" height="1" fill="url(#scanLine)" opacity="0.4"/>

  <!-- ─── FILM FRAME DECORATION (right side) ─── -->
  <!-- Frame border -->
  <rect x="960" y="50" width="490" height="400" rx="10" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.18"/>
  <!-- Film sprocket holes top -->
  <rect x="967" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="997" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1027" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1057" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1087" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1117" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1147" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1177" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1207" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1237" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1267" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1297" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1327" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1357" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1387" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1417" y="58" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <!-- Film sprocket holes bottom -->
  <rect x="967" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="997" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1027" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1057" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1087" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1117" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1147" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1177" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1207" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1237" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1267" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1297" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1327" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1357" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1387" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="1417" y="430" width="18" height="12" rx="3" fill="none" stroke="#10b981" stroke-width="1" stroke-opacity="0.3"/>
  <!-- Inner frame content area -->
  <rect x="968" y="80" width="476" height="340" rx="6" fill="#0d1117" fill-opacity="0.6"/>
  <!-- Play button center in frame -->
  <circle cx="1206" cy="250" r="52" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.3"/>
  <polygon points="1196,228 1236,250 1196,272" fill="#10b981" fill-opacity="0.6"/>
  <!-- Rating stars row -->
  <text x="1140" y="348" font-family="Arial, sans-serif" font-size="22" fill="#10b981" fill-opacity="0.55" letter-spacing="4">★ ★ ★ ★ ★</text>

  <!-- ─── LEFT: LOGO + TEXT BLOCK ─── -->

  <!-- Logo mark background -->
  <rect x="80" y="165" width="110" height="110" rx="22" fill="#10b981"/>
  <!-- K letter (scaled from 17×17 viewBox to ~80×80) -->
  <!-- vertical stroke -->
  <line x1="113" y1="183" x2="113" y2="257" stroke="#07090e" stroke-width="13" stroke-linecap="round"/>
  <!-- upper arm -->
  <line x1="113" y1="220" x2="158" y2="183" stroke="#07090e" stroke-width="13" stroke-linecap="round"/>
  <!-- lower arm -->
  <line x1="113" y1="220" x2="158" y2="257" stroke="#07090e" stroke-width="13" stroke-linecap="round"/>

  <!-- Brand name -->
  <text x="212" y="243" font-family="Arial Black, Arial, sans-serif" font-size="86" font-weight="900" fill="#ffffff" letter-spacing="-3">Klick<tspan fill="#10b981">.stream</tspan></text>

  <!-- Tagline -->
  <text x="214" y="295" font-family="Arial, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.48" letter-spacing="0.5">Find anything. Watch everywhere.</text>

  <!-- Divider line -->
  <rect x="80" y="336" width="820" height="1" fill="#10b981" fill-opacity="0.2" rx="1"/>

  <!-- Stats row -->
  <!-- 50K+ -->
  <text x="80" y="376" font-family="Arial Black, Arial, sans-serif" font-size="28" font-weight="900" fill="#10b981">50K+</text>
  <text x="80" y="402" font-family="Arial, sans-serif" font-size="17" fill="#ffffff" fill-opacity="0.38">Films &amp; Series</text>

  <!-- 40+ -->
  <text x="260" y="376" font-family="Arial Black, Arial, sans-serif" font-size="28" font-weight="900" fill="#10b981">40+</text>
  <text x="260" y="402" font-family="Arial, sans-serif" font-size="17" fill="#ffffff" fill-opacity="0.38">Platforms</text>

  <!-- 10K+ -->
  <text x="400" y="376" font-family="Arial Black, Arial, sans-serif" font-size="28" font-weight="900" fill="#10b981">10K+</text>
  <text x="400" y="402" font-family="Arial, sans-serif" font-size="17" fill="#ffffff" fill-opacity="0.38">Trailers</text>

  <!-- 100% Free -->
  <text x="540" y="376" font-family="Arial Black, Arial, sans-serif" font-size="28" font-weight="900" fill="#10b981">100%</text>
  <text x="540" y="402" font-family="Arial, sans-serif" font-size="17" fill="#ffffff" fill-opacity="0.38">Free, Always</text>

  <!-- URL -->
  <text x="80" y="462" font-family="Arial, sans-serif" font-size="19" fill="#10b981" fill-opacity="0.6" letter-spacing="0.3">klick.stream</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'twitter-banner.png'))
  .then(info => console.log('Banner created:', info))
  .catch(err => console.error('Error:', err));
