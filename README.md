# MPI - Just another raspberry project


## Description
This is a raspberry project which run mainly on raspberry pi board.
It can monitor the system status, control your light and camera


## How to
1. Checkout this project

2. Install webserver support php on your PI
Guide here: https://www.stewright.me/2015/08/tutorial-install-apache-php-and-mysql-on-a-raspberry-pi-2/

3. Update webserver directory part and site-enabled/default.conf to point to the web directory in source

4. Install python from version 2.7.6 to your PI (this maynot need)

5. Install neccessary packages:
sudo pip install RPi.GPIO
sudo apt-get install ifstat

6. Run server.py (python server.py)

7. Open web browser with address: http://your_raspberry_ip/


## Options:
You can modify the backend.service file with the source path to enable server starting on boot


## Credits:
tongvuu@gmail.com
BLOCKS DASHBOARD template
HighCharts


## Screenshot
![Alt text](/web/screenshot.jpg?raw=true "Raspberry Pi Dashboard")