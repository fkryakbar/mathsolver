const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('LYP6W3-RA74GPRGY2');
console.log(waApi);

waApi.getFull('1+1').then((queryresult) => {
    const pods = queryresult.pods;
    const output = pods.map((pod) => {
      const subpodContent = pod.subpods.map(subpod =>
        `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
      ).join('\n');
      return `<h2>${pod.title}</h2>\n${subpodContent}`;
    }).join('\n');
    console.log(output);
  }).catch(console.error);