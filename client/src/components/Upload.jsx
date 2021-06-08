import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Progress} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }

    }
    checkMimeType = (event) => {
        let file = event.target.files[0]
        let err = []
        const types = ['text/plain']

        if (types.every(type => file.type !== type)) {
            // create error message and assign to container
            err[0] = file.type + ' is not a supported format\n';
            toast.error(err[0])
            event.target.value = null
        }
        return true;
    }

    checkFileSize=(event)=>{
        let file = event.target.files[0]
        let size = 2000000
        let err = [];
        if (file.size > size) {
            err[0] = 'is too large, please pick a smaller file\n';
            toast.error(err[0])
            return
        }
        if(file.size === 0){
            err[1] = 'file could not be empty, please pick other file\n';
            toast.error(err[1])
            return
        }
        return true;
    }

    onChangeHandler = event => {
        if(this.checkFileSize(event) & this.checkMimeType(event)) {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
            })
        }
    }

    onClickHandler = () => {
        if(this.state.selectedFile != null){
            const data = new FormData()
            data.append('file', this.state.selectedFile)
            axios.post("http://localhost:5000/upload", data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                    })
                },
            })
                .then(res => { // then print response status
                    toast.success('upload success')
                })
                .catch(err => { // then print response status
                    toast.error('upload fail')
                })
            this.state.selectedFile = null
        }
        else {
            toast.error('Choose file')
        }

    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h1>Create movie from file</h1>
                <div style={{margin: 'initial', marginLeft: 5}} className="offset-md-3 col-md-6">
                    <div className="form-group files">
                        <label>Upload Your File (*.txt) </label>
                        <input style={{marginBottom: 5}} type="file" className="form-control" onChange={this.onChangeHandler}/>
                    </div>

                    <div className="form-group">
                        <ToastContainer/>
                        <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2) }%</Progress>
                    </div>

                    <button style={{marginTop: 5}} type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

                </div>
            </div>
        );
    }
}

export default Upload;