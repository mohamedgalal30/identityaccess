const {
    MONGODB_HOST,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_NAME,
    MONGODB_PORT,
    REDIS_HOST,
    REDIS_PORT,
} = process.env;

export const mongoUrl = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`
export const redisUrl = `redis://${REDIS_HOST}:${REDIS_PORT}`