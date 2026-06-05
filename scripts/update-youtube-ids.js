const fs = require('fs');
const path = require('path');

const newIds = {"tom-hanks":"lVzxRVxIaxQ","meryl-streep":"VjfFYTRko1Q","leonardo-dicaprio":"cLVHHZZbo70","cate-blanchett":"8fJxdFRBP20","denzel-washington":"WV2EpELLUuo","scarlett-johansson":"JoOy0ElbzYk","brad-pitt":"us4ddWJeZIY","angelina-jolie":"BW5C66yD_8I","will-smith":"4O1DgGnmIJM","jennifer-lawrence":"puUVS9HmDp0","robert-downey-jr":"BBrP8zazELs","viola-davis":"FKLIyGHSDBE","ryan-gosling":"6hiRDKnxYGE","emma-stone":"wpjQjusb_BY","christian-bale":"6I-NllCQkXo","natalie-portman":"Xs4aUWtgTp4","matt-damon":"Qg-wDS77-Tg","charlize-theron":"zL6N55FJuYI","tom-cruise":"7ZFh7qI1xyg","julia-roberts":"B5FrBz9X4aU","joaquin-phoenix":"Dl-MqpGG8P0","anne-hathaway":"8C2J9Ij7K5Y","dwayne-johnson":"j-_MqPqss5Y","margot-robbie":"kpLarmsYVx4","zendaya":"2hMXEyplSlQ","samuel-l-jackson":"SDEVnAO6Oao","nicole-kidman":"PaA2m6eDChY","morgan-freeman":"YQBYB39A_S4","jake-gyllenhaal":"MehCUPvCdq0","keanu-reeves":"fl0x9Swgfgw","benedict-cumberbatch":"vojB64vZVn0","florence-pugh":"EzzkwhlkYwU","pedro-pascal":"MtTRmzzIQO0","austin-butler":"rab_wFvS_88","saoirse-ronan":"u58_7xNjDWE","michael-b-jordan":"FlibCSZ93gM","sandra-bullock":"K2QMUX-aasE","amy-adams":"g1vOZaQ_vFY","chris-evans":"HYQkbO35vFw","timothee-chalamet":"424w9fJRgYk","steven-spielberg":"CCB6NTM9ST4","christopher-nolan":"PW3tLBp4L6Q","martin-scorsese":"8szAkDLWp-M","quentin-tarantino":"GrsJDy8VjZk","denis-villeneuve":"1TgS8r-WhTk","greta-gerwig":"joUKN8ezVio","jordan-peele":"PBGPbOgwtIA","ridley-scott":"rs2I7jkFqvg","james-cameron":"Jk4QhCPqWpo","david-fincher":"L0GfX1rcpQQ","wes-anderson":"NEOvfStFSvM","bong-joon-ho":"MM5ckjUOnT4","alfonso-cuaron":"nllSIHloqz8","guillermo-del-toro":"Bp4rCPkViGg","sofia-coppola":"u_abzP2JlNc","spike-lee":"WV2EpELLUuo","ava-duvernay":"kDITF6Db57g","darren-aronofsky":"jasGZtUKPV0","yorgos-lanthimos":"dQPITMtKHE8","ryan-coogler":"YWqTXowtqJg","penelope-cruz":"MiDcjSIj8K0","antonio-banderas":"I2yQgGzGYuE","marion-cotillard":"VaQac5_7pP4","jackie-chan":"PpqHmp8OXnU","song-kang-ho":"nRQIIEDmQ_8","priyanka-chopra-jonas":"mW-GONPhKwQ","deepika-padukone":"JSR9Z6ddU7M","park-seo-joon":"7sZvvQXZeDY","lupita-nyongo":"ZxXu0yd3z44","idris-elba":"HFBU8q1LcLg","salma-hayek":"-uDVY522ilc","eva-green":"ivVHmLq2TnA","dev-patel":"edjigfe2vyU","lea-seydoux":"FO0OP09BJvA","cillian-murphy":"hj1__4kMEFg","tony-leung":"KkNBh24cLvo","isabelle-huppert":"3zDkTX3t2yI","amitabh-bachchan":"To_sryjeq-4","adele-exarchopoulos":"9IRoquznErs","gael-garcia-bernal":"o77dZ7ZBU00","park-chan-wook":"Jj0N63qglbI","beyonce":"laCpg2ULs00","lady-gaga":"ts-r3J0uqdk","eminem":"4YDr2WPwO60","rihanna":"X3n5Pk8fkLg","jennifer-lopez":"k483keDRsys","donald-glover":"B5N0vYOTMM4","janelle-monae":"kMY1ykh5PYs","harry-styles":"oTA637pJ63Y","taylor-swift":"9qDW_ZKpvxI","ice-cube":"-Xpp1A1KJyU","mos-def":"Zweuggu9IUQ","lauryn-hill":"PQD0kswIWkc","common":"fr-mwiyhZAo","will-i-am":"1m-2QhqdlfI","aubrey-plaza":"gLe9yRkrfCE","ana-de-armas":"Ug1txX9lDus","paul-mescal":"JxTni8mXZIA","chadwick-boseman":"f6p9L_-Nfwg","zoe-saldana":"iVzcvq61lM0"};

const jsonPath = path.join(__dirname, '..', 'data', 'celebrities.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;
for (const celeb of data.celebrities) {
  if (newIds[celeb.slug]) {
    celeb.youtube_embed_id = newIds[celeb.slug];
    updated++;
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Updated ${updated} YouTube IDs`);
