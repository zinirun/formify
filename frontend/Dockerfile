FROM node:12 as builder
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json ./
COPY ./yarn.lock ./

RUN apt-get update
RUN apt install yarn -y
RUN yarn global add react-scripts@4.0.2
RUN yarn install
COPY . .
RUN yarn run build

# Production build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]