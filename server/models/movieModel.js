const mongoose = require('mongoose')

const movieSchema =  mongoose.Schema(
    {
        title: { type: String, required: true },
        releaseYear: { type: Number, required: true },
        format: { type: String, required: true },
        stars: {type: String, required: true}
    },
    { timestamps: true },
)

const Movie = mongoose.model('Movie', movieSchema )

module.exports = Movie