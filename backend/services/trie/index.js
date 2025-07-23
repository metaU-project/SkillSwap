const Trie = require('./Trie');
const Fuse = require('fuse.js');

let trie = new Trie();
let fuse;
let allSentences = [];

/**
 * Build a trie from the given data (posts and categories)
 * @param {*} posts - array of posts
 * @param {*} categories - array of categories
 * @returns void
 */
function buildTrieFromData(posts = [], categories = []) {
  const phrases = [];
  posts.forEach((post) => {
    phrases.push(post.title);
    phrases.push(post.description);
    phrases.push(post.location);
    trie.insert(post.title, 1);
    trie.insert(post.description, 1);
    trie.insert(post.location, 1);
  });
  categories.forEach((category) => {
    phrases.push(category);
    trie.insert(category, 2);
  });
  allSentences = [...new Set(phrases)];

  fuse = new Fuse(allSentences, {
    threshold: 0.6,
    includeScore: true,
  });
}

/**
 * Get suggestions from the trie
 * @param {*} query - the query to search for suggestions
 * @returns array of suggestions
 */

function getSuggestions(query) {
  const trieResults = trie.getSuggestions(query);
  if (trieResults.length > 0) {
    return trieResults.slice(0, 8);
  }
  const fuseResults = fuse.search(query).map((result) => result.item);
  return fuseResults.slice(0, 8);
}

module.exports = {
  trie,
  buildTrieFromData,
  getSuggestions,
};
