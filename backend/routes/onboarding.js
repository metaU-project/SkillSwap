const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const ERROR_CODES = require("../utils/errors");

//get suggestions for interests
const suggestedInterests = [
    "Web Development",
    "Graphic Design",
    "Cooking",
    "Public Speaking",
    "Photography",
    "Guitar",
    "Data Analysis",
    "Blogging",
  ];
router.get('/interests/suggestions', (req, res) => {
    res.json({ suggestions: suggestedInterests });
  });


//add interests for a user
router.post('/', checkAuth, async (req, res) => {
    const userId = req.session.userId;
    const { interests,location, bio } = req.body;

    if (!Array.isArray(interests)) {
      return res.status(400).json({ error: ERROR_CODES.INTEREST_ERROR});
    }
    try {
        const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { interests, location, bio},
      });

      res.json({ success: true, interests: updatedUser.interests, location: updatedUser.location, bio: updatedUser.bio });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });

  module.exports = router;
