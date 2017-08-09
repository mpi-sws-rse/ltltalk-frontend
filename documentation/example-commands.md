# Example Commands

This file provides a list of examples of the various language constructs.

### Move and Visit

- `move left`, `move right`, `move up`, `move down`
- `visit [2,5]`
- `visit room5`
- `visit any point in room3`
- `vist [9,8] while avoiding room3`

### Pick and Drop

- `pick item`, `drop item`
- `pick every item`
- `pick item has color blue`, `drop every item has color blue`
- `pick item has color blue or has color green`, `pick item not has color blue`

### Grouping Symbols

- `;`
  - `move left; pick item`
- `{}`
  - `{ move left; pick item }`
  - `drop item not {has color blue or has color green}`
  - `drop item {not has color blue} or has color green`

### Foreach

- `foreach point in room3 { visit point }`
- `foreach point in world containing item { visit point; pick item }`
- `foreach area in [room1, room2] { visit area }`
- `foreach area in all rooms containing item { visit area; drop item }`

### Areas

- `foreach point in world { visit point }`
- `foreach point in room1 union room2 { visit point }`
- `foreach point in world minus room3 { visit point }`
- `foreach point in world intersect room3 { visit point }`
- `foreach point in area with corners [3,3] and [4,5] { visit point }`
- `foreach point in [[3,3],[3,4],[4,4]] { visit point }`
- `foreach point in world containing item { visit point; pick item }`

### Collections of Areas

- `foreach area in all rooms { visit area }`
- `foreach area in [room1, room2, room3] { visit area }`
- `foreach area in all rooms containing item has color red { visit area }`

### If

- `if item has color blue at [0,0] { move left }`
- `if item at room1 { move left }`
- `if item at current { pick item }`
- `if robot has item has color blue { move left }`
- `if robot at [4,4] { move left }`
- `if possible { move right; pick item } { move left }`

### Strict

- `strict { pick item; move left }`
