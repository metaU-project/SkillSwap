const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const ERROR_CODES = require("../utils/errors");
const path = require('path');

//server url
const serverUrl = "http://localhost:3000";

//fetch all posts
router.get("/", checkAuth, async (req, res) => {
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

//create a post
router.post("/", checkAuth, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const location = req.body.location;
    const type = req.body.type;
    const userId = req.session.userId;
    const image = req?.files.image;

    const rawName = image?.name;
    const safeName = rawName?.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");

    if (!title || !description || !category || !location || !type) {
        console.error(ERROR_CODES.REQUIRED_FIELDS);
        return res.status(400).json({ message: ERROR_CODES.REQUIRED_FIELDS });
    }
    const imageName = Date.now() + "-" + safeName;
    const uploadPath = path.join("uploads", imageName);
    image.mv(uploadPath, async (err) => {
        if (err) return res.sendStatus(500).json({ err: ERROR_CODES.FAILED_TO_UPLOAD_IMAGE });
    });
    const imageUrl = `${serverUrl}/uploads/${imageName}`;

    try {
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
        res.status(201).json(post);
    }
    catch (error) {
        console.error(error, ERROR_CODES.FAILED_TO_CREATE_POST);
        res.status(500).json({ error: ERROR_CODES.FAILED_TO_CREATE_POST });
    }

});

module.exports = router;
