const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const ERROR_CODES = require('../utils/errors');
const { buildTrieFromData, getSuggestions } = require('../services/trie/index');

/**
 * Initialize the Trie with existing posts data
 * This function fetches all posts and builds the Trie for autocomplete suggestions
 */
async function initializeTrie() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        description: true,
        category: true,
        location: true,
        createdAt: true,
      },
    });

    if (posts.length === 0) {
      console.log(
        'No posts found in database. Trie will be empty until posts are added.'
      );
      return;
    }

    const categories = [...new Set(posts.map((post) => post.category))];
    buildTrieFromData(posts, categories);
  } catch (error) {
    console.error(ERROR_CODES.ERROR_INITIALIZING_TRIE, error);
  }
}

/**
 * Rebuild the Trie when new posts are added
 * Call this function after creating/updating/deleting posts
 */
async function rebuildTrie() {
  await initializeTrie();
}
setTimeout(initializeTrie, 2000);

//tokenized search [TODO - Include scoring logic]
router.get('/', async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords || keywords.trim() === '') {
      return res.status(400).json({ error: ERROR_CODES.INVALID_SEARCH_QUERY });
    }

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
    console.error('Search error:', err);
    res.status(500).json({ error: ERROR_CODES.INTERNAL_SERVER_ERROR });
  }
});

//autosuggestions for search
router.get('/suggestions', async (req, res) => {
  try {
    const { input } = req.query;

    if (!input || input.trim() === '') {
      const popularSuggestions = await getPopularSuggestions();
      return res.json(popularSuggestions.slice(0, 8));
    }
    const suggestions = getSuggestions(input.trim());
    res.json(suggestions);
  } catch (error) {
    console.error(ERROR_CODES.ERROR_GETTING_SUGGESTIONS, error);
    res.status(500).json({ error: ERROR_CODES.INTERNAL_SERVER_ERROR });
  }
});

//popular suggestions
// [TODO]-[include in scoring logic for search if no results found]
const getPopularSuggestions = async () => {
  try {
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

    const suggestions = [];
    popular.forEach((post) => {
      if (post.title) suggestions.push(post.title);
      if (post.category) suggestions.push(post.category);
    });

    return [...new Set(suggestions)];
  } catch (error) {
    console.error(ERROR_CODES.ERROR_GETTING_SUGGESTIONS, error);
    return [];
  }
};

module.exports = { router, rebuildTrie };
