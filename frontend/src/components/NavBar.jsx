import './NavBar.css';
import { useNavigate,Link } from 'react-router-dom';
import { logOutUser } from '../utils/authFetch';
import ErrorModal from './ErrorModal';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import SearchBar from '../components/search/SearchBar';
import CreatedPostModal from './Post/Modals/CreatePostModal';
import { getTokenizedSearch, getAutosuggestions } from '../utils/searchFetch';

const NavBar = ({ setPosts, getPosts }) => {
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

  const handleSearch = async (value) => {
    console.log('searching for ', value);
    //[TODO] - add autosuggestions from backend and set them in the search bar
    // const response = await getTokenizedSearch(value);
    // console.log('response', response);
    // if (response?.success) {
    //   setPosts(response?.results);
    // } else if (response?.error) {
    //   setErrorMessage(response?.error);
    // } else {
    //   setPosts([]);
    // }
  };

  return (
    <div className="nav-bar-main">
      <h1>SkillSwap</h1>
      <div className="nav-actions">
        {showSearchBar && (
          <SearchBar
            onSearch={handleSearch}
            // fetchSuggestions={getAutosuggestions} [TODO] - add autosuggestions from backend
          />
        )}
        <FaSearch
          onClick={() => {
            setShowSearchBar(!showSearchBar);
            getPosts();
          }}
        />
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
