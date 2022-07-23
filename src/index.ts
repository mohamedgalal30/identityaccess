import 'dotenv/config';
import App from './adapters/http/server/app';
import mongoose from 'mongoose';
import { RedisClient } from "./adapters/redis-repo";
import { AuthenticationRouter, RoleRouter, UserRouter } from './adapters/http';


import { mongoUrl } from "./config/db";


mongoose.connect(mongoUrl);
RedisClient.Instance.connect();
const app = new App([
    new AuthenticationRouter(),
    new RoleRouter(),
    new UserRouter()
]);
app.start();



