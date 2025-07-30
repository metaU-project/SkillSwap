import './DeletePost.css';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { deletePost } from '../../../utils/postFetch';
import ErrorModal from '../../ErrorModal';

const DeletePostModal = ({ post, setShowDeleteModal, setPosts, posts }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      setPosts(posts.filter((p) => p.id !== post.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div className="modal-overlay-delete">
        <div className="modal-delete">
          <h3>Delete Post</h3>
          <p>
            Are you sure you want to delete "<strong>{post.title}</strong>"?
            <br />
            This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="confirm-delete-btn"
            >
              {isDeleting && <Loader2 className="spin-icon" size={16} />}
              Delete
            </button>
          </div>
        </div>
        {errorMessage && (
          <ErrorModal
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </>
  );
};
export default DeletePostModal;
