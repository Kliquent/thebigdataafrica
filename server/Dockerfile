FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

# If you are building your code for production
RUN yarn install --production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]
