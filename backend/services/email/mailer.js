const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail({ to, senderName, senderEmail, skillTitle }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SkillSwap" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Interest in your "${skillTitle}" post`,
    html: `<p><strong>${senderName}</strong> is interested in your <em>${skillTitle}</em> post.</p> <p>Send them a message at <strong>${senderEmail}</strong> to get in touch.</p>`,
  });
}

module.exports = { sendEmail };
