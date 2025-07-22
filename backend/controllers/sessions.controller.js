const prisma = require('../prisma/client');
const ERROR_CODES = require('../utils/errors');

const createSession = async (req, res) => {
  try {
    const {
      postId,
      startTime,
      duration,
      title,
      description,
      location,
    } = req.body;
    const participantId = req.session.userId;
    const endTime = startTime + duration * 60;

    const conflict = await prisma.session.findFirst({
      where: {
        participantId,
        AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
      },
    });
    if (conflict) {
      return res.status(409).json({
        error: ERROR_CODES.SESSION_CONFLICT,
      });
    }

    const session = await prisma.session.create({
      data: {
        postId,
        participantId,
        startTime,
        endTime,
        title,
        description,
        location,
      },
    });
    return res.status(200).json({
      session,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: ERROR_CODES.INTERNAL_ERROR,
    });
  }
};

module.exports = {
  createSession,
};
