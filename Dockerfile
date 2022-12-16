FROM --platform=linux/amd64 node:18.9.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencie
COPY package.json ./
COPY ./packages/server/package.json ./packages/server/
COPY yarn.lock ./
   
#install all the packages
RUN yarn install --network-timeout 100000 

COPY ./packages/server ./packages/server

COPY ./packages/server/.env.production ./packages/server/.env

WORKDIR ./packages/server
RUN yarn build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/main.js" ]
USER node  