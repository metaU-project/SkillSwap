import './InterestConfirmationDialog.css';
import { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
const InterestConfirmationDialog = ({
  post,
  open,
  onOpenChange,
  setShowToast,
  setShowModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // [TODO] email to the user
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setShowModal(false);
      setShowToast(true);
      setIsLoading(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <MdOutlineEmail className="icon-mail" />
          <h2>Express Interest</h2>
        </div>
        <p className="dialog-description">
          Are you sure you want to express interest in{' '}
          <strong>{post.title}</strong>?
          <br />
          <br />
          An email will be sent to <strong>{post.user.first_name}</strong> with
          your contact information.
        </p>
        <div className="dialog-footer">
          <button
            className="cancel-btn-dialog"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="confirm-btn-dialog"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FiLoader className="loader" />
                Sending...
              </>
            ) : (
              <>
                <MdOutlineEmail className="icon" />
                Send Interest
              </>
            )}
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
  );
};

export default InterestConfirmationDialog;
