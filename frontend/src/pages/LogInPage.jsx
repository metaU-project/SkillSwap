import LogIn from '../components/LogIn';
import ShuffledSkill from '../components/ShuffledSkill';
import './LogInPage.css';

const LogInPage = () => {
  return (
    <div className="main-content-login">
      <LogIn />
      <ShuffledSkill />
    </div>
  );
};

export default LogInPage;
