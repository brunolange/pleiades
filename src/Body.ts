import {
    Density,
    Volume,
    Mass,
    Length
} from "./types"

class Body {

    density: Density
    volume: Volume

    constructor(
        public mass: Mass,
        public radius: Length
    ) {
        this.volume = 4/3 * Math.PI * Math.pow(this.radius, 3)
        this.density = this.mass/this.volume
    }
}

export default Body
