const Movie = require('../models/movieModel')
const getDataFromFile = require('../utils/fileReader')

createMovie = async (req, res) => {
    const { title, releaseYear, format, stars } = req.body

    const movieExists = await Movie.find(
        {$and: [
                {
                    title: title,
                    releaseYear: releaseYear,
                    format: format,
                    stars: stars,
                }
            ]})

    if (movieExists.length !== 0) {
        return res.status(409).json({
            success: false,
            error: 'Movie already exists',
        })
    }

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie({
        title,
        releaseYear,
        format,
        stars
    })

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

createMovieFromFile = async (req, res) =>{
    const data = getDataFromFile.getDataFromFile()

    for (let i = 0; i < data[0].length; i++ ){
        const title = data[0][i]
        const releaseYear = data[1][i]
        const format = data[2][i]
        const stars = data[3][i]

        const movieExists = await Movie.find(
            {$and: [
                    {
                        title: title,
                        releaseYear: releaseYear,
                        format: format,
                        stars: stars,
                    }
                ]})

        if(movieExists.length === 0) {
            const movie = new Movie({
                title,
                releaseYear,
                format,
                stars
            })

            if (!movie) {
                return res.status(400).json({ success: false, error: err })
            }

            movie
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: movie._id,
                        message: 'Movie created!',
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        error,
                        message: 'Movie not created!',
                    })
                })
        }


    }
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movie.title = body.title
        movie.releaseYear = body.releaseYear
        movie.format = body.format
        movie.stars = body.stars
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

getMovieByTitle = async (req, res) => {
    await Movie.find({ title: new RegExp(req.params.term)}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

getMovieByStars = async (req, res) => {
    await Movie.find({ stars: new RegExp(req.params.star)}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createMovie,
    createMovieFromFile,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
    getMovieByTitle,
    getMovieByStars,
}
