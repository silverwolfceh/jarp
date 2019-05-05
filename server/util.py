import platform
def is_rpi():
	if platform.machine() == "armv6l" or platform.machine() == "armv7l":
		return True
	return False