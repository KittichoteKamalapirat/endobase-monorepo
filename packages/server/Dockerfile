FROM --platform=linux/amd64 node:18.14.1


WORKDIR /usr/src/app

COPY package.json ./
COPY ./package.json ./

RUN yarn install --network-timeout 100000 

COPY ./ ./

WORKDIR /usr/src/app
RUN yarn build

# made env = showcase so not connect to COM_PORT
ENV NODE_ENV showcase

EXPOSE 8080

# USER node 
CMD [ "node", "dist/main.js" ]
