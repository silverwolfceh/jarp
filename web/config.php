<?php
$port = getenv('SRVPORT');
if($port === False)
	$port = 9999;

define("SRVPORT", $port);
define("SRVADD", "127.0.0.1");


?>
