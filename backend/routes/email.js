const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/email/mailer');
const checkAuth = require('../middleware/checkAuth');
const ERROR_CODES = require('../utils/errors');
const MESSAGES = require('../utils/messages');

router.post('/send', checkAuth, async (req, res) => {
  const { to, skillTitle, senderName } = req.body;
  const senderEmail = req.session.email;
  if (!to || !skillTitle) {
    return res.status(400).json({ error: ERROR_CODES.MISSING_FIELDS });
  }

  try {
    await sendEmail({ to, senderName, senderEmail, skillTitle });
    res.status(200).json({ message: MESSAGES.EMAIL_SENT });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ERROR_CODES.EMAIL_SEND_FAILED });
  }
});

module.exports = router;
