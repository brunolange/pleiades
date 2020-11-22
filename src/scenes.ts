import * as P5 from "p5";
import {
    Sun,
    Earth,
    Mercury,
    Venus,
} from "./bodies"
import { Topology } from "./types";

type BodySpec = {
    mass: number,
    radius: number,
    r: number,
    position: [number, number],
    velocity: [number, number],
    color: string,
}

type Scene = {
    topology: Topology,
    G: number,
    mpp: number,
    ticks: number,
    bodies: Array<BodySpec>
}

type Scenes = {
    [key: string]: Scene
}

export const scenes = (p5: P5): Scenes => {
    const width = p5.width
    const height = p5.height
    const marginTop = 10
    const AU = height/2 - marginTop
    return {
        a_solar_system: {
            topology: Topology.go_on,
            G: 6.67408e-11,
            mpp: 1e13, // meters per pixel
            ticks: 1e4,
            bodies: [
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
            ],
        },
        three_is_a_party: {
            topology: Topology.moebius_x,
            G: 1e2,
            mpp: 1,
            ticks: 1,
            bodies: [
                {
                    mass: 1,
                    radius: 1e3,
                    r: 5,
                    position: [width/2, height/2 - 150],
                    velocity: [1, 0],
                    color: "orange",
                },
                {
                    mass: 12,
                    radius: 1e3,
                    r: 7,
                    position: [width/2, height/2],
                    velocity: [0, 0],
                    color: "blue",
                },
                {
                    mass: 1,
                    radius: 1e3,
                    r: 4,
                    position: [width/2, height/2 + 150],
                    velocity: [-0.5, 0],
                    color: "green",
                }
            ]
        },
        dance: {
            topology: Topology.moebius_xy,
            G: 1,
            mpp: 1,
            ticks: 10,
            bodies: [
                {
                    mass: 1,
                    radius: 1,
                    r: 7,
                    position: [width/2 - 220, height/2 - 150],
                    velocity: [.03, 0],
                    color: "orange",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 5,
                    position: [width/2 - 220, height/2],
                    velocity: [0, 0],
                    color: "blue",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [width/2 - 220, height/2 + 90],
                    velocity: [0.04, 0],
                    color: "green",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [width/2 - 200, height/2 + 120],
                    velocity: [0.02, 0.02],
                    color: "red",
                }
            ]
        },
        test: {
            topology: Topology.torus,
            G: 1,
            mpp: 1,
            ticks: 1,
            bodies: [
                {
                    mass: 1,
                    radius: 1,
                    r: 7,
                    position: [width/2, height/2],
                    velocity: [1, -2],
                    color: "orange",
                }
            ]
        }
    }
}
