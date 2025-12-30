FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose frontend dev server port
EXPOSE 3000

# Start frontend
CMD ["npm", "start"]
