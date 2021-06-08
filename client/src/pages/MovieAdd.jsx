import React, {Component} from 'react'
import { toast } from 'react-toastify';
import api from '../api'
import Upload from "../components/Upload";
import validate from "../utils/validator";
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
  margin: 0 30px;
`

const Label = styled.label`
  margin: 5px;
`


const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`

class MoviesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            releaseYear: '',
            format: 'Blu-Ray',
            stars: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputReleaseYear = async event => {
        const releaseYear =
            event.target.value.replace(/[^0-9]/gi, "").replace(/^0+/g, "") || "";

        this.setState({ releaseYear })
    }

    handleChangeInputFormat = async event => {
        const format = event.target.value
        this.setState({ format })
    }

    handleChangeInputStars = async (event) => {
        const stars =
            event.target.value.replace(/[^a-zA-Z- ,]/gi, "")

        this.setState({stars})
    }

    handleIncludeMovie = async () => {
        const { title, releaseYear, format, stars } = this.state
        const payload = { title, releaseYear, format, stars }
        const isValidData = validate(title, releaseYear, stars)

        if(isValidData) {
            await api.insertMovie(payload)
                .then(res => {
                    toast.success('Movie inserted successfully')
                    this.setState({
                        title: '',
                        releaseYear: '',
                        format: 'Blu-Ray',
                        stars: '',
                    })
                })
                .catch(err => {
                    (err.response.status === 409) ?
                        toast.error('Movie already exists')
                            : toast.error('Movie not added')
                })
        }
    }

    handleIncludeMovieFromFile = async () => {
        await api.insertMovieFromFile().then(res => {
            toast.success('Movie inserted successfully')
        })
    }

    render() {
        const { title, releaseYear,format, stars } = this.state
        return (
            <Wrapper>
                <Title>Create Movie</Title>

                <Label>*Title: </Label>
                <input className="form-control"
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />


                <Label>*Release Year: </Label>
                <input className="form-control"
                    type="text"
                    value={releaseYear}
                    onChange={this.handleChangeInputReleaseYear}
                />


                <Label>*Format: </Label>
                <select className="form-select" value={format} onChange={this.handleChangeInputFormat}>
                    <option value="DVD">DVD</option>
                    <option value="VHS">VHS</option>
                    <option value="Blu-Ray">Blu-Ray</option>
                </select>

                <Label>*Stars: </Label>
                <input className="form-control"
                    type="text"
                    value={stars}
                    onChange={this.handleChangeInputStars}
                />


                <Button onClick={this.handleIncludeMovie}>Add Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
                <Upload></Upload>
                <Button style={{marginTop: 5}} onClick={this.handleIncludeMovieFromFile}>Add Movie From File</Button>


            </Wrapper>
        )
    }
}

export default MoviesInsert