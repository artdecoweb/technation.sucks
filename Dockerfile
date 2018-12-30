FROM node:10-alpine

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

RUN yarn b

ENV NODE_ENV production

CMD [ "yarn", "start" ]
