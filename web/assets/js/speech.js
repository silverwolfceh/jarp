var registered_command = []



function add_command(re, cb)
{
	var cmd = {"re": re, "cb": cb}
	registered_command.push(cmd)
}

function parse_command(str)
{
	var x = registered_command.length;
	for(i = 0; i < x; i++)
	{
		if(registered_command[i]["re"].test(str))
		{
			var res = registered_command[i]["re"].exec(str);
			registered_command[i]["cb"](res)
		}
	}
}

function speech_parser(str)
{
	parse_command(str)
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
