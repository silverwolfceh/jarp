import sys
import os
dir_path = os.path.dirname(os.path.realpath(__file__))
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
	HOST, PORT = "localhost", 9999
	server = ""
	try:
		server = SocketServer.TCPServer((HOST, PORT), RPI_TCPHandler)
		server.serve_forever()
	except KeyboardInterrupt:
		print "User aborted"
		server.shutdown()
		server.server_close()
		time.sleep(1)

