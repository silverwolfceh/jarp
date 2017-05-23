from modulefactory import *
class RPI_serverhandle:
	def __init__(self):
		self.rxdata = ""
		self.txdata = ""
		pass

	def receive_data(self, data):
		self.rxdata = data
		print "Received: %s" % data

	def send_data(self):
		return self.txdata

	def process_data(self):
		self.txdata = route_msg(self.rxdata)

	def handle_data(self, data):
		self.receive_data(data)
		self.process_data()
		return self.send_data()