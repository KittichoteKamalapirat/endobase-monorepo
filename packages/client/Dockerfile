FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

# Set the default environment variable
ARG ENV_FILE=.env

# Copy the specified .env file into the container
COPY $ENV_FILE .env

ENV NODE_ENV production

# Print the environment variable
RUN echo "Using environment file: $ENV_FILE"

EXPOSE 80
# required for docker desktop port mapping

CMD ["yarn", "prod-start"]