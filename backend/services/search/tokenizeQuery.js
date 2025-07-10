/**
 * This function tokenizes a query into a list of tokens.
 * @param {*} query - query to be tokenized
 * @returns tokenized query as a list of strings
 */

function tokenizeQuery(query) {
  return query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

module.exports = tokenizeQuery;
