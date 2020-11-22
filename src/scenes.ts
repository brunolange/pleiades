import * as P5 from "p5";
import {
    Sun,
    Earth,
    Mercury,
    Venus,
} from "./bodies"

type BodySpec = {
    mass: number,
    radius: number,
    r: number,
    position: [number, number],
    velocity: [number, number],
    color: string,
}

type Scene = Array<BodySpec>

type Scenes = {
    [key: string]: Scene
}


export const scenes = (p5: P5): Scenes => {
    const width = p5.width
    const height = p5.height
    const marginTop = 10
    const AU = height/2 - marginTop
    return {
        a_solar_system: [
            {
                ...Sun,
                r: 20,
                position: [width/2, height/2],
                velocity: [0, 0],
                color: "yellow"
            },
            {
                ...Mercury,
                r: 3,
                position: [width/2, marginTop + (1 - .387)*AU],
                velocity: [-7e-5, 0],
                color: "gray"
            },
            {
                ...Venus,
                r: 3,
                position: [width/2, marginTop + (1 - .723)*AU],
                velocity: [-5e-5, 0],
                color: "orange"
            },
            {
                ...Earth,
                r: 3,
                position: [width/2, 10],
                velocity: [-4.2e-5, 0],
                color: "blue",
            }
        ]
    }
}
