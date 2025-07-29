import './DeletePost.css';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const DeletePostModal = ({ post, setShowDeleteModal }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    console.log('delete pressed'); // [TODO - Put backend logic]
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
      </div>
    </>
  );
};
export default DeletePostModal;
