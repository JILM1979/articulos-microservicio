#FROM node:18

# Instala netcat (versión openbsd)
#RUN apt-get update && apt-get install -y netcat-openbsd

#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#EXPOSE 4000

#CMD ["sh", "./init.sh"]

FROM node:18

# Instala netcat (útil para esperar servicios, como la DB)
#RUN apt-get update && apt-get install -y netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd postgresql-client

WORKDIR /app

# Copia y instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto de escucha (opcional en Railway, pero está bien)
#EXPOSE 4000

# Comando de arranque
CMD ["sh", "./init.sh"]

