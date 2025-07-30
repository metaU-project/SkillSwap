import './InterestContainer.css';
import { Badge } from 'lucide-react';
const InterestContainer = ({ interests }) => {
  return (
    <div>
      <div className="interests-container">
        <h2 className="interests-header">
          <Badge />
          My Interests
        </h2>
        <div className="interests">
          {interests.map((interest) => (
            <span key={interest} className="interest-item">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterestContainer;
