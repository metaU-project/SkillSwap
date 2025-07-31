import SignUp from '../components/SignUp';
import ShuffledSkill from '../components/ShuffledSkill';
import Loading from '../components/Loading/Loading';
import { useState } from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="signup-header">
        <h1>Join <span className="highlight">SkillSwap</span></h1>
        <p>Connect with others and exchange skills. It’s free and always will be!</p>
      </div>

      <div className="signup-main-content">
        <div className="signup-left">
          <ShuffledSkill />
        </div>
        <div className="signup-right">
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
