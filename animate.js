var c = document.getElementById("screen");
var ctx = c.getContext("2d");

var start = document.getElementById("start");
var add = document.getElementById("add");
var stop = document.getElementById("stop");

var requestID;

ctx.fillStyle = '#FF0000';

function drawBorder(){
	ctx.strokeRect(0,0,500,500);
}

drawBorder();

BALLS = [];
var stopped = false;

var addBall = function(){
	BALLS.push(Ball());
}

var Ball = function(){
	
	this.rad = Math.floor(Math.random() * 100) + 1; //random radius 1 to 100
	this.x = Math.floor((Math.random() * (c.width-rad)));
	this.y = Math.floor((Math.random() * (c.height-rad)));
	this.xvel = 2;
	this.yvel = 2;

	this.move = function(){
		if( x <= 0 || x >= (500 - rad) ){
			xvel = -xvel;
		}
		if( y <= 0 || y >= (500 - rad) ){
			yvel = -yvel;
		}
		x+=xvel;
		y+=yvel;
	}

	this.draw = function(){
		if( stopped ){
			return; //not really efficient but eh
		}
		ctx.clearRect(0,0,500,500);
		drawBorder();
		ctx.beginPath();
		ctx.arc(c.width/2,c.height/2,r,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		drawBorder(); //draw it again in case the image overlaps the border
	}
}

var bounce = function(){
	while( !stopped ){
		for ( var i = 0; i < BALLS.length; i++ ){
			BALLS[i].move();
			BALLS[i].draw();
		}
	}
	requestID = window.requestAnimationFrame(bounce);
}

start.addEventListener("click", bounce);
add.addEventListener("click", addBall);
stop.addEventListener("click", function(){
	stopped = true;
	window.cancelAnimationFrame( requestID ); //as it works now, once it it stopped it can't be started again 
});