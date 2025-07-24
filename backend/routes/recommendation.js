const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');
const { logInteraction } = require('../services/interactions/interaction');
const {
  getRecommendationInput,
} = require('../controllers/recommendation.controller');
const {
  getCollaborativeRecommendations,
} = require('../services/recommendation/collabRecommender');

//log user interaction
router.post('/interaction', checkAuth, async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: ERROR_CODES.NOT_AUTHORIZED });
  }
  const { postId, type } = req.body;
  if (!postId || !type) {
    return res.status(400).json({ error: ERROR_CODES.INVALID_REQUEST });
  }
  const interaction = await logInteraction({ postId, userId, type });
  res.status(200).json(interaction);
});

//get recommendation input
router.get('/:userId', checkAuth, getRecommendationInput);

//get collaborative recommendations
router.get('/collaborative/:userId', checkAuth, async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).json({ error: ERROR_CODES.NOT_AUTHORIZED });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const posts = await getCollaborativeRecommendations(userId, user.interests);
  res.status(200).json(posts);
});

module.exports = router;
