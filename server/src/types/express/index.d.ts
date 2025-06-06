// Import the IUser type from our models
import { IUser } from '../../models/User.js';

// Extend the Express types
declare global {
  namespace Express {
    // Extend the Request interface to include the user property
    interface Request {
      user?: IUser;
    }
    
    interface Response {
      status: (code: number) => this;
      json: (body: any) => this;
      send: (body?: any) => this;
      sendStatus: (code: number) => this;
    }
    
    interface NextFunction {
      (err?: any): void;
    }
    
    interface Application {
      use: (middleware: any) => any;
      listen: (port: number, callback?: () => void) => any;
    }
  }
}

// Declare the express module
declare const express: {
  (): any;
  json: () => any;
  urlencoded: (options: { extended: boolean }) => any;
  static: (root: string) => any;
};

export default express;
