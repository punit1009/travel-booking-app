# Travel Booking Application

A modern, responsive travel booking platform built with React, TypeScript, and Material-UI. Discover and book amazing travel destinations and packages across India.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/overview)

## 🌟 Features

- 🏨 Browse and search travel destinations
- ✈️ View and book travel packages
- 🔍 Advanced search with filters
- 🔐 User authentication (login/register)
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🎨 Modern UI with smooth animations

## 🚀 Live Demo

Check out the live demo: [Travel Booking App](https://effulgent-caramel-2a4dea.netlify.app/)

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Material-UI (MUI) v5
  - React Router v6
  - React Query (TanStack Query)
  - Framer Motion (for animations)
  - Vite (build tool)
  - Axios (HTTP client)

- **Deployment**:
  - Netlify
  - GitHub Actions (CI/CD)

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/travel-booking-app.git
cd travel-booking-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_URL=http://localhost:3001/api
# Add other environment variables as needed
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🧩 Project Structure

```
src/
├── assets/           # Static assets (images, icons, etc.)
├── components/       # Reusable UI components
│   ├── auth/        # Authentication components
│   ├── common/      # Common components (Header, Footer, etc.)
│   ├── destinations/ # Destination-related components
│   └── packages/    # Package-related components
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services and utilities
├── theme/           # MUI theme configuration
└── types/           # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)

## 📧 Contact

For any questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com)
