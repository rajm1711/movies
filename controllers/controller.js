const Movie = require('../models/movie');
const path = require('path');
const fs = require('fs');
const movie = require('../models/movie');

// Display all movies
exports.getAllMovies = async (req, res) => {
  try{

    const movies = await Movie.find();
    res.render('index', { movies });
  }
  catch(error){
    console.error('Error fetching movies : error');
    
  }
};

// Show form to add a new movie
exports.showAddMovieForm = (req, res) => {
  res.render('addMovies');
};

// Handle adding a new movie
exports.addNewMovie = async (req, res) => {
  try{

    const { title, description, releaseDate, genre, rating } = req.body;
    const posterPath = req.file ? `/storage/${req.file.filename}` : null;

    const movie = new Movie({ title, description, releaseDate, genre, rating, poster : posterPath });
    await movie.save();
    res.redirect('/');
  }
  catch(error){
    console.error("Error adding movie : ",error);
    
  }
};

// Show form to edit a movie
exports.showEditMovieForm = async (req, res) => {
  try{
    console.log("edit page controller");
    
    const movie = await Movie.findById(req.params.id);
    res.render('editMovies', { movie });
  }
  catch(error){
    console.error("Error fetching movies : ", error);
    
  }
};

// Handle updating a movie
exports.updateMovie = async (req, res) => {
  console.log("update controller");
  
  try{

    const movieId = req.params.id;
    const { title, description, releaseDate, genre, rating } = req.body;



    const poster = req.file ? req.file.filename : req.body.existingPoster;
    
     const movie = await Movie.findByIdAndUpdate(movieId);

    if(req.file){
      if(movie.poster){
        fs.unlink(path.join(__dirname,'..',movie.poster),(err) =>{
          if(err){
            console.error("Failed to delete the old poster:", err);
            
          }
        });
      }
      movie.poster = `storage/${req.file.filename}`;
    }

    movie.title = title;
    movie.description = description;
    movie.releaseDate = releaseDate;
    movie.genre = genre;
    movie.rating = rating;

    await movie.save();
    res.redirect('/');
    
  }
  catch(error){
    console.error("Error in Updating movies : ",error);
    
  }

};

// Handle deleting a movie
exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  console.log("movie deleted", movie);
  
  if (movie.poster) {
    fs.unlink(path.join(__dirname, '../storage', movie.poster), err => {
      if (err) console.error(err);
    });
  }
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
