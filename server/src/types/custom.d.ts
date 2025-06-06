// Custom type definitions for third-party modules

// Import the IUser type from our models
import { IUser } from '../models/User.js';

// Extend the Express types
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

// Declare the express module
declare module 'express' {
  import { Application, Request, Response, NextFunction } from 'express-serve-static-core';
  
  interface Express extends Application {}
  
  interface ExpressRequest extends Request {}
  interface ExpressResponse extends Response {}
  interface ExpressNextFunction extends NextFunction {}
  
  function express(): Application;
  
  namespace express {
    function json(): any;
    function urlencoded(options: { extended: boolean }): any;
    function static(root: string): any;
  }
  
  export = express;
}
