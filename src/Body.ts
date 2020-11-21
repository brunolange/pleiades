import {
    Density,
    Volume,
    Mass,
    Length,
    BodyId
} from "./types"

class Body {

    density: Density
    volume: Volume
    _id: BodyId

    constructor(
        public mass: Mass,
        public radius: Length
    ) {
        this.volume = 4/3 * Math.PI * Math.pow(this.radius, 3)
        this.density = this.mass/this.volume
    }

    set id(value: BodyId) {
        this._id = value
    }

    get id() {
        return this._id
    }
}

export default Body
