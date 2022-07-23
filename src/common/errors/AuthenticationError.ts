import { HttpError } from './HttpError';

export class AuthenticationError extends HttpError {
  constructor(message: string) {
    super(401, message || "You're not authenticated");
  }
}

