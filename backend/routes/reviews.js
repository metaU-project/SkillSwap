const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');

// GET all reviews for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_USER });
  }
  try {
    const reviews = await prisma.review.findMany({
      where: { recipientId: parseInt(userId) },
      include: {
        reviewer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reviews);
  } catch (err) {
    console.error(ERROR_CODES.REVIEWS_ERROR, err);
    res.status(500).json({ error: ERROR_CODES.REVIEWS_ERROR });
  }
});

//get reviews for a post
router.get('/post/:postId', async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_POST });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { postId: parseInt(postId) },
      include: {
        reviewer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (err) {
    console.error(err, ERROR_CODES.REVIEWS_ERROR);
    res.status(500).json({ error: ERROR_CODES.REVIEWS_ERROR });
  }
});

// POST a new review to a post
router.post('/post/:postId', checkAuth, async (req, res) => {
  const postId = parseInt(req.params.postId);
  const { comment } = req.body;
  const reviewerId = parseInt(req.session.userId);

  if (isNaN(postId)) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_POST });
  }
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: { userId: true },
    });

    if (!post) {
      return res.status(404).json({ error: ERROR_CODES.MISSING_POST });
    }
    const recipientId = parseInt(post.userId);
    const review = await prisma.review.create({
      data: {
        comment,
        post: { connect: { id: postId } },
        recipient: { connect: { id: recipientId } },
        reviewer: { connect: { id: reviewerId } },
      },
      include: {
        reviewer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profileImage: true,
          },
        },
      },
    });
    await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        numReviews: { increment: 1 },
      },
    });
    res.status(201).json(review);
  } catch (err) {
    console.error(ERROR_CODES.CREATE_REVIEW_ERROR, err);
    res.status(500).json({ error: ERROR_CODES.CREATE_REVIEW_ERROR });
  }
});

module.exports = router;
