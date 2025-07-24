const { getCoordinates, harvesineDistance } = require('./geo');
const { getRecencyScore } = require('../../utils/scoringUtils');

/**
 * Function to score a distances
 * @param {*} distanceKm distance in km
 * @returns a score for the distance
 */
function getDistanceScore(distanceKm) {
  const baseScore = 20;
  const decayFactor = 0.0015;
  const score = baseScore * Math.exp(-decayFactor * distanceKm);
  return score;
}

/**
 * Function to score a post based on the query and other factors
 * @param {*} post post to be scored relative to the query
 * @param {*} param1 token objects to be used for scoring
 * @returns a score for each post based on the query as a number
 */
async function scorePost(
  post,
  { locationTokens, categoryTokens, otherTokens, authorTokens }
) {
  let score = 0;
  const text = `${post.title} ${post.description}`.toLowerCase();
  const words = text.split(/\s+/);

  const postCoordinates = await getCoordinates(post.location, 'post');
  const userCoordinatesObject = await getCoordinates(
    post.user.location,
    'user'
  );

  if (locationTokens?.length > 0) {
    let minDistance = Infinity;
    for (const token of locationTokens) {
      const tokenCoordinates = await getCoordinates(token, 'location');
      if (tokenCoordinates && postCoordinates) {
        const distance = harvesineDistance(
          tokenCoordinates.latitude,
          tokenCoordinates.longitude,
          postCoordinates.latitude,
          postCoordinates.longitude
        );
        if (distance < minDistance) {
          minDistance = distance;
        }
        const distanceScore = getDistanceScore(distance);
        score += distanceScore;
      }
    }
  }

  if (locationTokens?.length === 0) {
    if (postCoordinates && userCoordinatesObject) {
      const distance = harvesineDistance(
        userCoordinatesObject.latitude,
        userCoordinatesObject.longitude,
        postCoordinates.latitude,
        postCoordinates.longitude
      );
      const distanceScore = getDistanceScore(distance);
      score += distanceScore;
    }
  }

  categoryTokens?.forEach((token) => {
    if (post.category.toLowerCase() === token.toLowerCase()) {
      score += 10;
    }
  });

  authorTokens?.forEach((token) => {
    if (
      post.user.first_name?.toLowerCase().includes(token.toLowerCase()) ||
      post.user.last_name?.toLowerCase().includes(token.toLowerCase())
    ) {
      score += 10;
    }
  });

  otherTokens?.forEach((token) => {
    if (post.title.toLowerCase().includes(token.toLowerCase())) {
      score += words.includes(token) ? 6 : 3;
    } else if (post.description.toLowerCase().includes(token.toLowerCase())) {
      score += words.includes(token) ? 4 : 2;
    }
  });

  score += getRecencyScore(post);
  return score;
}

module.exports = scorePost;
