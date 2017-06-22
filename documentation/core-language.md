# Specification language (Phase 1)
Specification language consists of statements that can be either Specifications (telling robot to go somewhere or to do one of its primitive actions), Locations (defining a set of points of the world), or simple looping or branching.

## Program ( P )
 
  - `P -> ST`

## Variable names (V)
Variables are only used in iterations: elsewhere they are implicitly given through naming certain object, location or action in previous commands
V -> $[a-zA-Z]+

## Statement (ST)
 
 - `ST -> Spec`
 - `ST -> ST1; ST2` *ST1 gets executed and once it is finished ST2 gets executed*
 - `ST -> if {Sit} then {ST1}`  *If Sit evaluates to true, ST1 gets executed*
 - `ST -> foreach V in Iterable do {ST1}`
 - `ST -> repeat n times {ST1}`
 - `ST -> L`

## Situations (Sit)
 
 - `Sit -> F at A` *true if at least one item passing the item filter F is at area A*
 - `Sit -> F at robot` *true if the robot carries at least one item described by item filter F*
 - `Sit -> at L` *true if the robot is at location L (any of the fields)*
 - `Sit -> possible(Spec)` *if specification Spec is realizable, return true, otherwise false*

## Specifications (Spec)
If a specification is realizable, a controller is synthesized and the spec is executed. If not, it reports unrealizability and asks user to change it/remove it from the program. 
 
  - `Spec -> visit P while avoiding A`  *robot should visit point P , and while doing this not enter any point of area A* 
  - `Spec -> visit P`  *syntactic sugar for visit P while avoiding $`\emptyset`$* 
  - `Spec -> visit A1 while avoiding A2` *syntactic sugar for visit any A1 while avoiding A2*
  - `Spec -> pick  I` *pick items defined by item definition I (from your current field)*
  - `Spec -> drop I` *the robot should drop items defined by item definition I that it currently has (it should drop it on its location)*

## Iterables 
 - `Iterable -> A` *each area is iterable: the iterations happen over points of the area in a non-determined order*
 - `Iterable -> C` *each collection is iterable: the iterations happen over areas of the collection in a non-determined order*


## Items definitions (I) and item filters (F)
Item filters function as logical filters. One can say _pick item_ with the meaning pick whatever there is at your current location, or _pick item has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue. The item definition is then either a filter (takes everything that passes through the filter) or a single item (nondeterministically chosen) that passes the filter.

  - `F -> item` _no filter, all the item present there_
  - `F -> item has color C` _C is from finite set of colors, everything that has color C passes the filter_
  - `F -> has shape T` _T is from finite set of shapes, everything that has type T passes the filter_
  - `F -> F1 && F2`  _a conjunction of two item filters_
  - `F -> F1 || F2` _a disjunction of two item filaters_
  - `F -> !F1` _a negation of an item filter F1_
  - `I -> F` _all items that pass the filter F_
  - `I -> single F` _a single, nondeterministically chosen item of all that pass the filter F

## Locations(L): Points(P) Areas (A) and Collections of areas (C)
A 2D-grid consists of (x,y)-denoted points. An area is a set of points {(x1, y1), ..., (xn, yn)}. A collection of areas is a set of sets of points { {(x11, y11),..., (x1n,y1n)},...,{(xm1,ym1),...,(xmk, ymk)}}

  - `P -> [x1, y1]`
  - `P -> current` *a current point on which the robot is standing*
  - `P -> any A` *nondeterministically chosen any point from area A*
  - `A->[P1, P2,...,Pn]` *a set consisting of fields {(x1,y1),(x2,y2),...,(xn, yn)}
  - `A -> world` *area of the whole map*
  - `A -> A1 + A2` *a union of areas L1 and L2*
  - `A -> A1 * A2` *an intersection of areas A1 and A2*
  - `A -> A1 - A2` *a difference between areas A1 and A2*
  - `A -> room with point P` *an area of all points reachable from point P without hitting into doors or walls*
  - `C -> [A1, A2,..., An]` *a set of areas (set of sets of points)*
  - `C -> C1 with item filter F` *subcollection of C1 consisting of areas that contain items defined by item filter F*
  - `A -> A1 with item filter F` *subarea of A1( consisting of fields that contain item F*
