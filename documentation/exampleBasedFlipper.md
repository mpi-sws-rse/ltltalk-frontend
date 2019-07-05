# Example-based definitions scenario

The robot's goal is to pick some items, potentially in a particular order, while stepping (or not) to water tiles. 
If the robot does not understand the utterance, user navigates the robot manually, thus giving an example of what needs to be accomplished.
While giving the example, user can
 - move the robot to the left/right/up/down (using up and down arrows)
 - pick a subset of items: when the user presses 'p', a set of items is offered that the user than has to select

## Generated events
As the robot is moving through the environment, different events are generated
 - `wet`, `dry`: corresponding to whether the agent is on the wet or dry tile
 - `picked_<single|every>_<shape|color>`, `picked_<single|every>_<shape>_and_<color>`, `picked_<single|every>_item` corresponding to what has been picked. It is possible that a single movement generated different events, e.g. `picked_red, picked_triangle, at_dry, picked_every_red, picked_every_triangle, picked_every_red_and_triangle, picked_single_item, picked_every_item` upon robot picking the only item present at the field (which happens to be a red triangle).

