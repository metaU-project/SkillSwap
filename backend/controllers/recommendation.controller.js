const { PrismaClient, PostType } = require('../generated/prisma');
const prisma = new PrismaClient();
const ERROR_CODES = require('../utils/errors');
const getTrendingPostIds = require('../services/recommendation/trending');
const { getInteractions } = require('../services/interactions/interaction');
const { scorePost } = require('../services/recommendation/scoring');

async function getRecommendationInput(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_USER });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    const interests = user.interests;
    if (!interests) {
      return res.status(400).json({ error: ERROR_CODES.MISSING_INTERESTS });
    }
    const location = user.location;

    //get all offer posts
    const offerPosts = await prisma.post.findMany({
      where: {
        type: PostType.OFFER,
      },
      select: {
        id: true,
        category: true,
        location: true,
        userId: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        numLikes: true,
        numReviews: true,
        title: true,
        rating: true,
        type: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    //scored offer posts
    const scoredPostsInput = offerPosts.filter(
      (post) => post.user.id !== userId
    );

    //get trending posts
    const trendingPostIds = await getTrendingPostIds(prisma);

    //user interactions
    const userInteractions = await getInteractions(userId);
    const scoredPosts = scoredPostsInput
      .map((post) =>
        scorePost({
          post,
          interests,
          location,
          trendingPostIds,
          userInteractions,
        })
      )
      .sort((a, b) => b.score - a.score);

    res.status(200).json({
      scoredPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getRecommendationInput,
};
