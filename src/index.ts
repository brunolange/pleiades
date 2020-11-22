import Universe from "./Universe"
import Body from "./Body"
import * as P5 from "p5";
import { MyPosition } from "./types"

const Sun = new Body(1.989e30, 20)
const Earth = new Body(5.972e24, 3)
const Venus = new Body(4.867e24, 3)
const Mercury = new Body(4.867e24, 3)
// const Moon = new Body(7.348e22, 1)

const sketch = (p5: P5) => {

    const universe = new Universe(p5)

    const drawBody = (body: Body, position: MyPosition, color: P5.Color) => {
        const radius = body.radius
        p5.noStroke()
        p5.fill(color)
        p5.ellipse(position.x, position.y, radius*2, radius*2)
    }

    p5.setup = () => {
        p5.createCanvas(770, 770)

        const marginTop = 10
        const au = p5.height/2 - marginTop

        universe.addBody(
            Earth,
            p5.createVector(p5.width/2, marginTop),
            p5.createVector(-4.2e-5, 0),
            p5.color("blue")
        )
        universe.addBody(
            Venus,
            p5.createVector(p5.width/2, marginTop + (1 - 0.723)*au),
            p5.createVector(-5e-5, 0),
            p5.color("orange")
        )
        universe.addBody(
            Mercury,
            p5.createVector(p5.width/2, marginTop + (1 - .387)*au),
            p5.createVector(-7e-5, 0),
            p5.color("gray")
        )
        universe.addBody(
            Sun,
            p5.createVector(p5.width/2, p5.height/2),
            p5.createVector(0, 0),
            p5.color("yellow")
        )
    }

    let frameRate = -1

    p5.draw = () => {
        p5.fill(0, 8)
        p5.rect(0, 0, p5.width, p5.height)

        for (let body of universe.bodies) {
            const position = universe.position(body)
            const color = universe.color(body)
            drawBody(body, position, color)
        }

        if (frameRate == -1 || p5.frameCount % 60 == 0) frameRate = p5.frameRate()
        p5.fill(255)
        p5.text(Math.round(frameRate).toString(), 7, 17)

        for (let i=0; i<1e4; i++) {
            universe.tick()
        }
    }
}

new P5(sketch)
