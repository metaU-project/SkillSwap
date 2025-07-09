import './NavBar.css';
import { useNavigate, Link } from 'react-router-dom';
import { logOutUser } from '../utils/authFetch';
import ErrorModal from './ErrorModal';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import SearchBar from '../components/search/SearchBar';
import CreatedPostModal from './Post/Modals/CreatePostModal';

const NavBar = ({ setPosts }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logOutUser();
    if (response?.success) {
      navigate('/signin');
    } else if (response?.error) {
      setErrorMessage(response?.error);
    } else {
      setErrorMessage('Something went wrong');
    }
  };

  const handleSearch = () => {
    console.log('searching');
    //[TODO] search for posts in backend and set posts state
  };

  return (
    <div className="nav-bar-main">
      <h1>SkillSwap</h1>
      <div className="nav-actions">
        {showSearchBar && (
          <SearchBar
            suggestions={['Guitar', 'Web Design', 'Cooking', 'Photography']} //[TODO] fetch suggestions from backend
            onSearch={handleSearch}
          />
        )}
        <FaSearch onClick={() => setShowSearchBar(!showSearchBar)} />
        <button className="signout-btn" onClick={handleLogout}>
          {' '}
          Sign Out
        </button>
        {errorMessage && (
          <ErrorModal
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
        <CreatedPostModal setPosts={setPosts} />
        <Link to="/profile">
          {' '}
          <CgProfile />{' '}
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
