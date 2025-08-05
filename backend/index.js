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
const recommendationRoutes = require('./routes/recommendation');
const { router: searchRoutes } = require('./routes/search');
const emailRoutes = require('./routes/email');
const sessionsRoutes = require('./routes/sessions');
const fileUpload = require('express-fileupload');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

// CORS configuration
app.use(
  cors({
    origin: [
      'https://skillswap-frontend-bews.onrender.com',
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

let sessionConfig = {
  name: 'skillswap.sid',
  secret: process.env.SESSION_SECRET_KEY,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionConfig));
app.use('/auth', authRoutes);
app.use('/onboarding', onboardingRoutes);
app.use('/post', postRoutes);
app.use('/review', reviewRoutes);
app.use('/like', likeRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);
app.use('/recommendation', recommendationRoutes);
app.use('/email', emailRoutes);
app.use('/sessions', sessionsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
