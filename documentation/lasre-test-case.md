# LASRE Introductory Tutorial

Language Acquisition System in a Robotic Environment

## Basics

The following commands give a basic introduction to LASRE. After typing in a
command, press enter to see a preview of the possible result(s), and press
enter again to accept the action. You can undo an accepted action by clicking
on the "x" next to command history. If you enter a command incorrectly, the
system will give you an opportunity to define the command, click the "x" to
cancel and edit the command. All commands can be cleared by opening the
Control Panel on the right side and clicking "CLEAR".

## The Core Language

The following commands introduce you to the basics of the core language which
describes the individual actions that the robot can perform. 

- You can move the robot either by specifying the absolute point: `visit [5,8]`
or by specifying the direction: `move left`
  - Tip: any action can be repeated with the following syntax `repeat 2 times move left`
  - Before you accept the move, you can edit the command and try something else
- You can pick items with the following command `pick item has color blue`
  - Tip: you can perform multiple actions sequentially by separating them with `;`
  - Color specification is optional; `pick item` will pick an item of any color
  - A conjunction (`and`) or disjunction (`or`) of colors can be specified with
`has color blue or has color red`
- Dropping items works in the same manner `drop every item`
  - The modifier `every` can be used with `pick` or `drop` to perform the
action on every item specified instead of just one
- Visiting an area (a set of points) will send the robot to one point contained
in area `visit room5`
  - `visit room5` is equivalent to `vist any point in room5`
- Areas can be filtered down to points that contain items: `visit room3 containing item has color red`
  - Tip: areas can be combined with `union`, `intersect`, and `minus` (relative complement)
- It is possible to perform an action on every point in an area:
`foreach point in world containing item { visit point; pick item }`
  - `world` is an area consisting of every open point
  - `containing` is an optional filter that can be used with `item`, `item has color ...`, etc.
  - `point` is used to refer to the individual points specified by `foreach`
- It is also possible to loop through areas:
`foreach area in all rooms containing item has color red { visit area; drop item }`
  - `all rooms` is an area collection consisting of all redefined rooms

## Basic Rule Defining

If you enter a command that the system does yet not recognize, you have the
option of defining what the command means in terms of command that the system
does know.

### Paraphrasing

Paraphrasing is taking a long or unnatural command and phrasing in a different,
equivalent way.

- It is somewhat awkward to say `repeat 3 times move right`; instead try
entering `move right 3`
  - Now type in the definition `repeat 3 times move right`
  - Accept the action and click "Finish Definition"
  - Not only will the system recognize this command in the future, it will also
recognize similar commands like `move left 2` or `move up 5`
- `pick a red or green item`
  - This could be defined as: `pick item has color red or has color green`
- `visit room1, room2, and room3`
  - This could be defined as: `foreach area in [room1, room2, room3] visit area`

### Abstracting

It is also possible to define more abstract or complex commands in terms of
simpler commands.

- `get all red items`: pick up every red item on the map
  - This would be expressed by the much longer command
`foreach point in world containing item has color red { visit point; pick every item has color red }`
- `bring a blue item to [5,5]`: find a blue item and drop it at the point `[5,5]`
  - `visit world containing item has color blue`
  - `pick item has color blue`
  - `visit [5,5]`
  - `drop item has color blue`
- `sort all red and green items into room4 and room5`: gather all red and green
items and sort them into `room4` and `room5` respectively
  - `get all red items`
  - `get all green items`
  - `visit room4`
  - `drop every item has color red`
  - `visit room5`
  - `drop every item has color green`

### Advanced Language Constructs

Feel free to skip this and reference it as needed.

- `if robot has item has color purple then { move down }`
