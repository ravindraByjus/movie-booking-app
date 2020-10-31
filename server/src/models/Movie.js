const mongoose = require("mongoose");

const Movie = mongoose.model('Movie', {
     title: String,
     imdbId : String,
     poster : String,
     year : String  
});

module.exports = Movie;