const tokenizeQuery = require('./tokenizeQuery');
const Fuse = require('fuse.js');

let knownLocations = [];
let knownCategories = [];
let knownAuthors = [];

let locationFuse = null;

async function loadKnownFilters(prisma) {
  knownLocations = (
    await prisma.post.findMany({
      select: { location: true },
      distinct: ['location'],
    })
  ).map((p) => p.location.toLowerCase());

  locationFuse = new Fuse(knownLocations, {
    includeScore: true,
    threshold: 0.5,
  });

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

function extractLocationTokens(rawQuery) {
  const results = locationFuse.search(rawQuery.toLowerCase());
  return results.filter((r) => r.score < 0.5).map((r) => r.item);
}

/**
 * Classify tokens into locations, categories, author and other
 * @param {*} rawQuery - raw query string
 * @returns an object with three tokens: locations, categories, and other containing arrays of tokens
 */

function classifyTokens(rawQuery) {
  const locationTokens = extractLocationTokens(rawQuery);

  let strippedQuery = rawQuery.toLowerCase();
  for (const location of locationTokens) {
    const regex = new RegExp(`\\b${location}\\b`, 'gi');
    strippedQuery = strippedQuery.replace(regex, '');
  }

  const remainingTokens = tokenizeQuery(strippedQuery);
  const categoryTokens = remainingTokens?.filter((token) =>
    knownCategories.includes(token)
  );
  const otherTokens = remainingTokens?.filter(
    (token) =>
      !knownLocations.includes(token) &&
      !knownCategories.includes(token) &&
      !knownAuthors.includes(token)
  );

  const authorTokens = remainingTokens?.filter((token) =>
    knownAuthors.includes(token)
  );
  return {
    locationTokens,
    categoryTokens,
    otherTokens,
    authorTokens,
  };
}

module.exports = { classifyTokens, loadKnownFilters };
