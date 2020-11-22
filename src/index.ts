import Universe from "./Universe"
import Body from "./Body"
import * as P5 from "p5";
import { MyPosition } from "./types"
import { scenes } from "./scenes"

const SCENE = "dance"

const sketch = (p5: P5) => {

    let universe: Universe
    let ticks: number

    const loadScene = (name: string): [Universe, number] => {
        const allScenes = scenes(p5)
        const scene = allScenes[name]
        const universe = new Universe(p5, {
            topology: scene.topology,
            G: scene.G,
            mpp: scene.mpp,
        })

        scene.bodies.forEach(specs => {
            universe.addBody(
                new Body(specs.mass, specs.r),
                p5.createVector.apply(null, specs.position),
                p5.createVector.apply(null, specs.velocity),
                p5.color(specs.color),
            )
        })

        return [universe, scene.ticks]
    }

    const drawBody = (body: Body, position: MyPosition, color: P5.Color) => {
        const radius = body.radius
        p5.noStroke()
        p5.fill(color)
        p5.ellipse(position.x, position.y, radius*2, radius*2)
    }

    p5.setup = () => {
        p5.createCanvas(770, 770)

        const [u, t] = loadScene(SCENE)
        universe = u
        ticks = t
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

        if (frameRate == -1 || p5.frameCount % 10 == 0) frameRate = p5.frameRate()
        p5.fill(0)
        p5.rect(0, 0, 27, 27)
        p5.fill(255)
        p5.text(Math.round(frameRate).toString(), 7, 17)

        for (let i=0; i<ticks; i++) {
            universe.tick()
        }
    }
}

new P5(sketch)
