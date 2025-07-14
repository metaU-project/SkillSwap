const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');
const { logInteraction } = require('../services/interactions/interaction');

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

module.exports = router;
