const { InteractionType } = require('../../generated/prisma');

/**
 * Get the trending posts
 * @param {*} prisma  - Prisma client
 * @returns - List of trending post ids
 */
async function trending(prisma) {
  const now = Date.now();
  const oneWeekAgo = new Date(now - 1000 * 60 * 60 * 24 * 7);
  const typeWeights = {
    [InteractionType.LIKED]: 1,
    [InteractionType.REVIEWED]: 2,
  };

  const interactions = await prisma.interaction.findMany({
    where: {
      createdAt: { gte: oneWeekAgo },
      type: { in: Object.keys(typeWeights) },
    },
    select: {
      postId: true,
      createdAt: true,
      userId: true,
      type: true,
    },
  });

  const day = 1000 * 60 * 60 * 24;
  const postScores = {};
  const postUserSet = {};

  for (const { postId, createdAt, userId, type } of interactions) {
    const age = (now - new Date(createdAt).getTime()) / day;
    const decay = Math.max(0, 1 - age / 7);
    const weight = typeWeights[type] || 1;
    const score = decay * weight;

    if (!postScores[postId]) {
      postScores[postId] = 0;
      postUserSet[postId] = new Set();
    }

    postScores[postId] += score;
    postUserSet[postId].add(userId);
  }

  for (const postId in postScores) {
    const uniqueBoost = postUserSet[postId].size * 0.2;
    postScores[postId] += uniqueBoost;
  }

  const trendingPostIds = Object.entries(postScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([postId]) => postId);
  return trendingPostIds;
}

module.exports = trending;
