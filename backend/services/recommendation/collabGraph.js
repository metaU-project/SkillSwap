const { getAllInteractions } = require('../interactions/interaction');

async function buildInteractionGraph() {
  const interactions = await getAllInteractions();

  const userToPosts = new Map();
  const postToUsers = new Map();

  for (const { userId, postId } of interactions) {
    if (!userToPosts.has(userId)) {
      userToPosts.set(userId, new Set());
    }
    userToPosts.get(userId).add(postId);

    if (!postToUsers.has(postId)) {
      postToUsers.set(postId, new Set());
    }
    postToUsers.get(postId).add(userId);
  }

  return { userToPosts, postToUsers };
}

module.exports = { buildInteractionGraph };
