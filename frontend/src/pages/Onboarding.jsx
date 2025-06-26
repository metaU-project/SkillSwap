import NavBar from "../components/NavBar";
import OnboardingForm from "../components/OnboardingForm";
import ShuffledSkill from "../components/ShuffledSkill";
import "./Onboarding.css";

const Onboarding = () => {
    return (
      <div>
      <NavBar/>
      <div className="onboarding-main-section">
      <ShuffledSkill/>
      <OnboardingForm/>
      </div>

      </div>
    );
  }

export default Onboarding;
