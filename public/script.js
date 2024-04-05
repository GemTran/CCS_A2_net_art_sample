document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)

const base = new Vector(cnv.width / 2, cnv.height);
const shoot = new Vector (0, -100);

const tree = new Tree (base, shoot, 8, ctx)

const draw_frame = () => {
   ctx.fillStyle = `turquoise`
   ctx.fillRect (0, 0, cnv.width, cnv.height)

   tree.draw (now / 1000)

   requestAnimationFrame (draw_frame)
}

draw_frame ()

window.onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}