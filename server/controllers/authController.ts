import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';
import AppError from '../utils/appError';

// Extend the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Promisify the jwt.verify function
const verifyToken = async (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
};

const signToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '90d';
  
  return jwt.sign(
    { id },
    secret,
    { expiresIn } as SignOptions
  );
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Signup request body:', JSON.stringify(req.body, null, 2));
    const { name, email, password, confirmPassword } = req.body;

    // 1) Check if passwords match
    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }

    // 2) Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already in use', 400));
    }

    // 3) Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // 4) Generate token and send response
    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    
    // 2) Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Incorrect email or password', 401));
    }
    
    // 3) Check if password is correct
    const isPasswordCorrect = await user.correctPassword(password, user.password);
    if (!isPasswordCorrect) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2) Verification token
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = await verifyToken(token, secret) as JwtPayload;

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    (req as any).user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
