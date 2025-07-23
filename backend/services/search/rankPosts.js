const { classifyTokens } = require('./classifyTokens');
const scorePost = require('./scorePost');

/**
 * rank posts based on query and posts content
 * @param {*} query  user query
 * @param {*} posts  posts to rank
 * @returns ranked posts in descending order of score
 */
async function rankPosts(query, posts) {
  const classifiedTokens = classifyTokens(query);
  const results = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      score: await scorePost(post, classifiedTokens),
    }))
  );

  const maxScore = Math.max(...results.map((result) => result.score));
  let strongMatches = results.filter(
    (result) => result.score >= maxScore * 0.5
  );
  if (strongMatches.length < 5) {
    strongMatches = results.sort((a, b) => b.score - a.score).slice(0, 10);
  }
  return strongMatches;
}

module.exports = rankPosts;
