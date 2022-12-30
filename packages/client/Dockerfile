FROM node:18-alpine

WORKDIR /app

COPY package.json .


RUN yarn install

COPY . .

ENV NODE_ENV production

EXPOSE 443
# required for docker desktop port mapping

CMD ["yarn", "prod-start"]