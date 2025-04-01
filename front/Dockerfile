# Use the official Node.js image as a base image
FROM node:23-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for Nuxt.js (optional)
RUN apk add --no-cache bash

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project files into the container
COPY . .

# Expose the port that Nuxt.js will run on (default Nuxt port is 3000)
EXPOSE 3000

# Set environment variable for Nuxt.js in development mode
ENV NODE_ENV=development

# Start the Nuxt.js development server, which includes hot reload
CMD ["npm", "run", "dev"]