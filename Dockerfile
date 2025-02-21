FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar env primeiro
COPY .env ./

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar o resto dos arquivos
COPY . .

# Garantir que a pasta uploads existe
RUN mkdir -p uploads

EXPOSE 3001

CMD ["npm", "start"]
