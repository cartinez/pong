var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICK = 10;

var winScreen = true;

var playerScore1 = 0;
var playerScore2 = 0;
const WINNING_SCORE = 3;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick() {
	if (winScreen){
		playerScore1 = 0;
		playerScore2 = 0;
		winScreen = false;	
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
		var fps = 30;
	
	setInterval(function() {
		drawEverything();
		moveEverything();
	}, 1000/fps);
	
	canvas.addEventListener('mousedown',handleMouseClick);

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
	});
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);

	if (paddle2YCenter < ballY-35)
		paddle2Y += 6;
	else if (paddle2YCenter > ballY+35)
		paddle2Y -= 6;
}

function moveEverything() {
	if (winScreen)
		return;

	computerMovement();
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX > canvas.width-PADDLE_THICK*3) {
		if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			
		    var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}	
		else {
			playerScore1++; // il punteggio deve stare prima di ballReset() 
			ballReset();
		}
	}

	if (ballX < 0+PADDLE_THICK*3) {
		if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}
		else {
			playerScore2++;
			ballReset();
		}
	}

	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

	if (ballY < 0) 
		ballSpeedY = -ballSpeedY;
	}

function ballReset() {
	if (playerScore1 >= WINNING_SCORE || playerScore2 >= WINNING_SCORE) {
		winScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything() {
	// cornice nera
	colorRect(0,0,canvas.width,canvas.height, 'black');

	if (winScreen) {
		canvasContext.fillStyle = 'white';
		if (playerScore1 >= WINNING_SCORE) {
			canvasContext.fillStyle = 'white';
			canvasContext.font = '30px Arial';
			canvasContext.textAlign="center";
			canvasContext.fillText("Hai vinto!", 400,200);
		//	canvasContext.fillText("clicca per continuare", 400,500);
		}
		else if (playerScore2 >= WINNING_SCORE) {
			canvasContext.textAlign="center";
			canvasContext.fillStyle = 'white';
			canvasContext.font = '30px Arial';
			canvasContext.fillText("Hai perso.", 400,200);
		//	canvasContext.fillText("clicca per continuare", 400,500);
		}
		canvasContext.textAlign="center";
		canvasContext.fillStyle = 'white';
		canvasContext.font = '30px Arial';
		canvasContext.fillText("clicca per giocare", 400,300);
		
		return;
	}

	drawNet();
	// racchetta sinistra
	colorRect(0,paddle1Y,PADDLE_THICK,PADDLE_HEIGHT, 'white');
	// racchetta destra
	colorRect(canvas.width-PADDLE_THICK,paddle2Y,PADDLE_THICK,PADDLE_HEIGHT, 'white');
	// palla
	colorCircle(ballX,ballY,10,'red'); 
	// punteggio
	canvasContext.fillStyle = 'white';
	canvasContext.font = '30px Arial';
	canvasContext.fillText(playerScore1, 100,100);
	canvasContext.fillText(playerScore2, 700,100);
}

function colorRect(leftX, topY, width, height, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(posX, posY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(posX, posY, radius, 0, Math.PI*2, true)
	canvasContext.fill(); 
}