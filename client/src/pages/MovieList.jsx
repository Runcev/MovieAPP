import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import api from '../api'
import Movie from "../components/Movie";


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [clicked, setClicked] = useState(false)
    const [searchTitleTerm, setSearchTitleTerm] = useState('')
    const [searchStarsTerm, setSearchStarsTerm] = useState('')
    useEffect( () => {
        api.getAllMovies()
            .then(movies => {
                setMovies(movies.data.data)
            })
    }, []);

    const handleOnSubmitTitle = async (e) => {
        e.preventDefault();

         await api.getMovieByTitle(searchTitleTerm)
            .then(data => {
                setMovies(data.data.data);
            })
            .catch(err => {
                api.getAllMovies()
                    .then(movies => {
                        setMovies(movies.data.data)
                    })
                setSearchTitleTerm('')
                setSearchStarsTerm('')
                toast.error('Movie not found')
            })
    }

    const handleOnSubmitStars = async (e) => {
        e.preventDefault();

        await api.getMovieByStars(searchStarsTerm)
            .then(data => {
                setMovies(data.data.data);
            })
            .catch(err => {
                api.getAllMovies()
                    .then(movies => {
                        setMovies(movies.data.data)
                    })
                setSearchStarsTerm('')
                setSearchStarsTerm('')
                toast.error('Movie not found')
            })
    }

    const handleOnChangeTitle = (e) => {
        setSearchTitleTerm(e.target.value);
    }

    const handleOnChangeStars = (e) => {
        setSearchStarsTerm(e.target.value);
    }

    const handleOnClick = () => {
        let isReserved = 1;

       if(!clicked) {
            setClicked(true)
        }
        else{
            isReserved = -1
            setClicked(false)
        }

        const sorted = movies.sort((a,b)=>{
            return isReserved * a.title.localeCompare(b.title)
        })
        setMovies(sorted)
    }

    return (
        <>
            <header>
                <button
                    className="sort"
                    onClick={handleOnClick}>
                    Sort By Title
                </button>
                <ToastContainer/>
                <form onSubmit={handleOnSubmitStars}>
                    <input
                        className="search"
                        type="search"
                        placeholder="Search by stars"
                        value={searchStarsTerm}
                        onChange={handleOnChangeStars}
                    />
                </form>
                <form onSubmit={handleOnSubmitTitle}>
                    <input
                        className="search"
                        type="search"
                        placeholder="Search by title"
                        value={searchTitleTerm}
                        onChange={handleOnChangeTitle}
                    />
                </form>
            </header>
            <div className="movie-container">
                {movies.length > 0 && movies.map(movie => (
                    <Movie key={movie._id} {...movie} />)
                )}
            </div>
        </>
    )
}

export default MovieList