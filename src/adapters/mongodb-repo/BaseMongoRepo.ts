import { Types } from "mongoose";


export abstract class BaseMongoRepo {
    async nextIdentity(): Promise<string> {
        return new Types.ObjectId().toString();
    }
}