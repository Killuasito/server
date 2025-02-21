FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm ci --only=production

COPY . .

EXPOSE ${PORT:-3001}

CMD ["npm", "start"]
