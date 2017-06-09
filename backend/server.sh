#!/bin/sh

x=`sudo netstat -ap | grep 9999 | wc -l`

while [ $x -gt 0 ]
do
	sleep 1
	x=`sudo netstat -ap | grep 9999 | wc -l`
	clear
	echo "Number of wait $x"
done
echo "Starting server...."
python server.py
