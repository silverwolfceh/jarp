import json
import RPi.GPIO as GPIO

class gpio(object):
	module = "gpio"
	def __init__(self):
		self.pin = 0
		self.state = 0
		self.res = ""
		GPIO.setmode(GPIO.BCM)
		GPIO.setwarnings(False)
		#GPIO.setup(self.pin, GPIO.OUT)

	def generate_default_response(self, status = 'success', reason = '', rep = ''):
		res = {}
		res['module'] = self.module
		res['status'] = status
		res['reason'] = reason
		res['rep'] = rep
		return res

	def set_high(self):
		print "State is 1"
		self.state = 1
		GPIO.output(self.pin,self.state)

	def set_low(self):
		print "State is 0"
		self.state = 0
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
		temp = {}
		temp['pin'] = self.pin
		if data['state'] != "1" and data['state'] != "0":
			GPIO.setup(self.pin, GPIO.OUT)
			
			temp['state'] = GPIO.input(self.pin)
			self.res = self.generate_default_response('success', '', temp)
			return json.dumps(self.res)
		else:
			GPIO.setup(self.pin, GPIO.OUT)
			self.set_state(int(data['state']))
			temp['state'] = self.get_state()
			self.res = self.generate_default_response('success', '', temp)
			return json.dumps(self.res)
