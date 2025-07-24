const { PostType } = require('../generated/prisma');
const prisma = require('../prisma/client');
const ERROR_CODES = require('../utils/errors');
const getTrendingPostIds = require('../services/recommendation/trending');
const { getInteractions } = require('../services/interactions/interaction');
const { scorePost } = require('../services/recommendation/scoring');
const {
  getCollaborativeRecommendations,
} = require('../services/recommendation/collabRecommender');

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
            createdAt: true,
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
    const collabRecs = await getCollaborativeRecommendations(userId, interests);
    const collabMap = new Map(collabRecs.map((p) => [p.id, p.score]));

    const scored = scoredPostsInput
      .map((post) => {
        const base = scorePost({
          post,
          interests,
          location,
          trendingPostIds,
          userInteractions,
        });

        const collabScore = collabMap.get(post.id) || 0;
        const hybridScore = base.score * 0.7 + collabScore * 0.3;

        return {
          ...base,
          score: hybridScore,
          breakdown: {
            ...base.breakdown,
            collab: collabScore,
          },
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.status(200).json({ scoredPosts: scored });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getRecommendationInput,
};
