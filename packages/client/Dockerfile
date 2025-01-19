FROM node:18-alpine

WORKDIR /app

COPY package.json .


RUN yarn install

COPY . .

# Set the environment variable for the port
ENV PORT=80
ENV NODE_ENV production

EXPOSE 80
# required for docker desktop port mapping

CMD ["yarn", "prod-start"]