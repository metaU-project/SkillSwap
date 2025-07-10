const tokenizedQuery = require('./tokenizeQuery');
const classifyTokens = require('./classifyTokens');
const scorePosts = require('./scorePosts');

/**
 * rank posts based on query and posts content
 * @param {*} query  user query
 * @param {*} posts  posts to rank
 * @returns ranked posts in descending order of score
 */
function rankPosts(query, posts) {
  const tokenizedQueryResult = tokenizedQuery(query);
  const classifiedTokens = classifyTokens(tokenizedQueryResult.tokens);

  const results = posts.map((post) => ({
    ...post,
    score: scorePosts(post, classifiedTokens),
  }));

  const maxScore = Math.max(...results.map((result) => result.score));
  const strongMatches = results.filter(
    (result) => result.score >= maxScore * 0.8
  );
  return strongMatches.sort((a, b) => b.score - a.score);
}

module.exports = rankPosts;
