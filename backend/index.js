const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();
const authRoutes = require('./routes/auth');
const onboardingRoutes = require('./routes/onboarding');
const postRoutes = require('./routes/post');
const reviewRoutes = require('./routes/reviews');
const likeRoutes = require('./routes/likes');
const profileRoutes = require('./routes/profile');
const fileUpload = require('express-fileupload');
const app = express();

// Trust proxy for Render deployment
app.set('trust proxy', 1);

app.use(express.json());
app.use(
  cors({
    origin: [
      'https://skillswap-frontend-bews.onrender.com',
      'http://localhost:5173',
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/onboarding', onboardingRoutes);
app.use('/post', postRoutes);
app.use('/review', reviewRoutes);
app.use('/like', likeRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
