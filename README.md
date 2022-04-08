# express-example
express-example

https://hub.docker.com/repository/docker/weeddew/express-example

sudo docker build . -t weeddew/express-example:v1.2

sudo docker push weeddew/express-example:v1.2

sudo docker run -p 3000:3000 -v /home/ec2-user/logs:/usr/src/app/logs -d weeddew/express-example:v1.2
