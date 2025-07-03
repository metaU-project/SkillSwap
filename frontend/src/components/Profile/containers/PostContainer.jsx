import './PostContainer.css';
import {posts} from '../../../utils/sampleData'
const PostContainer = () => {
  return (
    <div>
       <h2>My Posts</h2>
      <div className="posts">
        {posts?.map((post) => (
          <div className="post-info" key={post.id}>
            <img src={post.image} alt={post.title} />
            <p>{post.title}</p>
            <p>{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostContainer;
