FROM node:14.18-alpine3.14 as builder

WORKDIR /app

COPY mcdui/package.json /app/package.json
COPY mcdui/angular.json /app/angular.json
RUN npm install

COPY mcdui/ /app/
RUN npm run prod-build

FROM nginx:1.17.1-alpine

COPY --from=builder /app/dist/mcd-discount /usr/share/nginx/html
RUN chown nginx:nginx /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
