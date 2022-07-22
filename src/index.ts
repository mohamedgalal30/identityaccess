import 'dotenv/config';
import App from './adapters/http/server/app';
import { AuthenticationRouter, RoleRouter, UserRouter } from './adapters/http';
import mongoose from 'mongoose';
import { url } from "./config/db";

const app = new App([
    new AuthenticationRouter(),
    new RoleRouter(),
    new UserRouter()
]);

mongoose.connect(url);

app.start();