const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database/db');
const movies = require('./models/movie');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use(express.static(path.join(__dirname, '/views')));
app.use('/public',express.static(path.join(__dirname, '/public')));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use ('/storage',express.static(path.join(__dirname,'storage')));

// Routes
app.use('/', router);


const port = 3004;
app.listen(port, (err) => {
  if(!err){

    console.log(`Server running on http://localhost:${port}`);
  }else{
    console.error('Error starting server:',err);
    
  }
});



