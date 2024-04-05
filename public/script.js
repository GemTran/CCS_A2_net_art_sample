document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)

cnv.width = cnv.parentNode.scrollWidth;
cnv.height = cnv.width * 9 / 16;

// get canvas context
const ctx = cnv.getContext ('2d')

const TAU = Math.PI * 2
class Vector {
    constructor (x, y) {
        this.x = x
        this.y = y
    }

    add (v) {
        this.x += v.x
        this.y += v.y
    }

    subtract (v) {
        this.x -= v.x
        this.y -= v.y
    }

    mult (m) {
        this.x *= m
        this.y *= m
    }

    mag () { // using a^2 + b^2 = c^2
        return ((this.x ** 2) + (this.y ** 2)) ** 0.5
    }

    setMag (m) {
        this.mult (m / this.mag ())
    }

    rotate (a) {
        // from "Formula for rotating a vector in 2D" by Matthew Brett
        // https://matthew-brett.github.io/teaching/rotation_2d.html

        const new_x = (this.x * Math.cos (a)) - (this.y * Math.sin (a))
        const new_y = (this.x * Math.sin (a)) + (this.y * Math.cos (a))

        this.x = new_x
        this.y = new_y
    }

    clone () {
        return new Vector (this.x, this.y)
    }
}

function vector_from_angle (angle, magnitude) {
    const x = magnitude * Math.cos (angle)
    const y = magnitude * Math.sin (angle)
    return new Vector (x, y)
}
// these option values give a nice tree, I think
const options = {
    mult : {
        l : 0.6,
        r : 0.7,
    },

    angle : {
        l : -TAU / 4,
        r :  TAU / 7,
    }
}

const seed = new Vector (cnv.width / 2, cnv.height)
const shoot = new Vector (0, -150)

// this time constructing an object with the class
// passing it the same arguments, and also the 
// canvas context, then storing it in a variable
const tree = new Tree (seed, shoot, 8, options, ctx)

// function to draw the frames
// accepts the argument 'now'
// which requestAnimationFrame will pass
// the current time to, in milliseconds
function draw_frame (now) {

    // clear the canvas
    ctx.fillStyle = `white`
    ctx.fillRect (0, 0, cnv.width, cnv.height)

    // convert time to seconds
    // and pass to .draw method of tree
    tree.draw (now / 1000)

    // wait for the next frame 
    // then call draw_frame again
    requestAnimationFrame (draw_frame)
}

// initiate the animation
requestAnimationFrame (draw_frame)

window.onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}