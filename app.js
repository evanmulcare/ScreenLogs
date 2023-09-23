require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const logRoutes = require('./routes/logRoutes'); 

// Express app
const app = express();

// MongoDB URI from environment variables
const URI = "mongodb+srv://root:root@cluster0.ntehv8k.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  // Start listening only after successfully connecting to the database
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});


//viewengine
app.set('view engine', 'ejs');

//middleware
// This middleware serves static files from the 'public' directory, allowing them to be accessed by clients.
app.use(express.static('public'));

// This middleware logs incoming requests to the console in the 'dev' format, providing useful information such as request method, status, and response time.
app.use(morgan('dev'));

// This middleware parses incoming URL-encoded form data and populates the req.body object with the parsed data, making it easier to handle form submissions.
app.use(express.urlencoded({ extended: true }))

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

