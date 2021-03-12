dockerize -wait tcp://db:3306 -timeout 20s
yarn build && yarn start:prod