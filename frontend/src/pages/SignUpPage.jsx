import SignUp from '../components/SignUp';
import ShuffledSkill from '../components/ShuffledSkill';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="main-content-signup">
      <ShuffledSkill />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
