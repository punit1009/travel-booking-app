// Type definitions for Express
import { IUser } from './src/models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// This ensures the file is treated as a module
export {};
