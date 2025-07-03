import './NewProfilePic.css';
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function NewProfilePic({ setShowModal }) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200');
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleImageUpload = () => {
        //TODO:  Upload image to server

        // TODO: Reset the file input

        // TODO: Close the modal
        setShowModal(false);
    }

    return (
        <div className="modal-overlay-profile">
            <div className="modal-content-profile">
                <h3> Change Profile Picture</h3>
                <button className= "close-btn-profile" onClick={() => setShowModal(false)}><IoMdClose/></button>
                <div>
                    {preview &&
                    <div className="preview-profile">
                    <img src={preview} alt="Preview" />
                    </div>
                    }
                    <div className='action-btns'>
                    <input type="file" accept="image/*" className="upload-img" onChange={handleImageChange} />
                    <button className='upload-btn-profile' onClick={handleImageUpload}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
