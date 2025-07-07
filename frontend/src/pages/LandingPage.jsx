import FilterBar from "../components/Filters/FilterBar";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar";
import PostList from "../components/Post/PostList";
import { useState, useEffect } from "react";
import { postFetch } from "../utils/postFetch";

const LandingPage = () => {
  const [filter, setFilter] = useState("Recommended");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await postFetch();
      if (fetchedPosts && !fetchedPosts.error) {
        setPosts(fetchedPosts);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <NavBar />
      <FilterBar filter={filter} setFilter={setFilter} />
      <PostList posts={posts} />
      <Footer />
    </div>
  );
};

export default LandingPage;
