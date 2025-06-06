import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import Destination from '../models/Destination';
import type { IDestination } from '../models/Destination';

interface SearchQuery {
  name?: { $regex: string; $options: string };
  state?: { $regex: string; $options: string };
  description?: { $regex: string; $options: string };
  $or?: Array<{
    [key: string]: { $regex: string; $options: string };
  }>;
  category?: string;
}

interface SortQuery {
  [key: string]: 1 | -1;
}

// Get all destinations with optional filtering and sorting
export const getAllDestinations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q, category, sortBy } = req.query as {
      q?: string;
      category?: string;
      sortBy?: string;
    };
    
    const query: SearchQuery = {};

    // Search by query string
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { state: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Build sort object
    const sort: SortQuery = {};
    if (sortBy === 'price-asc') sort.price = 1;
    else if (sortBy === 'price-desc') sort.price = -1;
    else if (sortBy === 'rating') sort.rating = -1;
    else sort.createdAt = -1; // Default sort by newest

    const destinations = await Destination.find(query).sort(sort);
    res.json(destinations);
  } catch (error) {
    next(error);
  }
};

// Get a single destination
export const getDestination = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid destination ID' });
      return;
    }
    
    const destination = await Destination.findById(id);
    if (!destination) {
      res.status(404).json({ message: 'Destination not found' });
      return;
    }
    
    res.json(destination);
  } catch (error) {
    next(error);
  }
};

// Create a new destination
export const createDestination = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      state,
      category,
      price,
      rating,
      reviews,
      bestTime,
      highlights,
      image,
      description
    } = req.body;

    const destination = new Destination({
      name,
      state,
      category,
      price,
      rating: Number(rating) || 0,
      reviews: Number(reviews) || 0,
      bestTime,
      highlights: Array.isArray(highlights) ? highlights : [highlights].filter(Boolean),
      image,
      description
    });

    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    next(error);
  }
};
