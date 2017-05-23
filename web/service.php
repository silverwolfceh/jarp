<?php
error_reporting(E_ALL);
include_once("config.php");

function transceiver_data($data)
{
	$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
	if ($socket === false)
		return false;
	$conn = socket_connect($socket, SRVADD, SRVPORT);
	if ($conn === false)
		return false;
	socket_write($socket, $data, strlen($data));
	$data = "";
	while($out = socket_read($socket, 2048))
	{
		$data .= $out;
	}
	socket_close($socket);
	return $data;
}

?>
