import LogIn from "../components/LogIn";
import ShuffledSkill from "../components/ShuffledSkill";
import "./LogInPage.css";

const LogInPage = () => {
  return (
    <>
      <div className="login-header">
        <h1>SkillSwap</h1>
      </div>
      <div className="main-content-login">
        <LogIn />
        <ShuffledSkill />
      </div>
    </>
  );
};

export default LogInPage;
