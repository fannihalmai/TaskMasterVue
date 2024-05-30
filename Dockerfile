# Use the official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /usr/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (for React, Angular, Vue, etc.)
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080

# Command to run the app
CMD ["npm", "run", "serve"]
