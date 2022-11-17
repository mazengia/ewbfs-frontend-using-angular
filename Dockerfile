FROM node:16-alpine3.14 as build
RUN npm install -g @angular/cli
#RUN npm install -g npm@8.5.3
RUN npm install -g npm@8.15.0
WORKDIR /usr/src/app
ARG config=staging
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build --configuration ${config}
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/enat-bank-sira /usr/share/nginx/html
