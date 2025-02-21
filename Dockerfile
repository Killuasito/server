FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENV PORT=3001
ENV MONGODB_URI=mongodb://127.0.0.1:27017/timo
ENV RAILWAY_STATIC_URL=http://localhost:3000

EXPOSE 3001

CMD ["npm", "start"]
