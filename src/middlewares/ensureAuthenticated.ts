import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // JWT token validation

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing.', 401);
  }

  /**
   * Splitting 'Bearer' from token
   * Use [type, token] to destructure token into two variables - type being Bearer and token being the token itself.
   * Type won't be used, so leave it empty with only a comma [, token]
   */

  const [, token] = authHeader.split(' ');

  // Use try/catch because verify() throws a different kind of error.

  try {
    // decoded will get the payload
    const decoded = verify(token, authConfig.jwt.secret);
    /**
     * decoded might be string or object
     * force it to have expected values by using 'as <interface>'
     */
    const { sub } = decoded as TokenPayload;

    /**
     * makes the user's id available on every route
     * it was necessary to modify the Response type in Express, check '@types/express.d.ts' folder
     */
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid token.', 401);
  }
}
