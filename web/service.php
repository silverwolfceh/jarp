<?php
error_reporting(E_ALL);
include_once("config.php");

function transceiver_data($data, &$err)
{
	$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
	if ($socket === false)
	{
		$err['code'] = -1;
		$err['msg'] =  "Failed to create socket";
		return false;
	}
	$conn = socket_connect($socket, SRVADD, SRVPORT);
	if ($conn === false)
	{
		$err['code'] = -2;
                $err['msg'] =  "Failed to connect";
		return false;
	}
	socket_write($socket, $data, strlen($data));
	$data = "";
	while($out = socket_read($socket, 2048))
	{
		$data .= $out;
	}
	socket_close($socket);
	$err['code'] = 0;
	$err['msg'] = "";
	return $data;
}
function error_translate($err)
{
	$rep = array("status" => "Error", "msg" => $err['msg']." Code=".$err['code']);
	return json_encode($rep);
}

?>
