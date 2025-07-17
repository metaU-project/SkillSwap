const {
  ScoreSimilarityToLikedOrReviewed,
} = require('../recommendation/similarity');
const { getDomain, fuzzMatch } = require('../recommendation/categoryClusters');

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
  let breakdown = {
    trending: false,
    viewed: false,
    interest: false,
    location: false,
    similarity: 0,
    unexploredInterest: 0,
    keywordMatch: 0,
  };
  const similarityScore =
    ScoreSimilarityToLikedOrReviewed(post, likedPosts) * 1 +
    ScoreSimilarityToLikedOrReviewed(post, reviewedPosts) * 2;
  score += similarityScore;
  breakdown.similarity = similarityScore;

  let keywordMatchScore = 0;
  const interactionPosts = [...likedPosts, ...reviewedPosts];

  interactionPosts.forEach((interaction) => {
    const interactedTitle = interaction.post.title.toLowerCase() || '';
    const interactedDescription =
      interaction.post.description.toLowerCase() || '';

    keywordMatchScore += fuzzMatch(interactedTitle, post.title.toLowerCase());
    keywordMatchScore += fuzzMatch(
      interactedDescription,
      post.description.toLowerCase()
    );
  });
  score += keywordMatchScore;
  breakdown.keywordMatch = keywordMatchScore;

  if (trendingPostIds.includes(post.id)) {
    score += 2;
    breakdown.trending = 2;
  }
  if (viewedPosts.includes(post.id)) {
    score -= 0.2;
    breakdown.viewed = -0.2;
  }
  if (post.interests?.some((interest) => interests.includes(interest))) {
    score += 4;
    breakdown.interest = 4;
  }
  if (post.location === location) {
    score += 1;
    breakdown.location = 1;
  }

  //boost for unexplored interests
  const interactedCategories = new Set([
    ...likedPosts.map((p) => p.category),
    ...reviewedPosts.map((p) => p.category),
  ]);

  const interestDomains = interests?.map(getDomain);
  const postDomains = getDomain(post.category);

  if (
    post.category &&
    !interactedCategories.has(post.category) &&
    interestDomains.includes(postDomains)
  ) {
    score += 2;
    breakdown.unexploredInterest = 2;
  }

  return { post, score, breakdown };
}

module.exports = { scorePost };
