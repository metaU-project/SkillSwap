import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logOutUser } from '../utils/authFetch';
import ErrorModal from './ErrorModal';
import { getTokenizedSearch, getAutosuggestions } from '../utils/searchFetch';
import SearchBar from '../components/search/SearchBar';
import CreatedPostModal from './Post/Modals/CreatePostModal';

import './NavBar.css';
import { Search, LogOut, Plus, User, X } from 'lucide-react';

const NavBar = ({ setPosts, getPosts }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logOutUser();
    if (response?.success) {
      navigate('/signin');
    } else {
      setErrorMessage(response?.error || 'Something went wrong');
    }
  };

  const handleSearch = async (value) => {
    const response = await getTokenizedSearch(value);
    if (response?.success) {
      setPosts(response?.rankPosts);
    } else {
      setPosts([]);
      setErrorMessage(response?.error || 'Search failed');
    }
    setShowSearchBar(false);
  };

  const toggleSearch = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      getPosts();
    }
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-badge">SS</div>
          <span className="logo-text">SkillSwap</span>
        </Link>

        {showSearchBar && (
          <div className="search-bar-wrapper">
            <SearchBar
              onSearch={handleSearch}
              fetchSuggestions={getAutosuggestions}
            />
            <X className="close-icon" onClick={toggleSearch} />
          </div>
        )}

        <div className="nav-actions">
          {!showSearchBar && (
            <button className="icon-btn" onClick={toggleSearch}>
              <Search size={18} />
            </button>
          )}

          <CreatedPostModal setPosts={setPosts}>
            <button className="nav-btn">
              <Plus size={16} />
              <span>Create</span>
            </button>
          </CreatedPostModal>

          <Link to="/profile" className="profile-icon">
            <User size={18} />
          </Link>

          <button className="signout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </nav>
  );
};

export default NavBar;
