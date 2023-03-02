import Redis from 'redis';

export class Cache {

    public redisClient = Redis.createClient()


    getCacheData = async (_id:String):Promise<string | Error | null> => {
        try {
            await this.redisClient.connect();
            const cacheData:string|null = await this.redisClient.GET(`cacheData.${_id}`);
            console.log("Cache Hit");
            return cacheData;
        } catch (error) {
            return error as Error;
        } finally {
            this.redisClient.quit();
        }
    };
    
    setCacheData = async (_id:String, newCacheData:Object) => {
        try {
            await this.redisClient.connect();
            const cacheData = await this.redisClient.SET(`cacheData.${_id}`, JSON.stringify(newCacheData));
            await this.redisClient.expire(`cacheData.${_id}`,24*60*60);
            console.log("Cache Miss And Set");
            return cacheData;
        } catch (error) {
            return error;
        } finally {
            this.redisClient.quit();
        }
    };
    
    deleteCacheData = async (_id:String) => {
        try {
            await this.redisClient.connect();
            await this.redisClient.DEL(`cacheData.${_id}`);
            console.log("Delete Cache");
        } catch (error) {
            return error;
        }finally{
            this.redisClient.quit();
        }
    };
    
}

