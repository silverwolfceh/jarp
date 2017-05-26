import sys
import os
import data

dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(dir_path + os.sep + '../')

from serverhandle import *

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
	datahandle = RPI_serverhandle()
	print datahandle.handle_data(testdata)
