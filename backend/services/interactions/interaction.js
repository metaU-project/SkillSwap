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
/**
 * Get the interactions of a user
 * @param {*} userId  - The id of the user
 * @returns {Promise} - A promise that resolves to an object containing the user's interactions
 */
async function getInteractions(userId) {
  try {
    const userInteractions = await prisma.interaction.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        post: true,
      },
    });
    //extract liked posts
    const likedPosts = userInteractions
      .filter((interaction) => interaction.type === 'LIKED')
      .map((interaction) => interaction);

    //extract reviewed posts
    const reviewedPosts = userInteractions
      .filter((interaction) => interaction.type === 'REVIEWED')
      .map((interaction) => interaction);

    //extract viewed posts
    const viewedPosts = userInteractions
      .filter((interaction) => interaction.type === 'VIEWED')
      .map((interaction) => interaction);

    return { likedPosts, reviewedPosts, viewedPosts };
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  logInteraction,
  getInteractions,
};
