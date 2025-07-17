import './ReviewContainer.css';
import { useState } from 'react';
import { createPostReview } from '../../utils/reviewFetch';
import { interactionLog } from '../../utils/recommendationFetch';
import { InteractionTypes } from '../../utils/InteractionTypes';

const ReviewContainer = ({ reviews, setReviewCount, setReviews, post }) => {
  const [newReview, setNewReview] = useState('');

  const addReview = async (comment, postID) => {
    const newReview = await createPostReview(postID, { comment });
    await interactionLog(post.id, InteractionTypes.REVIEWED);
    setReviewCount((prev) => prev + 1);

    if (newReview && newReview.reviewer) {
      setReviews([...reviews, newReview]);
    }
  };
  return (
    <div className="reviews-container">
      {reviews?.map((review, index) => (
        <div className="review" key={index}>
          <p>
            {review.comment} - {review.reviewer.first_name}{' '}
            {review.reviewer.last_name}
          </p>
        </div>
      ))}
      <input
        type="text"
        placeholder="Add a review"
        className="review-input"
        onChange={(e) => {
          setNewReview(e.target.value);
        }}
        value={newReview}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addReview(newReview, post.id);
            setNewReview('');
          }
        }}
      />
    </div>
  );
};

export default ReviewContainer;
