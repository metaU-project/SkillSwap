import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {loginUser} from "../utils/utils";

const LogIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogIn = async (e) => {
        e.preventDefault();
        const response = await loginUser(email, password);
        navigate("/onboarding");
    }

    return (
        <div>
            <h2>Welcome back!</h2>
            <h4>Enter your credentials to access your account</h4>
            <form onSubmit={handleLogIn}>
                <label>
                    Email address
                    <br />
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <br />
                <label>
                    Password
                    <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br />
                <button className="login-btn" type="submit">Log in</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
};

export default LogIn;
