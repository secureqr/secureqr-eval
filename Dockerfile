# dockerfile for a nodejs/mongo container
#
# BUILD-USING: docker build -t secureqr_node_eval - < Dockerfile
#
# RUN-USING: docker run -t -i \
#                -v /home/thomas/workspace/secureqr-eval:/var/www:rw \
#                --rm --volumes-from DATA_EVAL \
#                -p 80:3000 secureqr_node_eval:latest /bin/bash
#
#
# VERSION 1.0
#

# use the ubuntu base image from dotCloud
FROM ubuntu

MAINTAINER Thomas Rieder, thomas@rieder.io

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

RUN apt-get -y update
RUN apt-get install -y python-software-properties vim git

# Add nodejs repo
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get -y update

# Install nodejs
RUN apt-get install -y nodejs

# Install latest stable version of mongo
RUN apt-get install -y mongodb-10gen
RUN mkdir -p /data/db

RUN npm install forever -g

RUN mkdir -p /var/docker

EXPOSE 3001

ENTRYPOINT mongod --fork --logpath /var/docker/log/mongodb.log --dbpath /var/docker/mongod/ && cd /var/www && npm install && forever -w -l /var/docker/log/node.log -o /var/docker/log/node.stdout -e /var/docker/log/node.stderr -f start bin/www
