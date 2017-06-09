function speech_parser(transcript)
{
	var patt = new RegExp(/(bật|tắt)\sđèn\s(xanh|đỏ|cam)+/);
	if(patt.test(transcript))
	{
		var res = patt.exec(transcript);
		if(res.length >= 3)
		{
			var state = 0;
			if(res[1] == "bật")
				state = 1;
			var pin = -1;
			switch(res[2])
			{
				case "xanh":
				{
					pin = 18;
					break;
				}
				case "đỏ":
				{
					pin = 23;
					break;
				}
				case "cam":
				{
					pin = 24;
					break;
				}
			}
			if(pin != -1)
			{
				$.post("api.php", {"module": "gpio", "pin": pin, "state": state}, function(data){
					console.log(data)
				});
			}
		}
	}
}
function start_voice_command()
{
	if ('webkitSpeechRecognition' in window)
	{
		var ignore_onend = false;
		var final_transcript = "";
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = true;
		recognition.lang = 'vi-Vi';

		recognition.onstart = function()
		{

		};

		recognition.onerror = function(event)
		{
			ignore_onend = true;
		};

		recognition.onend = function()
		{
			final_transcript = ""
			ignore_onend = false
			recognition.start();
		};

		recognition.onresult = function(event)
		{
			for (var i = event.resultIndex; i < event.results.length; ++i)
			{
				if (event.results[i].isFinal)
				{
					final_transcript += event.results[i][0].transcript;
				}
			}
			speech_parser(final_transcript)
		};

		recognition.start();
	}
}
