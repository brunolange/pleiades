import Body from "./body"

import {
    BodyId,
    MyPosition,
    Velocity,
} from "./types"

class Universe {

    bodies: Array<Body>
    position_map: Map<BodyId, Array<MyPosition>>
    velocity_map: Map<BodyId, Velocity>

    constructor() {
        this.bodies = []
        this.position_map = new Map<BodyId, MyPosition[]>()
        this.velocity_map = new Map<BodyId, Velocity>()
    }

    addBody(body: Body, position: MyPosition, velocity: Velocity) {
        const count = this.bodies.length
        const bodyId = count + 1

        body.id = bodyId

        this.bodies.push(body)
        this.position_map.set(bodyId, [position])
        this.velocity_map.set(bodyId, velocity)
    }

    position(body: Body) {
        const positions = this.position_map.get(body.id)
        return positions[positions.length - 1]
    }

    tick() {
        this.bodies.forEach(body => {
            const position = this.position_map.get(body.id);
            const velocity = this.position_map.get(body.id);
            //
        })
    }
}

export default Universe;