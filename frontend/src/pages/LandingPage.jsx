import FilterBar from '../components/Filters/FilterBar';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar';
import PostList from '../components/Post/PostList';
import { useState, useEffect } from 'react';
import { postFetch } from '../utils/postFetch';
import { getRecommendations } from '../utils/recommendationFetch';
import Loading from '../components/Loading/Loading';
import './LandingPage.css';
import { FaArrowRight } from 'react-icons/fa';
import { filterByRecency } from '../utils/postFilters';

const LandingPage = () => {
  const [filter, setFilter] = useState('Recommended');
  const [posts, setPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [recency, setRecency] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const fetchedPosts = await postFetch();
    if (fetchedPosts && !fetchedPosts.error) {
      setPosts(fetchedPosts);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      setLoading(true);
      const fetchedPosts = await getRecommendations();
      if (fetchedPosts && !fetchedPosts.error) {
        setLoading(false);
        setRecommendedPosts(
          fetchedPosts.scoredPosts.map((post) => post.post).slice(0, 3) || []
        );
      }
    };
    fetchRecommendedPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchType = type ? post.type === type : true;
    const matchRecency = filterByRecency(post, recency);
    return matchType && matchRecency;
  });

  return (
    <div>
      <NavBar setPosts={setPosts} getPosts={fetchData} />
      <>
        {filter === 'Recommended' && recommendedPosts.length > 0 && (
          <section className="recommended-section">
            <div className="recommended-header">
              <h2>Recommended for you</h2>
              <p> Discover popular skills being shared in your community</p>
            </div>
            <PostList posts={recommendedPosts} />
            <div className="view-all-container">
              <button
                className="view-all-btn"
                onClick={() => {
                  setFilter('All');
                  fetchData();
                }}
              >
                View all Posts <FaArrowRight />
              </button>
            </div>
          </section>
        )}
      </>
      {filter === 'All' && (
        <>
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            setRecency={setRecency}
            setType={setType}
          />
          <div className="main-section">
            {loading ? <Loading /> : <PostList posts={filteredPosts} />}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
export default LandingPage;
