FROM node:latest

WORKDIR /app
RUN npm install -g @angular/cli
COPY . .
RUN npm install
ENTRYPOINT ng serve --host=0.0.0.0
