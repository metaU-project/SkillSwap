import './PostInfoModal.css';
import { IoLocationOutline } from "react-icons/io5";
import { useState } from 'react';

const PostInfoModal = ({post, onClose}) => {
    const [reviews, setReviews] = useState([]);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const handleReviewClick = () => {
      // Fetch reviews for the post
      const reviews = ['Review 1', 'Review 2', 'Review 3'];
      // Set the reviews state
      if (isReviewOpen){
        setReviews(reviews);
      }
      else{
        setReviews([]);
      }
      // Set the isReviewOpen state to true
      setIsReviewOpen(!isReviewOpen);
    }

  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className='modal-body'>
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
      <h2>{post.title}</h2>
      <p><IoLocationOutline/> {post.location}</p>
      <p><strong>Created on: </strong>{new Date(post.createdAt).toLocaleDateString()}</p>
      <button className='review-btn' onClick={handleReviewClick}> {isReviewOpen ? "See all Reviews" : "Hide Reviews"}</button>
      {reviews?.length > 0  && (
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <p><strong>Review: </strong>{review.review}</p>
            </div>
          ))}
        </div>
      )}
      </div>
      <p><strong>Rating: </strong>{post.rating}</p>
       <button> Express interest</button>
      <button id="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);
};


  export default PostInfoModal;
