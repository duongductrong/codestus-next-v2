FROM node:14.17.3

WORKDIR /usr/www/html

COPY . /usr/www/html

RUN npm install

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]
