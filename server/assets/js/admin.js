// Interactiveness now

(function() {
	var clock = document.querySelector('digiclock');

	// But there is a little problem
	// we need to pad 0-9 with an extra
	// 0 on the left for hours, seconds, minutes

	var pad = function(x) {
		return x < 10 ? '0'+x : x;
	};

	var ticktock = function() {
		var d = new Date();

		var h = pad( d.getHours() );
		var m = pad( d.getMinutes() );
		var s = pad( d.getSeconds() );

		var current_time = [h,m,s].join(':');

		clock.innerHTML = current_time;

	};

	ticktock();

	// Calling ticktock() every 1 second
	setInterval(ticktock, 1000);

}());

var cpuload_chart, diskspace_chart, memusage_chart, cputemp_chart;

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function create_pie_chart(render_element, series_data)
{
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: render_element,
			margin: [0, 0, 0, 0],
			backgroundColor: null,
			plotBackgroundColor: 'none',
		},

		title: {
			text: null
		},

		tooltip: {
			formatter: function() {
				return this.point.name +': '+ this.y +' %';

			}
		},
		series: [
			{
			borderWidth: 2,
			borderColor: '#F1F3EB',
			shadow: true,
			type: 'pie',
			name: render_element,
			innerSize: '50%',
			data: series_data,
			dataLabels: {
				enabled: false,
				color: '#000000',
				connectorColor: '#000000'
			}
		}]
	});
	return chart;
}


function update_cpu_load(newval)
{
	newdata = [{ name: 'load percentage', y: newval, color: '#b2c831' }, { name: 'rest', y: (100-newval), color: '#3d3d3d' }]
	if(newval > 50)
		newdata[0]["color"] = "red"

	cpuload_chart.series[0].setData(newdata)
	$("#loadlbl").html(newval + "%")
}
function update_diskspace(newval)
{
	newdata = [{ name: 'Used', y: newval, color: '#b2c831' }, { name: 'Rest', y: (100 - newval), color: '#3d3d3d' }]
	if(newval > 70)
		newdata[0]["color"] = "red"

	diskspace_chart.series[0].setData(newdata)
	$("#spacelbl").html(newval + "%")
}
function update_memusage(used, free, total)
{
	used = Math.floor((used / total) * 100)
	free = 100 - used;
	newdata = [{ name: 'Used', y: used, color: '#b2c831' }, { name: 'Rest', y: free, color: '#3d3d3d' }]
	if(used > 70)
		newdata[0]["color"] = "red"
	memusage_chart.series[0].setData(newdata)
	$("#memlbl").html(used + "%")
}
function update_cputemp(temp)
{
	newdata = [{ name: 'Temp', y: temp, color: '#b2c831' }, { name: 'Rest', y: 100 - temp, color: '#3d3d3d' }]
	if(temp > 50)
		newdata[0]["color"] = "red"
	cputemp_chart.series[0].setData(newdata)
	$("#templbl").html(temp + "<sup>o</sup>C")
}
function update_uptime(newtime)
{
	$("#uptime").html(newtime)
}
function notify_message(mesg, typex)
{
	if (typeof(typex)==='undefined') typex = "success";
	var options = '{"text": "' + mesg + '", "layout": "topRight", "type": "' + typex + '", "timeout": 500}'
	options = $.parseJSON(options);
	noty(options)
}



/*** Updater ***/
$(document).ready(function() {

	cpuload_chart = create_pie_chart("load", [
				{ name: 'load percentage', y: 10.0, color: '#b2c831' },
				{ name: 'rest', y: 90.0, color: '#3d3d3d' }
			]);
	diskspace_chart = create_pie_chart("space", [
				{ name: 'Used', y: 65.0, color: '#fa1d2d' },
				{ name: 'Rest', y: 35.0, color: '#3d3d3d' }
			]);
	memusage_chart = create_pie_chart("mem", [
				{ name: 'Used', y: 15.0, color: '#fa1d2d' },
				{ name: 'Rest', y: 95.0, color: '#3d3d3d' }
			]);
	cputemp_chart = create_pie_chart("temp", [
				{ name: 'Temp', y: 15.0, color: '#fa1d2d' },
				{ name: 'Rest', y: 95.0, color: '#3d3d3d' }
			]);


	var categories = []
	var serie1 = []
	var serie2 = []
	for(i = 0; i < 30; i++)
	{
		categories.push("Time #" + i)
		serie1.push(0)
		serie2.push(0)
	}

	var network_chart = new Highcharts.Chart({
		chart: {
			renderTo: 'importantchart',
			type: 'column',
			backgroundColor: 'transparent',
			height: 140,
			marginLeft: 3,
			marginRight: 3,
			marginBottom: 0,
			marginTop: 0
		},
		title: {
			text: ''
		},
		xAxis: {
			lineWidth: 0,
			tickWidth: 0,
			labels: {
				enabled: false
			},
			categories: categories
		},
		yAxis: {
			labels: {
				enabled: true
			},
			gridLineWidth: 0,
			title: {
			  text: null,
			},
		},
		series: [
			{
				name: 'IN',
				color: 'rgb(178, 200, 49)',
				type: 'line',
				data: serie1
			},
			{
				name: 'OUT',
				color: '#3498DB',
				type: 'line',
				data: serie2
			}
		],
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			column: {
				borderWidth: 0,
				color: '#b2c831',
				shadow: false
			},
			line: {
				marker: {
					enabled: false
				},
				lineWidth: 3
			}
		},
		tooltip: {
			enabled: true
		}
	});

	function update_network(tx, rx)
	{
		network_chart.series[0].addPoint(rx, true, true)
		network_chart.series[1].addPoint(tx, true, true)
		var realtime = "IN/OUT " + rx + " / " + tx
		$("#currentnetwork").html(realtime)
	}

	function gpio_res(obj)
	{
		if(obj.status == "success")
		{
			notify_message("GPIO pin " + obj.data.pin + " is " + obj.data.state)
			var make_id = "light" + obj.data.pin + "_";
			if(obj.data.state == 1)
			{
				$("#" + make_id + "on").prop('checked', true);
				$("#" + make_id + "off").prop('checked', false);
			}
			else
			{
				$("#" + make_id + "off").prop('checked', true);
				$("#" + make_id + "on").prop('checked', false);
			}
			
			
		}
		else
			notify_message("Failed to set GPIO pin " + obj.data.pin + " to " + obj.data.state, "error")
	}

	function server_status(state)
	{
		if(state == 1)
		{
			$("#statusdown").css("display", "none");
			$("#statusup").css("display", "");
			$("#status").html("UP");
		}
		else
		{
			$("#statusdown").css("display", "");
			$("#statusup").css("display", "none");
			$("#status").html("DOWN");
		}
	}

	var socket = io.connect('//' + document.domain + ':' + location.port);
	socket.on('sysinfo', function(data) {
		if(isJson(data))
		{
			var obj = JSON.parse(data)
			if(obj)
			{
				update_diskspace(obj.data.space.used)
				update_uptime(obj.data.uptime)
				update_cputemp(obj.data.temp)
				update_cpu_load(obj.data.cpu_used)
				update_memusage(obj.data.mem.mem_used, obj.data.mem.mem_free, obj.data.mem.mem_total)
				update_network(obj.data.network.tx, obj.data.network.rx)
			}
		}
	});

	socket.on('disconnect', function() {
		notify_message("Server is offline", "error");
		server_status(0);
	});

	socket.on('connect', function() {
		notify_message("Server is online");
		server_status(1);
	});

	socket.on('controlstate', function(data) {
		//"{"status": "success", "reason": "", "data": {"state": 1, "pin": 23}, "module": "gpio"}"
		var obj = JSON.parse(data)
		if(obj)
		{
			if(obj.module == "gpio")
			{
				gpio_res(obj)
			}
		}
	});
	// start_voice_command();



	$('[data-toggle="tooltip"]').tooltip()
	$(".switch-input").click(function (){
		var id = $(this).attr("id")
		var info = id.split("_")
		var state = 1
		if(info[1] == "off")
			state = 0;
		data = { "module" : "gpio", "data" : {"pin" : info[0].replace("light",""), "state" : state }}
		socket.emit('control', JSON.stringify(data))
	});

	$("#restartbtn").click(function(){
		var key = prompt("What is your auth. key?")
		var cnf = confirm("Are you sure to restart server? ")
		if(cnf)
		{
			$.post("api.php", {"module": "linux", "cmd": "sudo reboot", "key" : key }, function(data){
				if(data.indexOf("Failed to connect") == -1)
				{
					if(isJson(data))
					{
						var obj = JSON.parse(data)
						if(obj)
							notify_message(obj.data)
					}
					else
					{
						notify_message(data, "error")
					}
				}
			});
		}
	})

	$("#shutdownbtn").click(function(){
		var key = prompt("What is your auth. key?")
		var cnf = confirm("Are you sure to shutdown server? ")
		if(cnf)
		{
			$.post("api.php", {"module": "linux", "cmd": "sudo shutdown -h now", "key" : key }, function(data){
				if(data.indexOf("Failed to connect") == -1)
				{
					if(isJson(data))
					{
						var obj = JSON.parse(data)
						if(obj)
							notify_message(obj.data)
					}
					else
					{
						notify_message(data, "alert")
					}
				}
			});
		}
	})

	$("#ico_logout").click(function(){
		$.post("api.php", { "module": "user", "action" : "logout" }, function(data) {
					if(data == "Logout success")
					{
						document.location.href = "login.php";
					}
		});
	})

	$("#ico_setting").click(function(){
		document.location.href="setting.php";
	})

});

// function light_control(info)
// {
// 	var state = 0;
// 	var pin = -1

// 	if(info[1] == "bật")
// 		state = 1;
// 	if(info[2] == "xanh")
// 		pin = 18
// 	else if(info[2] == "đỏ")
// 		pin = 23
// 	else if(info[2] == "cam")
// 		pin = 24

// 	if(pin != -1)
// 	{
// 		$.post("api.php", {"module": "gpio", "pin": pin, "state": state}, function(data) {
// 			notify_message("Command executed")
// 			console.log(data)
// 		});
// 	}
// }
// add_command(new RegExp(/(bật|tắt)\sđèn\s(xanh|đỏ|cam)+/), light_control);
