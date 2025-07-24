/***
 * Function to score a post based on its recency
 * @param {*} post post to score
 * @returns a score for the recency of the post as a number between 0 and 10 based on the age of the post in days (0-1, 1-7, 7-30, 30+)
 */
function getRecencyScore(post) {
  const ageInDays =
    (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 3600 * 24);

  let baseRecencyScore = 0;

  //linear decay first 24 hours
  if (ageInDays <= 1) {
    const baseScore = 10;
    baseRecencyScore = baseScore * (1 - ageInDays);
  }

  //exponential decay for the next 7 days
  else if (ageInDays <= 7) {
    const baseScore = 8;
    const decayRate = 0.3;
    baseRecencyScore = baseScore * Math.exp(-decayRate * (ageInDays - 1));
  }

  //logarithmic decay for the next 30 days
  else if (ageInDays <= 30) {
    const baseScore = 5;
    const logAge = Math.log(ageInDays - 6);
    baseRecencyScore = Math.max(baseScore - logAge, 0);
  } else {
    baseRecencyScore = 0.5;
  }

  //engagement score
  const numLikes = post.numLikes || 0;
  const numReviews = post.numReviews || 0;
  const engagementScore = numLikes * 2 + numReviews * 3;

  const finalScore = baseRecencyScore * Math.log1p(engagementScore + 1);

  return finalScore;
}
module.exports = { getRecencyScore };
