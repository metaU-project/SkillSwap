//test for geo.js

const { getCoordinates, harvesineDistance } = require('../services/search/geo');

(async () => {
  console.log('Starting geo tests');

  Promise.all([getCoordinates('Menlo Park'), getCoordinates('San Francisco')])
    .then((results) => {
      const loc1 = results[0];
      const loc2 = results[1];
      console.log('Menlo Park', loc1);
      console.log('San Francisco', loc2);
      const distance = harvesineDistance(
        loc1.latitude,
        loc1.longitude,
        loc2.latitude,
        loc2.longitude
      );
      console.log('Distance', distance, 'km');
    })
    .catch((err) => {
      console.log('Error', err);
    });
})();
