const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const ERROR_CODES = require("../utils/errors");

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
                            select: { id: true, first_name: true, last_name: true},
                        }
                    }
                },

            },
        });
        if (!user) {
            return res.status(404).json({ error: ERROR_CODES.MISSING_USER });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: ERROR_CODES.FAILED_TO_FETCH_PROFILE });
    }
});

module.exports = router;
