FROM node:10

RUN apt-get update && \
    apt-get clean


# Create working directory for app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json /usr/src/app/package.json
RUN yarn install

COPY ./wait-for-it.sh /usr/src/app/wait-for-it.sh
# Make wait script an executable
RUN chmod +x /usr/src/app/wait-for-it.sh

# Copy app
COPY . /usr/src/app
