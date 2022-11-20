FROM node:16.17.0-alpine3.16

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
