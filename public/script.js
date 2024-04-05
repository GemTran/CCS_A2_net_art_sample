document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)

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

const seed = new Vector(cnv.width / 2, cnv.height);
const shoot = new Vector (0, -150);

const tree = new Tree (seed, shoot, 8, ctx)

// the current time to, in milliseconds
function draw_frame (now) {

   // clear the canvas
   ctx.fillStyle = `turquoise`
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