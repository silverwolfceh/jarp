import json
from util import *
if is_rpi():
	import RPi.GPIO as GPIO

class gpio(object):
	module = "gpio"
	def __init__(self):
		self.pin = 0
		self.state = 0
		self.res = ""
		if platform.machine() == "armv7l":
			GPIO.setmode(GPIO.BCM)
			GPIO.setwarnings(False)

	def generate_default_response(self, status = 'success', reason = '', rep = ''):
		res = {}
		res['module'] = self.module
		res['status'] = status
		res['reason'] = reason
		res['data'] = rep
		return res

	def set_high(self):
		self.state = 1
		if is_rpi():
			GPIO.output(self.pin,self.state)

	def set_low(self):
		self.state = 0
		if is_rpi():
			GPIO.output(self.pin,self.state)

	def set_state(self, state):
		if state == 0:
			self.set_low()
		else:
			self.set_high()

	def get_state(self):
		return self.state

	def handle_data(self, data):
		self.pin = int(data['pin'])
		if is_rpi():
			GPIO.setup(self.pin, GPIO.OUT)
		temp = {}
		temp['pin'] = self.pin
		if int(data['state']) != 1 and int(data['state']) != 0:
			if platform.machine() == "armv7l":
				temp['state'] = GPIO.input(self.pin)
			else:
				temp['state'] = 0
			self.res = self.generate_default_response('success', '', temp)
			return json.dumps(self.res)
		else:
			self.set_state(int(data['state']))
			temp['state'] = self.get_state()
			self.res = self.generate_default_response('success', '', temp)
			return json.dumps(self.res)

if __name__ == "__main__":
	data = {}
	data['pin'] = 18
	data['state'] = 1
	info = gpio()
	print(info.handle_data(data))