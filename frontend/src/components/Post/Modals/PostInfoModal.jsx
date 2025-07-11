import './PostInfoModal.css';
import { IoLocationOutline } from 'react-icons/io5';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ReviewContainer from '../../Reviews/ReviewContainer';
import { HiOutlineMail } from 'react-icons/hi';
import { fetchPostReviews } from '../../../utils/reviewFetch';

const PostInfoModal = ({ post,setReviewCount, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button id="close-btn" onClick={onClose}>
          <IoMdClose />
        </button>
        <div className="modal-header">
          <h2>{post.title}</h2>
        </div>
        <div className="modal-body">
          <div className="modal-image-section">
            <img
              src={
                post.imageUrl
                  ? post.imageUrl
                  : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383846687lu.jpg'
              }
              alt={post.title}
            />
          </div>

          <div>
            <h3>Description</h3>
            <p>{post.description}</p>
          </div>
        </div>

        <div className="modal-info-section">
          <span>
            <IoLocationOutline /> {post.location}
          </span>
          <span>
            <strong>Created on: </strong>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span>
            <strong>Rating: </strong>
            {post.rating}
          </span>
        </div>

        <div className="review-interest-section">
          <button className="interest-btn">
            <HiOutlineMail className="email-icon" /> Express interest
          </button>
          <div className="modal-reviews-section">
            <button className="review-btn" onClick={handleReviewClick}>
              {' '}
              {!isReviewOpen ? 'See all Reviews' : 'Hide Reviews'}
            </button>
          </div>
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
  );
};

export default PostInfoModal;
