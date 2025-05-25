FROM node:18

# Instala netcat (versión openbsd)
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000

CMD ["sh", "./init.sh"]