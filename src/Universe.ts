import { Color } from "p5"
import * as P5 from "p5";

import Body from "./body"

import {
    MyPosition,
    Force,
    Velocity,
    Constants,
} from "./types"

class Universe {

    constants: Constants

    bodies: Array<Body>
    positionMap: Map<Body, Array<MyPosition>>
    velocityMap: Map<Body, Velocity>
    colorMap: Map<Body, Color>
    p5: P5

    constructor(p5: P5) {
        this.constants = {
            G: 1
        }
        this.bodies = []
        this.positionMap = new Map<Body, MyPosition[]>()
        this.velocityMap = new Map<Body, Velocity>()
        this.colorMap = new Map<Body, Color>()
        this.p5 = p5
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

    updateBody(body: Body) {
        const { G } = this.constants
        const m1 = body.mass
        const r1 = body.radius
        const p1 = this.position(body)
        const F: Force = this.p5.createVector(0, 0)
        for (let other_body of this.bodies) {
            if (body == other_body) continue

            const p2 = this.position(other_body)
            const r2 = other_body.radius
            const m2 = other_body.mass

            const d_hat = p2.copy().sub(p1)
            const d = d_hat.mag()

            if (d < r1 + r2) continue

            const f = d_hat.normalize().mult(G*m1*m2/d**2)
            F.add(f)
        }

        const v = this.velocity(body)
        v.add(F.mult(1/m1))
        p1.add(v)
    }

    tick() {
        this.bodies.forEach(body => {
            const position = this.position(body)
            const velocity = this.velocity(body)
            position.add(velocity)

            this.updateBody(body)
        })
    }
}

export default Universe