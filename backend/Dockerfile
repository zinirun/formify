FROM node:14

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN apt-get update
RUN apt install yarn -y
RUN npm install -g pm2

RUN ln -sf /usr/share/zoneinfo/Asiz/Seoul /etc/localtime

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN yarn install

COPY . .

ENV TZ Asia/Seoul

ENTRYPOINT ["sh", "/usr/src/app/docker-entrypoint.sh"]