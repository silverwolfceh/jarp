<?php
require_once("service.php");

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
			$dt = json_encode(array("module" => "gpio", "data" => array("pin" => $pin, "state" => $state)));
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
		case "sysinfo":
		{
			$dt_sysinfo = json_encode(array("module" => "sysinfo", "data" => array()));
			$out = transceiver_data($dt_sysinfo, $err);
			if($err['code'] == 0)
			{
				echo $out; die();
			}
			else
			{
				echo $err['msg']; die();
			}
			break;
		}
		case "linux":
		{
			if(isset($_REQUEST['key']) && $_REQUEST['key'] == "j1r0")
			{
				$dt_linux = json_encode(array("module" => "linux", "data" => array("cmd" => $_REQUEST['cmd'])));
				$out = transceiver_data($dt_linux, $err);
				if($err['code'] == 0)
				{
					echo $out; die();
				}
				else
				{
					echo $err['msg']; die();
				}
			}
			else
			{
				echo "AUTHORIZATION FAILED"; die();
			}
			break;
			
		}
		default:
		{
			break;
		}
	}
}
echo "OK";
?>
