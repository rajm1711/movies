

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/controller');
const upload = require('../multer-config/multerConfig');

// Display all movies
router.get('/', movieController.getAllMovies);

// Show form to add a new movie
router.get('/add', movieController.showAddMovieForm);

// Handle adding a new movie
router.post('/add', upload.single('poster'), movieController.addNewMovie);

// Show form to edit a movie
router.get('/edit/:id', movieController.showEditMovieForm);

// Handle updating a movie
router.post('/update/:id', upload.single('poster'), movieController.updateMovie);

// Handle deleting a movie
router.get('/delete/:id', movieController.deleteMovie);

module.exports = router;
