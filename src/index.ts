import Universe from "./Universe"
import Body from "./Body"
import * as P5 from "p5";
import { MyPosition } from "./types"

const universe = new Universe()

const sketch = (p5: P5) => {

    const drawBody = (body: Body, position: MyPosition) => {
        const radius = body.radius
        p5.ellipse(position.x, position.y, radius*2, radius*2)
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(200, 200)
        universe.addBody(
            new Body(1000, 20),
            p5.createVector(10, 20),
            p5.createVector(0, 0)
        )
    }

    p5.draw = () => {
        p5.background(0)
        for (let body of universe.bodies) {
            const position = universe.position(body)
            drawBody(body, position)
        }
    }
}

new P5(sketch)
