<?php
error_reporting(E_ALL);
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false)
{
	echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
}
$service_port = 9999;
$address = "127.0.0.1";

$result = socket_connect($socket, $address, $service_port);
if ($result === false)
{
	echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
}
$cmd = $_GET['cmd'];
$in = array("module" => "sysinfo", "data" => array("cmd" => $cmd));
$in = json_encode($in);
socket_write($socket, $in, strlen($in));

$out = "";
while ($out = socket_read($socket, 2048))
{
	echo "Server Response: ".$out;
}
socket_close($socket);
?>