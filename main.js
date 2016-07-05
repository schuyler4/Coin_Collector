var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
//images Varibles
var goodCoin = new Image()
goodCoin.src = 'goodCoin.png'

var badCoin = new Image() 
badCoin.src = 'badCoin.png'

var playAgainBtn = new Image()
playAgainBtn.src = 'playAgainBtn.png'

var badMenu = new Image()
badMenu.src = 'badMenu.png'

var timeMenu = new Image()
timeMenu.src = 'timeMenu.png'
//sound Varibles
var badSound = new Audio('badSound.wav')
var coinSound = new Audio('pickUpSound.wav')

//death Varibles
deathByBomb = false
ranOutOfTime = false
gameOver = false
//mouse event listener
ctx.canvas.addEventListener('mousedown', function(event) {
	var mouseX = event.clientX - ctx.canvas.offsetLeft
	var mouseY = event.clientY - ctx.canvas.offsetTop 
	if(!gameOver) {
		if(coin.x < mouseX && coin.x + 42 > mouseX && coin.y < mouseY && coin.y + 42
			> mouseY) {
			coinSound.play()
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
		else if(bomb.x1 < mouseX && bomb.x1 + 42 > mouseX && bomb.y1 < mouseY && 
			bomb.y1+ 42 > mouseY) {
			badSound.play()
			restartMenu.draw()
			deathByBomb = true
			gameOver = true
		}
		else if(bomb.x2 < mouseX && bomb.x2 + 42 > mouseX && bomb.y2 < mouseY 
			&& bomb.y2 + 42 > mouseY) {
			badSound.play()
			restartMenu.draw()
			deathByBomb = true
			gameOver = true
		}
		else if(bomb.x3 < mouseX && bomb.x3 + 42 > mouseX && bomb.y3 < mouseY 
			&& bomb.y3 + 42 > mouseY) {
			badSound.play()
			restartMenu.draw()
			deathByBomb = true
			gameOver = true
		}
	}
	else {
		if(restartMenu.restartBtnX < mouseX && restartMenu.restartBtnX + 100
			> mouseX && restartMenu.restartBtnY < mouseY && restartMenu.restartBtnY + 
			50 > restartMenu.restartBtnY) {
			score.count = 0
			timer.time = 1000
			gameOver = false
			coin.x = 0 //Math.floor(Math.random() * 600)
			coin.y = 0//Math.floor(Math.random() * 400)
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
	x: 0, //Math.floor(Math.random() * 600),
	y: 0 ,//Math.floor(Math.random() * 400),
	size: 42,
	draw: function() {
		ctx.beginPath()
		ctx.drawImage(goodCoin, this.x, this.y)
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
	x1: Math.floor(Math.random() * 600),
	y1: Math.floor(Math.random() * 400),
	x2: Math.floor(Math.random() * 600),
	y2: Math.floor(Math.random() * 400),
	x3: Math.floor(Math.random() * 600),
	y3: Math.floor(Math.random() * 400),
	draw: function() {
		ctx.beginPath()
		ctx.drawImage(badCoin,this.x1,this.y1)
		ctx.drawImage(badCoin,this.x2,this.y2)
		ctx.drawImage(badCoin,this.x3,this.y3)
		ctx.closePath()
	},
}

var timer = {
	time: 999,
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
		ctx.font = "30px Arial"
		ctx.fillText("Time: " + this.time,460,30)
		ctx.closePath()
	}
}
var score = {
	count: 0,
	draw: function() {
		ctx.beginPath()
		ctx.font = "30px Arial"
		ctx.fillStyle = "white"
		ctx.fill()
		ctx.fillText("Score: " + this.count,10,30)
		ctx.closePath()
	}
}
var restartMenu = {
	width:200,
	height:200,
	x:200,
	y:100,
	restartBtnX: 250,//250
	restartBtnY: 200,//200
	draw: function() {
		if(deathByBomb) {
			ctx.drawImage(badMenu,this.x,this.y)
		}
		if(ranOutOfTime) {
			ctx.drawImage(timeMenu,this.x,this.y)
		}
		ctx.font = "15px Arial"
		ctx.fillStyle = "white"
		ctx.fillText(score.count,335,174)
		ctx.drawImage(playAgainBtn,this.restartBtnX,this.restartBtnY)
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