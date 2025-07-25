import dotenv from 'dotenv';
dotenv.config();
import prisma from '../../prisma/client.js';

const memoryCache = new Map();

/**
 *  Geo.js - A utility for getting coordinates from a location
 * @param {*} location - The location to get coordinates for
 * @param {*} type - The type of location (post or user)
 * @returns - The coordinates of the location as an object with latitude and longitude properties
 */

export async function getCoordinates(location, type = 'post') {
  const key = `${type}-${location.toLowerCase()}`;

  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  const cachedResult = await prisma.locationCache.findUnique({
    where: { key },
  });

  if (cachedResult) {
    const coordinates = {
      latitude: cachedResult.latitude,
      longitude: cachedResult.longitude,
    };
    memoryCache.set(key, coordinates);
    return coordinates;
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&format=json&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const result =
      Array.isArray(data?.results) && data.results.length > 0
        ? data?.results[0]
        : null;
    if (!result) {
      return null;
    }
    const coordinates = {
      latitude: result.lat,
      longitude: result.lon,
    };

    await prisma.locationCache.upsert({
      where: { key },
      update: {},
      create: {
        key,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });

    memoryCache.set(key, coordinates);
    return coordinates;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 *  HarvesineDistance.js - A utility for calculating the distance between two coordinates using the Harvesine formula
 * @param {*} lat1 - The latitude of the first coordinate
 * @param {*} lon1 - The longitude of the first coordinate
 * @param {*} lat2 - The latitude of the second coordinate
 * @param {*} lon2 - The longitude of the second coordinate
 * @returns
 */

export function harvesineDistance(lat1, lon1, lat2, lon2) {
  const toRadian = (value) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}
