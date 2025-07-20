# ----------- Stage 1: Build Vite App -----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy source files
    COPY . .
    
    # Optional: Pass build-time env vars (VITE_API_URL etc.)
    ARG VITE_API_URL
    ENV VITE_API_URL=$VITE_API_URL
    
    # Build the Vite app
    RUN npm run build
    
    
    # ----------- Stage 2: Serve with Nginx -----------
    FROM nginx:alpine
    
    # Copy built files to Nginx's web root
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Copy custom Nginx config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy SSL certificates (keep your cert.pem and key.pem in frontend/ssl/)
    COPY ssl /etc/nginx/ssl
    
    # Expose HTTPS and HTTP
    EXPOSE 443
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    