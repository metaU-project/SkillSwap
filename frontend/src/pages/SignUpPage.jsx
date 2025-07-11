import SignUp from '../components/SignUp';
import ShuffledSkill from '../components/ShuffledSkill';
import './SignUpPage.css';
import Loading from '../components/Loading/Loading';
import { useState } from 'react';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="header-section">
        <h1>Join SkillSwap</h1>
        <p>Connect with others and exchange skills. It's free!</p>
      </div>
      <div className="main-content-signup">
        <ShuffledSkill setLoading={setLoading} />
        <SignUp />
      </div>
    </>
  );
};

export default SignUpPage;
