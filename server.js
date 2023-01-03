const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log file');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //   res.send("<h1>Hello Express!</h1>");
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// bad - send back json with error message
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.listen(3000, () => console.log('Server is up on port 3000'));
