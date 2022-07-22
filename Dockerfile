# Use the official Node runtime as a parent image
FROM node:16.13-bullseye

LABEL image.author="Mohamed Galal <mohamed.galal30@gmail.com>"

# Set the working directory to /app
WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .

EXPOSE 8080

EXPOSE 9229



# Run app.js when the container launches
# CMD node --inspect=0.0.0.0:9229 ./dist/index.js
# CMD npm start
