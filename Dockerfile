# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Build args
ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and config files
COPY tsconfig.json ./
COPY knexfile.js ./
COPY src ./src
COPY migrations ./migrations
COPY seeds ./seeds
COPY views ./views
COPY public ./public

# Build TypeScript
RUN npm run build


# Production stage
FROM node:24-alpine AS runner

WORKDIR /app

# Build args
ARG RELEASE_VERSION
ENV RELEASE_VERSION=$RELEASE_VERSION
ENV NODE_ENV=production

# Copy package files
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files and runtime necessities
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/knexfile.js ./
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/seeds ./seeds
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/server.js"]