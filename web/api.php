<?php
require_once("service.php");

function build_request_gpio($pin, $state)
{
	return json_encode(array("module" => "gpio", "data" => array("pin" => $pin, "state" => $state)));
}

$err = array("code" => 0, "msg" => "");
if(isset($_REQUEST['module']))
{
	$m = $_REQUEST['module'];
	switch($m)
	{
		case "gpio":
		{
			$pin = $_REQUEST['pin'];
			$state = $_REQUEST['state'];
			$dt = build_request_gpio($pin, $state);
			$out = transceiver_data($dt, $err);
			if($err['code'] == 0)
			{
				echo "OK"; die();
			}
			else
			{
				echo $err['msg']; die();
			}
			break;
		}
		default:
		{
			break;
		}
	}
}

?>
