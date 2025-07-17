/**
 * Category clusters for skill classification and similarity matching
 * Used for grouping related skills and improving search relevance
 *
 * @constant {Object} CATEGORY_CLUSTERS
 * @since 1.0.0
 */
const CATEGORY_CLUSTERS = {
  Tech: [
    'Web Development',
    'Mobile Development',
    'SQL',
    'Data Science',
    'Python',
    'JavaScript',
    'Machine Learning',
    'Cloud Computing',
    'Cybersecurity',
  ],

  'Creative Arts': [
    'Drawing',
    'Painting',
    'Photography',
    'Graphic Design',
    'Music Production',
    'Singing',
    'Dance',
    'Video Editing',
  ],

  'Communication & Social': [
    'Public Speaking',
    'Negotiation',
    'Debating',
    'Interviewing',
    'Storytelling',
    'Networking',
  ],

  'Business & Productivity': [
    'Marketing',
    'Finance',
    'Entrepreneurship',
    'Excel',
    'Project Management',
    'Notion',
    'Business Strategy',
  ],

  'Language & Culture': [
    'Spanish',
    'French',
    'Mandarin',
    'Arabic',
    'English Tutoring',
    'Sign Language',
    'Cultural Exchange',
  ],

  'Wellness & Lifestyle': [
    'Cooking',
    'Fitness',
    'Yoga',
    'Meditation',
    'Nutrition',
    'Mental Health',
    'Healthy Habits',
  ],

  'Academic Support': [
    'Math',
    'Physics',
    'Chemistry',
    'Essay Writing',
    'Exam Prep',
    'College Applications',
  ],

  Other: [],
};

/**
 *
 * @param {*} a - string
 * @param {*} b - string
 * @returns {number} - similarity score between 0 and 1
 */

function fuzzMatch(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a.includes(b) || b.includes(a)) {
    return 1;
  }
  if (a.split('').some((c) => b.includes(c))) {
    return 0.5;
  }
  return 0;
}

/**
 * Returns the domain of a category
 * @param {*} category - string
 * @returns {string} - domain of the category
 */
function getDomain(category) {
  for (const domain in CATEGORY_CLUSTERS) {
    if (CATEGORY_CLUSTERS[domain].includes(category)) {
      return domain;
    }
  }
  return 'Other';
}

/**
 *  Returns a score between 0 and 3 based on the similarity of the domains of the post and liked categories
 * @param {*} postCategory  - string
 * @param {*} likedCategory  - string
 * @returns {number} - score between 0 and 3
 */
function getDomainScore(postCategory, likedCategory) {
  const postDomain = getDomain(postCategory);
  const likedDomain = getDomain(likedCategory);
  if (postDomain === likedDomain) {
    if (postCategory === likedCategory) {
      return 3;
    }
    return 2;
  }
  const fuzzy = fuzzMatch(postCategory, likedCategory);
  if (fuzzy > 0) {
    return 1;
  }
  return 0;
}

module.exports = {
  CATEGORY_CLUSTERS,
  getDomainScore,
  getDomain,
  fuzzMatch,
};
