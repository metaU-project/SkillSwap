/**
 * Represents a single node in the Trie data structure.
 * Each node contains references to child nodes and metadata about stored sentences.
 *
 * @class TrieNode
 * @since 1.0.0
 * @example
 * const node = new TrieNode();
 * node.children['a'] = new TrieNode();
 */
class TrieNode {
  /**
   * Creates a new TrieNode instance.
   *
   * @constructor
   * @memberof TrieNode
   */
  constructor() {
    /** @type {Object.<string, TrieNode>} Map of characters to child nodes */
    this.children = {};

    /** @type {boolean} Indicates if this node represents the end of a complete sentence */
    this.isEnd = false;

    /** @type {string|null} The complete sentence stored at this node (if isEnd is true) */
    this.sentence = null;

    /** @type {number} The frequency/weight of this sentence for ranking suggestions */
    this.frequency = 0;
  }
}

/**
 * A Trie (prefix tree) data structure optimized for autocomplete and text suggestions.
 * Stores sentences and provides efficient prefix-based search with frequency ranking.
 *
 * @class Trie
 * @since 1.0.0
 * @example
 * const trie = new Trie();
 * trie.insert("JavaScript programming", 5);
 * trie.insert("Java development", 3);
 * const suggestions = trie.getSuggestions("Java"); // Returns both sentences, ranked by frequency
 */
class Trie {
  /**
   * Creates a new Trie instance with an empty root node.
   *
   * @constructor
   * @memberof Trie
   */
  constructor() {
    /** @type {TrieNode} The root node of the trie */
    this.root = new TrieNode();
  }

  /**
   * Inserts a sentence into the trie with an optional frequency weight.
   * If the sentence already exists, its frequency is incremented.
   *
   * @param {string} sentence - The sentence to insert into the trie
   * @param {number} [freq=1] - The frequency weight for ranking (default: 1)
   * @throws {TypeError} When sentence is not a string
   * @example
   * trie.insert("machine learning", 10);
   * trie.insert("machine learning", 5); // frequency becomes 15
   */
  insert(sentence, freq = 1) {
    let node = this.root;
    for (const char of sentence.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
    node.sentence = sentence;
    node.frequency += freq;
  }

  /**
   * Retrieves autocomplete suggestions for a given prefix.
   * Results are sorted by frequency in descending order.
   *
   * @param {string} prefix - The prefix to search for
   * @returns {string[]} Array of matching sentences sorted by frequency (highest first)
   * @example
   * const suggestions = trie.getSuggestions("prog");
   * // Returns: ["programming languages", "program design", "progressive web apps"]
   */
  getSuggestions(prefix) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this._collect(node);
  }

  /**
   * Private method to collect all sentences from a given node and its descendants.
   * Performs depth-first traversal to gather all complete sentences.
   *
   * @private
   * @param {TrieNode} node - The starting node for collection
   * @param {Array<{sentence: string, freq: number}>} [results=[]] - Accumulator for results
   * @returns {string[]} Array of sentences sorted by frequency in descending order
   */
  _collect(node, results = []) {
    if (node.isEnd) {
      results.push({ sentence: node.sentence, freq: node.frequency });
    }
    for (const char in node.children) {
      this._collect(node.children[char], results);
    }
    return results.sort((a, b) => b.freq - a.freq).map((r) => r.sentence);
  }
}

module.exports = Trie;
