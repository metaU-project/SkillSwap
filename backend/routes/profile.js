const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');
const cloudinary = require('../config/cloudinary');

//get user profile
router.get('/:userId', checkAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
        receivedReviews: {
          include: {
            reviewer: {
              select: { id: true, first_name: true, last_name: true },
            },
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: ERROR_CODES.MISSING_USER });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ERROR_CODES.FAILED_TO_FETCH_PROFILE });
  }
});

//update user profile picture
router.post('/:userId/profile-pic', checkAuth, async (req, res) => {
  const userId = req.session.userId;
  if (!req.files || !req.files.profileImage) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_FILE });
  }

  const image = req.files.profileImage;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'skillswap/profile-images',
        public_id: `user-${userId}-${Date.now()}`,
        transformation: [
          { width: 400, height: 400, crop: 'fill' },
          { quality: 'auto' },
          { format: 'auto' },
        ],
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res
            .status(500)
            .json({ error: ERROR_CODES.FAILED_TO_UPDATE_PROFILE });
        }

        try {
          // Update user profile with Cloudinary URL
          const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { profileImage: result.secure_url },
          });
          return res.status(200).json({ user: updatedUser });
        } catch (dbError) {
          console.error('Database update error:', dbError);
          return res
            .status(500)
            .json({ error: ERROR_CODES.FAILED_TO_UPDATE_PROFILE });
        }
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const streamifier = require('streamifier');
    streamifier.createReadStream(image.data).pipe(result);
  } catch (err) {
    console.error('Profile picture upload error:', err);
    return res
      .status(500)
      .json({ error: ERROR_CODES.FAILED_TO_UPDATE_PROFILE });
  }
});

module.exports = router;
