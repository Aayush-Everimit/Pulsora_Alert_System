# PulsoraClient/Dockerfile

FROM node:20-alpine
WORKDIR /app/pulsoraClient

# Copy package files first (from the nested folder)
COPY pulsoraClient/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY pulsoraClient .

# Expose Vite dev port
EXPOSE 5175

# Run Vite in dev mode
CMD ["npm", "run", "dev", "--", "--host"]
