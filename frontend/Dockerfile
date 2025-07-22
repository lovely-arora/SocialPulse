FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept and use the VITE_API_URL build arg
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Expose Vite dev server port
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
