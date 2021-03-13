dockerize -wait tcp://db:3306 -timeout 20s
yarn build
mv ecosystem.config.js dist
yarn start:prod