FROM node:10

RUN apt-get update && \
    apt-get clean


# Create working directory for app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json /usr/src/app/package.json
RUN yarn install

# Copy app
COPY . /usr/src/app

