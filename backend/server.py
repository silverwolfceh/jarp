import sys
import os
from util import is_rpi

if is_rpi():
	import RPi.GPIO as GPIO
	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)

dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(dir_path)
sys.path.append(dir_path + os.sep + 'module')

import SocketServer
import time
from serverhandle import *

class RPI_TCPHandler(SocketServer.BaseRequestHandler):
	def server_bind(self):
		self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
		self.socket.bind(self.server_address)

	def setup(self):
		self.datahandle = RPI_serverhandle()

	def handle(self):
		self.data = self.request.recv(2048).strip()
		self.request.sendall(self.datahandle.handle_data(self.data))

if __name__ == "__main__":
	HOST = "127.0.0.1"
	PORT = int(os.getenv('SRVPORT', 9999))
	server = ""
	try:
		server = SocketServer.ThreadingTCPServer((HOST, PORT), RPI_TCPHandler)
		print "Backend server is ready on %s:%d" % (HOST, PORT)
		server.serve_forever()
	except KeyboardInterrupt:
		print "User aborted. Shutting down"
		server.shutdown()
		server.server_close()
		time.sleep(2)

