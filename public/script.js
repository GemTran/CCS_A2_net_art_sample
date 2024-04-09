document.body.style.margin   = 0
document.body.style.overflow = `hidden`
// Get the canvas element
const cnv = document.getElementById (`cnv_element`)

cnv.width = innerWidth;
cnv.height = innerHeight;

// get canvas context
const ctx = cnv.getContext ('2d')

// var i = 0;
// var steps = 17;
// var colorRate = 8;

// // Define functions for drawing and rotating lines
// // function drawLine(startX, startY, endX, endY) {
// //     ctx.beginPath();
// //     ctx.moveTo(startX, startY);
// //     ctx.lineTo(endX, endY);
// //     ctx.stroke();
// //   }

// // Add the points for drawing the dragon

// var dragon = function (x1, y1, x2, y2, step) 
// {
//   if (step--)
//   {
//     var dx = x2 - x1,
//         dy = y2 - y1;

//     var midX = x1 + (dx - dy) / 2,
//         midY = y1 + (dx + dy) / 2;

//         // drawLine(x1, x2, midX, midY);
//         // drawLine(midX, midY, x2, y2);

//     dragon(midX, midY, x1, y1, step);
//     dragon(midX, midY, x2, y2, step);	

//     //Switch up colors 
//     var r = (i >> (colorRate - 3)) & 255;
//     var g = (i >> (colorRate + 0)) & 255;
//     var b = (i >> (colorRate - 1)) & 255;

//     ctx.fillStyle = 'rgb('+ r +', '+ g +','+ b +')';

//     // // Points as small squares
//     ctx.fillRect(midX, midY, 2, 2);
//     i++;
//   }
// };

// dragon( 
//   cnv.width * 3/16,  cnv.height/3, /* start */ 
//   cnv.width * 11/16, cnv.height/3, /* end */ 
//   steps
// );



const scaling = Math.SQRT2;
let i = 0;
function dragonCurve (x, y, length, angle, limit) {
  const endX = x + length * Math.cos (angle);
  const endY = y + length * Math.sin (angle);
  const next_len = length / scaling;
  const next_lim = limit - 1;

  //make exit condition
  if (limit <= 0) {
    ctx.moveTo(x,y);
    ctx.lineTo(endX, endY);
    
    return;
  }
  dragonCurve(
    x, y, next_len, angle - Math.PI/4, next_lim);

  dragonCurve(
    endX, endY, next_len, angle + 5 * Math.PI/4, next_lim);
  
}

// ctx.strokeStyle = "black";
ctx.strokeStyle = "green";
ctx.beginPath();
dragonCurve(cnv.width/3, cnv.height/4, cnv.width*2/3, Math.PI/2 , 14);
ctx.stroke();





// const TAU = Math.PI * 2
// class Vector {
//     constructor (x, y) {
//         this.x = x
//         this.y = y
//     }

//     add (v) {
//         this.x += v.x
//         this.y += v.y
//     }

//     subtract (v) {
//         this.x -= v.x
//         this.y -= v.y
//     }

//     mult (m) {
//         this.x *= m
//         this.y *= m
//     }

//     mag () { // using a^2 + b^2 = c^2
//         return ((this.x ** 2) + (this.y ** 2)) ** 0.5
//     }

//     setMag (m) {
//         this.mult (m / this.mag ())
//     }

//     rotate (a) {
//         // from "Formula for rotating a vector in 2D" by Matthew Brett
//         // https://matthew-brett.github.io/teaching/rotation_2d.html

//         const new_x = (this.x * Math.cos (a)) - (this.y * Math.sin (a))
//         const new_y = (this.x * Math.sin (a)) + (this.y * Math.cos (a))

//         this.x = new_x
//         this.y = new_y
//     }

//     clone () {
//         return new Vector (this.x, this.y)
//     }
// }

// function vector_from_angle (angle, magnitude) {
//     const x = magnitude * Math.cos (angle)
//     const y = magnitude * Math.sin (angle)
//     return new Vector (x, y)
// }
// // these option values give a nice tree, I think
// const options = {
//     mult : {
//         l : 0.6,
//         r : 0.7,
//     },

//     angle : {
//         l : -TAU / 4,
//         r :  TAU / 7,
//     }
// }

// const seed = new Vector (cnv.width / 2, cnv.height)
// const shoot = new Vector (0, -200)

// // this time constructing an object with the class
// // passing it the same arguments, and also the 
// // canvas context, then storing it in a variable
// const tree = new Tree (seed, shoot, 10, options, ctx)

// // function to draw the frames
// // accepts the argument 'now'
// // which requestAnimationFrame will pass
// // the current time to, in milliseconds
// function draw_frame (now) {

//     // clear the canvas
//     ctx.fillStyle = `grey`
//     ctx.fillRect (0, 0, cnv.width, cnv.height)

//     // convert time to seconds
//     // and pass to .draw method of tree
//     tree.draw (now / 1000)

//     // wait for the next frame 
//     // then call draw_frame again
//     requestAnimationFrame (draw_frame)
// }

// // initiate the animation
// requestAnimationFrame (draw_frame)

window.onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}