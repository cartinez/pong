<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8"> 
		<meta name = "author" content = "Francesco Cartier">
		<meta name = "keywords" content = "login">
		<link rel="stylesheet" href="/css/style.css" type="text/css">		
		<title>Login</title>
	</head>
	<body>
		<section class="retroBox">
			<div class="wrapper">
				<h1>Login</h1>
				<form action="loginChecks.php" method="post" name="login">
					<input type="text" name="username" placeholder="Username" /><br>
					<input type="password" name="password" placeholder="Password" /><br><br>
					<button name="submit" type="submit" class="retroButton">Login</button>
				</form>
				<?php
					if ($_GET['loginMessage'] != "success"){
						echo '<div class="error">';
						echo '<p>' . $_GET['loginMessage'] . '</p>';
						echo '</div>';
					}
					else if ($_GET['loginMessage'] === "success"){
						echo '<div class="success">';
						echo '<p>Registrazione avvenuta con successo</p>';
						echo '</div>';
					}
				?>
				<p>Non ti sei ancora registrato? <a href='registration.php'>Fallo qui!</a></p>
			</div>
		</section>	
	</body>
</html>