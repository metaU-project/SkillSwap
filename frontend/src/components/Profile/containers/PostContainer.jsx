import './PostContainer.css';
const PostContainer = ({ posts }) => {
  return (
    <div>
      <h2>My Posts</h2>
      <div className="posts">
        {posts?.map((post) => (
          <div className="post-info" key={post.id}>
            <img src={post.imageUrl || 'https://picsum.photos/400/300'}  alt={post.title} />
            <p>{post.title}</p>
            <p>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('en-US')
                : 'Date not available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostContainer;
