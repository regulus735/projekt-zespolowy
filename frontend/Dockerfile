# Base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the container
COPY . .

# Build your React app
RUN npm run build

# Set environment variable for React app
ENV REACT_APP_API_URL=https://localhost:7247

# Expose port 3000 for the application
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]