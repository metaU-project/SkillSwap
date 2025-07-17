import PostCard from './PostCard';
import './Post.css';
function PostList({ posts }) {
  if (posts?.length === 0) {
    return <p>No skill posts available.</p>;
  }

  return (
    <div className="post-list">
      {posts?.map((post) => (
        <PostCard posts={posts} post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
