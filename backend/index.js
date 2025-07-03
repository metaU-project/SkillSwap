const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const onboardingRoutes = require('./routes/onboarding');
const postRoutes = require('./routes/post');
const reviewRoutes = require('./routes/reviews');
const likeRoutes = require('./routes/likes');
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/onboarding', onboardingRoutes);
app.use('/post', postRoutes);
app.use('/review', reviewRoutes);
app.use('/like', likeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
