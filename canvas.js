var canvas = document.getElementById('canvas'),
    c = canvas.getContext('2d'),
    circleCount = 500,
    circleArray = [],
    colorArray = [
        '#B71C1C',
        '#E53935', 
        '#880E4F', 
        '#D81B60', 
        '#4A148C', 
        '#AA00FF', 
        '#D500F9', 
        '#311B92', 
        '#6200EA', 
        '#2962FF',
        '#F53A33',
        '#128C87',
        '#FEDD55',
        '#FF9130'
    ],
    mouse = {
        x: undefined,
        y: undefined
    },
    maxRadius = 50

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x
    mouse.y = e.y
})


canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.background = 'black'


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y 
    this.dx = dx
    this.dy = dy 
    this.radius = radius
    this.circleColor = colorArray[Math.ceil(Math.random() * colorArray.length)],
    this.oldRedius = radius

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.circleColor
        c.fill()
        c.closePath()
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = - this.dx
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = - this.dy
        }

        if (this.x - mouse.x < 50 && this.x - mouse.x > -50 && this.y - mouse.y < 50 && this.y - mouse.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.oldRedius) {
            this.radius -= 1
        }
    
        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}


function init() {
    circleArray = []
    for (var i = 0; i < circleCount; i++){
        var radius = Math.ceil(Math.random() * 10),
            x = Math.random() * (innerWidth - radius * 2) + radius,
            y = Math.random() * (innerHeight - radius * 2) + radius,
            dx = (Math.random() - .5 ) * 3, 
            dy = (Math.random() - .5) * 3
    
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, .15)'
    c.fillRect(0, 0, innerWidth, innerHeight)
    // c.clearRect(0, 0, innerWidth, innerHeight)

    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update()
    }

}

animate()

init()