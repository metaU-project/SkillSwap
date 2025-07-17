import { useState, useMemo } from 'react';
import './SessionModal.css';
import { FaRegLightbulb } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { FaSearch } from 'react-icons/fa';
import { checkAuth } from '../../../utils/authFetch';
import { useEffect } from 'react';
import Loading from '../../Loading/Loading';

const SessionModal = ({ post, posts, setShowRecommend, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const response = await checkAuth();
      if (response) {
        setUserId(response.user.id);
      }
    };
    fetchUserId();
  }, []);

  const filteredPosts = useMemo(() => {
    const offerPosts = posts
      .filter((post) => post.type === 'OFFER')
      .filter((post) => post.user.id !== userId);
    if (!searchTerm.trim()) {
      return offerPosts;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return offerPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.user.first_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.user.last_name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, posts, userId]);

  const handleSubmit = () => {
    if (selectedPostId) {
      onSubmit(selectedPostId);
      setShowRecommend(false);
    }
  };
  if (!userId) {
    return <Loading />;
  }
  return (
    <div className="modal-overlay" onClick={() => setShowRecommend(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="lightbulb-icon">
            <FaRegLightbulb />
          </div>
          <div>
            <h2>
              Suggest Posts to {post.user.first_name} {post.user.last_name}{' '}
            </h2>
            <p className="subtext">Help them with: "{post.title}"</p>
          </div>
        </div>
        <div className="search-wrapper">
          <FaSearch className="search-icon-session" />
          <input
            type="text"
            placeholder="Search posts by title,category, or author..."
            className="search-input-session"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
        <div className="results-grid">
          {filteredPosts.map((post) => (
            <div
              className={`suggest-card ${selectedPostId === post.id ? 'selected' : ''}`}
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
            >
              <div className="header-row">
                <div className="avatar-circle">
                  {' '}
                  {post.user.first_name[0]}
                  {post.user.last_name[0]}
                </div>
                <div className="meta">
                  <strong>
                    {post.user.first_name} {post.user.last_name}
                  </strong>
                  <span className="badge">Teaching</span>
                </div>
              </div>

              <h4>{post.title}</h4>
              <p>{post.description}</p>

              <div className="footer-row">
                <span className="tag">{post.category}</span>
                <div className="location-badge">
                  <GrLocation />
                  <span>{post.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="action-btns">
          <button
            className="submit-btn-session"
            disabled={!selectedPostId}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="cancel-btn"
            onClick={() => setShowRecommend(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
