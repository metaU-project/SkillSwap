import './PostInfoModal.css';
import { useState } from 'react';
import { X, MapPin, Calendar, Star, Mail, MessageCircle } from 'lucide-react';
import ReviewContainer from '../../Reviews/ReviewContainer';
import { fetchPostReviews } from '../../../utils/reviewFetch';
import InterestConfirmationDialog from './InterestConfirmationDialog';
import { sendEmail } from '../../../utils/emailFetch';

const PostInfoModal = ({
  post,
  setReviewCount,
  onClose,
  setShowToast,
  setShowModal,
}) => {
  const [reviews, setReviews] = useState([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendInterest = async () => {
    setIsLoading(true);
    try {
      const senderName = `${post.user.first_name} ${post.user.last_name}`;
      const skillTitle = post.title;
      const to = post.user.email;
      await sendEmail(to, senderName, skillTitle);
      setDialogOpen(false);
      setShowToast(true);
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewClick = async () => {
    if (!isReviewOpen) {
      try {
        const response = await fetchPostReviews(post.id);
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    }
    setIsReviewOpen(!isReviewOpen);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {post.imageUrl && (
          <div className="modal-image-wrapper">
            <img src={post.imageUrl} alt={post.title} />
          </div>
        )}

        <div className="modal-content-wrapper">
          <div className="modal-tags">
            <span className="tag">{post.category}</span>
            <span className="tag offer">Teaching</span>
          </div>

          <h2 className="modal-title">{post.title}</h2>

          <h3>Description</h3>
          <p className="modal-description">{post.description}</p>

          <div className="modal-details">
            <span>
              <MapPin size={16} /> {post.location}
            </span>
            <span>
              <Calendar size={16} /> Created on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="modal-user">
            <div className="avatar-fallback">
              {post.user.first_name[0]}
              {post.user.last_name[0]}
            </div>
            <div>
              <strong>
                {post.user.first_name} {post.user.last_name}
              </strong>
              <p>Member since {post.user.createdAt.slice(0, 4)}</p>
            </div>
          </div>

          <div className="modal-actions">
            <button
              className="btn interest"
              onClick={() => setDialogOpen(true)}
              disabled={isLoading}
            >
              <Mail size={16} /> {isLoading ? 'Sending...' : 'Express Interest'}
            </button>

            <button className="btn outline" onClick={handleReviewClick}>
              <MessageCircle size={16} />{' '}
              {isReviewOpen
                ? 'Hide Reviews'
                : `View Reviews (${post.numReviews})`}
            </button>
          </div>

          {isReviewOpen && (
            <ReviewContainer
              reviews={reviews}
              setReviews={setReviews}
              setReviewCount={setReviewCount}
              post={post}
            />
          )}
        </div>
      </div>

      <InterestConfirmationDialog
        post={post}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleSendInterest}
        setShowToast={setShowToast}
        setShowModal={setShowModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default PostInfoModal;
