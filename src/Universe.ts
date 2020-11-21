import Body from "./body"
import StateMachine from "./StateMachine"

import {
    BodyId,
    MyPosition,
    Velocity,
} from "./types"

class Universe {

    bodies: Array<Body>
    positionMap: Map<BodyId, Array<MyPosition>>
    velocityMap: Map<BodyId, Velocity>

    constructor() {
        this.bodies = []
        this.positionMap = new Map<BodyId, MyPosition[]>()
        this.velocityMap = new Map<BodyId, Velocity>()
    }

    addBody(body: Body, position: MyPosition, velocity: Velocity) {
        const count = this.bodies.length
        const bodyId = count + 1

        body.id = bodyId

        this.bodies.push(body)
        this.positionMap.set(bodyId, [position])
        this.velocityMap.set(bodyId, velocity)
    }

    position(body: Body) {
        const positions = this.positionMap.get(body.id)
        return positions[positions.length - 1]
    }

    velocity(body: Body) {
        return this.velocityMap.get(body.id)
    }

    tick() {
        this.bodies.forEach(body => {
            const position = this.position(body)
            const velocity = this.velocity(body)
            position.add(velocity)
        })
    }
}

export default Universe