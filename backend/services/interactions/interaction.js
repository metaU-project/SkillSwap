const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

/**
 * @param {Object} data - The data to log
 * @param {string} data.postId - The id of the post
 * @param {string} data.UserId - The id of the user
 * @param {string} data.type - The type of interaction
 * @returns {Promise} - A promise that resolves to the created interaction
 */
async function logInteraction({ postId, userId, type }) {
  try {
    return await prisma.interaction.create({
      data: {
        postId,
        userId,
        type,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  logInteraction,
};
