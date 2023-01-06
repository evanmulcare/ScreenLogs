require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const logRoutes = require('./routes/logRoutes'); 

//express app
const app = express();

//mongo
const URI = process.env.DATABASE_URL
mongoose.connect(URI)
    //listen
    .then((result) =>app.listen(3000))
    .catch((err) => console.log(err)); 


//viewengine
app.set('view engine', 'ejs');


//middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded());


//non log routes
app.get('/', (req, res) => {

    res.render('index');
});

app.get('/about', (req, res) => {

    res.render('other/about');
});

app.get('/help', (req, res) => {

    res.render('other/help');
});

//log routes 
app.use(logRoutes); //apply all handlers in logRoutes to app.


//404 - if no routes are found load
app.use((req, res) => {
    res.status(404).render('other/404');
});

