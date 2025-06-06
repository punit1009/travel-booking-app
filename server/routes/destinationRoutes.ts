import express, { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import Destination, { IDestination } from '../models/Destination';

const router = express.Router();

// Get all destinations with search, filter, and sort
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, category, sortBy } = req.query as {
      q?: string;
      category?: string;
      sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'reviews';
    };
    
    // Build query
    const query: any = {};
    
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
      query.category = { $regex: new RegExp(category, 'i') };
    }

    // Build sort object
    const sort: Record<string, 1 | -1> = { createdAt: -1 }; // Default sort by newest
    if (sortBy === 'price-asc') sort.price = 1;
    else if (sortBy === 'price-desc') sort.price = -1;
    else if (sortBy === 'rating') sort.rating = -1;
    else if (sortBy === 'reviews') sort.reviews = -1;

    const destinations = await Destination.find(query).sort(sort);
    res.json(destinations);
  } catch (error) {
    next(error);
  }
});

// Get popular destinations (highest rated)
router.get('/popular', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const destinations = await Destination.find()
      .sort({ rating: -1 })
      .limit(6);
    res.json(destinations);
  } catch (error) {
    next(error);
  }
});

// Get destinations by category
router.get('/category/:category', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;
    const destinations = await Destination.find({ 
      category: { $regex: new RegExp(category, 'i') } 
    });
    res.json(destinations);
  } catch (error) {
    next(error);
  }
});

// Get a single destination by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination ID' });
    }
    
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.json(destination);
  } catch (error) {
    next(error);
  }
});

// Create a new destination (Admin only)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
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

    const newDestination = new Destination({
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

    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    next(error);
  }
});

// Update a destination (Admin only)
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination ID' });
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(updatedDestination);
  } catch (error) {
    next(error);
  }
});

// Delete a destination (Admin only)
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination ID' });
    }

    const deletedDestination = await Destination.findByIdAndDelete(id);
    if (!deletedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
