#!/usr/bin/env bash

DBHOST=localhost
DBNAME=feedback
DBUSER=dbuser
DBPASSWD=best4all
DBSCRIPT=/vagrant/db/db_setup.sql

echo "\nStart provisioning root stuff...\n"

apt-get update
apt-get install -y git-core curl apache2 debconf-utils

echo -e "\n--- Setting up MySQL...\n"
debconf-set-selections <<< "mysql-server mysql-server/root_password password $DBPASSWD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $DBPASSWD"

echo -e "\n--- Setting up our MySQL user and db ---\n"
mysql -uroot -p$DBPASSWD -e "CREATE DATABASE IF NOT EXISTS $DBNAME"
mysql -uroot -p$DBPASSWD -e "grant all privileges on $DBNAME.* to '$DBUSER'@'localhost' identified by '$DBPASSWD'"

apt-get install mysql-server -y

mysql -uroot -p$DBPASSWD $DBNAME < $DBSCRIPT