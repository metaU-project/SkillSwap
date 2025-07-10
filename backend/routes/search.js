const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const ERROR_CODES = require('../utils/errors');

//tokenized search
router.get('/', async (req, res) => {
  try {
    const { keywords } = req.query;
    const tokens = keywords.trim().split(/\s+/);
    const conditions = tokens.map((token) => ({
      OR: [
        { title: { contains: token, mode: 'insensitive' } },
        { description: { contains: token, mode: 'insensitive' } },
        { category: { contains: token, mode: 'insensitive' } },
        { location: { contains: token, mode: 'insensitive' } },
      ],
    }));
    const results = await prisma.post.findMany({
      where: {
        AND: conditions,
      },
      include: {
        user: {
          select: { id: true, first_name: true, last_name: true },
        },
        likes: true,
        reviews: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json({ success: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ERROR_CODES.INTERNAL_SERVER_ERROR });
  }
});

//popular suggestions
const getPopularSuggestions = async () => {
  const popular = await prisma.post.findMany({
    select: {
      title: true,
      category: true,
    },
    take: 15,
    orderBy: {
      numLikes: 'desc',
    },
  });
  return popular.map((post) => [post.title, post.category].filter(Boolean));
};

//autosuggestions for search
router.get('/suggestions', async (req, res) => {
  const { input } = req.query;

  // If the input is empty, return the most popular suggestions
  if (!input || input.trim() === '') {
    const popular = await getPopularSuggestions();
    return res.json(popular);
  }
  const keyword = input.trim();

  try {
    //exact title suggestions
    const exactMatches = await prisma.post.findMany({
      where: {
        OR: [
          { title: { startsWith: keyword, mode: 'insensitive' } },
          { category: { startsWith: keyword, mode: 'insensitive' } },
        ],
      },
      select: {
        title: true,
        category: true,
      },
      take: 20,
    });

    //location suggestions
    const locationMatches = await prisma.post.findMany({
      where: {
        location: { contains: keyword, mode: 'insensitive' },
      },
      select: {
        location: true,
      },
      distinct: ['location'],
      take: 20,
    });

    //popular categories containing the keyword
    const categories = await prisma.post.groupBy({
      by: ['category'],
      where: {
        category: { contains: keyword, mode: 'insensitive' },
      },
      _count: { category: true },
      orderBy: {
        _count: { category: 'desc' },
      },
      take: 20,
    });

    const allSuggestions = [
      ...exactMatches.flatMap((match) => [match.title, match.category]),
      ...locationMatches.map((match) => match.location),
      ...categories.map((category) => category.category),
    ];

    const uniqueSuggestions = [...new Set(allSuggestions)]
      .filter(Boolean)
      .slice(0, 5);
    res.json(uniqueSuggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ERROR_CODES.INTERNAL_SERVER_ERROR });
  }
});

module.exports = router;
