const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');
const cloudinary = require('../config/cloudinary');
const { rebuildTrie } = require('./search');

router.get('/', async (req, res) => {
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
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            createdAt: true,
          },
        },
        reviews: true,
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    console.error(err, ERROR_CODES.POSTS_ERROR);
    res.status(500).json({ error: ERROR_CODES.POSTS_ERROR });
  }
});

router.post('/', checkAuth, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const location = req.body.location;
  const type = req.body.type;
  const userId = req.session.userId;
  const image = req?.files?.image;

  if (!title || !description || !category || !location || !type) {
    console.error(ERROR_CODES.REQUIRED_FIELDS);
    return res.status(400).json({ message: ERROR_CODES.REQUIRED_FIELDS });
  }

  try {
    let imageUrl = null;

    if (image) {
      const streamifier = require('streamifier');

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'skillswap/post-images',
            public_id: `post-${userId}-${Date.now()}`,
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
              { quality: 'auto' },
              { format: 'auto' },
            ],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier.createReadStream(image.data).pipe(uploadStream);
      });

      imageUrl = uploadResult.secure_url;
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        location,
        type,
        imageUrl,
        user: { connect: { id: userId } },
      },
    });

    try {
      await rebuildTrie();
    } catch (trieError) {
      console.error(ERROR_CODES.ERROR_INITIALIZING_TRIE, trieError);
    }

    res.status(201).json(post);
  } catch (error) {
    console.error(ERROR_CODES.FAILED_TO_CREATE_POST, error);
    res.status(500).json({ error: ERROR_CODES.FAILED_TO_CREATE_POST });
  }
});

router.delete('/:postId', checkAuth, async (req, res) => {
  const postId = parseInt(req.params.postId);
  console.log('Deleting post with id: ', postId);

  try {
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      console.error(ERROR_CODES.POST_NOT_FOUND);
    }

    await prisma.post.delete({
      where: { id: postId },
    });
    res.status(200).json({ message: ERROR_CODES.POST_DELETED });
  } catch (error) {
    console.error(ERROR_CODES.FAILED_TO_DELETE_POST, error);
    res.status(500).json({ error: ERROR_CODES.FAILED_TO_DELETE_POST });
  }
});

module.exports = router;
