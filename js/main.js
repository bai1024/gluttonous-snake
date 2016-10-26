var width = 10
var height = 10
var container = document.getElementById("container")

for(var i = 0; i < width * height; i++) {
  var div = document.createElement("div")
  container.appendChild(div)
}

var snake = {
  positions: [{x: 1, y: 1}],
  direction: "R",
  fruit: {x: 3, y: 4},
}

document.addEventListener("keydown", function(evt) {
  if(evt.keyCode === 32) { 
    function getSquareByPos(pos) {
      var index = pos.y * width + pos.x
      return document.querySelectorAll("#container div")[index]
    }

  function drawSnakeAndFruit() {
      var divs = document.querySelectorAll("#container div")
      for(var i = 0; i < divs.length; i++) {
        divs[i].className = ""
      }

    snake.positions.forEach(function(pos) {
      getSquareByPos(pos).className = "snake"})
      getSquareByPos(snake.positions[0]).className = "snakehead"
      getSquareByPos(snake.fruit).className = "fruit"
    }

    var h1 = document.getElementById("score")

  function updateScore() {
      var score = (snake.positions.length - 1) * 10
      h1.innerText = "Score:" + score
      $(".alert-content").find("strong").text(score)
    }

    function mainLoop() {
      var snakeHead = snake.positions[0]
      if(snakeHead.x === snake.fruit.x && snakeHead.y === snake.fruit.y) {
        var lastBody = snake.positions[snake.positions.length - 1]
        var newBody = {}
        if(snake.direction === "U") {
          newBody.y =  lastBody.y + 1
          newBody.x = lastBody.x
        }
        if(snake.direction === "D") {
          newBody.y = lastBody.y - 1
          newBody.x = lastBody.x
        }
        if(snake.direction === "L") {
          newBody.x =  lastBody.x + 1
          newBody.y = lastBody.y
        }
        if(snake.direction === "R") {
          newBody.x =  lastBody.x - 1
          newBody.y = lastBody.y
        }
        
        snake.positions.push(newBody)
        snake.fruit.x = Math.floor(Math.random() * width)
        snake.fruit.y = Math.floor(Math.random() * height)
      }

      var lastPosX = snake.positions[0].x
      var lastPosY = snake.positions[0].y
      if(snake.direction === "L") {
        snake.positions[0].x--
        snake.positions.slice(1).forEach(function(pos) {
          var a = pos.x
          var b = pos.y
          pos.x = lastPosX
          pos.y = lastPosY
          lastPosX = a
          lastPosY = b
        })
      }
      if(snake.direction === "R") {
        snake.positions[0].x++
        snake.positions.slice(1).forEach(function(pos) {
          var a = pos.x
          var b = pos.y
          pos.x = lastPosX
          pos.y = lastPosY
          lastPosX = a
          lastPosY = b
        })
      }
      if(snake.direction === "U") {
        snake.positions[0].y--
        snake.positions.slice(1).forEach(function(pos) {
          var a = pos.x
          var b = pos.y
          pos.x = lastPosX
          pos.y = lastPosY
          lastPosX = a
          lastPosY = b
        })
      }
      if(snake.direction === "D") {
        snake.positions[0].y++
        snake.positions.slice(1).forEach(function(pos) {
          var a = pos.x
          var b = pos.y
          pos.x = lastPosX
          pos.y = lastPosY
          lastPosX = a
          lastPosY = b
        })
      }

      var isDead = false
      if(snakeHead.x < 0 || snakeHead.x >= width) {
        isDead = true
      }
      if(snakeHead.y < 0 || snakeHead.y >= height) {
        isDead = true
      }
      snake.positions.slice(1).forEach(function(pos) {
        if(pos.x === snakeHead.x && pos.y === snakeHead.y) {
          isDead = true
        }
      })
      if(isDead) {
        clearInterval(interval)
        h1.innerText += " Game Over"
        $(".alert").css("display","flex")
        return
      } else {
        drawSnakeAndFruit()
        updateScore()
      }
    }

    document.addEventListener("keydown", function(evt) {
      // up
      if(evt.keyCode === 38) {
        var newPosX = snake.positions[0].x
        var newPosY = snake.positions[0].y - 1
        var isValid = true
        snake.positions.slice(1).forEach(function(pos) {
          if(pos.x === newPosX && pos.y === newPosY) {
            isValid = false
          }
        })
        if(isValid) {
          snake.direction = "U"
        }
      }
      // down
      if(evt.keyCode === 40) {
        var newPosX = snake.positions[0].x
        var newPosY = snake.positions[0].y + 1
        var isValid = true
        snake.positions.slice(1).forEach(function(pos) {
          if(pos.x === newPosX && pos.y === newPosY) {
            isValid = false
          }
        })
        if(isValid) {
          snake.direction = "D"
        }
      }
      // left
      if(evt.keyCode === 37) {
        var newPosX = snake.positions[0].x - 1
        var newPosY = snake.positions[0].y
        var isValid = true
        snake.positions.slice(1).forEach(function(pos) {
          if(pos.x === newPosX && pos.y === newPosY) {
            isValid = false
          }
        })
        if(isValid) {
          snake.direction = "L"
        }
      }
      // right
      if(evt.keyCode === 39) {
        var newPosX = snake.positions[0].x + 1
        var newPosY = snake.positions[0].y
        var isValid = true
        snake.positions.slice(1).forEach(function(pos) {
          if(pos.x === newPosX && pos.y === newPosY) {
            isValid = false
          }
        })
        if(isValid) {
          snake.direction = "R"
        }
      }
    })

  updateScore()
  var interval = setInterval(mainLoop, 150)
  }

})

$(".confirm").click(function(){
  window.location.reload() 
})
