# => Build container
FROM node:16.13-alpine3.14 as build

WORKDIR /app

COPY package.json .

COPY . .

RUN yarn install && \
    yarn build

# RUN ls -lth

FROM nginx:alpine

WORKDIR /app

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

RUN mkdir -p /etc/nginx/logs/ && \
    touch /etc/nginx/logs/static.log

EXPOSE 80
