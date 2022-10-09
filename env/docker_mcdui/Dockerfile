### Stage 1: build ###

FROM node:14.18-alpine3.14 as builder

RUN mkdir /app
WORKDIR /app

COPY angular/angular-app/package.json angular/angular-app/package-lock.json /app/angular-app/

RUN npm install --prefix angular-app

COPY angular/ /app

RUN npm run build --prefix angular-app -- --output-path=./dist/out



FROM nginx:1.15.7-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/angular-app/dist/out /usr/share/nginx/html
COPY ./env/docker_mcdui/nginx/nginx.conf /etc/nginx/conf.d/default.conf
