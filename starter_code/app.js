
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + `/views/partials`);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()

    .then((beers) => {
      console.log(beers)
      res.render('beers', {beers: beers});
    })  
    .catch(error => {
      console.log(error)
    })

});

app.get('/randombeer', (req, res, next) => {

  punkAPI.getRandom()
    .then((beers) => {
      res.render('randombeer', {beers: beers});
    })
    .catch(error => {
    console.log(error)
    })
});



app.listen(3000);
