const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();

//get suggestions for interests
router.get('/interests/suggestions', (req, res) => {
    const suggestions = [
      "Web Development",
      "Graphic Design",
      "Cooking",
      "Public Speaking",
      "Photography",
      "Guitar",
      "Data Analysis"
    ];
    res.json({ suggestions });
  });


//add interests for a user
router.post('/interests', async (req, res) => {
    const { interests } = req.body;

    if (!req.session.userId) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }

    try {
      await prisma.user.update({
        where: { id: req.session.userId },
        data: { interests },
      });

      res.json({ success: true, message: "Interests updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "SERVER_ERROR" });
    }
  });
