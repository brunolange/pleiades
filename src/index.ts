import Universe from "./Universe"
import Body from "./Body"
import * as P5 from "p5";
import { MyPosition } from "./types"

const universe = new Universe()

const sketch = (p5: P5) => {

    const drawBody = (body: Body, position: MyPosition) => {
        const radius = body.radius
        p5.noStroke()
        p5.fill("blue")
        p5.ellipse(position.x, position.y, radius*2, radius*2)
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(770, 770)
        universe.addBody(
            new Body(1000, 20),
            p5.createVector(p5.width/2, p5.height/2),
            p5.createVector(0, 0)
        )
    }

    p5.draw = () => {
        p5.fill(0, 8)
        p5.rect(0, 0, p5.width, p5.height)
        for (let body of universe.bodies) {
            const position = universe.position(body)
            drawBody(body, position)
        }
        universe.tick()
    }
}

new P5(sketch)
