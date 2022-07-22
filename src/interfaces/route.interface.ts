import { THttpMethod, IHttpRequest, IHttpResponse } from "./http.interface";
import { RequestHandler } from 'express';

// Router
export interface IRoute {
	method: THttpMethod;
	path: string;
	handler: (req: IHttpRequest) => Promise<IHttpResponse>;
	middleware?: Array<RequestHandler>;
	service?: string;
	resource?: string;
	permission?: string;
}

export interface IRoutes extends Array<IRoute> { }


export interface Router {
	prefix: string;
	routes: IRoutes;
	service: string;
	resource: string;
}

