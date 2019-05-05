import json
import subprocess

class linux(object):
	module = "linux"
	def __init__(self):
		self.blacklist = []
		self.res = ''
		pass

	def generate_default_response(self, status = 'success', reason = '', rep = ''):
		res = {}
		res['module'] = self.module
		res['status'] = status
		res['reason'] = reason
		res['data'] = rep
		return res

	def execute(self, cmd, is_print = 0):
		proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
		output = ''
		for line in iter(proc.stdout.readline,''):
			output += line.rstrip() + "<br />"
		proc.communicate()[0]
		proc.wait()
		return output

	def handle_data(self, data):
		cmd = data['cmd']
		output = self.execute(cmd)
		self.res = self.generate_default_response('success', '', output)
		return json.dumps(self.res)
