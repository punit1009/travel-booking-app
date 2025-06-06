import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Configure environment variables
dotenv.config();

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import models using dynamic imports
const { default: Destination } = await import(path.join(__dirname, 'models/Destination.js'));
const { default: Package } = await import(path.join(__dirname, 'models/Package.js'));

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
  },
  {
    name: 'Goa',
    state: 'Goa',
    category: 'Beach',
    price: '₹3,000-5,000/day',
    rating: 4.5,
    reviews: 2845,
    bestTime: 'Nov-Mar',
    highlights: ['Beaches', 'Portuguese Heritage', 'Nightlife'],
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience the perfect blend of sun, sand, and Portuguese heritage in India\'s beach paradise.'
  },
  {
    name: 'Kerala Backwaters',
    state: 'Kerala',
    category: 'Nature',
    price: '₹2,500-4,000/day',
    rating: 4.7,
    reviews: 1892,
    bestTime: 'Oct-Mar',
    highlights: ['Houseboats', 'Ayurveda', 'Spice Gardens'],
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Cruise through serene backwaters on traditional houseboats in God\'s Own Country.'
  },
  {
    name: 'Rajasthan Royal Cities',
    state: 'Rajasthan',
    category: 'Heritage',
    price: '₹4,000-8,000/day',
    rating: 4.6,
    reviews: 3156,
    bestTime: 'Oct-Mar',
    highlights: ['Palaces', 'Desert Safari', 'Royal Heritage'],
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Step into the world of maharajas with majestic palaces and desert adventures.'
  },
  {
    name: 'Himachal Hill Stations',
    state: 'Himachal Pradesh',
    category: 'Mountains',
    price: '₹2,000-4,500/day',
    rating: 4.4,
    reviews: 2341,
    bestTime: 'Mar-Jun, Sep-Nov',
    highlights: ['Snow Mountains', 'Adventure Sports', 'Hill Stations'],
    image: 'https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Escape to the pristine beauty of the Himalayas with breathtaking mountain views.'
  },
  {
    name: 'Tamil Nadu Temples',
    state: 'Tamil Nadu',
    category: 'Spiritual',
    price: '₹1,800-3,500/day',
    rating: 4.3,
    reviews: 1675,
    bestTime: 'Nov-Mar',
    highlights: ['Ancient Temples', 'Classical Arts', 'South Indian Culture'],
    image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Discover the architectural marvels and spiritual heritage of South India.'
  },
  {
    name: 'Maharashtra Wine Country',
    state: 'Maharashtra',
    category: 'Wine & Food',
    price: '₹3,500-6,000/day',
    rating: 4.2,
    reviews: 987,
    bestTime: 'Oct-Feb',
    highlights: ['Wine Tasting', 'Hill Stations', 'Colonial Architecture'],
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Savor world-class wines and scenic hill stations in Maharashtra\'s wine country.'
  }
];

const samplePackages = [
  {
    title: 'Golden Triangle Tour',
    duration: '6 Days 5 Nights',
    price: '₹25,000',
    originalPrice: '₹35,000',
    cities: ['Delhi', 'Agra', 'Jaipur'],
    rating: 4.8,
    reviews: 1247,
    inclusions: ['AC Transport', '3* Hotels', 'Breakfast', 'Guide'],
    highlights: ['Taj Mahal', 'Red Fort', 'Hawa Mahal', 'Amber Fort'],
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
    bestSeller: true,
    description: 'Experience India\'s most iconic monuments in this classic heritage tour.'
  },
  {
    title: 'Kerala Backwater Paradise',
    duration: '4 Days 3 Nights',
    price: '₹18,000',
    originalPrice: '₹24,000',
    cities: ['Cochin', 'Alleppey', 'Kumarakom'],
    rating: 4.7,
    reviews: 856,
    inclusions: ['Houseboat Stay', 'All Meals', 'Airport Transfer', 'Ayurveda Spa'],
    highlights: ['Houseboat Stay', 'Spice Gardens', 'Ayurveda Spa', 'Backwater Cruise'],
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true,
    description: 'Unwind in the tranquil backwaters of Kerala with luxury houseboat experiences.'
  },
  {
    title: 'Rajasthan Royal Experience',
    duration: '8 Days 7 Nights',
    price: '₹45,000',
    originalPrice: '₹55,000',
    cities: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
    rating: 4.9,
    reviews: 1523,
    inclusions: ['Palace Hotels', 'Desert Camp', 'All Meals', 'Camel Safari'],
    highlights: ['Palace Hotels', 'Desert Safari', 'Lake Palace', 'Blue City'],
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
    luxury: true,
    description: 'Live like royalty in magnificent palaces and explore the golden deserts.'
  },
  {
    title: 'Goa Beach Bliss',
    duration: '5 Days 4 Nights',
    price: '₹22,000',
    originalPrice: '₹28,000',
    cities: ['North Goa', 'South Goa'],
    rating: 4.5,
    reviews: 1089,
    inclusions: ['Beach Resort', 'Water Sports', 'Breakfast', 'Airport Transfer'],
    highlights: ['Beach Resorts', 'Water Sports', 'Sunset Cruises', 'Portuguese Heritage'],
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true,
    description: 'Relax on pristine beaches and enjoy water sports in India\'s beach capital.'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelBooking';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Destination.deleteMany({}),
      Package.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert sample data
    const destinations = await Destination.insertMany(sampleDestinations);
    const packages = await Package.insertMany(samplePackages);
    
    console.log(`🌴 Seeded ${destinations.length} destinations`);
    console.log(`📦 Seeded ${packages.length} packages`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
