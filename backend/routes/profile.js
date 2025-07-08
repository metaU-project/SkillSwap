const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const ERROR_CODES = require("../utils/errors");

//server url
const serverUrl = "http://localhost:3000";

//get user profile
router.get("/:userId", checkAuth, async (req, res) => {
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
router.post("/:userId/profile-pic", checkAuth, async (req, res) => {
    const userId = req.session.userId;
  if (!req.files || !req.files.profileImage) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_FILE });
  }
  const image = req.files.profileImage;
  const rawName = image.name;
  const safeName = rawName
    ?.replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");

  const imageName = `${Date.now()}-${safeName}`;
  const uploadPath = `uploads/${imageName}`;
  image.mv(uploadPath, async (err) => {
    if (err)
      return res
        .sendStatus(500)
        .json({ err: ERROR_CODES.FAILED_TO_UPDATE_PROFILE });
  });

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profileImage: `${serverUrl}/uploads/${imageName}` },
    });
    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: ERROR_CODES.FAILED_TO_UPDATE_PROFILE });
  }
});

module.exports = router;
