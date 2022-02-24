FROM node:14.16.0-alpine3.13
#the working directory in image
WORKDIR /app
# copy project files in image
COPY . .
# command to run first when our container will run
RUN npm install 
#for port assign
EXPOSE 5000 


