FROM nginx:alpine

RUN apk add npm git bash

RUN mkdir app
WORKDIR /app

COPY angular.json /app/angular.json
COPY package.json /app/package.json

RUN npm install
RUN npm install -g @angular/cli
RUN npm rebuild node-sass

COPY . /app

RUN ng build --prod

RUN cp -R ./dist/client/* /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
