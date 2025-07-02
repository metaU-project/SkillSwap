
import FilterBar from "../components/Filters/FilterBar";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar";
import PostList from "../components/Post/PostList";
import { useState } from "react";
import {samplePosts} from '../utils/data'

const LandingPage = () => {
  const [filter, setFilter] = useState("Recommended");
  return (
    <div>
      <NavBar />
      <FilterBar filter={filter} setFilter={setFilter}/>
      <PostList posts={samplePosts} />
      <Footer />
    </div>
  );
}

export default LandingPage;
