export function filterByRecency(post, recency) {
  if (!recency) {
    return true;
  }
  const createdAt = new Date(post.createdAt);
  const now = new Date();

  switch (recency) {
    case 'last_week': {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return createdAt > oneWeekAgo;
    }
    case 'last_month': {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return createdAt > oneMonthAgo;
    }
    default:
      return true;
  }
}
