FROM node:16

ENV MONGO_URI=mongodb://thebigdataafrica:2%40Muccinex%2a%2a@155.133.23.216:29019/TheBigDataAfrica?authSource=admin
# ENV PORT='${{ secrets.PORT }}'

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
