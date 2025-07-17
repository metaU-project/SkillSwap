const { InteractionType } = require('../../generated/prisma');

/**
 * Get the trending posts
 * @param {*} prisma  - Prisma client
 * @returns          - List of trending post ids
 */
async function trending(prisma) {
  const trendingLimit = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
  const trendingPosts = await prisma.interaction.groupBy({
    by: ['postId'],
    where: {
      createdAt: {
        gte: trendingLimit,
      },
      type: { in: [InteractionType.LIKED, InteractionType.REVIEWED] },
    },
    _count: { postId: true },
    orderBy: { _count: { postId: 'desc' } },
  });

  const trendingPostIds = trendingPosts.slice(0, 10).map((post) => post.postId);
  return trendingPostIds;
}

module.exports = trending;
