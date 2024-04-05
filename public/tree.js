// class definition
class Tree {

    // constructor receiving all the arguments 
    // the recursive function did
    // plus the canvas context
    constructor (base, stem, generation, options, ctx) {

        // storing all the arguments passed in
        // as properties of the new object
        this.base       = base
        this.stem       = stem
        this.generation = generation
        this.options    = options
        this.ctx        = ctx

        // create an empty array for the branches
        this.branches   = []

        // unless this is the last generation
        // run the .add_branches method
        if (generation > 0) this.add_branches ()

        // arbitrary width, dialed in via trial + error
        this.sway_width = 0.03

        // random ish sway rate
        // as this.generation decreases
        // towards the top of the tree
        // the sway rate gets faster
        this.sway_rate  = Math.random () * 2 / this.generation
    }

    // a method to add more branches
    add_branches () {

        // this is to find the absolute position
        // of the end of the branch
        const end = this.base.clone ()

        // add the stem (relative position)
        // to the absolute position of the base
        end.add (this.stem)

        // clone the stem for the L branch
        const L_stem = this.stem.clone ()

        // transform it according to the values
        // stored in the options object
        L_stem.rotate (this.options.angle.l)
        L_stem.mult (this.options.mult.l)

        // do the same for the R branch
        const R_stem = this.stem.clone ()
        R_stem.rotate (this.options.angle.r)
        R_stem.mult (this.options.mult.r)

        // decrease the generation number
        const next_gen = this.generation - 1

        // create two new Tree objects
        const l = new Tree (end, L_stem, next_gen, this.options, this.ctx)
        const r = new Tree (end, R_stem, next_gen, this.options, this.ctx)

        // push both into the .branches array
        this.branches.push (l)
        this.branches.push (r)
    }

    // the draw funcion accepts a now argument
    // which is the time in seconds
    draw (now) {

        // calculates the phase between 0 - 1
        const sway_phase = (now * this.sway_rate) % 1

        // turns the phase into a sinusoid
        // with an amplitude = this.sway_width 
        const sway_angle = Math.sin (sway_phase * TAU) * this.sway_width

        // we will make a new stem to rotate
        const sway_stem = this.stem.clone ()

        // rotate it with the sway angle
        sway_stem.rotate (sway_angle)

        // new absolute end point
        const end = this.base.clone ()

        // add the swaying stem to get
        // the new absolute position 
        // of the end of the stem
        end.add (sway_stem)

        // draw the line
        this.ctx.beginPath ()
        this.ctx.moveTo (this.base.x, this.base.y)
        this.ctx.lineTo (end.x, end.y)
        this.ctx.stroke ()

        // for each of the branches
        this.branches.forEach (b => {

            // assign the new absolute end point
            // as the branches base keeping the
            // branches attached to each other
            b.base = end.clone ()

            // call the branch's .draw method
            b.draw (now)
        })
    }
}