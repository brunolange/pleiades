const G = 0.0001

class Body {
    constructor(mass, radius) {
        this.mass = mass
        this.radius = radius
        this.density = mass/(4/3*Math.PI*radius**3)
    }
}

let universe = {}
let bodies = []

let state = {
    name: "start",
    previous: null,
    data: {},
}

const stateMachine = {
    start: {
        accept: () => {},
        exit: () => {},
        update: () => {
            bodies.forEach(body => {
                drawBody(body)
                updateBody(body)
            })
        },
        edges: [
            {
                when: () => {
                    if (! mouseIsPressed) return false
                    const reference = createVector(mouseX, mouseY)
                    const body = selectedBody(reference)
                    return body !== null  // freeze when clicking on body
                },
                then: () => "freeze",
            },
            {
                when: () => {
                    if (! mouseIsPressed) return false
                    const reference = createVector(mouseX, mouseY)
                    const body = selectedBody(reference)
                    return body === null
                },
                then: () => "create",
            },
        ],
    },
    freeze: {
        accept: () => {},
        exit: () => {},
        update: () => {
            bodies.forEach(drawBody)
        },
        edges: [
            {
                when: () => ! mouseIsPressed,
                then: () => "start"
            }
        ]
    },
    create: {
        accept: () => {
            const reference = createVector(mouseX, mouseY)
            const body = createBody(reference)
            state.data.body = body
        },
        exit: () => {
            state.data.body = null
        },
        update: () => {
            bodies.forEach(drawBody)
            pumpBody(state.data.body)
        },
        edges: [
            {
                when: () => ! mouseIsPressed,
                then: () => {
                    const { body } = state.data
                    const reference = createVector(mouseX, mouseY)
                    const { position } = universe[body.id]
                    universe[body.id].velocity = position
                        .copy()
                        .mult(-1)
                        .add(reference)
                        .mult(1.1*G)
                    return "start"
                }
            }
        ]
    }
}

function setup() {
    createCanvas(770, 770)

    addBody(
        new Body(40000, 30),
        createVector(width/2, height/2),
        createVector(0, 0)
    )
}

function addBody(body, position, velocity) {
    const n = Object.keys(universe).length
    const id = n + 1
    body.id = id
    universe[id] = {
        body: body,
        position: position,
        velocity: velocity,
    }
    bodies.push(body)
}

function draw() {
    background(0)
    fill(0,0,200)
    tick()
}

function tick() {
    const node = stateMachine[state.name]
    const { accept, update, edges } = node

    if (state.previous != state.name) {
        if (state.previous) {
            stateMachine[state.previous].exit()
        }
        accept()
    }
    state.previous = state.name

    const edge = edges.find(edge => edge["when"]())
    if (edge) {
        state.name = edge.then()
    } else {
        update()
    }
}

function drawBody(body) {
    const s = universe[body.id]
    const r = body.radius
    ellipse(s.position.x, s.position.y, r*2, r*2)
    push()
    translate(s.position)
    textSize(16)
    fill(0, 255, 255)
    text(`${Math.round(body.mass)}`, -r + 5, 5)
    pop()
}

function updateBody(body) {
    const { position, velocity } = universe[body.id]
    const { mass, radius } = body


    let F = createVector(0, 0)
    const m = mass
    for (let b of bodies) {
        if (b.id == body.id) continue
        const M = b.mass
        const D = universe[b.id].position  // distance vector
            .copy()
            .sub(position)

        const d = D.mag()
        if (d < radius + b.radius) {
            continue
        }
        const f = D
            .normalize()
            .mult(G*m*M/d**2)

        F.add(f)
    }

    velocity.add(F.mult(1/m))
    position.add(velocity)

    const {x, y} = position
    if (x < 0) position.x = width
    if (x > width) position.x = 0
    if (y < 0) position.y = height
    if (y > height) position.y = 0
}

function selectedBody(reference) {
    const [body, distance] = closestBody(reference)
    if (distance < body.radius) {
        return body
    }
    return null
}

function createBody(reference) {
    const body = new Body(20, 10)
    addBody(body, reference, createVector(0, 0))
    return body
}

function pumpBody(body) {
    drawBody(body)
    const dr = 0.025
    body.radius += dr
    const r = body.radius
    const ro = body.density
    // body.mass += ro*4/3*Math.PI*(3*r**2*dr + 3*r*dr**2 + dr**3)
    body.mass += 4*Math.PI*ro*r**2 * dr
}

function closestBody(reference) {
    const distances = bodies.map(body => distance(body, reference))
    const minIndex = argmin(distances)
    return [bodies[minIndex], distances[minIndex]]
}

const distance = (body, reference) => universe[body.id].position.dist(reference)

const argmin = xs => xs
    .map((x, i) => [x, i])
    .reduce((acc, curr) => curr[0] < acc[0] ? curr : acc)
    [1]
