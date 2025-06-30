import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../utils/authFetch';
import ErrorModal from './ErrorModal';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import SearchBar from '../components/search/SearchBar';

const NavBar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
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

    const handleSearch = () => {
        setShowSearchBar(!showSearchBar);
    }

    return (
        <div className='nav-bar-main'>
            <h1>SkillSwap</h1>
            <div className='nav-actions'>
            {showSearchBar && (<SearchBar
                suggestions={['Guitar', 'Web Design', 'Cooking', 'Photography']}
                onSearch={(value) => console.log('Searching for:', value)}
            />)}
            <FaSearch onClick={() => handleSearch()} />
            <button className='signout-btn' onClick={handleLogout}> SignOut</button>
            {errorMessage && <ErrorModal errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
            <a href='/profile'><CgProfile /></a>
            </div>

        </div>
    );
};

export default NavBar;
