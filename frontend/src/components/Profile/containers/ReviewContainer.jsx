import './ReviewContainer.css';
import { Star } from 'lucide-react';
const ReviewContainer = ({ reviews }) => {
  return (
    <div className="reviews-container-profile">
      <h2 className="review-header">
        <Star /> My Reviews
      </h2>
      {reviews.map((review) => (
        <>
          <div key={review.id} className="review-item">
            <div className="review-item-top">
              <span>
                <Star className="star-orange" />
              </span>
              <p className="author-name">
                by {review.reviewer.first_name} {review.reviewer.last_name}
              </p>
            </div>
            <div className="review-item-bottom">{review.comment} </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ReviewContainer;
