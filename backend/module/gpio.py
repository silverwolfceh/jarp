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
		GPIO.setup(self.pin, GPIO.OUT)
		self.set_state(int(data['state']))
		response = "Pin : %s, State: %s" % (self.pin, self.state)
		self.res = self.generate_default_response('success', '', response)
		return json.dumps(self.res)
