<?php
	require_once('../service.php');

	/* Test data */
	$dt_linux = json_encode(array("module" => "linux", "data" => array("cmd" => "id -a")));
	$dt_sysinfo = json_encode(array("module" => "sysinfo", "data" => ""));
	$dt_gpio = json_encode(array("module" => "gpio", "data" => array("pin" => 1, "state" => 0)));

	echo transceiver_data($dt_gpio);
?>