import Redis from 'redis';

export class Cache {

    public redisClient = Redis.createClient()


    public getCacheData = async (_id:String):Promise<cacheData> => {
        try {
            await this.redisClient.connect();
            const cacheData:string|null = await this.redisClient.GET(`cacheData.${_id}`);
            console.log("Cache Hit");
            return cacheData;
        } catch (error) {
           throw error as Error;
        } finally {
            this.redisClient.quit();
        }
    };
    
    public setCacheData = async (_id:String, newCacheData:Object) => {
        try {
            await this.redisClient.connect();
            const cacheData = await this.redisClient.SET(`cacheData.${_id}`, JSON.stringify(newCacheData));
            await this.redisClient.expire(`cacheData.${_id}`,24*60*60);
            console.log("Cache Miss And Set");
            return cacheData;
        } catch (error) {
            throw error as Error;;
        } finally {
            this.redisClient.quit();
        }
    };
    
    public deleteCacheData = async (_id:String) => {
        try {
            await this.redisClient.connect();
            await this.redisClient.DEL(`cacheData.${_id}`);
            console.log("Delete Cache");
        } catch (error) {
            throw error as Error;;
        }finally{
            this.redisClient.quit();
        }
    };
    
}

