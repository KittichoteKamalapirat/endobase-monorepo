FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

ARG ENV_FILE=.env
COPY $ENV_FILE .env

ENV PORT=80
ENV NODE_ENV production

# Print the environment variable
RUN echo "Using environment file: $ENV_FILE"

EXPOSE 80
# required for docker desktop port mapping

CMD ["yarn", "prod-start"]