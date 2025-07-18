const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/email/mailer');
const checkAuth = require('../middleware/checkAuth');

router.post('/send', checkAuth, async (req, res) => {
  const { to, skillTitle, senderName } = req.body;
  const senderEmail = req.session.email;
  if (!to || !skillTitle) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await sendEmail({ to, senderName, senderEmail, skillTitle });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

module.exports = router;
