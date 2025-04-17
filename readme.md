# AVS inteligent traffic control system

## Overview

## Functional Requirements Fulfilled
- Realistic four-way intersection simulation with four approaches: **north, south, east, and west**
- Vehicles can perform the following manoeuvres: **left turn, right turn, and going straight**
- Vehicles are placed into queues based on their entry direction
- The system assigns green lights to non-colliding traffic routes using predefined route groups
- Traffic priority is based on how long a vehicle has been waiting at the intersection
- Colliding-free signal phases are ensured — no colliding routes receive green lights at the same time

## Aditional Features
- Emergency vehicle preemption is implemented: emergency vehicles get immediate passage regardless of queue position

## Traffic Control Algorithm

I thought of a system that relies on the time the vehicle waits at the crossroad.
The priority is assigned to the vehicle that has waited the longest, with an exception for the Emergency vehicles.

The traffic is considered in four non-colliding route patterns:
![alt text](scenarios.jpg)

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

### Example behaviour

Input JSON:

```json
{
    "commands": [
        {
            "type": "addVehicle",

            "vehicleId": "vehicle1",

            "startRoad": "north",

            "endRoad": "east"
        },
        {
            "type": "addVehicle",

            "vehicleId": "vehicle2",

            "startRoad": "south",

            "endRoad": "west"
        },
        {
            "type": "step"
        },
        {
            "type": "step"
        }
    ]
}
```

Example stage before arbitration:

```json
{
  "north": {
    "priorityLeftSignalLight": "red",
    "straightRightSignalLight": "red",
    "queue": [ [Object] ]
  },
  "east": {
    "priorityLeftSignalLight": "red",
    "straightRightSignalLight": "red",
    "queue": []
  },
  "south": {
    "priorityLeftSignalLight": "red",
    "straightRightSignalLight": "red",
    "queue": [ [Object] ]
  },
  "west": {
    "priorityLeftSignalLight": "red",
    "straightRightSignalLight": "red",
    "queue": []
  }
}
```

At this stage, Traffic Control System assigned priority to vehicle1 which has waited 2 rounds at the time of arbitration. The left protected arrow has been set to green light on both sides. See Scenario 1.

Two individual instances of vehicle (vehicle1, vehicle2) leave the corssroad simultaniously as the signal for their manouevre is green.

Console output:

```console
vehicle1 leaves the crossroad!
vehicle2 leaves the crossroad!
```

Example stage after arbitration:

```json
{
    "north": {
        "priorityLeftSignalLight": "green",
        "straightRightSignalLight": "red",
        "queue": []
    },
    "east": {
        "priorityLeftSignalLight": "green",
        "straightRightSignalLight": "red",
        "queue": []
    },
    "south": {
        "priorityLeftSignalLight": "green",
        "straightRightSignalLight": "red",
        "queue": []
    },
    "west": {
        "priorityLeftSignalLight": "green",
        "straightRightSignalLight": "red",
        "queue": []
    }
}
```

Output JSON:

```json
{
    "stepStatuses": [
        {
            "leftVehicles": [
                "vehicle1", 
                "vehicle2"
            ]
        },
        {
            "leftVehicles": [

            ]
        }
    ]
}
```

## Emergency Vehicle Preemption

When the system detects that an emergency vehicle appears at the crossroad, all lights instantly change the priority to let the emergency vehicle pass safely. This approach is a common practice in the United States to improve emergency response times. For further details, see: https://en.wikipedia.org/wiki/Traffic_signal_preemption

In order to simulate the emergency vehicle, add a vehicle with ID which contains word: `emergency`
![emergency](https://github.com/user-attachments/assets/0d021013-07cf-4be9-9e17-bea86f4f847f)

As demonstrated in the example above, although the **vehicle** originating from the **north** has been waiting longer than the **emergency vehicle** coming from the **south**, priority is given to the **emergency vehicle** to ensure immediate passage regardless of the queue position.

