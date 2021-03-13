dockerize -wait tcp://db:3306 -timeout 20s
yarn build
mv ecosystem.config.json dist
yarn start:prod