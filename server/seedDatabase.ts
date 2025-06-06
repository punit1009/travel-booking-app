import mongoose from 'mongoose';
import Destination from './models/Destination.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelBooking';

const sampleDestinations = [
  {
    name: 'Taj Mahal',
    state: 'Uttar Pradesh',
    category: 'Heritage',
    price: '1000',
    rating: 4.8,
    reviews: 12500,
    bestTime: 'October to March',
    highlights: ['UNESCO World Heritage', 'Sunrise Views', 'Mughal Architecture'],
    image: 'https://images.unsplash.com/photo-1564507592333-d6066eea46e6?w=800',
    description: 'An iconic white marble mausoleum and one of the New Seven Wonders of the World.'
  },
  {
    name: 'Kerala Backwaters',
    state: 'Kerala',
    category: 'Nature',
    price: '2500',
    rating: 4.7,
    reviews: 8900,
    bestTime: 'September to March',
    highlights: ['Houseboat Stay', 'Lush Greenery', 'Traditional Food'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
    description: 'A network of brackish lagoons and lakes lying parallel to the Arabian Sea coast.'
  },
  {
    name: 'Golden Temple',
    state: 'Punjab',
    category: 'Spiritual',
    price: 'Free',
    rating: 4.9,
    reviews: 15000,
    bestTime: 'November to March',
    highlights: ['Community Kitchen', 'Golden Dome', 'Spiritual Experience'],
    image: 'https://images.unsplash.com/photo-1588677011221-97e1e6e794de?w=800',
    description: 'The holiest Gurdwara of Sikhism, known for its stunning golden architecture.'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Destination.deleteMany({});
    console.log('🗑️  Cleared existing destinations');

    // Insert sample data
    const createdDestinations = await Destination.insertMany(sampleDestinations);
    console.log(`🌱 Seeded ${createdDestinations.length} destinations`);

    console.log('✨ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
