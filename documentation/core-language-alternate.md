# Specification language (Phase 1)
Specification language consists of statements that can be either Specifications (telling robot to go somewhere or to do one of its primitive actions), Locations (defining a set of points of the world), or simple looping or branching.

## Program (ROOT)
 
  - `ROOT -> Acts`

## Variable names (V)
Variables are only used in iterations: elsewhere they are implicitly given through naming certain object, location or specification in previous commands

  - `V -> $[a-zA-Z]+`

## Actions (Act, Acts)
 
  - `Acts -> Act`
  - `Acts -> Acts ; Act` *Sequential execution*
  - `Act -> if Sit then Act` *If Sit evaluates to true, Act gets executed*
  - `Act -> foreach V in Iterable do Act`
  - `Act -> repeat N times Act`
  - `Act -> { Acts }`
  - `Act -> Act ; `
  - `Act -> A` **Is this how one would name locations?**
  - `Act -> C`
  - `Act -> visit A while avoiding A`  *robot should visit the first area A, and while doing this not enter any point of the second area A* 
  - `Act -> visit A`  *syntactic sugar for visit A while avoiding $`\emptyset`$* 
  - `Act -> pick  I` *pick single item defined by item definition I (from your current field). If nothing can be picked, the specification is considered unrealizable*
  - `Act -> pick every I` *pick items defined by item definition I (from your current field).*
  - `Act -> drop I` *drop single item defined by item definition I that it currently has (it should drop it on its location). If nothing can be dropped, the specification is considered unrealizable*
  - `Act -> drop every I` *drop items defined by item definition I that it currently has (it should drop it on its location).*

## Situations (Sit)
 
 - `Sit -> I at A` *true if at least one item (as specified) is at area A*
 - `Sit -> I at C` *true if at least one item (as specified) is at location C*
 - `Sit -> robot has I` *true if the robot carries at least one item described by item I*
 - `Sit -> robot at A` *true if the robot is at area A (any of the fields)*
 - `Sit -> robot at C` *true if the robot is at location C (any of the fields)*
 - `Sit -> possible Act` *if the action is realizable, return true, otherwise false*

## Iterables 
 - `Iterable -> A` *each area is iterable: the iterations happen over points of the area in a non-determined order*
 - `Iterable -> C` *each collection is iterable: the iterations happen over areas of the collection in a non-determined order*


## Items definitions (I) and item filters (F)
Item filters function as logical filters. One can say _pick item_ with the meaning pick whatever there is at your current location, or _pick item has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue. The item definition is then either a filter (takes everything that passes through the filter) or a single item (nondeterministically chosen) that passes the filter.

  - `F -> with color C` _C is from finite set of colors, everything that has color C passes the filter_
  - `F -> with shape T` _T is from finite set of shapes, everything that has type T passes the filter_
  - `F -> F1 && F2`  _a conjunction of two item filters_
  - `F -> F1 || F2` _a disjunction of two item filaters_
  - `F -> !F1` _a negation of an item filter F1_
  - `I -> item` _any single item_
  - `I -> item F` _an item that passes the filter F_

## Locations(L): Points(P) Areas (A) and Collections of areas (C)
A 2D-grid consists of (x,y)-denoted points. An area is a set of points {(x1, y1), ..., (xn, yn)}. A collection of areas is a set of sets of points { {(x11, y11),..., (x1n,y1n)},...,{(xm1,ym1),...,(xmk, ymk)}}

  - `P -> [x1, y1]`
  - `A -> P`
  - `A -> [P1, P2,...,Pn]` *a set consisting of fields {(x1,y1),(x2,y2),...,(xn, yn)}
  - `A -> world` *area of the whole map*
  - `A -> A1 + A2` *a union of areas L1 and L2*
  - `A -> A1 * A2` *an intersection of areas A1 and A2*
  - `A -> A1 - A2` *a difference between areas A1 and A2*
  - `A -> room with point P` *an area of all points reachable from point P without hitting into doors or walls*
  - `C -> [A1, A2,..., An]` *a set of areas (set of sets of points)*
