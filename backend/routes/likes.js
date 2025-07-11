const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');

//like a post
router.patch('/post/:postId/like', checkAuth, async (req, res) => {
  const postId = parseInt(req.params.postId);
  const userId = req.session.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ message: ERROR_CODES.POSTS_ERROR });
    }

    const existingUserLike = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    let updatedPost;

    if (existingUserLike) {
      await prisma.like.delete({
        where: {
          id: existingUserLike.id,
        },
      });
      updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          numLikes: {
            decrement: 1,
          },
        },
        select: { numLikes: true },
      });
      return res.status(200).json({ liked: false, ...updatedPost });
    } else {
      await prisma.like.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
        },
      });

      updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          numLikes: {
            increment: 1,
          },
        },
        select: { numLikes: true },
      });

      return res.status(201).json({ liked: true, ...updatedPost });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
