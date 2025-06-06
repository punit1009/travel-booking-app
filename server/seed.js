const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const Package = require('./models/Package');
require('dotenv').config();

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

const samplePackages = [
  {
    name: 'Golden Triangle Tour',
    destination: 'Delhi, Agra, Jaipur',
    duration: '6 Days / 5 Nights',
    price: '25,000',
    rating: 4.8,
    reviews: 1200,
    bestTime: 'October to March',
    highlights: ['Taj Mahal', 'Amber Fort', 'Qutub Minar'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    description: 'Explore the golden triangle of India covering Delhi, Agra, and Jaipur.',
    bestSeller: true,
    category: 'Cultural'
  },
  {
    name: 'Kerala Backwaters Houseboat',
    destination: 'Alleppey, Kerala',
    duration: '3 Days / 2 Nights',
    price: '15,000',
    rating: 4.9,
    reviews: 980,
    bestTime: 'September to March',
    highlights: ['Houseboat Stay', 'Traditional Kerala Cuisine', 'Village Tours'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
    description: 'Experience the serene backwaters of Kerala in a traditional houseboat.',
    bestSeller: true,
    category: 'Nature'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Destination.deleteMany({}),
      Package.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    const createdDestinations = await Destination.insertMany(sampleDestinations);
    const createdPackages = await Package.insertMany(samplePackages);
    
    console.log(`🌱 Seeded ${createdDestinations.length} destinations`);
    console.log(`🎁 Seeded ${createdPackages.length} packages`);
    console.log('✨ Database seeding completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
