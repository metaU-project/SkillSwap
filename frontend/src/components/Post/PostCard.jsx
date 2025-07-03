import { AiOutlineLike } from "react-icons/ai";
import PostInfoModal from "../Post/Modals/PostInfoModal";
import { useState } from "react";
import SessionModal from "./Modals/SessionModal";
import {likePost} from '../../utils/likeFetch';

function PostCard({post}) {
    const [likes , setLikes] = useState(post.numLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const previewLength = 100;
    const isLong = post.description.length > previewLength;
    const  previewText  = isLong ? post.description.slice(0, previewLength): post.description;
    const [showRecommend, setShowRecommend] = useState(false);

    const handlePostClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const onClose = () => {
        setShowModal(false);
    }

    const handleRecommend = (e) => {
        e.preventDefault();
        setShowRecommend(true);
    }

    const handleLike = async (postId) => {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
        try{
            const response = await likePost(postId);
            setLikes(response.numLikes);
            setIsLiked(false);
        }
        catch(error){
            setIsLiked(true);
            setLikes(post.numLikes);
            console.error(error, "Error liking post");
        }
    }

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
                        <span className="post-description-see-more" onClick={handlePostClick}>...</span>)}
                    </p>

                <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className={`post-type ${post.type.toLowerCase()}`}>
                        {post.type === "OFFER" ? "Offering Skill" : "Seeking Skill"}
                    </span>
                </div>

                <div className="post-location">
                    {post.location}
                </div>

                <div className="post-user">
                    <strong>Posted by:</strong> {post.user.first_name} {post.user.last_name}
                </div>
                {
                    post.type === "OFFER" && (
                        <div className="post-actions">
                        <div className="post-like">
                            {likes} <AiOutlineLike className= {isLiked ? 'liked' : ''} onClick={(e) => {e.stopPropagation(); handleLike(post.id)}}/>
                        </div>
                        <div className="post-reviews">
                            <a className="post-reviews-count" href=" ">{post.numReviews} Reviews</a>
                        </div>
                    </div>
                    )
                }

                {
                    post.type === "REQUEST" && (
                        <div className="post-actions">
                            <button className="post-recommend-btn" onClick={handleRecommend}>Recommend session</button>
                        </div>
                    )
                }

            </div>

            {showModal && post.type == 'OFFER' && (
                <PostInfoModal post={post} onClose={onClose} />
            )}

            {
                showRecommend && post.type == 'REQUEST' && (
                    <SessionModal setShowRecommend={setShowRecommend}/>
                )
            }
        </>
    );

}

export default PostCard;
