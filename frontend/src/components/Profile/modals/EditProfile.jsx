import './EditProfile.css';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import {
  updateProfilePicture,
  updateProfileDetails,
  fetchProfile,
} from '../../../utils/profileFetch';
import { checkAuth } from '../../../utils/authFetch';
import { Camera } from 'lucide-react';
import Loading from '../../Loading/Loading';
import ErrorModal from '../../ErrorModal';
import LocationInput from '../../Location/LocationInput';

export default function EditProfile({
  profile,
  setShowModal,
  onImageUpdate,
  setProfile,
}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    profile.user.profileImage ||
      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200'
  );
  const [first_name, setFirstName] = useState(profile.user.first_name || '');
  const [last_name, setLastName] = useState(profile.user.last_name || '');
  const [email, setEmail] = useState(profile.user.email || '');
  const [bio, setBio] = useState(profile.user.bio || '');
  const [location, setLocation] = useState(profile.user.location || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await checkAuth();
    const userId = user?.user.id;

    let imageUrl = profile.user.profileImage;
    if (image) {
      const result = await updateProfilePicture(userId, image);
      if (result?.user?.profileImage) {
        imageUrl = result.user.profileImage;
        onImageUpdate?.(imageUrl);
      }
    }
    try {
      const updated = await updateProfileDetails(userId, {
        first_name,
        last_name,
        email,
        bio,
        location,
      });
      const profile = await fetchProfile(userId);
      setProfile(profile);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setShowModal(false);
      setImage(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="modal-overlay-profile">
      <div className="modal-content-profile">
        <h3>Edit Profile</h3>
        <button
          className="close-btn-profile"
          onClick={() => setShowModal(false)}
        >
          <IoMdClose />
        </button>

        <div className="edit-profile-body">
          <div className="image-upload-wrapper">
            {preview && (
              <div className="preview-profile">
                <img src={preview} alt="Preview" />
              </div>
            )}
            <label htmlFor="profile-image" className="upload-icon-label">
              <Camera className="upload-camera-icon" />
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleImageChange}
            />
          </div>
          <div className="profile-image-text">
            <p> Click the camera icon to upload a new profile photo</p>
            <p>(Max size: 5MB)</p>
          </div>
          <div className="input-group">
            <div className="user-name">
              <input
                type="text"
                value={first_name}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={last_name}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              value={bio}
              placeholder="Write your bio..."
              onChange={(e) => setBio(e.target.value)}
            />
            <LocationInput location={location} setLocation={setLocation} />
          </div>
          <button className="upload-btn-profile" onClick={handleSaveProfile}>
            Save Changes
          </button>
        </div>
      </div>
      {error && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
}
