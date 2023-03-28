import * as redis from "redis";

export class Redis {

    public redisConfig: any;
    public client: any;

    constructor() {

        this.redisConfig = {
            redisUrl: process.env.REDIS_URL,
            redisPort: process.env.REDIS_PORT,
        };
        this.getClient(this.redisConfig);
    }

    public async getClient(config: any) {

        if (config.redisUrl) {

            this.client = redis.createClient();

            this.client.connect().then(() => {
                console.log("redis connected---------");
            });

            this.client.on("error", (err: any) => {
                console.log(err, '-----err-----');
            });

            this.client.on("Redis monitor", (time, args) => {
                console.log(`${time}: ${args}`);
            });

            this.client.hget = async (set: string, key: string) => {
                try {
                    return await this.client.hGet(set, key)
                } catch (error) {
                    console.log(error, '--------err-------');
                    return error
                }
            }

            this.client.hset = async (set: string, key: string, value: string) => {
                try {
                    console.log(key, "========hset----------", value);

                    return await this.client.hSet(set, key, value)
                } catch (error) {
                    console.log(error, '--------err-------');
                    return error
                }
            }

        }
        return this.client;
    }

}