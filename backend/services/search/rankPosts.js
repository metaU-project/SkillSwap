const tokenizedQuery = require('./tokenizeQuery');
const { classifyTokens } = require('./classifyTokens');
const scorePost = require('./scorePost');

/**
 * rank posts based on query and posts content
 * @param {*} query  user query
 * @param {*} posts  posts to rank
 * @returns ranked posts in descending order of score
 */
function rankPosts(query, posts) {
  const tokenizedQueryResult = tokenizedQuery(query);
  console.log(tokenizedQueryResult);
  const classifiedTokens = classifyTokens(tokenizedQueryResult);

  const results = posts.map((post) => ({
    ...post,
    score: scorePost(post, classifiedTokens),
  }));

  const maxScore = Math.max(...results.map((result) => result.score));
    const strongMatches = results.filter(

        (result) => result.score >= maxScore * 0.8

    );
    console.log('maxxxxx', maxScore);
  return strongMatches.sort((a, b) => b.score - a.score).slice(0, 10);
}

module.exports = rankPosts;
