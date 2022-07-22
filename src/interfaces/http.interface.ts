import { Request } from "express";

// Http methods
export type THttpMethod = "get" | "post" | "put" | "patch" | "delete";

// Response
export interface IHttpResponse {
	statusCode: number;
	body: IHttpResponseBody;
}
export interface IHttpResponseBody {
	data?: [] | object | string | number;
	error?: any;
	success?: boolean;
	config?: object;
	[key: string]: any;
}

export interface IHttpRequestUser {
	id: string;
	fullname: string;
}
// Request
export interface IHttpHeaders {
	ContentType: string;
	Referer: string;
	UserAgent: string;
	Authorization: string;
}
export interface IHttpRequest {
	user?: IHttpRequestUser;
	body?: Record<string, any>;
	query?: Record<string, any>;
	params?: Record<string, any>;
	headers?: IHttpHeaders;
}

export interface RequestWithAccessPermission extends Request {
	accessPermission?: {
		service: string;
		resource: string;
		permission: string;
	}
}
