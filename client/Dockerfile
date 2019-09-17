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


# Multistage is curently not supported on centos.
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM tiangolo/node-frontend:10 as buildstage
#WORKDIR /app

#COPY package*.json /app/
#RUN npm install

#COPY ./ /app/
#ARG configuration=production
#RUN npm run build -- --output-path=./dist/out --configuration $configuration
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#COPY --from=buildstage /app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=buildstage /nginx.conf /etc/nginx/conf.d/default.conf


