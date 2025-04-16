# AVS inteligent traffic control system

## Implemented algorythm for traffic control
I thought of a system that relies on the time the vehicle waits at the crossroad. 
The priority is assigned to the vehicle that has waited the longest, with an exception for the Emergency vehicles.

The traffic  is considered in four non-colliding route patterns:
```ts
[
    [
        { startRoad: Direction.SOUTH, endRoad: Direction.WEST, type: Manoeuvres.LEFTTURN },
        { startRoad: Direction.NORTH, endRoad: Direction.EAST, type: Manoeuvres.LEFTTURN },
    ],
    [
        { startRoad: Direction.SOUTH, endRoad: Direction.EAST, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.SOUTH, endRoad: Direction.NORTH, type: Manoeuvres.STRAIGHT },
        { startRoad: Direction.NORTH, endRoad: Direction.WEST, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.NORTH, endRoad: Direction.SOUTH, type: Manoeuvres.STRAIGHT },
    ],
    [
        { startRoad: Direction.WEST, endRoad: Direction.NORTH, type: Manoeuvres.LEFTTURN },
        { startRoad: Direction.EAST, endRoad: Direction.SOUTH, type: Manoeuvres.LEFTTURN },
    ],
    [
        { startRoad: Direction.WEST, endRoad: Direction.SOUTH, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.WEST, endRoad: Direction.EAST, type: Manoeuvres.STRAIGHT },
        { startRoad: Direction.EAST, endRoad: Direction.NORTH, type: Manoeuvres.RIGHTTURN },
        { startRoad: Direction.EAST, endRoad: Direction.WEST, type: Manoeuvres.STRAIGHT },
    ],
];

```
The priority is assigned to the vehicle in their turn, and the route matching the vehicle's desired manoeuvre is opened. Simultaneously, all non-colliding routes for that path are opened, and different vehicles awaiting their turn can proceed if their manoeuvre matches with the green light. 

Example:
