import { NextFunction, Response, Request } from 'express';
import { AuthenticationService } from '../../../usecases/authentication';
import { RequestWithAccessPermission } from '../../../interfaces';

export async function authMiddleware(request: RequestWithAccessPermission, response: Response, next: NextFunction) {
  const token = request.get("Authorization") as string;
  if (!token) {
    next(new Error("auth token does not exist."));
  }

  try {
    const userAccess = await (new AuthenticationService).verify(token, request.accessPermission);

    request["user"] = userAccess.user;
    next();

  } catch (error: any) {
    return response.status(401).send({ error: error.message || "worng auth token" });
  }
}
