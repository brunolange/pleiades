import Body from "./body"
import { MyPosition } from "./types"
import Universe from "./Universe"

export const distance = (universe: Universe, body: Body, reference: MyPosition) => {
    const position = universe.position(body)
    return position.dist(reference)
}

// export const argmin = xs => xs
//     .map((x, i) => [x, i])
//     .reduce((acc, curr) => curr[0] < acc[0] ? curr : acc)
//     [1]
