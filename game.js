const FPS = 20
testDir = false
const True = true
const False = false //making sure Python conventions don't bite me later
cv = document.getElementById("canvas") //adding to object didn't work for some reason
function startGaming(){
    ga.start()
    circlePiece = new circle(100, 300,300)
}
var ga = {
    start: function() {
        this.ctx = cv.getContext("2d")
        this.interval = setInterval(update,Math.round(100/FPS))
    },
    clear: function() {
        this.ctx.clearRect(0,0,cv.width,cv.height)
    }
}
function circle(radius, x, y, color="#66ffcf") {
    this.radius = radius
    this.x = x
    this.y = y
    this.pieceUpdate = function() {
        console.log("piece update "+this.x)
        ctx = ga.ctx
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
        ctx.strokeStyle = color
        ctx.stroke()
    }
}
function update() {
    ga.clear()
    if (!testDir) {
        if (circlePiece.x < cv.width-1) {
            circlePiece.x += 10
        }
        else {testDir = true}
    } else {
        if (circlePiece.x > 0) {circlePiece.x -= 10} else {
            console.log("flip to false" + circlePiece.x)
            testDir = false
        }
    } //peak direction flipping code
    console.log("x "+circlePiece.x+" dir "+testDir)
    circlePiece.pieceUpdate()
}

startGaming()