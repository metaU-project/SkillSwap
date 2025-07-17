import './ReviewContainer.css';
const ReviewContainer = ({ reviews }) => {
  return (
    <div>
      <h2>My Reviews</h2>
      <div className="reviews-container">
        {reviews.map((review) => (
          <p key={review.id} className="review-item">
            {review.comment}{' '}
            <i>
              ~{review.reviewer.first_name} {review.reviewer.last_name}
            </i>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReviewContainer;
