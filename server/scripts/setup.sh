#!/bin/bash

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo ".env file created. Please update it with your configuration."
else
    echo ".env file already exists. Skipping creation."
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Run the seed script
echo "Running seed script..."
npm run seed

echo "Setup complete! You can now start the server with 'npm run dev'"
