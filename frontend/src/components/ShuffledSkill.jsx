import './ShuffledSkill.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postFetch } from '../utils/postFetch';
import { LuShuffle } from 'react-icons/lu';
import { CiPause1, CiPlay1 } from 'react-icons/ci';
import fallbackImg from '../assets/images/fallback.jpg';
import Loading from './Loading/Loading';

const ShuffledSkill = () => {
  const [currentSkill, setCurrentSkill] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await postFetch();
      if (fetchedPosts && !fetchedPosts.error) {
        setPosts(fetchedPosts.slice(3, 8));
        setCurrentSkill(fetchedPosts[0]);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!isPlaying || !posts?.length) return;

    const interval = setInterval(() => {
      const nextIndex = (index + 1) % posts.length;
      setIndex(nextIndex);
      setCurrentSkill(posts[nextIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [posts, index, isPlaying]);

  const handleShuffle = () => {
    if (!posts?.length) return;
    const randomIndex = Math.floor(Math.random() * posts.length);
    setIndex(randomIndex);
    setCurrentSkill(posts[randomIndex]);
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      ?.toUpperCase();
  };

  const handleExplore = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="skill-wrapper">
      <h2 className="skill-header"> Today's Top Skills</h2>
      <p className="skill-subtext">
        Discover skills shared by our community –– auto-play or shuffle at your
        pace.
      </p>
      {currentSkill ? (
        <div>
          <div className="skill-controls">
            <div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="icon-btn"
              >
                {isPlaying ? <CiPause1 /> : <CiPlay1 />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleShuffle} className="icon-btn">
                <LuShuffle />
                Shuffle
              </button>
            </div>
          </div>
          <div className="skill-card-wrapper">
            <div className="skill-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSkill.id}
                  style={{ widows: '100%' }}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="skill-image-container">
                    <img
                      src={currentSkill.imageUrl || fallbackImg}
                      alt={currentSkill.title}
                      className="skill-image"
                    />
                    <div className="skill-overlay">
                      <span className="skill-category">
                        {currentSkill.category}
                      </span>
                      <span className="skill-type">{currentSkill.type}</span>
                    </div>
                  </div>
                  <div className="skill-details">
                    <h3 className="skill-title">{currentSkill.title}</h3>
                    <div className="skill-user-block">
                      <div className="skill-user-initials">
                        {getInitials(currentSkill.user.first_name)}
                        {getInitials(currentSkill.user.last_name)}
                      </div>
                      <div>
                        <p className="skill-user-name">
                          {currentSkill.user.first_name}{' '}
                          {currentSkill.user.last_name}
                        </p>
                        <p className="skill-duration">
                          {new Date(currentSkill.createdAt).toLocaleString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="skill-progress">
                      {posts.map((post, i) => (
                        <div
                          key={post.id}
                          className={`skill-progress-bar ${i === index ? 'active' : ''}`}
                        />
                      ))}
                    </div>
                    <button
                      className="skill-explore-btn"
                      onClick={handleExplore}
                    >
                      Explore This Skill
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="skill-footer">
            {index + 1} of {posts?.length} skills
          </p>
        </div>
      ) : (
        <div className="loading-container">
          <p className="loading-text">Loading skills...</p>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ShuffledSkill;
