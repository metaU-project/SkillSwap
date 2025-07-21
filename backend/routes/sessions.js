const express = require('express');
const router = express.Router();
const { createSession } = require('../controllers/sessions.controller');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, createSession);

module.exports = router;
