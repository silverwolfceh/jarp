from __future__ import generators
import random
import os
import json

from module.gpio import gpio
from module.linux import linux
from module.sysinfo import sysinfo

class modulefactory(object):
	@staticmethod
	def factory(type):
		if type == "gpio":
			return gpio()
		elif type == "linux":
			return linux()
		elif type == "sysinfo":
			return sysinfo()

def route_msg(data):
	info = json.loads(data)
	if info:
		modulehandle = modulefactory.factory(info['module'])
		if modulehandle:
			return modulehandle.handle_data(info['data'])
	return "Error"