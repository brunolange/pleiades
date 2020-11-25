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
    color: string | P5.Color,
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
        gargantua: {
            topology: Topology.go_on,
            G: 6.67408e-11,
            mpp: 1e17, // meters per pixel
            ticks: 2e4,
            bodies: [
                {
                    mass: 100e6 * Sun.mass,
                    radius: 425 * Sun.radius,
                    r: 30,
                    position: [width/2, height/2],
                    velocity: [0, 0],
                    color: "black",
                },
                {
                    mass: Sun.mass,
                    radius: Sun.radius,
                    r: 3,
                    position: [42, height/2],
                    velocity: [0, 2e-5],
                    color: "yellow",
                }
            ]
        },
        three_is_a_party: {
            topology: Topology.go_on,
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
            ticks: 4,
            bodies: [
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [40, 20],
                    velocity: [.05, 0],
                    color: "orange",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [40, 40],
                    velocity: [.05, 0],
                    color: "purple",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [40, 60],
                    velocity: [0, 0],
                    color: "blue",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [40, 90],
                    velocity: [0.07, 0],
                    color: "green",
                },
                {
                    mass: 1,
                    radius: 1,
                    r: 4,
                    position: [width/2 - 200, height/2 + 120],
                    velocity: [0.03, -0.03],
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
        },
        random: {
            topology: Topology.torus,
            G: 1,
            mpp: 1,
            ticks: 2,
            bodies: [...Array(24)].map(_ => {
                let [m, x, y, u, v, r, g, b, a] = [
                    [1, 8],
                    [3*width/8, 5*width/8],
                    [3*height/8, 5*height/8],
                    [-0.35, 0.35],
                    [-0.35, 0.35],
                    [0, 255],
                    [0, 255],
                    [0, 255],
                    [200, 255],
                ].map(limits => {
                    const [min, max] = limits
                    return p5.random(min, max)
                })

                if (x > width/2 && y < height/2) {
                    u = Math.abs(u)
                    v = -Math.abs(v)
                }

                if (x < width/2 && y < height/2) {
                    u = - Math.abs(u)
                    v = -Math.abs(v)
                }

                if (x < width/2 && y > height/2) {
                    u = - Math.abs(u)
                    v = Math.abs(v)
                }

                if (x > width/2 && y > height/2) {
                    u = Math.abs(u)
                    v = Math.abs(v)
                }

                return {
                    mass: 2,
                    radius: 1,
                    r: 4,
                    position: [x, y],
                    velocity: [u, v],
                    color: p5.color(r, g, b, a)
                }
            })
        }
    }
}
