import React, { useState } from 'react';
import { registerUser } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const res = await registerUser(name, email, password);
        navigate('/signin');
    }
    return (
        <div>
            <h2>Get Started Now</h2>
            <form onSubmit={handleSignUp}>
                <label>
                    Name
                    <br />
                    <input type="text" placeholder="Type your fullname" value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>
                <br />
                <label>
                    Email address
                    <br />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>
                <br />
                <label>
                    Password
                    <br />
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <br />
                <button className="login-btn" type="submit">Sign Up</button>
            </form>
            <p>Have an account? <a href="/signin">Sign In</a></p>
        </div>
    );
};

export default SignUp;
