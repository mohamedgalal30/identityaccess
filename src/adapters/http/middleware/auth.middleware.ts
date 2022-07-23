import { NextFunction, Response, Request } from 'express';
import { AuthenticationService } from '../../../usecases/authentication';
import { RequestWithAccessPermission } from '../../../interfaces';

export async function authMiddleware(request: RequestWithAccessPermission, response: Response, next: NextFunction) {
  const token = request.get("Authorization") as string;
  if (!token) {
    next(new Error("auth token does not exist."));
  }

  try {
    const isValid = await (new AuthenticationService).verify(token, request.accessPermission);

    if (!isValid) {
      next(new Error("worng auth token"));
    }

    // request["user"] = user;
    next();

  } catch (error) {
    next(new Error("worng auth token"));
  }
}
