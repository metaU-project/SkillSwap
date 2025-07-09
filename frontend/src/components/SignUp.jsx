import React, { useState } from 'react';
import { registerUser } from '../utils/authFetch';
import { useNavigate,Link } from 'react-router-dom';
import './SignUp.css';
import ErrorModal from './ErrorModal';

const SignUp = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await registerUser(first_name, last_name, email, password);
    if (response?.success) {
      navigate('/signin');
    } else if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage('Registration failed. Please try again.');
    }
  };
  return (
    <div className="signup-container">
      <h2>Get Started Now</h2>
      <form onSubmit={handleSignUp}>
        <label>
          First Name
          <br />
          <input
            type="text"
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Last Name
          <br />
          <input
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email address
          <br />
          <input
            type="email"
            value={email}
            placeholder="Type your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button className="login-btn" type="submit">
          Sign Up
        </button>
      </form>
      <p>
        Have an account? <Link to="/signin">Sign In</Link>
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

export default SignUp;
