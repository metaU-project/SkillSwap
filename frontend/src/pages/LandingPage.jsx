import FilterBar from '../components/Filters/FilterBar';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar';
import PostList from '../components/Post/PostList';
import { useState, useEffect } from 'react';
import { postFetch } from '../utils/postFetch';
import Loading from '../components/Loading/Loading';

const LandingPage = () => {
  const [filter, setFilter] = useState('Recommended');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const fetchedPosts = await postFetch();
    if (fetchedPosts && !fetchedPosts.error) {
      setPosts(fetchedPosts);
    }
  };

  useEffect(() => {
    fetchPosts().finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <NavBar setPosts={setPosts} getPosts={fetchPosts} />
      <FilterBar filter={filter} setFilter={setFilter} />
      {loading ? <Loading /> : <PostList posts={posts} />}
      <Footer />
    </div>
  );
};
export default LandingPage;
