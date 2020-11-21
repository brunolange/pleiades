import Universe from "./Universe"
import Body from "./Body"
import * as P5 from "p5";
import { MyPosition } from "./types"

const sketch = (p5: P5) => {

    const universe = new Universe(p5)

    const drawBody = (body: Body, position: MyPosition, color: P5.Color) => {
        const radius = body.radius
        p5.noStroke()
        p5.fill(color)
        p5.ellipse(position.x, position.y, radius*2, radius*2)
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(770, 770)
        universe.addBody(
            new Body(1000, 20),
            p5.createVector(p5.width/2, p5.height/2),
            p5.createVector(0, 0),
            p5.color("blue")
        )
    }

    p5.draw = () => {
        p5.fill(0, 8)
        p5.rect(0, 0, p5.width, p5.height)
        for (let body of universe.bodies) {
            const position = universe.position(body)
            const color = universe.color(body)
            drawBody(body, position, color)
        }
        universe.tick()

        if (p5.frameCount == 80) {
            universe.addBody(
                new Body(10, 7),
                p5.createVector(p5.width/2, p5.height/4),
                p5.createVector(-1, 0),
                p5.color("blue")
            )
            universe.addBody(
                new Body(10, 7),
                p5.createVector(p5.width/2, 3*p5.height/4),
                p5.createVector(1, 0),
                p5.color("blue")
            )
        }
    }
}

new P5(sketch)
