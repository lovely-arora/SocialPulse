FROM node:20

# Set non-interactive mode to avoid tzdata issues
ENV DEBIAN_FRONTEND=noninteractive

# Install netcat (package is usually `netcat-openbsd`)
RUN apt update && apt install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for.sh .
RUN chmod +x wait-for.sh
CMD ["./wait-for.sh", "db", "3306", "npm", "run", "dev"]
#Remove this wait for sh file once health check is enabled in docker compose file 

