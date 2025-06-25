import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../utils/utils';

const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await logOutUser();
        if (response?.success) {
            navigate('/signin');
        }
        else if (response?.error) {
            alert(response?.error)
        }
        else {
            alert("Something went wrong")
        }

    }
    return (
        <>
            <button className='signout-btn' onClick={handleLogout}> SignOut</button>
        </>
    );
};

export default NavBar;
