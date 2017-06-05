import socket
import sys
import data
import os

if __name__ == "__main__":
	testdata = data.gpio
        if len(sys.argv) > 1:
                if sys.argv[1] == "linux":
                        testdata = data.linux
                elif sys.argv[1] == "sysinfo":
                        testdata = data.sysinfo
                elif sys.argv[1] == "custom":
                        testdata = sys.argv[2]
                else:
                        print "I don't know what you want"
                        exit(1)
	HOST, PORT = "127.0.0.1", int(os.getenv('SRVPORT', 9999))
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	try:
		# Connect to server and send data
		sock.connect((HOST, PORT))
		sock.sendall(testdata)
		# Receive data from the server and shut down
		received = sock.recv(1024)
	finally:
		sock.close()

	print "Sent:     {}".format(testdata)
	print "Received: {}".format(received)
