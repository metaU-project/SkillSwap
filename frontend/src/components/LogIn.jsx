import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { checkAuth, loginUser } from '../utils/authFetch';
import { Mail, Lock, CheckCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import './LogIn.css';
import ErrorModal from './ErrorModal';
import { benefits } from '../utils/constants';

const LogIn = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    if (response?.success) {
      const user = await checkAuth();
      if (
        !user.user.location ||
        user.user.interests.length === 0 ||
        !user.user.bio
      ) {
        navigate('/onboarding');
      } else {
        navigate('/landing');
      }
    } else if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>
          Welcome Back to <span className="highlight">SkillSwap</span>
        </h1>
        <p>Log in to share your skills and connect with amazing people</p>
        <div className="benefits-card">
          <h3>Why join our community?</h3>
          <ul>
            {benefits.map((text, i) => (
              <li key={i}>
                <CheckCircle className="check-icon" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleLogIn} className="login-form">
          <h2>Sign In</h2>
          <p>Enter your credentials to access your account</p>

          <div className="input-group">
            <label>Email</label>
            <div className="input-icon">
              <Mail />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-icon">
              <Lock />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <button className="submit-btn" type="submit">
            Sign In <ArrowRight />
          </button>

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </form>
        {errorMessage && (
          <ErrorModal
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};

export default LogIn;
