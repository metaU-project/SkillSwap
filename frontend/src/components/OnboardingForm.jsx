import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [interests, setInterests] = useState('');
  const navigate = useNavigate();


    return (
      <div>
        <h3>Welcome to SkillSwap</h3>
        <p>Please fill out the following information to get started</p>
        <form>
          <label>
            Location
            <br />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required/>
          </label>

          <br />

          <label>
           Profile Image
            <br />
            <input type="text" value={profileImage} onChange={(e) => setP(e.target.value)} required/>
          </label>

          <br />

          <label>
            Bio
            <br />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} required/>
          </label>

          <br />

          <label>
            Interests
            <br />
            <textarea value={interests} onChange={(e) => setInterests(e.target.value)} required/>
          </label>

          <br />

          <button type="submit">Finish Onboarding</button>


        </form>
      </div>
    );
  }

export default Onboarding;
