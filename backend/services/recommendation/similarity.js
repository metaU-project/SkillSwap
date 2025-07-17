const { getDomainScore } = require('../recommendation/categoryClusters');
//recency decay helper functions
const age = (date) => (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24);
const recencyWeight = (createdAt) => Math.exp(-0.1 * age(createdAt));

/**
 * Scores the similarity of a post to a list of posts
 * @param {*} post - post to score
 * @param {*} comparisonPosts - posts to compare to
 * @returns - score of similarity
 */
function ScoreSimilarityToLikedOrReviewed(post, comparisonPosts) {
  let score = 0;
  comparisonPosts.forEach((comparisonPost) => {
    const similarity = getDomainScore(
      post.category,
      comparisonPost.post.category
    );
    const userBonus = post.userId === comparisonPost.post.userId ? 2 : 0;
    const locationBonus =
      post.location === comparisonPost.post.location ? 1 : 0;

    const weight = recencyWeight(comparisonPost.createdAt);
    score += (similarity + userBonus + locationBonus) * weight;
  });
  return score;
}

module.exports = {
  ScoreSimilarityToLikedOrReviewed,
};
