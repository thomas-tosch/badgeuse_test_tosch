FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY angular.json /usr/src/app/angular.json
COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm install -g @angular/cli
RUN npm rebuild node-sass

COPY . /usr/src/app

CMD npm install && ng serve --host 0.0.0.0 --prod

RUN npm rebuild node-sass
