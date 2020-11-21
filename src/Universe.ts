import { Color } from "p5"
import Body from "./body"

import {
    MyPosition,
    Velocity,
} from "./types"

class Universe {

    bodies: Array<Body>
    positionMap: Map<Body, Array<MyPosition>>
    velocityMap: Map<Body, Velocity>
    colorMap: Map<Body, Color>

    constructor() {
        this.bodies = []
        this.positionMap = new Map<Body, MyPosition[]>()
        this.velocityMap = new Map<Body, Velocity>()
        this.colorMap = new Map<Body, Color>()
    }

    addBody(body: Body, position: MyPosition, velocity: Velocity, color: Color) {
        this.bodies.push(body)
        this.positionMap.set(body, [position])
        this.velocityMap.set(body, velocity)
        this.colorMap.set(body, color)
    }

    position(body: Body) {
        const positions = this.positionMap.get(body)
        return positions[positions.length - 1]
    }

    velocity(body: Body) {
        return this.velocityMap.get(body)
    }

    color(body: Body) {
        return this.colorMap.get(body)
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