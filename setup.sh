#!/bin/bash

USER=`id -u`
if [[ $USER -gt 0 ]]
then
    echo "You must run this script with sudo or root user"
    exit
fi
read -p "Do you want to install apache2? " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing webserver apache2"
    apt-get update
    apt-get upgrade
    apt-get install apache2 apache2-utils
    apt-get install libapache2-mod-php5 php5 php-pear php5-xcache php5-mysql php5-curl php5-gd
    apt-get install mysql-server
    apt-get install mysql-client
    echo "Updating path to jarp"
    ROOT_DIR=`pwd`
    OLD_ROOT="DocumentRoot /var/www/html"
    NEW_ROOT="DocumentRoot $ROOT_DIR/web"
    sed -i.bak "s~$OLD_ROOT~$NEW_ROOT~" /etc/apache2/sites-enabled/000-default.conf
    echo "Allowing new dir path"
    echo "<Directory $ROOT_DIR/web/>" >> /etc/apache2/apache2.conf
    echo "  Options Indexes FollowSymLinks" >> /etc/apache2/apache2.conf
    echo "  AllowOverride All" >> /etc/apache2/apache2.conf
    echo "  Require all granted" >> /etc/apache2/apache2.conf
    echo "</Directory>" >> /etc/apache2/apache2.conf
    service apache2 restart
fi

echo "Installing IFSTAT"
apt-get install ifstat

echo "Installing backend service"
ROOT_DIR=`pwd`
sed -i.bak "s~ROOT_DIR~$ROOT_DIR~" backend.service
cp backend.service /lib/systemd/system/
chmod 644 /lib/systemd/system/backend.service
systemctl daemon-reload
systemctl enable backend.service
systemctl start backend.service
