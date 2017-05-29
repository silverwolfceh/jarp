<?php
	require_once('../service.php');

	/* Test data */
	$dt_linux = json_encode(array("module" => "linux", "data" => array("cmd" => "id -a")));
	$dt_sysinfo = json_encode(array("module" => "sysinfo", "data" => ""));
	$dt_gpio = json_encode(array("module" => "gpio", "data" => array("pin" => 18, "state" => 0)));
	$err = array("code" => 0, "msg" => "");
	$output = transceiver_data($dt_sysinfo, $err);
	if($err['code'] != 0)
		echo json_encode($err);
	else
		echo $output;
?>
