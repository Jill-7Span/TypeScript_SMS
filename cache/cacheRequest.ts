// import redis from 'redis';
// import { cacheData } from './cacheInterface';

// const redisClient = redis.createClient();

// const getCacheData = async (_id: String): Promise<cacheData> => {
//   try {
//     await redisClient.connect();
//     const cacheData: string | null = await redisClient.GET(`cacheData.${_id}`);
//     console.log('Cache Hit');
//     return cacheData;
//   } catch (error) {
//     throw error as Error;
//   } finally {
//     redisClient.quit();
//   }
// };

// const setCacheData = async (_id: String, newCacheData: Object) => {
//   try {
//     await redisClient.connect();
//     const cacheData = await redisClient.SET(`cacheData.${_id}`, JSON.stringify(newCacheData));
//     await redisClient.expire(`cacheData.${_id}`, 24 * 60 * 60);
//     console.log('Cache Miss And Set');
//     return cacheData;
//   } catch (error) {
//     throw error as Error;
//   } finally {
//     redisClient.quit();
//   }
// };

// const deleteCacheData = async (_id: String) => {
//   try {
//     await redisClient.connect();
//     await redisClient.DEL(`cacheData.${_id}`);
//     console.log('Delete Cache');
//   } catch (error) {
//     throw error as Error;
//   } finally {
//     redisClient.quit();
//   }
// };

// export { getCacheData, setCacheData, deleteCacheData };
