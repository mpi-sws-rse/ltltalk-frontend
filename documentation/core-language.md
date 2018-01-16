# Specification language
Specification language consists of statements that can be either Specifications (telling the robot to go somewhere or to do one of its primitive actions), or selecting locations and items. Simple control-flow structures are supported (looping or branching).



## Syntax
This grammar should help user understanding the core language. The actual implementation is available in the file [robo.grammar](https://gitlab.mpi-sws.org/gavran/sempre-interactive/blob/master/interactive/robo.grammar)
 
 **Program ( Root )**

   - `Root -> ST`



**Statement (ST)**
 
 - `ST -> Spec`
 - `ST -> {ST}` *grouping statements, useful in looping or branching*
 - `ST -> ST1; ST2` *ST1 gets executed and once it is finished ST2 gets executed*
 - `ST -> if Sit ST1`  *If Sit evaluates to true, ST1 gets executed*
 - `ST -> while Sit ST1`  *While Sit evaluates to true, ST1 gets executed*
 - `ST -> foreach point in Area ST1` *The loop variable would be used as such: `visit point`*
 - `ST -> foreach area in Collection ST1`
 - `ST -> repeat n times ST1`

**Locations: Points, Areas, and Collections of areas**
A 2D-grid consists of (x,y)-denoted points. An area is a set of points {(x1, y1), ..., (xn, yn)}. A collection of areas is a set of sets of points { {(x11, y11),..., (x1n,y1n)},...,{(xm1,ym1),...,(xmk, ymk)}}

  - `Point -> [x1, y1]`
  - `Point -> current` *a current point on which the robot is standing*
  - `Point -> any point in Area` *nondeterministically chosen any point from Area*
  - `Area -> [Point1, Point2,...,PointN]` *a set consisting of fields {(x1,y1),(x2,y2),...,(xn, yn)}
  - `Area -> world` *area of the whole map*
  - `Area -> Area1 union Area2` *a union of areas Area1 and Area2*
  - `Area -> Area1 intersect Area2` *an intersection of areas Area1 and Area2*
  - `Area -> Area1 minus Area2` *a difference between areas Area1 and Area2*
  - `Area -> area with corners Point1 and Point2` *an area defined by corners Point1 and Point2*
  - `Area -> Area containing Item` *subarea consisting of points that contain an item as specified by Item*
  - `Collection -> [Area1, Area2,..., AreaN]` *a set of areas (set of sets of points)*
  
  - `Collection -> all rooms` *collection of all predefined rooms*
  - `Collection -> Collection containing Item` *subarea of Area (consisting of fields that contain an item described by Item)*


**Situations (Sit)**
 
 - `Sit -> Item at Area` *true if at least one item specified by Item is at area A*
 - `Sit -> Item at Point` *true if at least one item specified by Item is at point P*
 - `Sit -> robot has Item` *true if the robot carries at least one item described by Item*
 - `Sit -> robot at Point` *true if the robot is at Point*
 - `Sit -> robot at Area` *true if the robot is at Area (any of the fields)*
 - `Sit -> possible Spec`  *if specification Spec is realizable, return true, otherwise false*
 - `Sit -> Sit and Sit` *logical and*
 - `Sit -> Sit or Sit` *logical or*
 - `Sit -> not Sit` *logical negation*

**Specifications (Spec)**
If a specification is realizable, a controller is synthesized and the spec is executed. If not, it reports unrealizability and asks user to change it/remove it from the program. 
 
  - `Spec -> move Direction` *robot moves one space in the direciton `up`, `down`, `right`, or `left`*
  - `Spec -> visit Point while avoiding Area`  *robot should visit Point , and while doing this not enter any point of Area* 
  - `Spec -> visit Point while avoiding Point`  *robot should visit Point , and while doing this not cross the other point* 
  - `Spec -> visit Point`  *syntactic sugar for __visit Point while avoiding $`\emptyset`$__* 
  - `Spec -> visit Area1 while avoiding Area2` *syntactic sugar for __visit any point in Area1 while avoiding Area2__*
  - `Spec -> pick LimitedItem` *pick item(s) defined by item definition I (from your current point). If nothing can be picked, the specification is considered unrealizable*
  - `Spec -> drop LimitedItem` *drop item(s) defined by item definition I that it currently has (it should drop it on its location). If nothing can be dropped, the specification is considered unrealizable*
  - `Spec -> strict Spec` only perform Spec if all actions can be completed (if one action fails, nothing executes)

**Items definitions and item filters**
Item filters function as logical filters. One can say _pick item_ with the meaning pick whatever there is at your current location, or _pick item has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue. The item definition is then either a filter (takes everything that passes through the filter) or a single item (nondeterministically chosen) that passes the filter.

  - `LimitedItem -> every Item` _any number of items; set will not be restricted_
  - `LimitedItem -> Item` _set will be restricted to one item_
  - `Item -> item` _no filter, any item matches_
  - `Item -> item Filter` _item with the specified filter_
  - `Filter -> has color C` _C is from finite set of colors, everything that has color C passes the filter_
  - `Filter -> Filter1 and Filter2`  _a conjunction of two item filters_
  - `Filter -> Filter1 or Filter2` _a disjunction of two item filters_
  - `Filter -> not Filter1` _a negation of an item filter F1_
  
## Semantics

Semantics is defined on the following world model

**World Model**
The world and its state are represented by 
 - the grid `M = {0,..,w-1}x{0,..,h-1}`  
 - the set of obstacle (wall) locations `O ⊆ M` 
 - graph `G` build from `M` and `O` that represents connections between locations
 - the set of items with their ids, colors and locations, `I ⊆ N x C x (M ∪ {(-1,-1)})` (the special location `(-1,-1)` represents that the item is currently held by the robot). For  `i ∈ I` we have `i = (i.id, i.color, i.position)`
 - the robot position `r ∈ M`
 
 There is also a concept of *unrealizability* that refers to statements `ST`. Whenever a statement is unrealizable, it is written explicitly (otherwise, it is considered realizable). 
 
---

**Semantics of expressions**

 - every item                          :: `I`
 - item                              :: nondeterministically chosen `i ∈ I`
 - item *Filter*                         :: `{i ∈ I: Filter(i) == true}`
 - has color C        :: `i.color == C`
 -  *Filter1*  and *Filter2* :: `Filter1 ∧ Filter2`
 - *Filter1* or *Filter2* :: `Filter1 ∨ Filter2`
 - not *Filter1* :: `¬ Filter1`
 
 ---
 
 - [x1, y1] :: `(x1, y1)∈M` 
 - current :: `r`
  - any point in *Area* :: `l ∈ Area` (nondeterministically chosen)
  - [*Point_1*, *Point_2*,...,*Point_n*] :: `{(Point_1.x,Point_1.y),(Point_2.x,Point_2.y),...,(Point_n.x, Point_n.y)} ⊆ M`
  - world :: `M`
  - *Area1* union *Area2* :: `Area1 ∪ Area2`
  - *Area1* intersect *Area2* :: `Area1 ∩ Area2`
  - *Area1* minus *Area2* :: `Area1  \ Area2`
  - area with corners *Point1* and *Point2* :: `{ l ∈ M:   Point1.x ≤ l.x ≤ Point2.x ∧ Point1.y ≤ l.y ≤ Point2.y}`
  - *Area* containing *Item* ::  `{l ∈ Area: ∃ i ∈ Item. i.position == l}`
  - [*Area_1*, *Area_2*,..., *Area_n*] ::  ` {Area_1, Area_2,...,Area_n} ⊆ 2^M`
  - all rooms :: `{room_1, room_2,... room_n}`, where `room_k ⊆ M` is a predefined subset of all points 
  - *Collection* containing *Item* ::  `{a ∈ Collection: ∃ i ∈ Item. i.position ∈ l}`
  
---

    
  - visit *Point* while avoiding *Area* :: if there is a path in `G` from `r` to `Point` that never goes through `l ∈ Area`, then `r := Point`. otherwise, action is considered unrealizable 
  - visit *Point1* while avoiding *Point2* :: if there is a path in `G` from `r` to `Point1 `that never goes through `Point2`, then `r := Point1`. otherwise, action is considered unrealizable 
  - move *Direction* :: `visit newPos` where `newPos` is defined by `newPos = r + (Direction.x, Direction.y)`, with choices for direction being `up = (0, 1)`, `down = (0,-1)`, `left = (-1,0)`, `right = (1,0)`
  - pick *LimitedItem*  :: let `itemSet2 = {i ∈ LimitedItem: i.position == r}`. Then, `∀i ∈ itemSet2: i.position = (-1,-1).`. If `itemSet2` is empty set, the specification is considered unrealizable
  - drop *LimitedItem* :: let `itemSet2 = {i ∈ LimitedItem: i.position == (-1,-1)}`. Then, `∀i ∈ itemSet2: i.position = r`. If `itemSet2` is empty set, the specification is considered unrealizable
  - strict *Spec* :: if *Spec* is unrealizable, nothing happens (otherwise, `Spec`)
  
---

 - *Item* at *Area* ::   `∃ i ∈ Item : i.location ∈ Area `
 - *Item* at *Point* ::  `∃ i ∈ Item : i.location = Point `
 - robot has *Item* ::   `∃ i ∈ Item : i.location = (-1,-1) `
 - robot at *Point* ::  `r == Location`
 - robot at *Area* ::  `r ∈Area`
 - possible *Spec* :: if specification `Spec` is realizable, return true, otherwise false*
 - *Sit1* and *Sit2* ::  `Sit1 ∧ Sit2`
 - *Sit1* or *Sit2* :: `Sit1 ∨ Sit2`
 - not *Sit* ::`¬ Sit`
 
---

 -  {ST} :: same semantics as `ST`
 - *ST1*; *ST2* :: `ST1` gets executed and once it is finished `ST2` gets executed. If any of the two is unrealizable, the whole command is unrealizable
 - if *Sit* *ST1*  :: If `Sit` evaluates to true, `ST1` gets executed
 - while *Sit* *ST1* ::  While `Sit` evaluates to true, `ST1`. If in any iteration `Sit` holds true and `ST1` is unrealizable, the whole command is unrealizable
 - foreach point in *Area* *ST1* :: `ST1(p), ∀ p ∈ Area` in an unspecified order. If in any iteration `ST1` is unrealizable, the whole command is unrealizable
 - foreach area in *Collection* *ST1* :: `ST1(a), ∀ a ∈ Collection` in an unspecified order. If in any iteration `ST1` is unrealizable, the whole command is unrealizable
 - repeat *n* times *ST1* :: `n` times execute `ST1`. If in any iteration `ST1` is unrealizable, the whole command is unrealizable


 