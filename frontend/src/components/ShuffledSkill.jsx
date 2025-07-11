import './ShuffledSkill.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postFetch } from '../utils/postFetch';
import fallbackImg from '../assets/images/fallback.jpg';

const ShuffledSkill = ({ setLoading }) => {
  const [currentSkill, setCurrentSkill] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await postFetch();
      if (fetchedPosts && !fetchedPosts.error) {
        setPosts(fetchedPosts);
        if (fetchedPosts.length > 0) {
          setCurrentSkill(fetchedPosts[0]);
        }
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!posts?.length) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setCurrentSkill(posts[randomIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [posts]);

  return (
    <div className="skill-container">
      <AnimatePresence mode="wait">
        {currentSkill && (
          <motion.div
            key={currentSkill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={currentSkill.imageUrl || fallbackImg}
              alt={currentSkill.title}
            />
            <h3>{currentSkill.title}</h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShuffledSkill;
