//define known locations
let knownLocations = [];

//define known categeries
let knownCategories = [];

//authors
let knownAuthors = [];

async function loadKnownFilters(prisma) {
  knownLocations = (
    await prisma.post.findMany({
      select: { location: true },
      distinct: ['location'],
    })
  ).map((p) => p.location.toLowerCase());

  knownCategories = (
    await prisma.post.findMany({
      select: { category: true },
      distinct: ['category'],
    })
  ).map((p) => p.category.toLowerCase());
  knownAuthors = [];
  const users = await prisma.post.findMany({
    select: {
      user: {
        select: { first_name: true, last_name: true },
      },
    },
  });
  users.forEach((u) => {
    knownAuthors.push(u.user.first_name.toLowerCase());
    knownAuthors.push(u.user.last_name.toLowerCase());
  });
  knownAuthors = Array.from(new Set(knownAuthors));
}

/**
 * Classify tokens into locations, categories, author and other
 * @param {*} tokens - array of tokens to be classified
 * @returns an object with three tokens: locations, categories, and other containing arrays of tokens
 */
function classifyTokens(tokens) {
  const locationTokens = tokens?.filter((token) =>
    knownLocations.includes(token)
  );
  const categoryTokens = tokens?.filter((token) =>
    knownCategories.includes(token)
  );
  const otherTokens = tokens?.filter(
    (token) =>
      !knownLocations.includes(token) && !knownCategories.includes(token)
  );

  const authorTokens = tokens?.filter((token) => knownAuthors.includes(token));
  return {
    locationTokens,
    categoryTokens,
    otherTokens,
    authorTokens,
  };
}

module.exports = { classifyTokens, loadKnownFilters };
