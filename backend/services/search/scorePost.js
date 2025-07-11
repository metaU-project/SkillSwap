/**
 * Function to score a post based on the query and other factors
 * @param {*} posts posts to be scored relative to the query
 * @param {*} param1 token objects to be used for scoring
 * @returns a score for each post based on the query as a number
 */

function scorePost(posts, { locationTokens, categoryTokens, otherTokens }) {
  let score = 0;
  const text = `${posts.title} ${posts.description}`;
  const words = text.split(/\s+/);

  locationTokens.forEach((token) => {
    if (post.location.toLowerCase() === token.toLowerCase()) {
      score += 10;
    }
  });
  categoryTokens.forEach((token) => {
    if (post.category.toLowerCase() === token.toLowerCase()) {
      score += 10;
    }
  });
  otherTokens.forEach((token) => {
    if (posts.title.toLowerCase().includes(token.toLowerCase())) {
      score += words.includes(token) ? 6 : 3;
    } else if (posts.description.toLowerCase().includes(token.toLowerCase())) {
      score += words.includes(token) ? 4 : 2;
    }
  });

  const recent =
    Date.now() - new Date(posts.created_at).getTime() < 7 * 24 * 60 * 60 * 1000;
  if (recent) {
    score += 5;
  }
  return score;
}

module.exports = scorePost;
