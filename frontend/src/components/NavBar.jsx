import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../utils/utils';
import ErrorModal from './ErrorModal';
import { useState } from 'react';

const NavBar = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await logOutUser();
        if (response?.success) {
            navigate('/signin');
        }
        else if (response?.error) {
            setErrorMessage(response?.error);
        }
        else {
            setErrorMessage("Something went wrong")
        }
    }
    return (
        <div>
            <button className='signout-btn' onClick={handleLogout}> SignOut</button>
            {errorMessage && <ErrorModal errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
        </div>
    );
};

export default NavBar;
