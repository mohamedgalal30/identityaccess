import { Request, Response, NextFunction, Router as ExpressRouter } from 'express';
import { Router, IRoute, RequestWithAccessPermission } from '../../../interfaces';


export function getExpressRouter(router: Router): ExpressRouter {
    const expressRouter = ExpressRouter();
    router.routes.forEach(route => {

        let middleware = [injectAccessPermissionToRequest(router, route)];
        if (route.middleware) middleware = [...middleware, ...route.middleware];
        expressRouter[route.method](`${route.path}`, ...middleware, makeHttpCb(route.handler));

    });

    return expressRouter;
}

function injectAccessPermissionToRequest(router: Router, route: IRoute) {
    return function (req: RequestWithAccessPermission, res: Response, next: NextFunction) {
        if (route.permission) {

            req.accessPermission = {
                service: route.service || router.service,
                resource: route.resource || router.resource,
                permission: route.permission,
            };

        }

        next()

    }
}


function makeHttpCb(action) {
    return function (req: Request, res: Response, next: NextFunction) {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            method: req.method,
            path: req.path,
            ip: req.ip,
            headers: {
                "Content-Type": req.get("Content-Type"),
                "Referer": req.get("Referer"),
                "User-Agent": req.get("User-Agent"),
                "Authorization": req.get("Authorization"),
            },
        };

        return action(httpRequest)
            .then(httpResponse => {
                const headers = {
                    'Content-Type': 'application/json',
                    ...httpResponse.headers
                }
                res.set(headers);

                res.type("json");

                return res.status(httpResponse.statusCode).send(httpResponse.body);
            })
            .catch(err => {
                const status = err.status || 500;
                const message = err.message || 'Something went wrong';

                console.log(err)
                return res.status(status).send({ error: message });

            });
    }
}