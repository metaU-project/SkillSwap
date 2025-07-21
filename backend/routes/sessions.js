const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
} = require('../controllers/sessions.controller');
const checkAuth = require('../middleware/checkAuth');
const { route } = require('./recommendation');

router.post('/', checkAuth, createSession);
router.get('/', checkAuth, getSessions);

module.exports = router;
