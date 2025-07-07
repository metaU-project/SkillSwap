import SignUp from '../components/SignUp';
import ShuffledSkill from '../components/ShuffledSkill';
import './SignUpPage.css';

const SignUpPage = () => {
    return (
        <>
            <div className="header-section">
                <h1>Join SkillSwap</h1>
                <p>Connect with others and exchange skills. It's free!</p>
            </div>
            <div className="main-content-signup">
                <ShuffledSkill />
                <SignUp />
            </div>
        </>
    );
};

export default SignUpPage;
