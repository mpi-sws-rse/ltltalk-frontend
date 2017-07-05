# Specification language (Phase 1)
Specification language consists of statements that can be either Specifications (telling the robot to go somewhere or to do one of its primitive actions), Locations (defining a set of points of the world), or simple looping or branching.

## Program ( P )
 
  - `P -> ST`

## Variable names
The only two variables are "point" and "area" which are set inside of loops.

## Statement (ST)
 
 - `ST -> Spec`
 - `ST -> {ST}` *grouping statements, useful in looping or branching*
 - `ST -> ST1; ST2` *ST1 gets executed and once it is finished ST2 gets executed*
 - `ST -> if Sit then ST1`  *If Sit evaluates to true, ST1 gets executed*
 - `ST -> foreach point in Area do ST1`
 - `ST -> foreach area in Collection do ST1`
 - `ST -> repeat n times ST1`
 - `ST -> Location`

## Locations: Points, Areas, and Collections of areas
A 2D-grid consists of (x,y)-denoted points. An area is a set of points {(x1, y1), ..., (xn, yn)}. A collection of areas is a set of sets of points { {(x11, y11),..., (x1n,y1n)},...,{(xm1,ym1),...,(xmk, ymk)}}

  - `Point -> [x1, y1]`
  - `Point -> current` *a current point on which the robot is standing*
  - `Point -> any Area` *nondeterministically chosen any point from Area*
  - `Area -> [Point1, Point2,...,PointN]` *a set consisting of fields {(x1,y1),(x2,y2),...,(xn, yn)}
  - `Area -> world` *area of the whole map*
  - `Area -> Area1 + Area2` *a union of areas Area1 and Area2*
  - `Area -> Area1 * Area2` *an intersection of areas Area1 and Area2*
  - `Area -> Area1 - Area2` *a difference between areas Area1 and Area2*
  - `Area -> area with corners Point1 and Point2` *an area defined by corners Point1 and Point2*
  - `Collection -> [Area1, Area2,..., AreaN]` *a set of areas (set of sets of points)*
  - `Collction -> Collection containing Item` *subcollection of Collection consisting of areas that contain an item as specified by Item*
  - `Area -> Area containing Item` *subarea of Area (consisting of fields that contain an item described by Item)*


## Situations (Sit)
 
 - `Sit -> Item at Area` *true if at least one item specified by Item is at area A*
 - `Sit -> Item at Point` *true if at least one item specified by Item is at point P*
 - `Sit -> robot has Item` *true if the robot carries at least one item described by Item*
 - `Sit -> robot at Location` *true if the robot is at Location (any of the fields)*
 - `Sit -> possible { Spec }` *if specification Spec is realizable, return true, otherwise false*

## Specifications (Spec)
If a specification is realizable, a controller is synthesized and the spec is executed. If not, it reports unrealizability and asks user to change it/remove it from the program. 
 
  - `Spec -> visit Point while avoiding Area`  *robot should visit Point , and while doing this not enter any point of Area* 
  - `Spec -> visit Point`  *syntactic sugar for __visit Point while avoiding $`\emptyset`$__* 
  - `Spec -> visit Area1 while avoiding Area2` *syntactic sugar for __visit any Area1 while avoiding Area2__*
  - `Spec -> pick LimitedItem` *pick item(s) defined by item definition I (from your current point). If nothing can be picked, the specification is considered unrealizable*
  - `Spec -> drop LimitedItem` *drop item(s) defined by item definition I that it currently has (it should drop it on its location). If nothing can be dropped, the specification is considered unrealizable*

## Items definitions and item filters
Item filters function as logical filters. One can say _pick item_ with the meaning pick whatever there is at your current location, or _pick item has color blue_ meaning that one should pick whatever there is at current location **only** if it is blue. The item definition is then either a filter (takes everything that passes through the filter) or a single item (nondeterministically chosen) that passes the filter.

  - `LimitedItem -> every Item` _any number of items; set will not be restricted_
  - `LimitedItem -> Item` _set will be restricted to one item_
  - `Item -> item` _no filter, any item matches_
  - `Item -> item Filter` _item with the specified filter_
  - `Filter -> has color C` _C is from finite set of colors, everything that has color C passes the filter_
  - `Filter -> has shape T` _T is from finite set of shapes, everything that has type T passes the filter_
  - `Filter -> Filter1 && Filter2`  _a conjunction of two item filters_
  - `Filter -> Filter1 || Filter2` _a disjunction of two item filters_
  - `Filter -> !Filter1` _a negation of an item filter F1_
 

# Examples
  - *Collect all red triangles from the point where robot is currently standing*: 
    ```
    pick item has color red and has shape triangle
    ```
    
  - *Collect two green triangles*
     ```
    repeat 2 times pick item has color green
    ```
    
  - *Visit kitchen ((xk1, yk1),...,(yk1, ykn)), and living room ((xl1, yl1),...,(xln, yln)). Pick whichever cubes you find there. Repeat the visits 10 times*
```    
repeat 10 times {
       foreach point in [[xk1, yk1],...,[yk1, ykn]] containing item has shape cube {visit point; pick item has shape cube; 
       foreach point in [[xl1, yl1],...,[yl1, yln]] containing item has shape cube {visit point; pick item has shape cube}
      }
```
      
  - a room in which there is a blue item; **currently, `room with point` has been removed**
  ```
  room with point any { world with item filter has color blue }
  ```
  - all rooms in which there is a blue item:
  **with current grammar, I don't see how to do it. What I would need is something like**
  ```
  [ room with point p for p in world with item filter has color blue ]
  ```
  **is it worth adding additional rule for this?**
  
  - all social rooms in the building
  ```
  [ [[x11,y11], ...,[x1n, y1n]], ..., [[xm1, ym1],..., [xmk, ymk]] ]
  ```
  
  - assuming that in the previous statement user defined the name for this location *social rooms*: visit all social rooms in the building
  ```
  foreach area in social rooms {visit area}
  ```
  
  - area of fields in which there is a red triangle or any blue item
  ```
  world containing item {has color red && has type triangle} || has color blue
  ```
  
  - collect all red items from the building
  ```
  foreach point in world containing item has color red {visit point; pick has item has color red}
  ```

