const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.YOUR_PORT || process.env.PORT || 3000;
const host = process.env.YOUR_HOST || '127.0.0.1';

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('allUpperCase', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');



app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var logMsg = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', logMsg + '\n', (error) => {
        if(error){
            console.log('Could not append to log file');
        }
    });
    console.log(logMsg);
    next();
});

/* app.use((req, res, next) => {
    res.render('maintenance.hbs', {
      pageTitle : 'We will be right back.',  
    })
}); */

app.get('/', (req, res) => {
    // res.send('<h1>Hello, Express!</h1>');
   res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMsg : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
   });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Bad request',
    });
});

app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`);
});