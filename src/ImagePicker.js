import './ImagePicker.css'
import React from 'react'

class ImagePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleChange() {
        // Reflect the changes to the file picker
        const file = document.querySelector('#file_picker').files[0];
        this.props.onImageChange(URL.createObjectURL(file));
    }

    handleUploadImage() {
        const fileInput = document.querySelector('#file_picker');
        // If there are no files to be uploaded, notify the user
        if (fileInput.files.length < 1) {
            alert("Please select a file before uploading.")
            return;
        }
        // Process the first uploaded image
        const file = fileInput.files[0];
        this.props.onImageUpload(file);
    }

    render() {
        return (
            <form id={this.props.id}>
                <input type='file' id='file_picker' accept='image/*' onChange={this.handleChange} />
                <button type='button' id='submit_button' onClick={this.handleUploadImage}>Upload</button>
            </form>
        );
    }
}

export default ImagePicker