# Specification language (Phase 1)
Specification language consists of *actions*, *locations*, *items*.
 ## Actions
 
  - `A -> visit L`  *robot should visit location L (any of the fields)* 
  - `A -> avoid L` *robot should never visit location L (none of the fields)*
  - `A -> A1 and A2` *do A1 and A2 simultaneously*
  - `A -> A1 and then A2` _do A1 and **afterwards** do A2_
  - `A -> A1 within t` _do action A1 within t time units_
  - `A -> A1 for duration t` _do action A1 for t time units_
  - `A -> no-op`  _do nothing_
  - `A -> repeat A1 every t` _do A1 every t time units_
  - `A -> repeat N A1` *repeat action A1 N times*
  - `A -> pick I` *pick an item I if it exists on your current position*
  - `A -> drop I` *drop an item I on your current position if you have it*
  - `A -> if I L A1` *do action A1 if at location L there is item I*
  - `A -> if I A1` = if I current A1
  - `A -> (A1)` grouping actions for precedence

## Items
Item description function as filters. One can say _pick_ with the meaning pick whatever there is at your current location, or _pick has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue.

  - `I -> e` *empty string*
  - `I -> I1 has color C` _C is from finite set of colors_
  - `I -> I1 has type T` _T is from finite set of types_
  - `I -> I1 has id ID` _ID unique identifier of an item_

## Locations
A 2D-grid consists of (x,y)-denoted fields. When describing locations we are always using sets of fields.
  - `L -> [x, y]` *a set consisting of a single field, {(x,y)}*
  - `L -> current` *current location of a robot*
  - `L -> L1 + L2` *a union of L1 and L2*
  - `L -> L1 * L2` *an intersection of L1 and L2*
  - `L -> L1 - L2` *a difference between L1 and L2*
  - `L -> L1 spread s` $`\{(p_x+i,p_y+j): i,j \in \{1,...,s\}, p \in L\}`$
  - `L -> L1 bounded spread s`  *spread that respects room borders - same as spread, but stop spreading once door or wall was hit*
  - `L -> location with item I` *location consisting of fields that contain item I*

## Examples
  - *visit bounded spread has id 5*: visit the room in which there is the item with id 5
  - *visit has id 5 and pick has id 5*: come to the field with item5 and pick it up
  - *visit [4,5] spread 4 and avoid location with item has color blue* 
  - *visit [4,5] spread 4 for duration 3 and then repeat (visit [2,3] and then pick and then visit [0,0] and then drop) 10 times*
  - *if has color red drop*: robot should drop whatever items it carries if its current location has red color

