const { getCoordinates, harvesineDistance } = require('./geo');

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

/***
 * Function to score a post based on its recency
 * @param {*} postDate date of the post
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
