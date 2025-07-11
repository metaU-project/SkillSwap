/**
 * Function to score a post based on the query and other factors
 * @param {*} post post to be scored relative to the query
 * @param {*} param1 token objects to be used for scoring
 * @returns a score for each post based on the query as a number
 */

function scorePost(post, { locationTokens, categoryTokens, otherTokens }) {
  //   console.log('scoring post', post);
  console.log('location tokens', locationTokens);
  console.log('category tokens', categoryTokens);
  console.log('other tokens', otherTokens);

  let score = 0;
  const text = `${post.title} ${post.description}`;
  console.log('text', text);
  const words = text.split(/\s+/);
  console.log('words', words);

  locationTokens?.forEach((token) => {
    if (post.location.toLowerCase() === token.toLowerCase()) {
      score += 10;
    }
  });
  categoryTokens?.forEach((token) => {
    if (post.category.toLowerCase() === token.toLowerCase()) {
      score += 10;
    }
  });
  otherTokens?.forEach((token) => {
    if (post.title.toLowerCase().includes(token.toLowerCase())) {
      score += words.includes(token) ? 6 : 3;
    } else if (post.description.toLowerCase().includes(token.toLowerCase())) {
      score += words.includes(token) ? 4 : 2;
    }
    console.log('score', score);
  });

  const recent =
    Date.now() - new Date(post.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
  if (recent) {
    score += 5;
  }
  console.log('score after', score);
  return score;
}

module.exports = scorePost;
