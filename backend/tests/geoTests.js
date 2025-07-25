//test for geo.js
const { getCoordinates, harvesineDistance } = require('../services/search/geo');

(async () => {
  console.log('Starting geo tests');

  try {
    const [loc1, loc2] = await Promise.all([
      getCoordinates('Menlo Park'),
      getCoordinates('San Francisco'),
    ]);

    if (!loc1 || !loc2) {
      console.log('Error: could not get coordinates');
      return;
    }
    const distance = harvesineDistance(
      loc1.latitude,
      loc1.longitude,
      loc2.latitude,
      loc2.longitude
    );
    console.log('Distance', distance, 'km');

    const expected = 45.0;
    const tolerance = 5;

    if (Math.abs(distance - expected) <= tolerance) {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  } catch (err) {
    console.log('Error', err);
  }
})();
