const express = require('express')

const movieController = require('../controllers/movieController')

const router = express.Router()

router.post('/movie', movieController.createMovie)
router.get('/moviesFromFile', movieController.createMovieFromFile)
router.put('/movie/:id', movieController.updateMovie)
router.delete('/movie/:id', movieController.deleteMovie)
router.get('/movie/:id', movieController.getMovieById)
router.get('/movies', movieController.getMovies)
router.get('/movies/findByTitle/:term', movieController.getMovieByTitle)
router.get('/movies/findByStars/:star', movieController.getMovieByStars)


module.exports = router