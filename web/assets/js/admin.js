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

/* ---------- Notifications ---------- */
	$('.noty').click(function(e){
		e.preventDefault();
		var options = $.parseJSON($(this).attr('data-noty-options'));
		noty(options);
	});





/*** Updater ***/
$(document).ready(function() {
	cpuload_chart = new Highcharts.Chart({
		chart: {
			renderTo: 'load',
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
			shadow: false,
			type: 'pie',
			name: 'cpuload',
			innerSize: '50%',
			data: [
				{ name: 'load percentage', y: 10.0, color: '#b2c831' },
				{ name: 'rest', y: 90.0, color: '#3d3d3d' }
			],
			dataLabels: {
				enabled: false,
				color: '#000000',
				connectorColor: '#000000'
			}
		}]
	});

	function update_cpu_load(newval)
	{
		newdata = [{ name: 'load percentage', y: newval, color: '#b2c831' }, { name: 'rest', y: (100-newval), color: '#3d3d3d' }]
		cpuload_chart.series[0].setData(newdata)
		$("#loadlbl").html(newval + "%")
	}

	diskspace_chart = new Highcharts.Chart({
		chart: {
			renderTo: 'space',
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
			shadow: false,
			type: 'pie',
			name: 'SiteInfo',
			innerSize: '50%',
			data: [
				{ name: 'Used', y: 65.0, color: '#fa1d2d' },
				{ name: 'Rest', y: 35.0, color: '#3d3d3d' }
			],
			dataLabels: {
				enabled: false,
				color: '#000000',
				connectorColor: '#000000'
			}
		}]
	});
	function update_diskspace(newval)
	{

	}


	memusage_chart = new Highcharts.Chart({
		chart: {
			renderTo: 'mem',
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
			shadow: false,
			type: 'pie',
			name: 'mem',
			innerSize: '50%',
			data: [
				{ name: 'Used', y: 15.0, color: '#fa1d2d' },
				{ name: 'Rest', y: 95.0, color: '#3d3d3d' }
			],
			dataLabels: {
				enabled: false,
				color: '#000000',
				connectorColor: '#000000'
			}
		}]
	});
	function update_memusage(used, free, total)
	{
		used = Math.floor((used / total) * 100)
		free = 100 - used;
		newdata = [{ name: 'Used', y: used, color: '#b2c831' }, { name: 'Rest', y: free, color: '#3d3d3d' }]
		memusage_chart.series[0].setData(newdata)
		$("#memlbl").html(used + "%")
	}

	function cpu_temp_update(temp)
	{
		var degrees = temp * 360 / 100
		var canvas = document.getElementById("cputemp");
		var ctx = canvas.getContext("2d");
		var W = canvas.width;
		var H = canvas.height;
		var color = "#b2c831"; //green looks better to me
		var bgcolor = "#222";
		var text;
		//Clear the canvas everytime a chart is drawn
		ctx.clearRect(0, 0, W, H);

		//Background 360 degree arc
		ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 30;
		ctx.arc(W/2, H/2, 100, 0, Math.PI*2, false); //you can see the arc now
		ctx.stroke();

		//gauge will be a simple arc
		//Angle in radians = angle in degrees * PI / 180
		var radians = degrees * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 30;
		//The arc starts from the rightmost end. If we deduct 90 degrees from the angles
		//the arc will start from the topmost end
		ctx.arc(W/2, H/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
		//you can see the arc now
		ctx.stroke();

		//Lets add the text
		ctx.fillStyle = color;
		ctx.font = "50px open sans";
		//text = Math.floor(temp/360*100) + "%";
		text = temp + "℃"
		//Lets center the text
		//deducting half of text width from position x
		text_width = ctx.measureText(text).width;
		//adding manual value to position y since the height of the text cannot
		//be measured easily. There are hacks but we will keep it manual for now.
		ctx.fillText(text, W/2 - text_width/2, H/2 + 15);
	}

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

	var timer = ""
	function update_dashboard()
	{
		$.post("api.php", {"module": "sysinfo"}, function(data){
			if(data.indexOf("Failed to connect") == -1)
			{
				var obj = JSON.parse(data)
				if(obj)
				{
					if(timer)
						clearInterval(timer)

					cpu_temp_update(obj.data.temp)
					update_cpu_load(obj.data.cpu_used)
					update_memusage(obj.data.mem.mem_used, obj.data.mem.mem_free, obj.data.mem.mem_total)
					update_network(obj.data.network.tx, obj.data.network.rx)
					timer = setInterval(function(){update_dashboard()}, 1000);
				}
			}
		});
	}
	update_dashboard()

});