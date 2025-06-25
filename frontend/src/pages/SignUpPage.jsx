import SignUp from "../components/SignUp";
import ShuffledSkill from "../components/ShuffledSkill";
import "./SignUpPage.css";

const SignUpPage = () => {
    return (
        <div className="main-content-signup">
        <SignUp/>
        <ShuffledSkill/>
        </div>
    );
};

export default SignUpPage ;
