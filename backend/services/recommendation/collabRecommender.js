const { buildInteractionGraph } = require('./collabGraph');
const { getInteractions } = require('../interactions/interaction');
const { getDomainScore } = require('./categoryClusters');

async function getCollaborativeRecommendations(userId, userInterests) {
  const { userToPosts, postToUsers } = await buildInteractionGraph();
  const seenPostIds = new Set();
  const visited = new Set();
  const queue = [{ userId: parseInt(userId), depth: 0 }];
  const postScores = new Map();

  const { likedPosts, reviewedPosts, viewedPosts } =
    await getInteractions(userId);
  [...likedPosts, ...reviewedPosts, ...viewedPosts].forEach((interaction) => {
    seenPostIds.add(interaction.postId);
  });

  visited.add(parseInt(userId));

  const MAX_DEPTH = 3;

  while (queue.length > 0) {
    const { userId: currentUserId, depth } = queue.shift();
    if (depth > MAX_DEPTH) {
      continue;
    }
    const postIds = userToPosts.get(currentUserId) || [];

    for (const postId of postIds) {
      const users = postToUsers.get(postId) || [];

      for (const neighborUserId of users) {
        if (!visited.has(neighborUserId)) {
          visited.add(neighborUserId);
          queue.push({ userId: neighborUserId, depth: depth + 1 });
        }
      }
    }

    const posts = userToPosts.get(currentUserId) || [];
    for (const postId of posts) {
      if (seenPostIds.has(postId)) {
        continue;
      }

      const baseScore = 1 / (depth + 1);
      const oldScore = postScores.get(postId) || 0;
      postScores.set(postId, oldScore + baseScore);
    }
  }
  const postIds = [...postScores.keys()];
  const posts = await prisma.post.findMany({
    where: {
      id: { in: postIds },
    },
  });
  const enriched = posts.map((post) => {
    let domainScore = 0;
    for (const interest of userInterests) {
      domainScore += getDomainScore(interest, post.category);
    }
    return {
      ...post,
      score: postScores.get(post.id) + domainScore,
    };
  });

  return enriched.sort((a, b) => b.score - a.score).slice(0, 10);
}

module.exports = { getCollaborativeRecommendations };
