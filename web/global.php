<?php
	$users = array(
		"admin" => array("username" => "admin", "password" => "123456", "fullname" => "Administrator"),
		"tong" => array("username" => "tong", "password" => "123456", "fullname" => "Tong Vuu")
	);

	if(!defined("SRVPORT"))
	{
		$port = getenv('SRVPORT');
		if($port === False)
			$port = 9999;
		define("SRVPORT", $port);
	}
	if(!defined("SRVADD"))
		define("SRVADD", "127.0.0.1");
?>