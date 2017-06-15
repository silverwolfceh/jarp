<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Raspberry Dashboard - Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="Carlos Alvarez - Alvarez.is">
	<link href="assets/css/bootstrap.css" rel="stylesheet">
	<link href="assets/css/login.css" rel="stylesheet">

	<script type="text/javascript" src="assets/js/jquery-latest.js"></script>

	<style type="text/css">
		body {
			padding-top: 30px;
		}
	</style>

	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<link rel="shortcut icon" href="assets/ico/favicon.ico">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">

	<!-- Google Fonts call. Font Used Open Sans & Raleway -->
	<link href="http://fonts.googleapis.com/css?family=Raleway:400,300" rel="stylesheet" type="text/css">
	<link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">

	<!-- Jquery Validate Script -->
	<script type="text/javascript" src="assets/js/jquery.validate.js"></script>
	<script type="text/javascript">
		$.validator.setDefaults({
			submitHandler: function() { 
				$.post("api.php", {
					"module": "user",
					"action" : "login",
					"username": $("#username").val(),
					"password": $("#password").val() 
				}, function(data) {
					if(data == "Login success")
					{
						document.location.href = "index.php";
					}
					else
					{
						$("#errormsg").html(data)
					}
				});
			}
		});
		$().ready(function() {
			$("#signupForm").validate({
				rules: {
					username: {
						required: true,
						minlength: 1
					},
					password: {
						required: true,
						minlength: 1
					}
				},
				messages: {
					username: {
						required: "Please enter a username",
						minlength: "Your username must consist of at least 1 character"
					},
					password: {
						required: "Please provide a password",
						minlength: "Your password must be at least 1 character long"
					}
				}
			});
		});
	</script>
</head>
<body>
	<div class="navbar-nav navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href=""><img src="assets/img/logo30.png" alt=""> Raspberry Dashboard - AUTHENTICATION</a>
			</div> 
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-lg-offset-4 col-lg-4" style="margin-top:100px">
				<div class="block-unit" style="text-align:center; padding:8px 8px 8px 8px;">
					<img src="assets/img/logo.png" alt="" class="img-circle">
					<br>
					<br>
					<span style="color:red" id="errormsg"></span>
					<br>
					<br>
					<form class="cmxform" id="signupForm" method="post" action="login.php">
						<fieldset>
							<p>
								<input id="username" name="username" type="text" placeholder="Username" autocomplete="off" >
								<input id="password" name="password" type="password" placeholder="Password" autocomplete="off">
							</p>
							<input class="submit btn-success btn btn-large" type="submit" value="Login">
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="assets/js/bootstrap.js"></script>
</body>
</html>