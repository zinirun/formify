docker rm -f  $(docker ps -a -q)
docker rmi -f $(docker images -q)
rm -rf formify
git clone https://github.com/zinirun/formify
cp conf/root.env formify/.env
cp conf/backend.env formify/backend/.env
cp conf/ormconfig.json formify/backend/
cd formify; docker-compose up -d --build