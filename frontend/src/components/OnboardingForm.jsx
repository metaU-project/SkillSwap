import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSuggestedInterests,
  completeOnboarding,
} from '../utils/onboardingFetch';
import ErrorModal from './ErrorModal';
import './OnboardingForm.css';
import { IoAddSharp } from 'react-icons/io5';
import LocationInput from '../components/Location/LocationInput';
import { Loader2 } from 'lucide-react';

const Onboarding = () => {
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState('');
  const [suggested, setSuggested] = useState([]);
  const [customInterests, setCustomInterests] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [addInterest, setAddInterest] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await getSuggestedInterests();
      if (!res.error) setSuggested(res.suggestions);
    };
    fetchSuggestions();
  }, []);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const addCustomInterest = () => {
    if (customInterest && !interests.includes(customInterest)) {
      setCustomInterests([...customInterests, customInterest]);
      setInterests([...interests, customInterest]);
      setCustomInterest('');
      setAddInterest(false);
    }
  };

  const handleCompleteOnboarding = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await completeOnboarding(interests, location, bio);
    if (res?.success) {
      setLoading(false);
      navigate('/landing');
    } else {
      setLoading(false);
      setErrorMessage(res?.error);
    }
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-card">
        <h2>Welcome to SkillSwap</h2>
        <p className="onboarding-subtext">
          Please fill out the following information to get started
        </p>
        <form onSubmit={handleCompleteOnboarding}>
          <label>
            Location
            <LocationInput location={location} setLocation={setLocation} />
          </label>

          <label>
            Bio
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              placeholder="Tell us a little bit about yourself..."
            />
          </label>

          <label>
            Interests
            <div className="interests">
              {suggested.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`interest-tag ${interests.includes(interest) ? 'selected' : ''}`}
                >
                  {interest}
                </button>
              ))}
              {customInterests.map((interest) => (
                <button
                  key={`custom-${interest}`}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`interest-tag custom ${interests.includes(interest) ? 'selected' : ''}`}
                >
                  {interest}
                </button>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={() => setAddInterest(true)}
              >
                <IoAddSharp />
              </button>
            </div>
            {addInterest && (
              <div className="interest-input-row">
                <input
                  type="text"
                  placeholder="Enter custom interest"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                />
                <button type="button" onClick={addCustomInterest}>
                  Add
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setCustomInterest('');
                    setAddInterest(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </label>
          <button className="submit-btn" type="submit">
            Finish Onboarding{' '}
            {loading && <Loader2 size={16} className="spin-icon" />}
          </button>
        </form>
        {errorMessage && (
          <ErrorModal
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
