import { Client } from 'redis-om'
import { redisUrl } from "../../config/db";

export class RedisClient {
    private static _instance: RedisClient;
    private client: Client;

    private constructor() {
        this.client = new Client()
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }


    async connect(): Promise<Client> {

        await this.client.open(redisUrl);

        const aString = await this.client.execute(['PING'])
        console.log('~ =========> redis connected successfuly.', aString)

        return this.client
    }

    getClient(): Client {
        return this.client
    }
}