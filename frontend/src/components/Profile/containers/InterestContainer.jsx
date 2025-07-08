import './InterestContainer.css';
const InterestContainer = ({interests}) => {
  return (
    <div>
      <h2>My Interests</h2>
      <div className="interests-container">
        {interests.map((interest) => (
          <span key={interest} className="interest-item">
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InterestContainer;
