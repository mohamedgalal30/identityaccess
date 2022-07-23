import { HttpError } from './HttpError';

export class AuthorizationError extends HttpError {
  constructor(message: string) {
    super(403, message || "You're not authorized");
  }
}

