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
  - Disjunction (`or`) of colors can be specified with
`has color blue or has color red`
- Dropping items works in the same manner `drop every item`
  - The modifier `every` can be used with `pick` or `drop` to perform the
action on every item specified instead of just one
- Visiting an area (a set of points) will send the robot to one point contained
in area `visit room5`
  - `visit room5` is equivalent to `vist any point in room5`
  - Areas can be explicitly written: `[[3,3],[3,4],[4,4]]`
- Areas can be filtered down to points that contain items:
`visit any point in room3 containing item has color red`
  - Tip: areas can be combined with `union`, `intersect`, and `minus` (relative complement)
- It is possible to perform an action on every point in an area:
`foreach point in world containing item { visit point; pick item }`
  - `world` is an area consisting of every open point
  - `containing` is an optional filter that can be used with `item`, `item has color ...`, etc.
  - `point` is used to refer to the individual points specified by `foreach`
- It is also possible to loop through areas:
`foreach area in all rooms containing item has color red { visit area; drop item }`
  - `all rooms` is an area collection consisting of all redefined rooms
  - A collection of areas can be explicitly written: `[room1, room4]`

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

This concludes the basic part of the tutorial. Feel free to play around in the
virtual environment, learn about the rest of the core language below, or
consult the [core language specification](/documentation/core-language.md).
When you feel comfortable with the core language, please complete some tasks
from our [suggested list](/documentation/open-tasks.md) so that we can see how
different people go about defining the tasks.

### Advanced Language Constructs

Feel free to skip this and reference it as needed.

- `{` and `}` function as optional grouping symbols
  - Group actions as a single action `{ move left; move up}` (these are
completed in the specified sequence)
- `visit [9,8] while avoiding room3`
  - `visit` the specified point without entering the specified area
- An area can also be specified by its corner points
  - `foreach point in area with corners [3,3] and [4,5] { visit point }`
  - If the area spans walls, the walls will not be considered in the area
- `if` statements can be used with `robot has item`, `robot at [3,3]`,
`robot at room2`, `item at [4,4]`, `item at room1`, etc.
  - `if CONDITION then ACTION`
  - `if robot has item has color purple then { move down }`
- `if` statements can also be used with the possibility of an action being
completed
  - `if possible ACTION then ACTION`
  - `if possible { move left } then { move right }`
  - An action is `possible` if every step can be completed successfully
  - `if possible { move left; pick item has color green } then { move right }`
- Closely related to possibility is strictly completing a sequence of commands
  - `strict { move left ; pick item has color red ; drop item has color purple }` 
  - If it is not possible to complete each of the actions in sequence, the
robot will do nothing; otherwise, the action will be completed normally
- Successful completion (applies only to actions)
  - `visit` is successful if the robot's final position is the same as the
  - `move` is successful if the robot's final location is one point in the
specified direction
  - `pick`/`drop` is successful if the robot has one more/fewer of the item specified
  - `pick every`/`drop every` is successful if the robot has at least one
more/fewer of the item specified
  - `strict ACTION` is succes
position specified in the command
