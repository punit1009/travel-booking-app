import express, { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import Package, { IPackage } from '../models/Package';

type SortQuery = {
  [key: string]: 1 | -1;
};

const router = express.Router();

// Get all packages with optional search, filter, and sort
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, sortBy, type } = req.query as {
      q?: string;
      sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'reviews';
      type?: 'bestSeller' | 'popular' | 'luxury';
    };
    
    // Build query
    const query: any = {};
    
    // Search by query string
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'cities': { $in: [new RegExp(q, 'i')] } }
      ];
    }

    // Filter by package type
    if (type && ['bestSeller', 'popular', 'luxury'].includes(type)) {
      query[type] = true;
    }

    // Build sort object
    const sort: SortQuery = { createdAt: -1 }; // Default sort by newest
    if (sortBy === 'price-asc') sort.price = 1;
    else if (sortBy === 'price-desc') sort.price = -1;
    else if (sortBy === 'rating') sort.rating = -1;
    else if (sortBy === 'reviews') sort.reviews = -1;

    const packages = await Package.find(query).sort(sort);
    res.json(packages);
  } catch (error) {
    next(error);
  }
});

// Get top selling packages (bestSeller or popular)
router.get('/top-selling', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const packages = await Package.find({
      $or: [{ bestSeller: true }, { popular: true }]
    }).limit(6);
    res.json(packages);
  } catch (error) {
    next(error);
  }
});

// Get luxury packages
router.get('/luxury', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const packages = await Package.find({ luxury: true }).limit(6);
    res.json(packages);
  } catch (error) {
    next(error);
  }
});

// Get a single package by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }
    
    const pkg = await Package.findById(id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(pkg);
  } catch (error) {
    next(error);
  }
});

// Create a new package (Admin only)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      duration,
      price,
      originalPrice,
      cities,
      rating,
      reviews,
      inclusions,
      highlights,
      image,
      description,
      bestSeller,
      popular,
      luxury
    } = req.body;

    const newPackage = new Package({
      title,
      duration,
      price,
      originalPrice,
      cities,
      rating,
      reviews,
      inclusions,
      highlights,
      image,
      description,
      bestSeller: bestSeller || false,
      popular: popular || false,
      luxury: luxury || false
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    next(error);
  }
});

// Update a package (Admin only)
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(updatedPackage);
  } catch (error) {
    next(error);
  }
});

// Delete a package (Admin only)
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }

    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
