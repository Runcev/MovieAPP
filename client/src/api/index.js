import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const insertMovieFromFile = () => api.get('/moviesFromFile')
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)
export const getMovieByTitle = term => api.get(`/movies/findByTitle/${term}`)
export const getMovieByStars = star => api.get(`/movies/findByStars/${star}`)
export const upload = () => api.post('/upload')

const apis = {
    insertMovie,
    insertMovieFromFile,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    getMovieByTitle,
    getMovieByStars,
    upload
}

export default apis