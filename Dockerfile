FROM node:10-alpine

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV production

CMD [ "yarn", "start" ]
