const mongoose = require('mongoose');

const connectionURL = 'mongodb://localhost:27017/movies'

mongoose.connect(connectionURL)
    .then(() => {
        console.log("Connected to MongoDB Database");

    })
    .catch(err => {
        console.error("Error in Connection with MongoDB Database");

    });