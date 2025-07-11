//define known locations
let knownLocations = [];

//define known categeries
let knownCategories = [];

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
}

/**
 * Classify tokens into locations, categories, and other
 * @param {*} tokens - array of tokens to be classified
 * @returns an object with three tokens: locations, categories, and other containing arrays of tokens
 */
function classifyTokens(tokens) {
  console.log('classifyTokens', tokens);
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
  return {
    locationTokens,
    categoryTokens,
    otherTokens,
  };
}

module.exports = { classifyTokens, loadKnownFilters };
