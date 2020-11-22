import { Vector } from "p5";

export enum Topology {
    go_on,
    torus,
    moebius_x,
    moebius_y,
    moebius_xy,
}

export type Mass = number
export type Length = number
export type Volume = number
export type Density = number
export type MyPosition = Vector
export type Velocity = Vector
export type Force = Vector
export type UniverseConfig = {
    topology: Topology,
    G: number
    mpp: number // meters per pixel
}
