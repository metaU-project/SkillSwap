const { getDomainScore } = require('../recommendation/categoryClusters');

/**
 * Scores the similarity of a post to a list of posts
 * @param {*} post - post to score
 * @param {*} comparisonPosts - posts to compare to
 * @returns - score of similarity
 */
function ScoreSimilarityToLikedOrReviewed(post, comparisonPosts) {
  let score = 0;
  comparisonPosts.forEach((comparisonPost) => {
    score += getDomainScore(post.category, comparisonPost.post.category);

    if (post.userId === comparisonPost.post.userId) {
      score += 2;
    }
    if (post.location === comparisonPost.post.location) {
      score += 1;
    }
  });
  return score;
}

module.exports = {
  ScoreSimilarityToLikedOrReviewed,
};
