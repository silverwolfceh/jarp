import time
from modulefactory import *


def get_sysinfo():
	sysinfo = '{"module":"sysinfo","data":{"info":"cpu"}}'
	return route_msg(sysinfo)

def send_sysinfo(sio):
	while True:
		sio.emit('sysinfo', get_sysinfo())
		time.sleep(1)
