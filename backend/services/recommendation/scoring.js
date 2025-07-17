const {
  ScoreSimilarityToLikedOrReviewed,
} = require('../recommendation/similarity');

/**
 * Score a post based on its similarity to the user's interests and location
 * @param {*} param0 - The post to score
 * @param {*} interests - The user's interests
 * @param {*} location - The user's location
 * @param {*} trendingPostIds - The ids of the trending posts
 * @param {*} userInteractions - The user's interactions with posts
 * @returns - The score and breakdown of the post
 */
function scorePost({
  post,
  interests,
  location,
  trendingPostIds,
  userInteractions: { likedPosts, reviewedPosts, viewedPosts },
}) {
  let score = 0;
  let breakdown = {};
  score += ScoreSimilarityToLikedOrReviewed(post, likedPosts);
  score += ScoreSimilarityToLikedOrReviewed(post, reviewedPosts);

  if (trendingPostIds.includes(post.id)) {
    score += 2;
    breakdown['trending'] = 2;
  }
  if (viewedPosts.includes(post.id)) {
    score -= 0.2;
    breakdown['viewed'] = -0.2;
  }
  if (post.interests?.some((interest) => interests.includes(interest))) {
    score += 4;
    breakdown['interest'] = 4;
  }
  if (post.location === location) {
    score += 1;
    breakdown['location'] = 1;
  }

  return { post, score, breakdown };
}

module.exports = { scorePost };
