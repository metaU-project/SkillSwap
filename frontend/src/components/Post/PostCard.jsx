import PostInfoModal from '../Post/Modals/PostInfoModal';
import { useState } from 'react';
import SessionModal from './Modals/SessionModal';
import { likePost } from '../../utils/likeFetch';
import { MdOutlineLocationOn } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa6';
import { interactionLog } from '../../utils/recommendationFetch';
import { InteractionTypes } from '../../utils/InteractionTypes';
import EmailToast from '../schedule/EmailToast';

function PostCard({ post, posts }) {
  const [likes, setLikes] = useState(post.numLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reviewCount, setReviewCount] = useState(post.numReviews);
  const previewLength = 100;
  const isLong = post.description.length > previewLength;
  const previewText = isLong
    ? post.description.slice(0, previewLength)
    : post.description;
  const [showRecommend, setShowRecommend] = useState(false);
  const request = 'REQUEST';
  const offer = 'OFFER';
  const [showToast, setShowToast] = useState(false);

  const handlePostClick = async (e) => {
    e.preventDefault();
    await interactionLog(post.id, InteractionTypes.VIEWED);
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    setShowRecommend(true);
  };

  const handleLike = async (postId) => {
    try {
      const response = await likePost(postId);
      await interactionLog(post.id, InteractionTypes.LIKED);
      setIsLiked(response.liked);
      setLikes(response.numLikes);
    } catch (error) {
      console.error(error, 'Error liking post');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowRecommend(false);
  };

  return (
    <>
      <div className="post-card" onClick={handlePostClick}>
        <div className="post-card-img-container">
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="post-image" />
          )}
        </div>
        <h3>{post.title}</h3>
        <p>
          {previewText}
          {isLong && (
            <span
              className="post-description-see-more"
              onClick={handlePostClick}
            >
              ...
            </span>
          )}
        </p>

        <div className="post-meta">
          <span className="post-category-pill">{post.category}</span>
          <span className="post-location">
            <MdOutlineLocationOn />
            {post.location.slice(0, 20)}
          </span>
          <span className={`post-type ${post.type.toLowerCase()}`}>
            {post.type === offer ? 'Offering Skill' : 'Seeking Skill'}
          </span>
        </div>

        <div className="post-user">
          <strong>Posted by:</strong> {post.user.first_name}{' '}
          {post.user.last_name}
        </div>
        {post.type === offer && (
          <div className="post-actions">
            <div className="post-like">
              <button
                className={isLiked ? 'liked-btn' : 'unliked-btn'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post.id);
                }}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />} {likes}
              </button>
            </div>
            <div className="post-reviews">
              <span className="post-reviews-count">{reviewCount} Reviews</span>
            </div>
          </div>
        )}

        {post.type === request && (
          <div className="post-actions">
            <button className="post-recommend-btn" onClick={handleRecommend}>
              Recommend session
            </button>
          </div>
        )}
      </div>

      {showModal && post.type == offer && (
        <PostInfoModal
          setReviewCount={setReviewCount}
          setShowModal={setShowModal}
          post={post}
          onClose={onClose}
          setShowToast={setShowToast}
        />
      )}

      {showRecommend && post.type == request && (
        <SessionModal
          post={post}
          posts={posts}
          setShowRecommend={setShowRecommend}
          onSubmit={(e) => {
            handleSubmit;
          }}
        />
      )}
      {showToast && <EmailToast post={post} setShowToast={setShowToast} />}
    </>
  );
}

export default PostCard;
