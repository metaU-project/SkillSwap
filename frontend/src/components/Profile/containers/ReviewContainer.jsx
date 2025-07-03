import './ReviewContainer.css';
import {reviews} from '../../../utils/sampleData'
const ReviewContainer = () => {

  return (
    <div>
         <div className="reviews-container">
        {reviews.map((review) => (
          <p
            key={review}
            className="review-item"
          >
            {review}
          </p>

        ))}
      </div>
    </div>
  );
};

export default ReviewContainer;
