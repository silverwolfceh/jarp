import sys
import os
import data

dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(dir_path + os.sep + '../')
from serverhandle import *

if __name__ == "__main__":
	datahandle = RPI_serverhandle()
	print datahandle.handle_data(data.sysinfo)