apt-get update
#get vim, wget, curl
apt-get install -y vim
apt-get install -y wget
apt-get install -y curl

#get docker
wget -qO- https://get.docker.com/ | sh

#get docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

echo Host system initialized successfully.