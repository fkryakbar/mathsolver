const { query } = require('express');
const express = require('express')
const app = express()
const port = 3000
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('LYP6W3-RA74GPRGY2');

app.set("view engine", "ejs")


app.get('/', (req, res) => {
  res.render("index")
  
})
app.get('/query', (req, res) => {
  const result = waApi.getFull(req.query.result).then((queryresult) => {
      const pods = queryresult.pods;
      if(queryresult.success) {
        const output = pods.map((pod) => {
          const subpodContent = pod.subpods.map(subpod =>
            `  <img style="max-width: 300px;" src="${subpod.img.src}" alt="${subpod.img.alt}">`
          ).join('\n');
          return `<h4>${pod.title}</h4>\n${subpodContent}`;
        }).join('\n <hr>');
        res.render("result", {output : output, input : req.query.result})
      } else {
        res.status(404)
        res.render("result", {output : `<h4>Can not solve "${req.query.result}"</h4>`, input : req.query.result})
      }
    }).catch(console.error);

})

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
