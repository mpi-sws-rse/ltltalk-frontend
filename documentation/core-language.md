# Specification language (Phase 1)
Specification language consists of *actions*, *locations*, *items*.
 ## Actions
 
  - `A -> visit L`  *robot should visit location L (any of the fields)* 
  - `A -> avoid L` *robot should never visit location L (none of the fields)*
  - `A -> A1 and A2` *do A1 and A2 simultaneously*
  - `A -> A1 and then A2` _do A1 and **afterwards** do A2_
  - `A -> A1 for duration t` _do action A1 for t time units_
  - `A -> A1 within t` _do action A1 within t time units (for less than or equal to t)_
  - `A -> no-op`  _do nothing_
  - `A -> repeat A1 every t` _do A1 every t time units (if not possible, the task fails)_ 
  - `A -> repeat N A1` *repeat action A1 N times*
  - `A -> pick all I` *pick all items I (from your current field)*
  - `A -> pick single I` *pick nondeterministically chosen one item I. if there is none, the task fails*
  - `A -> drop all I` *the robot should drop all items I that it currently has on its location*
  - `A -> drop single I` *the robot should drop one nondeterministically chosen item I on its current location. If it doesn't have one, the task fails*
  - `A -> if (self I A1)` *do action A1 if at location L there is item I*
  - `A -> if (self I A1)` *do action A1 if the robot currently has item I*
  - `A -> if I A1` = if I current A1
  - `A -> (A1)` *grouping actions for precedence*
  - `A -> foreach l in L (A1)` *foreach field in location L do action A1*
  - ~~`A -> while I A1` *while I matches anything, do action A1*~~

## Items
Item description function as filters. One can say _pick_ with the meaning pick whatever there is at your current location, or _pick has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue.

  - `I -> e` *empty string*
  - `I -> I1 has color C` _C is from finite set of colors_
  - `I -> I1 has type T` _T is from finite set of types_
  - `I -> I1 has id ID` _ID unique identifier of an item_
  - ~~`I -> I1 at location L` _matches all items at location L_~~

## Locations
A 2D-grid consists of (x,y)-denoted fields. When describing locations we are always using sets of fields.
  - `L->[[x1,y1], [x2, y2],...,[xn,yn]]` *a set consisting of fields {(x1,y1),(x2,y2),...,(xn, yn)}
  - `L -> [x, y]` *syntactic sugar for a set consisting of a single field, {(x,y)}*
  - `L -> world` *the whole map*
  - `L -> current` *current location of a robot*
  - `L -> L1 + L2` *a union of L1 and L2*
  - `L -> L1 * L2` *an intersection of L1 and L2*
  - `L -> L1 - L2` *a difference between L1 and L2*
  - `L -> L1 spread s` $`\{(p_x+i,p_y+j): i,j \in \{1,...,s\}, p \in L\}`$
  - `L -> L1 bounded spread s`  *spread that respects room borders - same as spread, but stop spreading once door or wall was hit. if s = -1, then spread as far as possible before hitting the wall*
  - `L -> L1 with item I` *location consisting of fields that contain item I*

## Examples
  - visit the room in which there is the item with id 5: 
    - *visit bounded spread -1 has id 5*
  - come to the field with item5 and pick it up:
    - *visit has id 5 and then pick has id 5*
  - come to the field with item5 and pick up all the items from that field:
    - *visit has id 5 and then pick* 
  - visit any field in 4-vicinity of [4,5] but during getting there avoid stepping on the fields with blue items
    - *visit [4,5] spread 4 and avoid world has color blue* 
  - visit any field in the 4-vicinity of [4,5], spend 3 time-units there and then repeat 10 times: picking from [2,3] and dropping at [0,0]
    - *visit [4,5] spread 4 and then no-op for duration 3 and then repeat (visit [2,3] and then pick and then visit [0,0] and then drop) 10 times*
  - robot should drop whatever items it carries if its current field has item with red color
    - *if has color red drop  all*
  - robot should pick all red objects in the current room 
    - *foreach l in current bounded spread -1 (if l has color red (visit l and then pick has color red))*
    - *foreach l in (current bounded spread -1 with item has color red) (pick has color red)*
  - visit location (2,2) or (2,3) only if it is possible to reach it within 10 time units (if arrived earlier, action is finished. if not possible, abort)
    - *visit [2,2]+[2,3] within 10* 
  - visit location (2,2) or (2,3). spend exactly 10 time units visiting (if arrived earlier, stay at place. if not possible, abort)
    - *visit [2,2]+[2,3] for 10*  
  - bring three red objects to the location (2,2)
    - *repeat 3 (visit world with item has color red and then pick single has color red) and then visit [2,2] and then drop all*
