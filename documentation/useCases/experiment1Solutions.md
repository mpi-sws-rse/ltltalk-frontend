This experiment is described in issue #41.


1.
 - Get one green square
 `get green square == visit world containing item has color green and has shape square; pick item has color green and has shape square` 
- Visit any field containing both a yellow item and a circle-shaped item (may be the same item)
 `visit has color yellow and has shape square == visit {world containing item has color yellow} and {world containing item has shape square}` **understand the differences in what is learnt when the color is mentioned and when it is not - it does learn different things**
- Pick a yellow item from that space
`pick yellow == pick item has color yellow`
- If possible, pick a square shaped item (from that space). Else, drop yellow item.
`if {pick item has shape square} else {drop item has color yellow} == if possible { pick item has shape square } pick item has shape square ; if not possible { pick item has shape square } drop item has color yellow`
 
 

2.
 
 - Visit empty space
 `visit empty == visit world minus {world containing item}`
 - Put the items the robot currently holds to different empty spaces on the map
 `while robot has item {visit empty; drop item}`
 - Visit any field containing both a triangle-shaped item and a green item (may be the same item) and pick only if these are two different items (one that is green, one that is triangular)
 `visit {world containing item has color green} and {world containing item has shape triangle}`
 
 
 
3.
 - Bring all items to room1 
 `bring all to room1 == foreach point in world containing item {visit point; pick every item}; visit room1; drop every item`
 - Pick exactly 3 red items
 `pick 3 red == repeat 3 times {pick item has color red}`
 - Build a tower at any field consisting of exactly 2 red, 2 green and 2 blue items.
 `drop item; pick 2 green; pick 2 blue; visit empty; drop every item`
 
 
 4.
 - Get one red triangle
 `get red triangle`
 - Collect all red items
 `collect red == foreach point in world containing item has color red {visit point; pick every item has color red}`
 - Put all blue items to room3
 `put blue to room3 == collect blue; visit room3; drop every item has color blue`
 
 
5.
 - Put all red items in a line on the floor
 `line red == collect red; while robot has item has color red {move right; drop item has color red}`  this could be done in a more general way (how do we know that the robot will be able to move right enough times), but this is a satisfactory solution for the experiment
 - Pick all green items. Drop all of them to empty places.
 `collect green; while robot has item has color green {visit empty; drop item}`
 - Make sure that every room has one red or blue item in it. 
 `drop every item; collect red; collect blue; foreach area in rooms {visit area; drop item}`
 
6.
 - Bring all red items to a room that contains a yellow square
 `collect red; visit world containing item has color yellow and has shape square; drop every item has color red`
 - Make sure that there is no field that contains only yellow items, but not blue circles.
 `foreach point in world containing item has color yellow {get blue circle; visit point; drop item has color blue and has shape circle}`

7.
 
 - Make sure that each room contains only items of a single color (you don't have to do it in a general way, step by step is ok)
 `put red to room1; put blue to room2; put green to room3; put yellow to room4`
 - Line up items in lines. Make sure that each color is lined separately (you don't have to do it in a general way, step by step is ok)
 `line red; line blue; line green; line yellow`
 - If there are (at least) 5 items at room2, distribute them around rooms. Otherwise, bring all items (from the whole map) to room2.
 `if { repeat 5 times {visit room2 containing item; pick item} } else {bring all to room2}`
 
 
 