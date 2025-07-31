import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../utils/authFetch';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import './SignUp.css';
import ErrorModal from './ErrorModal';

const SignUp = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await registerUser(first_name, last_name, email, password);
    if (response?.success) {
      setLoading(false);
      navigate('/signin');
    } else if (response?.error) {
      setErrorMessage(response.error);
      setLoading(false);
    } else {
      setErrorMessage('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="signup-box">
      <h2>Create an account</h2>
      <p className="subtitle">
        Enter your details below to create your account
      </p>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="name-fields">
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              placeholder="John"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              placeholder="Doe"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className="input-password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button className="signup-btn" type="submit" disabled={loading}>
          {loading && <Loader2 size={16} className="spin-icon" />}
          Create account
        </button>
      </form>

      <div className="signin-redirect">
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>

      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default SignUp;
