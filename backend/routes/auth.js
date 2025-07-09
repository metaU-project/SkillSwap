const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const router = express.Router();
const rateLimit = require('express-rate-limit');
const ERROR_CODES = require('../utils/errors');

//check valid email
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//route for signup
router.post('/register', async (req, res) => {
  const { first_name, last_name, password, email } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_FIELDS });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: ERROR_CODES.INVALID_EMAIL });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: ERROR_CODES.INVALID_PASSWORD });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: ERROR_CODES.USER_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        password: hashedPassword,
        email,
      },
    });

    req.session.userId = newUser.id;
    res
      .status(201)
      .json({ success: true, id: newUser.id, email: newUser.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_CODES.REGISTRATION_FAILED });
    res.status(500).json({ error: ERROR_CODES.REGISTRATION_FAILED });
  }
});

//rate limiting for login

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: ERROR_CODES.TOO_MANY_REQUESTS },
});

//route for log in
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!email || !password) {
      return res.status(400).json({ error: ERROR_CODES.MISSING_FIELDS });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: ERROR_CODES.INVALID_CREDENTIALS });
    }

    req.session.userId = user.id;
    req.session.email = user.email;

    res.json({ success: true, id: user.id, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_CODES.LOGIN_FAILED });
  }
});

// Check if user is logged in
router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        location: true,
        bio: true,
        interests: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_CODES.LOGIN_FAILED });
  }
});

//logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: ERROR_CODES.LOGOUT_FAILED });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout successful' });
  });
});

module.exports = router;
