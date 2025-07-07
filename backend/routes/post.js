const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const ERROR_CODES = require("../utils/errors");

//fetch all posts
router.get("/", async (req, res) => {
  try {
    const { category, location, type } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (location) filters.location = location;
    if (type) filters.type = type;

    const posts = await prisma.post.findMany({
      where: filters,
      include: {
        user: {
          select: { id: true, first_name: true, last_name: true },
        },
        likes: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (err) {
    console.error(err, ERROR_CODES.POSTS_ERROR);
    res.status(500).json({ error: ERROR_CODES.POSTS_ERROR });
  }
});

module.exports = router;
