//define known locations
const knownLocations = []; //fetch all locations from db?

//define known categeries
const knownCategories = []; //fetch all categories from db?

/**
 * Classify tokens into locations, categories, and other
 * @param {*} tokens - array of tokens to be classified
 * @returns an object with three tokens: locations, categories, and other containing arrays of tokens
 */
function classifyTokens(tokens) {
  const locationTokens = tokens.filter((token) =>
    knownLocations.includes(token)
  );
  const categoryTokens = tokens.filter((token) =>
    knownCategories.includes(token)
  );
  const otherTokens = tokens.filter(
    (token) =>
      !knownLocations.includes(token) && !knownCategories.includes(token)
  );
  return {
    locationTokens,
    categoryTokens,
    otherTokens,
  };
}

module.exports = classifyTokens;
