const redis = require('redis');
const { promisify } = require('util');

require('dotenv').config();
// Create a Redis client
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || '127.0.0.1',
//   port: process.env.REDIS_PORT || 6379,
//   password: process.env.REDIS_PASSWORD || '',
// });


const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD || '',
  socket: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379
  }
});

// Promisify Redis client methods for async/await
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Event listeners for Redis client

redisClient.connect();
redisClient.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = {
  redisClient,
  getAsync,
  setAsync,
};
