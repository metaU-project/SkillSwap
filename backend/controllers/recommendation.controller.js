const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const ERROR_CODES = require('../utils/errors');
const { InteractionType } = require('../generated/prisma');

async function getRecommendationInput(req, res) {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_USER });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    const interests = user.interests;
    const location = user.location;

    //get all offer posts
    const offerPosts = await prisma.post.findMany({
      where: {
        type: 'OFFER',
      },
      include: {
        user: true,
      },
    });

    //trending posts
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

    const trendingPostIds = trendingPosts
      .slice(0, 10)
      .map((post) => post.postId);

    //user interactions
    const userInteractions = await prisma.interaction.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    //extract liked posts
    const likedPosts = userInteractions
      .filter((interaction) => interaction.type === 'LIKED')
      .map((interaction) => interaction.postId);

    //extract reviewed posts
    const reviewedPosts = userInteractions
      .filter((interaction) => interaction.type === 'REVIEWED')
      .map((interaction) => interaction.postId);

    //extract viewed posts
    const viewedPosts = userInteractions
      .filter((interaction) => interaction.type === 'VIEWED')
      .map((interaction) => interaction.postId);

    res.status(200).json({
      interests,
      location,
      offerPosts,
      trendingPostIds,
      likedPosts,
      viewedPosts,
      reviewedPosts,
      userInteractions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getRecommendationInput,
};
