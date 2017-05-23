import json
import subprocess
import re

class sysinfo(object):
	module = "sysinfo"
	def __init__(self):
		self.info = {}
		self.info['cpu_used'] = "100%"
		self.info['mem_free'] = "0"
		self.info['mem_used'] = "0"
		self.info['mem_total'] = "0"
		self.info['temp'] = "41"
		self.res = ''
		pass

	def generate_default_response(self, status = 'success', reason = ''):
		res = {}
		res['module'] = self.module
		res['status'] = status
		res['reason'] = reason
		res['rep'] = self.info
		return res

	def execute(self, cmd, is_print = 0):
		proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
		output = ''
		for line in iter(proc.stdout.readline,''):
			output += line.rstrip() + "\n"
		proc.communicate()[0]
		proc.wait()
		return output

	def cpu_info(self):
		cmd = 'top -bn1 | grep "Cpu(s)"'
		output = self.execute(cmd)
		m = re.search('([0-9\.]+) id', output)
		self.info['cpu_used'] = 100 - float(m.group(1))
		return output

	#KiB Mem:   8072772 total,  7858148 used,   214624 free,   814672 buffers
	def mem_info(self):
		cmd = 'top -bn1 | grep "KiB Mem:" | sed "s/.*://"'
		output = self.execute(cmd)
		m = re.search('([0-9]+) used', output)
		self.info['mem_used'] = m.group(1)
		m = re.search('([0-9]+) free', output)
		self.info['mem_free'] = m.group(1)
		m = re.search('([0-9]+) total', output)
		self.info['mem_total'] = m.group(1)

	def temp_info(self):
		self.info['temp'] = 100

	def handle_data(self, data):
		self.cpu_info()
		self.mem_info()
		self.temp_info()
		self.res = self.generate_default_response('success', '')
		return json.dumps(self.res)
