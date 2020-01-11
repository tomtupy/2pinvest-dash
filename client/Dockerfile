FROM node:12.2.0-alpine

# Add Maintainer Info
LABEL maintainer="Tom Tupy <tomtupy@gmail.com>"

# set working directory
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

# start app
CMD ["npm", "start"]