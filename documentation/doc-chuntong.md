#Explanations of Core Files in Front End Code Base

##Redux & State Management

We use redux to centralize state management. Basically, when we want to change the state of the application, we `dispatch` an `action` by calling its corresponding `action creator`. Each `action` is an object that contains `type` and other action-specific information. You can find all available `action creators` in the `actions` directory. `actions/world.js` contains the most important actions. The `redcuer` (see `store/world.js`) receives the dispatched action and decides what to do next based on the type of the action. To update the state, the `reducer` do NOT modify the current state. Instead, it returns an object that represents the new state.

For more information on Redux, please visit the following official documentations:  
[Redux: A Predictable State Container for JavaScript Apps](https://redux.js.org/)  
[Redux: Usage with React](https://redux.js.org/basics/usage-with-react)  
[React Redux: Official React Bindings for Redux](https://react-redux.js.org/)
[Chrome Extension: Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)  

##List of Actions that I added this summer
Note that I am listing `action creators` (e.g. toggleThankYouMessages) here, which are functions and are located in `actions/world.js`. Each action creator also corresponds to an action type (e.g.  TOGGLE_THANK_YOU_MESSAGE), which is a constant string and is stored in `constants/action.js`.

*  `toggleThankYouMessage`
  
   Receives a boolean, `isThankYouMessageDisplayed`. Usually we only need to call toggleThankYouMessage `toggleThankYouMessage` when we want to display the thank you message. The thank you message will automatically fade out after a few seconds, so there is no need to manually turn off the thank you message.
   
* `hideInstructions`

   By default the user will see an instruction box every time before he gets an animation. If the action `hideInstructions` is emitted, then the user will never see the instruction box again.
   
* `toggleLoading`

   When an HTTP request is submitted, the front end will wait for a response and display a loading animation. Emit the action `toggleLoading` when the front end starts waiting and when the front end finishes waiting.

 * `repeatAnimation`

   Emit the action `repeatAnimation` when the user wants to view the animation again. Retrieve information about the current animation from the `currentAnimation` property in `store/world.js`.

 * `endAnimation`

   End the current animation and return to the world state before animation. Retrieve the previous world state from the `stateBeforeAnimation` property in `store/world.js`.

* `decisionUpdate`

   The user needs to decide if the current animation matches his command. This decision (either yes or no) will be sent to the server through emitting the action `decisionUpdate`. The action creator takes 1 argument, which is either `1` (yes) or `0` (no).

* `fetchAnimation`

   The action `fetchAnimation` is emitted 