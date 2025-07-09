import PostCard from './PostCard';
import './Post.css';
function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts?.length > 0 ? (
        posts?.map((post) => <PostCard post={post} key={post.id} />)
      ) : (
        <p className="fall-back-text">No skill posts available.</p>
      )}
    </div>
  );
}

export default PostList;
