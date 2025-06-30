const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const ERROR_CODES = require("../utils/errors");


//fetch all posts
// router.get("/", async (req, res) => {

// });

//create a post

//update a post

//delete a post

//fetch a post?
