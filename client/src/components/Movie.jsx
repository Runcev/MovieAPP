import React, {Component} from "react";
import {FaEdit} from 'react-icons/fa'
import {AiTwotoneDelete} from 'react-icons/ai'
import api from '../api'

const IMG_SRC = "https://www.reelviews.net/resources/img/default_poster.jpg"


class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <FaEdit size='1.5em' color="orange" onClick={this.updateUser}/>
    }
}


class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <AiTwotoneDelete size='1.5em' color="#e04f5f" onClick={this.deleteUser}/>
    }
}


const Movie = ({_id, title, format,releaseYear, stars}) => (
    <div className="movie">
        <img src={IMG_SRC} alt={title}></img>
        <div className="movie-info">
            <h6>{title}</h6>
            <h6>{releaseYear}</h6>
        </div>
        <div className="movie-over">
            <p>Format: {format}</p>
            <p>Stars: {stars}</p>
            <div className="movie-action">
                <span> <UpdateMovie id={_id}/> </span>
                <span> <DeleteMovie id={_id}/> </span>
            </div>
        </div>
    </div>
)


export default Movie;
