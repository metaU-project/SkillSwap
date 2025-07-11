import React, { useState } from 'react';
import './CreatePostModal.css';
import { postCreate, postFetch } from '../../../utils/postFetch';
import ErrorModal from '../../ErrorModal';
import Loading from '../../Loading/Loading';
import LocationInput from '../../Location/LocationInput';

const CreatedPostModal = ({ setPosts }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      category,
      image,
      location,
      type,
    };
    setSubmitting(true);
    try {
      await postCreate(newPost);
      const updatedPosts = await postFetch();
      setPosts(updatedPosts);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
    setTitle('');
    setDescription('');
    setCategory('');
    setImage(null);
    setLocation('');
    setType('');
    setShowModal(false);
  };

  return (
    <>
      <button className="new-post-btn" onClick={() => setShowModal(true)}>
        + New Post
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            {submitting ? (
              <Loading />
            ) : (
              <>
                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  ✖
                </button>
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-body">
                    <input
                      placeholder="Enter post title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      placeholder="Enter post category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="OFFER">Offer</option>
                      <option value="REQUEST">Request</option>
                    </select>
                    <textarea
                      placeholder="Enter a description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {/* <input
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    /> */}
                    <LocationInput
                      location={location}
                      setLocation={setLocation}
                    />
                    {image && (
                      <div className="image-preview">
                        <img src={URL.createObjectURL(image)} alt="preview" />
                      </div>
                    )}
                    {!image && <p>Choose an image for the post</p>}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button type="submit" className="create-btn">
                      Post
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </>
  );
};

export default CreatedPostModal;
