FROM node:16-alpine3.14 as build
RUN npm install -g @angular/cli
RUN npm install -g npm@8.5.5
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ewbfs-front-end /usr/share/nginx/html
