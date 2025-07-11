import LogIn from '../components/LogIn';
import ShuffledSkill from '../components/ShuffledSkill';
import './LogInPage.css';
import Loading from '../components/Loading/Loading';
import { useState } from 'react';

const LogInPage = () => {
  const [loading, setLoading] = useState(false);
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="login-header">
        <h1>SkillSwap</h1>
      </div>
      <div className="main-content-login">
        <LogIn />
        <ShuffledSkill setLoading={setLoading} />
      </div>
    </>
  );
};

export default LogInPage;
