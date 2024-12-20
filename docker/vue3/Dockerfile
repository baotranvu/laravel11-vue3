# Step 1: Use Node.js to build the app
FROM node:18-alpine AS build
WORKDIR /app

# Copy only the package.json and lock file first for efficient caching
COPY src/vue3-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Vue 3 app source code
COPY src/vue3-app ./

# Build the Vue 3 app
RUN npm run build

# Step 2: Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
