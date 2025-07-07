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
      if (user) {
        navigate('/onboarding');
      }
    } else if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage('Something went wrong');
    }
  };
  return (
    <div className="login-container">
      <h2>Welcome back!</h2>
      <h4>Enter your credentials to access your account</h4>
      <form onSubmit={handleLogIn}>
        <label>
          Email address
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <br />
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
