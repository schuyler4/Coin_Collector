var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
//death Varibles
deathByBomb = false
ranOutOfTime = false
gameOver = false
//mouse event listener
ctx.canvas.addEventListener('mousedown', function(event) {
	var mouseX = event.clientX - ctx.canvas.offsetLeft
	var mouseY = event.clientY - ctx.canvas.offsetTop 
	if(!gameOver) {
		if(mouseX > coin.x && coin.x + coin.width > mouseX
			&& mouseY > coin.y && coin.y + coin.height > mouseY) {
			score.count += 1
			coin.x = Math.floor(Math.random() * 600)
			coin.y = Math.floor(Math.random() * 400)
			bomb.x1 = Math.floor(Math.random() * 600)
			bomb.y1 = Math.floor(Math.random() * 400)
			bomb.x2 = Math.floor(Math.random() * 600)
			bomb.y2 = Math.floor(Math.random() * 400)
			bomb.x3 = Math.floor(Math.random() * 600)
			bomb.y3 = Math.floor(Math.random() * 400)

			}
		else if(mouseX > bomb.x1 && bomb.x1 + bomb.width > mouseX
			&& mouseY > bomb.y1  && bomb.y1 + bomb.height > mouseY) {
			restartMenu.draw()
			deathByBomb = true
			gameOver = true
		}
		else if(mouseX > bomb.x2 && bomb.x2 + bomb.width > mouseX
			&& mouseY > bomb.y2 && bomb.y2 + bomb.height > mouseY) {
			restartMenu.draw()
			deathByBomb = true
			gameOver = true
		}
		else if(mouseX > bomb.x3 && bomb.x3 + bomb.width > mouseX
			&& mouseY > bomb.y3 && bomb.y3 + bomb.height > mouseY) {
			restartMenu.draw()
			deathByBomb = true
			gameOver = true
		}
	}
	else {
		if(mouseX > restartMenu.restartBtnX && restartMenu.
			restartBtnX + 100 > mouseX && 
			mouseY > restartMenu.restartBtnY && restartMenu.
			restartBtnY + 50 > mouseY) {
			score.count = 0
			timer.time = 1000
			gameOver = false
			coin.x = Math.floor(Math.random() * 600)
			coin.y = Math.floor(Math.random() * 400)
			bomb.x1 = Math.floor(Math.random() * 600)
			bomb.y1 = Math.floor(Math.random() * 400)
			bomb.x2 = Math.floor(Math.random() * 600)
			bomb.y2 = Math.floor(Math.random() * 400)
			bomb.x3 = Math.floor(Math.random() * 600)
			bomb.y3 = Math.floor(Math.random() * 400)
		}
	}
})

var coin = {
	width: 50,
	height: 50,
	x: Math.floor(Math.random() * 600),
	y: Math.floor(Math.random() * 400),
	draw: function() {
		ctx.beginPath()
		ctx.rect(this.x,this.y,this.width,this.height)
		ctx.fillStyle = "yellow"
		ctx.fill()
		ctx.closePath()
		if(this.x == bomb.x && this.y == bomb.y) {
			coin.x = Math.floor(Math.random() * 600)
			coin.y = Math.floor(Math.random() * 400)
		}
		else if(this.x == 600) {
			coin.x = Math.floor(Math.random() * 600)
			coin.y = Math.floor(Math.random() * 400)
		}
		else if(this.y == 600) {
			coin.x = Math.floor(Math.random() * 600)
			coin.y = Math.floor(Math.random() * 400)
		}
	},
}

var bomb = {
	width: 50,
	height: 50,
	x1: Math.floor(Math.random() * 600),
	y1: Math.floor(Math.random() * 400),
	x2: Math.floor(Math.random() * 600),
	y2: Math.floor(Math.random() * 400),
	x3: Math.floor(Math.random() * 600),
	y3: Math.floor(Math.random() * 400),
	draw: function() {
		ctx.beginPath()
		ctx.rect(this.x1,this.y1,this.width,this.height)
		ctx.rect(this.x2,this.y2,this.width,this.height)
		ctx.rect(this.x3,this.y3,this.width,this.height)
		ctx.fillStyle = "red"
		ctx.fill()
		ctx.closePath()
	},
}

var timer = {
	time: 1000,
	countDown: function() {
		this.time -= 1
		if(this.time == 0) {
			gameOver = true
			ranOutOfTime = true
		}
	},
	draw: function() {
		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.font = "30px Arail"
		ctx.fillText("Time: " + this.time,300,30)
		ctx.closePath()
	}
}
var score = {
	count: 0,
	draw: function() {
		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.font = "30px Arial"
		ctx.fillText("Score: " + this.count,10,30)
		ctx.closePath()
	}
}
var restartMenu = {
	width:200,
	height:200,
	x:200,
	y:100,
	restartBtnX: 250,
	restartBtnY: 200,
	draw: function() {
		ctx.beginPath()
		ctx.rect(this.x,this.y,this.width,this.height)
		ctx.fillStyle = "blue"
		ctx.fill()
		ctx.closePath()
		ctx.beginPath()
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.font = "30px Arial"
		if(deathByBomb) {
			ctx.fillText("you Blew UP",100,100)
		}
		if(ranOutOfTime) {
			ctx.fillText("you ran out of time",100,100)
		}
		ctx.fillText("your score was: " + score.count,100,140)
		ctx.closePath()
		ctx.beginPath()
		ctx.rect(this.restartBtnX,this.restartBtnY,100,50)
		ctx.fillStyle = "pink"
		ctx.fill()
		ctx.closePath()
	}
}
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	score.draw()
	coin.draw()
	bomb.draw()
	timer.draw()
	if(!gameOver) {
		timer.countDown()
	}
	if(gameOver) {
		restartMenu.draw()
	}
}
var loop = setInterval(draw, 10)