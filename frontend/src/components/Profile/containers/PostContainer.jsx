import './PostContainer.css';
import { Trash2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import DeletePostModal from '../modals/DeletePost';

const PostContainer = ({ posts, setPosts }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  return (
    <div>
      <div className="posts">
        <h2 className="post-header">
          <BookOpen /> My Posts
        </h2>
        {posts?.map((post) => (
          <div className="post-info" key={post.id}>
            <div>
              <img
                src={post.imageUrl || 'https://picsum.photos/400/300'}
                alt={post.title}
              />
              <p className="date">
                {post.createdAt
                  ? new Date(post.createdAt).toISOString().split('T')[0]
                  : 'Date not available'}
              </p>
            </div>
            <p>{post.title}</p>
            <div className="post-row">
              <span className="post-type-badge">{post.type}</span>
              <span>
                <Trash2
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteModal(true);
                    setPostToDelete(post);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <DeletePostModal
          post={postToDelete}
          posts={posts}
          setPosts={setPosts}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
};

export default PostContainer;
