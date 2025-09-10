const FPS = 20
const fineTick = 4
const gravAccel = 20
const gravPerFrame = gravAccel/FPS
testDir = false
fineTickCount = 0
const True = true
const False = false //making sure Python conventions don't bite me later
const u = Math.PI/144
keyCool = false
enablePhysics = false
cv = document.getElementById("canvas") //adding to object didn't work for some reason
function startGaming(){
    ga.start()
    circlePiece = new circle(50, 120, cv.height-120)
    //circlePiece.velX = 10
    aimPiece = new circle(70,0,cv.height,"white",border=5,border_color=false)
    aimBackPiece = new circle(70,0,cv.height,"#00aaff",border=5,border_color=false)
    //testPiece = new circle(70,100,cv.height-100,"#0088ff",border=5,border_color=false,arc_start=Math.PI,arc_end=3*Math.PI/2)
}
var ga = {
    start: function() {
        this.ctx = cv.getContext("2d")
        this.interval = setInterval(update,Math.round(100/FPS))
        ga.key = false
        window.addEventListener("keydown",function (e) {ga.key = e.key})
        window.addEventListener("keyup",function (e) {ga.key = false})
    },
    clear: function() {
        this.ctx.clearRect(0,0,cv.width,cv.height)
    }
}
function circle(radius, x, y, color="#66ffcf",border=0,border_color=false,dofill=true,arc_start=0,arc_end=2*Math.PI) {
    if (border_color) {this.borderColor = border_color}
    else {this.borderColor = color}
    this.radius = radius
    this.x = x
    this.y = y
    this.velX = 0
    this.velY = 0
    this.arcStart = arc_start
    this.arcEnd = arc_end
    this.pieceUpdate = function() {
        ctx = ga.ctx
        this.x += Math.round(this.velX)
        this.y += Math.round(this.velY)
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,this.arcStart,this.arcEnd)
        if (border > 1) {ctx.lineWidth = border} else {
            ctx.fillStyle = color
            ctx.fill()
        } //border=0 means the shape will be filled
        ctx.strokeStyle = this.borderColor
        ctx.stroke()
    }
    this.pieceUpdate()
}
function phys_dump(obj) {
    console.log("dump: x "+obj.x+"velX"+obj.velX+" y "+obj.y+" velY "+obj.velY)
}
function phys_reset(x=120,y=cv.height-120,obj=circlePiece) {
    obj.x = x
    obj.y = y
    obj.velX = 0
    obj.velY = 0
    enablePhysics = false
}
function physics() {
    circlePiece.velY -= gravPerFrame
    if (circlePiece.x > cv.width-30) {phys_dump(circlePiece); phys_reset()}
}
function update() {
    ga.clear()
    if (false) {
    if (!testDir) {
        if (circlePiece.x < cv.width-1) {
            //where is "pass"
        }
        else {testDir = true; circlePiece.velX *= -1}
    } else {
        if (circlePiece.x > 0) {} else {
            //console.log("flip to false" + circlePiece.x)
            testDir = false
            circlePiece.velX *= -1
        }
    } //peak direction flipping code
    }
    if (ga.key == "f" && !enablePhysics) {enablePhysics = true; giveImpulse(aiming,50,circlePiece)}
    else if (ga.key == "w" && keyCool) {aimUp();keyCool = false}
    else if (ga.key == "s" && keyCool) {aimDown();keyCool = false}
    if (!ga.key) {keyCool = false}
    else {keyCool = true}
    if (fineTickCount > fineTick) {
        if (enablePhysics) {fineTickCount=0;physics();console.log("fine tick, velY "+circlePiece.velY)}
    } else {fineTickCount += 1}
    aimPiece.arcStart = aiming-2*u
    aimPiece.arcEnd = aiming+2*u
    console.log(aimPiece.arcStart+" "+0.5*aiming/u+" "+aimPiece.arcEnd)
    circlePiece.pieceUpdate()
    aimBackPiece.pieceUpdate()
    aimPiece.pieceUpdate()
    //testPiece.pieceUpdate()
}
aiming = 2*Math.PI-16*u
const aim_boundary = 3*Math.PI/2

function aimUp() {
    if (aiming > aim_boundary) {aiming -= (2*u)}
}
function aimDown() {
    if (aiming < 2*Math.PI) {
        aiming += 2*u
    }
}
function giveImpulse(angle,impulse,obj=circlePiece) {
    impX = Math.cos(2*Math.PI-angle)*impulse
    console.log("prev velX "+obj.velX+" new "+impX)
    impY = Math.sin(2*Math.PI-angle)*impulse
    console.log("prev velY " + obj.velY + " new " + impY + " sin " + Math.sin(2*Math.PI-angle))
    obj.velX += impX
    obj.velY += impY
}
startGaming()