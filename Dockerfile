FROM node:16

WORKDIR /project

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]