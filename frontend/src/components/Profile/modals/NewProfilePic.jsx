import './NewProfilePic.css';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { updateProfilePicture } from '../../../utils/profileFetch';
import { checkAuth } from '../../../utils/authFetch';

export default function NewProfilePic({ setShowModal, onImageUpdate }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200'
  );
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    const user = await checkAuth();
    const userId = user?.user.id;
    const result = await updateProfilePicture(userId, image);
    if (result) {
      onImageUpdate?.(result.user.profileImage);
    }
    setImage(null);
    setShowModal(false);
  };

  return (
    <div className="modal-overlay-profile">
      <div className="modal-content-profile">
        <h3> Change Profile Picture</h3>
        <button
          className="close-btn-profile"
          onClick={() => setShowModal(false)}
        >
          <IoMdClose />
        </button>
        <div>
          {preview && (
            <div className="preview-profile">
              <img src={preview} alt="Preview" />
            </div>
          )}
          <div className="action-btns">
            <input
              type="file"
              accept="image/*"
              className="upload-img"
              onChange={handleImageChange}
            />
            <button className="upload-btn-profile" onClick={handleImageUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
