const express = require('express');
const router = express.Router();
const {createSession} = require('../controllers/sessions.controller');

router.post('/', createSession);

module.exports = router;
