import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSuggestedInterests,
  completeOnboarding,
} from "../utils/onboardingFetch";
import ErrorModal from "./ErrorModal";
import "./OnboardingForm.css";
import { IoAddSharp } from "react-icons/io5";
import LocationInput from "../components/Location/LocationInput";

const Onboarding = () => {
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [suggested, setSuggested] = useState([]);
  const [customInterests, setCustomInterests] = useState([]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [addInterest, setAddInterest] = useState(false);

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
      setCustomInterest("");
    }
  };

  const handleCompleteOnboarding = async (e) => {
    e.preventDefault();
    const res = await completeOnboarding(interests, location, bio);
    if (res?.success) {
      navigate("/landing");
    } else {
      setErrorMessage(res?.error);
    }
  };

  return (
    <div className="onboarding-form">
      <h2>Welcome to SkillSwap</h2>
      <p>Please fill out the following information to get started</p>
      <form onSubmit={handleCompleteOnboarding}>
        <label>
          Location
          <LocationInput location={location} setLocation={setLocation} />
        </label>
        <br />
        <label>
          Bio
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            placeholder="Tell us a little bit about yourself"
          />
        </label>
        <br />

        <label>
          Interests
          <div className="interests-container">
            {suggested.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`interest-chip ${
                  interests.includes(interest) ? 'selected' : ''
                }`}
              >
                {interest}
              </button>
            ))}
            {customInterests.map((interest) => (
              <button
                key={`custom-${interest}`}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`interest-chip custom ${
                  interests.includes(interest) ? 'selected' : ''
                }`}
              >
                {interest}
              </button>
            ))}
            <div>
              <button
                type="button"
                className="add-interest-btn"
                onClick={() => setAddInterest(!addInterest)}
              >
                <IoAddSharp />
              </button>
            </div>
          </div>
          {addInterest && (
            <div className="custom-interest-input">
              <input
                placeholder="Add custom interest"
                value={customInterest}
                onChange={(e) => {
                  setCustomInterest(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomInterest();
                  }
                }}
              />
            </div>
          )}
        </label>
        <br />
        <button type="submit" className="submit-btn">
          Finish Onboarding
        </button>
      </form>
      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default Onboarding;
