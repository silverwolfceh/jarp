import json
import subprocess
import re
import platform
import random

class sysinfo(object):
	module = "sysinfo"
	def __init__(self):
		self.info = {}
		self.info['cpu_used'] = "100%"
		self.info['mem'] = {}
		self.info['mem']['mem_free'] = "0"
		self.info['mem']['mem_used'] = "0"
		self.info['mem']['mem_total'] = "0"
		self.info['temp'] = "0"
		self.info['network'] = {}
		self.info['network']['tx'] = 0
		self.info['network']['rx'] = 0
		self.info['network']['if'] = "wlan0"
		self.res = ""
		pass

	def generate_default_response(self, status = 'success', reason = ''):
		res = {}
		res['module'] = self.module
		res['status'] = status
		res['reason'] = reason
		res['data'] = self.info
		return res

	def execute(self, cmd, is_print = 0):
		try:
			proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
			output = ''
			for line in iter(proc.stdout.readline,''):
				output += line.rstrip() + "\n"
			proc.communicate()[0]
			proc.wait()
		except KeyboardInterrupt:
			pass
		return output

	def cpu_info(self):
		cmd = 'top -bn1 | grep "Cpu(s)"'
		output = self.execute(cmd)
		m = re.search('([0-9\.]+) id', output)
		idle = float(m.group(1))
		self.info['cpu_used'] = round(100 - float("{0:.2f}".format(idle)),2)
		return output

	#KiB Mem:   8072772 total,  7858148 used,   214624 free,   814672 buffers
	def mem_info(self):
		cmd = 'top -bn1 | grep "KiB Mem:" | sed "s/.*://"'
		output = self.execute(cmd)
		m = re.search('([0-9]+) used', output)
		self.info['mem']['mem_used'] = m.group(1)
		m = re.search('([0-9]+) free', output)
		self.info['mem']['mem_free'] = m.group(1)
		m = re.search('([0-9]+) total', output)
		self.info['mem']['mem_total'] = m.group(1)

	def temp_info(self):
		self.info['temp'] = random.randint(10,90)
		if platform.machine() == "armv7l":
			output = self.execute("vcgencmd measure_temp")
			m = re.search('([0-9\.]+)', output)
			self.info['temp'] = float(m.group(1))

	def network_info(self):
		self.info['network']['tx'] = 0
		self.info['network']['rx'] = 0
		output = self.execute("ifstat -n -q -b -i %s 1 1" % self.info['network']['if'])
		info = output.split("\n")[2]
		m = re.search('([0-9\.]+)\s+([0-9\.]+)', info)
		self.info['network']['rx'] = float(m.group(1))
		self.info['network']['tx'] = float(m.group(2))


	def handle_data(self, data):
		self.cpu_info()
		self.mem_info()
		self.temp_info()
		self.network_info()
		self.res = self.generate_default_response('success', '')
		return json.dumps(self.res)

if __name__ == "__main__":
	info = sysinfo()
	print info.handle_data("")
