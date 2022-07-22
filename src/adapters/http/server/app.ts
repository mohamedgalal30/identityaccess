import * as bodyParser from 'body-parser';
import express from 'express';
import { Router } from '../../../interfaces/route.interface';

import { getExpressRouter } from "./express-router-callback";

class App {
    public app: express.Application;

    constructor(routers: Router[]) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRouters(routers);
    }

    public start() {
        this.app.listen(process.env.APP_PORT, () => {
            console.log(`App listening on the port ${process.env.APP_PORT || 8080}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }


    private initializeRouters(routers: Router[]) {
        routers.forEach((router) => {
            this.app.use(router.prefix, getExpressRouter(router));
        });
    }
}

export default App;

