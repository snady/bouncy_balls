var c = document.getElementById("screen");
var ctx = c.getContext("2d");

var start = document.getElementById("start");
var add = document.getElementById("add");
var remove = document.getElementById("remove");
var stop = document.getElementById("stop");

var requestID;

ctx.fillStyle = '#FF0000';

function drawBorder(){
	ctx.strokeRect(0,0,c.width,c.height);
}

drawBorder();

BALLS = [];

var addBall = function(){
	BALLS.push(new Ball());
}
var rmvBall = function(){
	BALLS.pop();
}

var Ball = function(){
	
	this.rad = Math.floor(Math.random() * 100) + 3; //random radius 3 to 100
	this.x = Math.floor((Math.random() * (c.width-2*this.rad))) + this.rad;
	this.y = Math.floor((Math.random() * (c.height-2*this.rad))) + this.rad;
	this.xvel = Math.random() * 5 + 1;
	this.yvel = Math.random() * 5 + 1;

	this.move = function(){
		if( this.x <= this.rad || this.x >= (c.width - this.rad) ){
			this.xvel = -this.xvel;
		}
		if( this.y <= this.rad || this.y >= (c.height - this.rad) ){
			this.yvel = -this.yvel;
		}
		this.x+=this.xvel;
		this.y+=this.yvel;
	}

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.rad,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
		drawBorder(); //draw it again in case the image overlaps the border
	}
}

var bounce = function(){
	ctx.clearRect(0,0,c.width,c.height);
	drawBorder();
	for ( var i = 0; i < BALLS.length; i++ ){
		BALLS[i].move();
		BALLS[i].draw();
	}
	requestID = window.requestAnimationFrame(bounce);
}

start.addEventListener("click", bounce);
add.addEventListener("click", addBall);
remove.addEventListener("click", rmvBall);
stop.addEventListener("click", function(){
	stopped = true;
	window.cancelAnimationFrame( requestID ); //as it works now, once it it stopped it can't be started again 
});