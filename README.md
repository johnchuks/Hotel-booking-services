[![Build Status](https://travis-ci.com/johnchuks/Loyalty-program-backend-challenge.svg?token=9A6KLhYaSrYZHmHD4CSZ&branch=master)](https://travis-ci.com/johnchuks/Loyalty-program-backend-challenge)


# Booking Reservation Services
This is my solution to the booking reservation service built with a microservice architecture

### Installation
1. Clone the repository
  - https://github.com/johnchuks/Loyalty-program-backend-challenge.git
2. Make sure you are on the `master` branch
3. Ensure you have `docker` installed on your local machine. You can check this by running `docker --version`
4. Run `docker-compose build` to build the service images
5. Run `docker-compose up` to start up the containers for the services
6. To ensure all your containers are running, you can run `docker ps`
7. To remove all volumes and containers run `docker-compose down`

### Testing
1. You can test a service by running `docker-compose -f docker-compose-test.yml run test-customers`
