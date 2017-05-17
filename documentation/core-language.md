# Specification language (Phase 1)
Specification language consists of specifications, items and locations. Program is consecutive execution of specifications with addition of simple control flow operations - iteration and branching. 

## Program ( P )
 
  - `P -> ST`

 
## Statement (ST)
 
 - `ST -> Spec`
 - `ST -> ST1; ST2` *ST1 gets executed and once it is finished ST2 gets executed*
 - `ST -> ST1 and then ST2` *means the same as ST1; ST2* 
 - `ST -> if (Sit) then (ST1)`  *If Sit evaluates to true, ST1 gets executed*
 - `ST -> foreach var in Iterable do (ST1)`

## Situations (Sit)
 
 - `Sit -> I at L` *true if at least one item described by I is at location L*
 - `Sit -> I at self` *true if robot carries at least one item described by I*
 - `Sit -> at L` *true if robot is at location L (any of the fields)*
 - `Sit -> possible(Spec)` *if specification Spec is realizable, return true, otherwise false*

## Specifications (Spec)
If a specification is realizable, a controller is synthesized and the spec is executed. If not, it reports unrealizability and asks user to change it/remove it from the program. 
 
  - `Spec -> visit L1 while avoiding L2`  *robot should visit location L1 (any of the closest fields), and while doing this not enter any of the fields of location L2* 
  - `Spec -> visit L1`  *syntactic sugar for visit L1 while avoiding $`\emptyset`$* 
  - `Spec -> visit periodically (L, p, N) while avoiding L2` *visit location L every p timesteps, while avoiding L2, all together N times*
  - `Spec -> visit periodically (L, p, N)` *syntactic sugar for visit location L every p timesteps, while avoiding $`\emptyset`$*
  - `Spec -> pick all I` *pick all items I (from your current field)*
  - `Spec -> pick single I` *pick nondeterministically chosen one item I. if there is none, the task fails*
  - `Spec -> drop all I` *the robot should drop all items I that it currently has on its location*
  - `Spec -> drop single I` *the robot should drop one nondeterministically chosen item I on its current location. If it doesn't have one, the task fails*
  - `Spec -> Spec1 within t` _do action A1 within t time units (for less than or equal to t)_
  - `Spec -> no-op`  _do nothing for one timestep_

## Iterables 
 - `Iterable -> L` *each location is iterable: the iterations happens over fields of the location in a non-determined order*
 - `Iterable -> [k..l]` *the iteration happens over numbers k, k+1, ..., l*

## Items (I)
Item description function as filters. One can say _pick_ with the meaning pick whatever there is at your current location, or _pick has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue.

  - `I -> e` *empty string*
  - `I -> I1 has color C` _C is from finite set of colors_
  - `I -> I1 has type T` _T is from finite set of types_
  - `I -> I1 has id ID` _ID unique identifier of an item_

## Locations (L)
A 2D-grid consists of (x,y)-denoted fields. When describing locations we are always using sets of fields.
  - `L->[[x1,y1], [x2, y2],...,[xn,yn]]` *a set consisting of fields {(x1,y1),(x2,y2),...,(xn, yn)}
  - `L -> [x, y]` *syntactic sugar for a set consisting of a single field, {(x,y)}*
  - `L -> world` *the whole map*
  - `L -> current` *current location of a robot*
  - `L -> L1 + L2` *a union of L1 and L2*
  - `L -> L1 * L2` *an intersection of L1 and L2*
  - `L -> L1 - L2` *a difference between L1 and L2*
  - `L -> L1 spread (u, v)` $`\{(p_x+i,p_y+j): i\in \{-u,...,u\},j\in \{-v,...,v\}, p \in L\}`$
  - `L -> L1 bounded spread (u, v)`  *spread that respects room borders - same as spread, but stop spreading once door or wall was hit. if u = -1 or v = -1, then spread as far as possible before hitting the wall*
  - `L -> L1 with item I` *location consisting of fields that contain item I*

## Examples
  - visit the room in which there is the item with id 5: 
    - *visit bounded spread( -1,-1) has id 5*
  - come to the field with item5 and pick it up:
    - *visit has id 5 and then pick single has id 5*
  - come to the field with item5 and pick up all the items from that field:
    - *visit has id 5 and then pick all*
  - visit any field in 4-vicinity of [4,5] but during getting there avoid stepping on the fields with blue items
    - *visit [4,5] spread (4,4) and avoid world has color blue*
  - visit any field in the 4-vicinity of [4,5], spend 3 time-units there and then repeat 10 times: picking from [2,3] and dropping at [0,0]
    - *visit [4,5] spread (4,4) and then foreach i in [1..3] do (no-op) and then foreach j in [1..10] (visit [2,3] and then pick and then visit [0,0] and then drop)
  - robot should drop whatever items it carries if its current field has item with red color
    - *if has color red drop  all*
  - robot should pick all red objects in the current room 
    - *foreach l in current bounded spread -1 (if has color red at l (visit l and then pick all has color red))*
    - *foreach l in (current bounded spread -1 with item has color red) (visit l and then pick all has color red)*
  - visit location (2,2) or (2,3) only if it is possible to reach it within 10 time units (if arrived earlier, action is finished. if not possible, abort)
    - *if possible(visit [2,2]+[2,3] within 10) visit [2,2]+[2,3]*
  - bring three red objects to the location (2,2)
    - *foreach i in [1..3] (visit world with item has color red and then pick single has color red) and then visit [2,2] and then drop all* : here we can't check if there are three objects at all!

