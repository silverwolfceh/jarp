from flask import Flask, request, send_from_directory
from flask_socketio import SocketIO, send, emit
import json
from worker import *
from threading import Thread
from modulefactory import *

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
is_wker_start = False


@socketio.on('connect')
def server_start():
	global is_wker_start
	if is_wker_start:
		pass
	else:
		t = Thread(target = send_sysinfo, args = (socketio, ))
		t.start()
		is_wker_start = True

@socketio.on('control')
def module_control(data):
	rs = route_msg(data)
	emit("controlstate", rs, broadcast=True)


@app.route('/assets/<path:path>')
def send_assets(path):
	return send_from_directory('assets', path)


@app.route('/', methods=['GET'])
def redirect_to_index():
	return send_from_directory('view', 'index.html')

if __name__ == "__main__":
	socketio.run(app, host='0.0.0.0')
