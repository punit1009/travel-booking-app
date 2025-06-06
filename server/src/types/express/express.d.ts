// Type definitions for Express
import { type IUser } from '../../models/User.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

// Ensure this file is treated as a module
export {};
