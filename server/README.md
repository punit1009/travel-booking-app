# Travel Booking API Server

This is the backend server for the Travel Booking application, built with Node.js, Express, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- MongoDB (local or MongoDB Atlas)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TravelBooking/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the configuration values as needed
   ```bash
   copy .env.example .env
   ```

4. **Run the setup script** (Windows)
   ```bash
   setup.bat
   ```
   
   Or on Unix-based systems:
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run seed` - Run database seed script

## API Endpoints

### Destinations

- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/popular` - Get popular destinations
- `GET /api/destinations/category/:category` - Get destinations by category
- `GET /api/destinations/:id` - Get a single destination by ID
- `POST /api/destinations` - Create a new destination (Admin only)
- `PUT /api/destinations/:id` - Update a destination (Admin only)
- `DELETE /api/destinations/:id` - Delete a destination (Admin only)

### Packages

- `GET /api/packages` - Get all packages
- `GET /api/packages/top-selling` - Get top-selling packages
- `GET /api/packages/luxury` - Get luxury packages
- `GET /api/packages/:id` - Get a single package by ID
- `POST /api/packages` - Create a new package (Admin only)
- `PUT /api/packages/:id` - Update a package (Admin only)
- `DELETE /api/packages/:id` - Delete a package (Admin only)

## Environment Variables

See `.env.example` for all available environment variables.

## Database

The application uses MongoDB. You can use a local MongoDB instance or MongoDB Atlas.

## Testing

To run tests:

```bash
npm test
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
