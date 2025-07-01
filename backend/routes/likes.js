const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const ERROR_CODES = require("../utils/errors");

//like a post
router.patch("/post/:postId/like", checkAuth, async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!post) {
            return res.status(404).json({ message: ERROR_CODES.POSTS_ERROR });
        }
        await prisma.like.create({
            data: {
                post: {
                    connect: {
                        id: postId,
                    },
                },
                user: {
                    connect: {
                        id: req.session.userId,
                    },
                },

            },
        });
        await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                numLikes: {
                    increment: 1,
                },
            },
        });
        const updatedPost = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: { numLikes: true },
        });
        return res.status(201).json(updatedPost);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
