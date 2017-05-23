import socket
import sys
import data

if __name__ == "__main__":
	HOST, PORT = "localhost", 9999
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	try:
		# Connect to server and send data
		sock.connect((HOST, PORT))
		sock.sendall(data.sysinfo + "\n")
		# Receive data from the server and shut down
		received = sock.recv(1024)
	finally:
		sock.close()

	print "Sent:     {}".format(data)
	print "Received: {}".format(received)