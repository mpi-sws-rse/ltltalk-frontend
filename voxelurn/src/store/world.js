import Constants from "constants/actions"
import { STATUS } from "constants/strings"
import { worldConfig } from "constants/defaultMap"

const initialState = {
  history: [{
    text: "initial",
    worldMap: worldConfig.worldMap,
    robot: worldConfig.robot,
    path: [],
    formula: "(initial)" }],
  responses: [],
  pointMarkers: [], 

  // The blue grids are called "waters".
  // Items (that are not carried by the robot) cannot be on waters.
  // But the robot can. And the robot can step on a water grid while carrying items.
  // These 3 points are arbitrarily chosen. 
  // Chuntong.
  waterMarkers: [ [3, 7], [5, 1], [9, 5] ], 

  // Same format as waterMarkers. An array of coordinates.
  // Chuntong.
  wallMarkers: worldConfig.walls,
  current_history_idx: -1,
  status: STATUS.TRY,
  query: "",
  defining: false,
  defineN: null,

  // The dictionary panel has been deleted. 
  // This dictionary property is useless.
  // But deleting it will involve refactoring many other places.
  // So leave it here for now. 
  // Chuntong.
  dictionary: [],
  
  // Manipulate this property only when key press is enabled.
  // Do NOT do anything with it when key press is disabled.
  // Upon enabling key press, 
  // set the robot property here as the current robot state (i.e. the robot state in the latest history entry).
  // Upon disabling key press, remember to store the robot state in the latest history entry.
  // Chuntong.
  robot: worldConfig.robot,

  // Keys that the user pressed. 
  // Remember to empty the array upon disabling key press.
  // I know this is not the best implementation.
  // We should probably store the old key press history and make a new key press history,
  // instead of emptying the old key press history.
  // But it works for now. We can change it later.
  // Chuntong.
  keyPressHist: [],

  // Make this true when the user enters a command that the server cannot understand.
  // The user will be asked to provide a definition by moving the robot and / or instructing the robot
  // to pick items, with key presses. When the user finishes defining, turn this back to false.
  // Chuntong. 
  isKeyPressEnabled: false,
  isItemSelectionEnabled: false,
  itemsAtCurrentLocation: [],

  // These lines were commented out by previous people.
  // I don't know if they are useful. Just put them here in case we need them later. 
  // Chuntong.
  //robotStep: 0, // How far is the robot along its visual simulation
  //popup: { active: true, text: "No error yet!" },
  //exampleQuery: "add red 3 times",
}

export default function reducer(state = initialState, action = {}) {
  let nextRobotPosition;
  const currentRobot = state.robot;
  const currentKeyPressHist = state.keyPressHist;
  const currentRobotX = currentRobot.x;
  const currentRobotY = currentRobot.y;
  const idx = state.history.length - 1;

  switch (action.type) {
    
    case Constants.ENABLE_KEY_PRESS:
      // The code here is pretty self explanatory.
      // Remember to read the description of the robot property in the initial state.
      // Chuntong.
      // document.getElementById('blocksCanvas').focus({ preventScroll: true });
      const robotStartState = state.history[idx].robot;
      return { ...state, robot: robotStartState, isKeyPressEnabled: true };

    case Constants.DISABLE_KEY_PRESS: 
      // Upon disabling key press, make a new history entry
      // This new history entry contains the same info as the entry before it, EXCEPT that  
      // the robot has been moved and / or has picked up items.
      // I do not understand why I need 'type: null', but removing it causes weird bugs. Just keep it.
      // Chuntong.
      console.log(state.keyPressHist)
      // document.activeElement.blur();
      const newHistoryEntry = { ...state.history[idx], type: null, robot: currentRobot };
      return { 
        ...state, 
        history: [ ...state.history.splice(0, idx), newHistoryEntry ],
        isKeyPressEnabled: false,
        defining: false, 
        defineN: null, 
        query: "",
        status: STATUS.TRY,
        keyPressHist: [] 
      }; 

    case Constants.ROBOT_PICK_ITEM:
      // Remember that items that are not carried by the robot are considered 
      // "points" (or "block") in the world map.
      // A point has x and y coordinates and a type (e.g. 'item').
      // When an item gets picked up by the robot, 
      // we need to remove it from the world map, therefore I am creating a new world map.
      // Chuntong.
      let newWorldMap = [];
      let carriedItems = currentRobot.items.map(item => item);
      let currentWorldMap = state.history[idx].worldMap;
      let itemsAtCurrentLocation = [];
      for (let i = 0; i < currentWorldMap.length; i ++) {
        if (currentWorldMap[i].x === currentRobotX && 
            currentWorldMap[i].y === currentRobotY &&  
            currentWorldMap[i].type === 'item') {
          carriedItems.push([currentWorldMap[i].color, currentWorldMap[i].shape]); 
          itemsAtCurrentLocation.push([currentWorldMap[i].color, currentWorldMap[i].shape, false]);    
        }   
        else newWorldMap.push(currentWorldMap[i]);    
      }
      const currentHistory = { ...state.history[idx], worldMap: newWorldMap };
      return { ...state, 
               history: [ ...state.history.splice(0, idx), currentHistory ], 
               robot: { ...state.robot, items: carriedItems},
               keyPressHist: [ ...currentKeyPressHist, 'pick' ],
               itemsAtCurrentLocation
            }; 

    case Constants.ENABLE_ITEM_SELECTION:
      return { ...state,
               isItemSelectionEnabled: true};

    case Constants.DISABLE_ITEM_SELECTION:
      return { ...state,
               isItemSelectionEnabled: false,
               itemsAtCurrentLocation: []
             };  

    case Constants.TOGGLE_ITEM_SELECTION:
      const newItemsAtCurrentLocation = state.itemsAtCurrentLocation.map(item => item);
      for (let i=0; i<newItemsAtCurrentLocation.length; i++) {
        console.log(action.color);
        console.log(action.shape);
        console.log(newItemsAtCurrentLocation[i][0]);
        console.log(newItemsAtCurrentLocation[i][1]);

        const givenColor = action.color;
        const givenShape = action.shape;
        const currentColor = newItemsAtCurrentLocation[i][0];
        const currentShape = newItemsAtCurrentLocation[i][1];
        if (givenColor === currentColor && givenShape === currentShape) {
          newItemsAtCurrentLocation[i][2] = ! newItemsAtCurrentLocation[i][2];
        }
      }
      return { ...state, 
               itemsAtCurrentLocation: newItemsAtCurrentLocation
             };       

    // Note: The up, down, right and left cases contain some duplicated code.
    // We can refactor and reduce duplication later.
    // Chuntong.        
    case Constants.MOVE_ROBOT_UP:
      nextRobotPosition = { x: currentRobotX, y: currentRobotY + 1 };
      // If nextRobotPosition is a wall, don't move robot, don't change state.
      if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
      // Else move robot up and update key press history
      else return { ...state, robot: { ...currentRobot, y: currentRobotY + 1 }, keyPressHist: [ ...currentKeyPressHist, 'up' ] };
      
		case Constants.MOVE_ROBOT_DOWN:
			nextRobotPosition = { x: currentRobotX, y: currentRobotY - 1 };
			if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
			else return { ...state, robot: { ...currentRobot, y: currentRobotY - 1 }, keyPressHist: [ ...currentKeyPressHist, 'down' ] };

		case Constants.MOVE_ROBOT_LEFT:
			nextRobotPosition = { x: currentRobotX - 1, y: currentRobotY };
			if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
			else return { ...state, robot: { ...currentRobot, x: currentRobotX - 1 }, keyPressHist: [ ...currentKeyPressHist, 'left' ] };

		case Constants.MOVE_ROBOT_RIGHT:
			nextRobotPosition = { x: currentRobotX + 1, y: currentRobotY };
			if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
      else return { ...state, robot: { ...currentRobot, x: currentRobotX + 1 }, keyPressHist: [ ...currentKeyPressHist, 'right' ] };   

    case Constants.SET_QUERY:
      return { ...state, query: action.query }
    case Constants.REVERT:
      if (state.defining) {
        return state
      }
      return { ...state, current_history_idx: action.idx, responses: initialState.responses, status: initialState.status, query: initialState.query }

    case Constants.TRY_QUERY:
      let history = state.history
      if (state.current_history_idx >= 0) {
        history = history.slice(0, state.current_history_idx + 1)
      }
      return { ...state, responses: action.responses, history: history, current_history_idx: -1, status: STATUS.ACCEPT }
    case Constants.ACCEPT:
      const newHistory = [...state.history, action.el]
      return { ...state, history: newHistory, responses: [], status: STATUS.TRY, query: "" }
    case Constants.DEFINE:
      // TODO The "value" here will have to be changed
      let collapsedHistory = [...state.history.slice(0, action.idx), {
        text: action.text,
        //value: state.history[state.history.length - 1].value,
        worldMap: state.history[state.history.length - 1].worldMap,
        robot: state.history[state.history.length - 1].robot,
        path: [],
        formula: action.formula
      }]
      if (collapsedHistory.length === 0) collapsedHistory = initialState.history
      else if (collapsedHistory.length === 1) collapsedHistory = [...initialState.history, ...collapsedHistory]
      return { ...state, history: collapsedHistory, defining: false, defineN: null, query: "", status: STATUS.TRY, dictionary: [] }
    case Constants.SET_STATUS:
      return { ...state, status: action.status }
    ///////
    case Constants.UPDATE_POINT_MARKERS:
      return { ...state, pointMarkers: action.pointMarkers }
    ///////
    case Constants.RESET_RESPONSES:
      return { ...state, status: STATUS.TRY, query: "", responses: [] }
    case Constants.OPEN_DEFINE:
      return { ...state, defining: true, defineN: action.defineN }
    case Constants.CLOSE_DEFINE:
      const cleanHistory = state.history.filter(h => h.formula !== "false") /* we have to clean up any inejcted pins */
      return { ...state, defining: false, defineN: null, query: "", status: STATUS.TRY, history: cleanHistory }
    case Constants.SET_DEFINE_N:
      return { ...state, defineN: action.defineN }
    case Constants.SET_PIN:
      // I am not sure what "value" was doing; it might have been replaced with "robot" and "worldMap"
      let newHistoryWithPin = [...state.history, {
        text: state.query,
        type: "pin",
        worldMap: state.history[state.history.length - 1].worldMap,
        robot: state.history[state.history.length - 1].robot,
        path: [],
        formula: "()"
      }]
      return { ...state, history: newHistoryWithPin, query: initialState.query, responses: initialState.responses, status: initialState.status, defining: initialState.defining, defineN: initialState.defineN }
    case Constants.REMOVE_PIN:
      let newHistoryWithoutPin = state.history.slice()
      newHistoryWithoutPin.splice(action.idx, 1)
      return { ...state, 
               history: newHistoryWithoutPin, 
               current_history_idx: initialState.current_history_idx,
               isKeyPressEnabled: false,
               robot: newHistoryWithoutPin[newHistoryWithoutPin.length - 1].robot 
             }
    case Constants.MARK_PIN:
      const markedHistory = state.history.slice()
      const index = action.idx ? action.idx : markedHistory.length - 1
      markedHistory[index] = { ...markedHistory[index], type: "pin" }
      return { ...state, history: markedHistory }
    case Constants.INJECT_PIN:
      let injectedHistory = state.history.slice(0)
      // TODO Change "value"
      injectedHistory.splice(action.idx, 0, {
        text: "",
        type: "pin",
        //value: [], // Not sure what worldMap should be
        worldMap: state.history[state.history.length - 1].worldMap,
        robot: state.history[state.history.length - 1].robot,
        path: [],
        formula: "false"
      })
      return { ...state, history: injectedHistory }
    case Constants.REMOVE_LAST:
      let trimmedHistory = state.history.slice(0, state.history.length - 1)
      return { ...state, history: trimmedHistory, query: initialState.query, status: initialState.status, responses: initialState.responses }
    case Constants.CLEAR:
      return { ...initialState, dictionary: state.dictionary}
    case Constants.DICTIONARY:
      return { ...state, dictionary: action.dictionary}
    default:
      return state
  }
}
