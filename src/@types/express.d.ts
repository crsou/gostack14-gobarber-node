/**
 * redefining a library's types
 * adding user and user.id to Request type
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
