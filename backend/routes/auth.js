const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const router = express.Router();
const rateLimit = require("express-rate-limit");

//route for signup
router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Required fields are missing" });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
    });

    req.session.userId = newUser.id;
    res.status(201).json({ success: true, id: newUser.id, email: newUser.email });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong during signup" });
  }
});

//rate limiting for login

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many failed login attempts. Try again later." },
});


//route for log in
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required." });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    req.session.userId = user.id;
    req.session.email = user.email;

    res.json({ success: true, id: user.id, email: user.email })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong during login" });
  }
});


// Check if user is logged in
router.get('/me', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not logged in" })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session.userId },
            select: { email: true }
        })

        res.json({ id: req.session.userId, email: user.email});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching user session data" })
    }
})


//logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logout successful' });
  });
});

module.exports = router;
