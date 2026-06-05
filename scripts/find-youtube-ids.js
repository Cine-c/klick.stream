const data = require('../data/celebrities.json');
const celebs = data.celebrities;

async function findVideo(name) {
  const q = encodeURIComponent(name + ' interview');
  const res = await fetch('https://www.youtube.com/results?search_query=' + q, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) matches.push(m[1]);
  const unique = [...new Set(matches)];
  return unique[0] || null;
}

async function run() {
  const results = {};
  for (let i = 0; i < celebs.length; i++) {
    const c = celebs[i];
    try {
      const id = await findVideo(c.name);
      results[c.slug] = id;
      process.stderr.write((i + 1) + '/100 ' + c.name + ' -> ' + (id || 'NONE') + '\n');
    } catch (e) {
      results[c.slug] = null;
      process.stderr.write((i + 1) + '/100 ' + c.name + ' -> ERROR: ' + e.message + '\n');
    }
    await new Promise(r => setTimeout(r, 400));
  }
  console.log(JSON.stringify(results));
}

run();
