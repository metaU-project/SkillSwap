import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { checkAuth, loginUser } from '../utils/authFetch';
import './LogIn.css';
import ErrorModal from './ErrorModal';

const LogIn = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <div className="login-container">
      <h1>Welcome Back to SkillSwap</h1>
      <h3>Log in to share your skills and connect</h3>
      <div className="benefits-list">
        <ul>
          <li>✔ Connect with skill partenrs</li>
          <li>✔ Share your expertise</li>
          <li>✔ Learn something new</li>
        </ul>
      </div>
      <form onSubmit={handleLogIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button className="login-btn" type="submit">
          Log in
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>

      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default LogIn;
