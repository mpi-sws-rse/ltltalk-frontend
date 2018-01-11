# World Model
The world and its state are represented by 
 - the grid `M = {0,..,w-1}x{0,..,h-1}`  
 - the set of obstacle (wall) locations `O ⊆ M`
 - the set of items with their ids, colors and locations, `I ⊆ N x C x (M ∪ {(-1,-1)})` (the special location `(-1,-1)` represents that the item is currently held by the robot) 
 - the robot position `r ∈ M`
 
# Desugared language
Unlike our *core language* that is presented to the user and that is similar to natural language, here a desugared version of it is given (to get the gist of it, rather than for explanation purposees). Keywords are capitalized. 

## Selecting Items
  - `itemSet -> itemSet WHERE itemFilter [LIMIT 1]`
  - `itemSet -> ITEM`
  - `itemFilter -> attribute = attributeValue` 
  - `itemFilter -> itemFilter <AND | OR > itemFilter`
  - `attribute -> color | position | id`
 
The constant values for different attributes are 
  - `color ∈ {red, green, blue, yellow}`
  - `position ∈ M`
  - `id ∈ N`

For the moment the only attribute is color, so an example selecting action looks like

> ITEM WHERE color = red AND position = (1,1)    

> ITEM WHERE color = red OR position = blue

> ITEM WHERE color = blue AND color = red

The last selection, while syntactically correct, is semantically meaningless (since one item can only have one color)

The semantics is given by
 -  *ITEM WHERE itemFilter* :: `{i ∈ I: itemFilter(i) evaluates to true}`
 - 	*ITEM WHERE itemFilter LIMIT 1* :: nondeterministically chosen `j ∈ {i ∈ I: itemFilter(i) evaluates to true}`
 
## Selecting locations
 - `location -> (x,y)` 
 - `location -> current`
 - `setOfLocations -> setOfLocations WHERE itemFilter`
 - `setOfLocations -> {(x1,y1), (x2, y2), ..., (xk, yk)}`
 - `setOfLocations -> world`
 - `setOfLocations -> setOfLocations <+ | - | * > setOfLocations`
 - `setOfSetsOfLocations -> {setOfLocations, setOfLocations, ..., setOfLocations}`

The semantics is given by
 - *setOfLocations WHERE itemFilter* :: `{l ∈ setOfLocations: ∃ id ∈ N, c ∈ C. (id, c, l) ∈ I and itemFilter((id, c, l)) = true}`
 - *setOfSetsOfLocations WHERE itemFilter* :: `{a ∈ setOfSetsOfLocations: ∃ l ∈ a, id ∈ N, c ∈ C. (id, c, l) ∈ I and itemFilter((id, c, l)) = true}}`
 - *world* :: `M`
 - *current* :: `r`
 - semantics of the rest is given by operations on sets
 
## Actions
 - `action -> <PICK | DROP> itemSet`
 - `action -> VISIT location`
 - `action -> action; action`
 - `action -> {action}`

The semantics is:
 - *PICK itemSet* :: we define `itemSet2` as `itemSet WHERE position = r`. Then the position for the items from `itemSet2` is changed to `(-1,-1)`
 - *DROP itemSet* :: we define `itemSet2` as `itemSet WHERE position = (-1,-1)`. Then the position for the items from `itemSet2` is changed to `r` 
 - *VISIT location* :: if there is a path from `r` to `location` (a sequence of neighbouring locations such that none of them is in `O` and the last one is `location`), the value of `r` becomes `location`.    
 
## Iteration
  - `FOREACH POINT IN setOfLocations action` : note that `POINT` is a fixed keyword here (so, one **can not** write *foreach field in ...*). Also, when defining an action, the programmer can refer to `POINT` 
  - `FOREACH AREA IN setOfLocations action`  : again, `AREA` is a keyword and when defining an action, the programmer can refer to `AREA`
  
 The semantics is  
  - *FOREACH POINT IN setOfLocations action* :: `action (point1); action (point2);..., action(pointk)` where `setOfLocations = {point1, point2, ..., pointk}`
  - *FOREACH AREA IN setOfSetsOfLocations action* :: `action (area1); action (area2);..., action(areak)` where `setOfSetsOfLocations = {area1, area2, ..., areak}`
  
## If branching
 - `branching -> IF condition action`
 - `condition -> itemSet AT location`
 - `condition -> itemSet AT setOfLocations`
 - `condition -> ROBOT HAS itemSet`
 - `condition -> ROBOT AT location`
 - `condition -> ROBOT AT setOfLocations`
 - `condition -> POSSIBLE action`
 
 The semantics is given by
  - *if condition action* :: if condition is satisfied, action is performed (otherwise, no-op)
  - *itemSet AT location* :: we define `itemSet2` as `itemSet WHERE position = location`. true if `itemSet2` is not empty
  - *itemSet AT setOfLocations* :: we define `itemSet2` as `itemSet WHERE position ∈ setOfLocations`. true if `itemSet2` is not empty
  - *ROBOT HAS itemSet* :: we define `itemSet2` as `itemSet WHERE position = (-1,-1)`. true if `itemSet2` is not empty
  - *ROBOT AT location* :: true if `r = location`
  - *ROBOT AT setOfLocations* :: true if `r ∈ setOfLocations`
  - *POSSIBLE action* :: true if `action` can be executed - if the end state of each atomic action that constitutes `action` is as specified by the action (leaving it vague because it seems that this one is anyway superfluous)