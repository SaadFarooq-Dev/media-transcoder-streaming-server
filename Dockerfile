# # Node.js base image
# FROM node:20.13-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# RUN npm install

# RUN apt-get update && apt-get install -y ffmpeg

# # Bundle app source
# COPY . .

# # Expose the port the app runs in
# EXPOSE 3000

# # Serve the app
# CMD [ "npm", "start" ]

FROM node:20.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 4000

EXPOSE 4000

CMD ["npm", "start"]
