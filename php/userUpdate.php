<?php
	require_once 'db.php';
	$jsondata = file_get_contents('php://input');

	$player = json_decode($jsondata, true);

	if ($player['lost'] === 0) {
		$query = "UPDATE leaderboard 
			SET win = ".$player['win'].", 
			ratio = ".$player['win']."
			WHERE user ='".$player['user']."'";
	}
	else {
		$query = "UPDATE leaderboard 
				SET win = ".$player['win'].", 
				lost = ".$player['lost'].", 
				ratio = ".$player['win']/$player['lost']."
				WHERE user ='".$player['user']."'";
	}

	$result = mysqli_query($con, $query);

	if ($result) 
		echo 'Succesful update';
	else
		echo 'Failed update';
?>