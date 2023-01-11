# Stage 1

FROM node:14.18-alpine3.14 as build-step

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN rm -rf node_modules
RUN rm package-lock.json
RUN npm cache clear --force
RUN npm install
# COPY . /app
RUN npm run build --prod
# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/mcd-discount /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/