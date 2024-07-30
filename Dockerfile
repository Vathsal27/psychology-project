FROM node:alpine3.19

WORKDIR /app

COPY package* .
RUN npm install

COPY . .

EXPOSE 4000

CMD ["node","server.js"]