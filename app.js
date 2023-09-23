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
// This middleware serves static files from the 'public' directory, allowing them to be accessed by clients.
app.use(express.static('public'));

// This middleware logs incoming requests to the console in the 'dev' format, providing useful information such as request method, status, and response time.
app.use(morgan('dev'));

// This middleware parses incoming URL-encoded form data and populates the req.body object with the parsed data, making it easier to handle form submissions.
app.use(express.urlencoded())

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

