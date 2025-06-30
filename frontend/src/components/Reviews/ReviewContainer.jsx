import './ReviewContainer.css'

const ReviewContainer = ({reviews}) => {
  return (
    <div className="reviews-container">
    {reviews?.map((review, index) => (
        <div className="review" key={index}>
            <p><strong>Review: </strong>{review.review}</p>
        </div>
    ))}

    <input type="text" placeholder="Add a review" className="review-input" />
</div>
  )
}

export default ReviewContainer;
