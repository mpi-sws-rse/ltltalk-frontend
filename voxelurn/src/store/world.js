import Constants from "constants/actions"
import { STATUS, USER_INPUT_FIELD } from "constants/strings"
import { worldConfig } from "constants/defaultMap"
import { TRY_MSG} from 'constants/strings';


import { taskWorldConfig } from "constants/taskWorldMap"

import { selectTask } from 'helpers/task'



const initialState = {
  history: [{
    text: "initial",
    worldMap: worldConfig.worldMap,
    robot: worldConfig.robot,
    path: [],
    formula: "(initial)" }],
  responses: [],
  pointMarkers: [], 
  waterMarkers: [ [3, 7], [5, 1], [9, 5], [4,4] ],
  wallMarkers: worldConfig.walls,
  current_history_idx: -1,
  status: STATUS.TRY,
  query: "",
  currentQuery: "", // Remember user query when user is defining,
  currentQueryRemembered: "", // for request url
  defining: false,
  defineN: null,
  dictionary: [],
  robot: worldConfig.robot,
  keyPressHist: [],
  keyPressHistRemembered: [], // for request url
  isKeyPressEnabled: false,
  isItemSelectionEnabled: false,
  itemsAtCurrentLocation: [],
  isAnimationEnabled: false, // Show server-generated examples to user
  animationPath: [],
  stateBeforeAnimation: { worldMap: null, robot: null , waterMarkers: null },
  currentAnimation: null,
  currentResponse: null,
  isLoading: false,
  isReading: false,
  areInstructionsHidden: false,
  isThankYouMessageDisplayed: false,
  taskDescription:"",
  robotBeforeUserDefinition : null,
  worldBeforeUserDefinition: null
}

export default function reducer(state = initialState, action = {}) {
  let nextRobotPosition;
  let currentWorldMap;
  const currentRobot = state.robot;
  console.log("current robot is ");
  console.log(currentRobot);
  const currentKeyPressHist = state.keyPressHist;
  const currentRobotX = currentRobot.x;
  const currentRobotY = currentRobot.y;
  const idx = state.history.length - 1;

  switch (action.type) {
    case Constants.TOGGLE_THANK_YOU_MESSAGE: 
      return { ...state, isThankYouMessageDisplayed: action.isThankYouMessageDisplayed };

    case Constants.TOGGLE_READING:
      return { ...state, isReading: action.isReading };

    case Constants.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading };

    case Constants.HIDE_INSTRUCTIONS:
      return { ...state, areInstructionsHidden: true };  

    case Constants.REPEAT_ANIMATION:
      const temporaryHistory = 
      { 
        ...state.history[state.history.length - 1],  
        worldMap: state.currentAnimation.world.world,
        robot: { 
          items: state.currentAnimation.world.robot[2], 
          type: 'robot', 
          x: state.currentAnimation.world.robot[0], 
          y: state.currentAnimation.world.robot[1] } 
      };
      return {
        ...state,
        history: [ ...state.history.splice(0, idx), temporaryHistory ],
        animationPath: state.currentAnimation.path.map(action => (action.completed ? {...action, completed: false} : {...action, forceUpdate: Math.random() }))
      };

    case Constants.END_ANIMATION:
      const restoredWorldMap = state.stateBeforeAnimation.worldMap;
      const restoredRobot = state.stateBeforeAnimation.robot;
      const restoredWaterMarkers = state.stateBeforeAnimation.waterMarkers;
      const restoredHistory = { 
        ...state.history[state.history.length - 1], 
        worldMap: restoredWorldMap, 
        robot: restoredRobot 
      };
      return {
        ...state,
        history: [ ...state.history.splice(0, idx), restoredHistory ],
        animationPath: [],
        waterMarkers: restoredWaterMarkers,
        isAnimationEnabled: false,
        stateBeforeAnimation: { worldMap: null, robot: null , waterMarkers: null }
        // currentAnimation: null
      };


    case Constants.GET_TASK:
      const taskId = action.taskId

      console.log("task id in store is...")
      console.log(taskId)
      // console.log("before task...");
      // console.log(state.history[state.history.length - 1]);
      const task = selectTask(taskId,taskWorldConfig)

      console.log("get world robot is")
      console.log(task.world)
      console.log(task.description)
      
      const tHistory = 
      { 
        ...state.history[state.history.length - 1],  
       
            
        worldMap: task.world,
        robot: {x:task.robot[0], y:task.robot[1], type:"robot", items: task.robot[2]}      };

      console.log("task world")
      console.log(tHistory)
      return {
        ...state,
        taskDescription : task.description,
        waterMarkers : task.water,
        history: [ ...state.history.splice(0, idx), tHistory ]      
      };

    case Constants.FETCH_ANIMATION:
      const response = action.response;
      console.log(response);
      if (response.status !== 'indoubt') return { ...state, isThankYouMessageDisplayed: true };
      const exampleRobot = response.world.robot;
      const exampleRobotX = exampleRobot[0];
      const exampleRobotY = exampleRobot[1];
      const exampleRobotItems = exampleRobot[2];
      const exampleWorldMap = response.world.world;

      // Format robot
      const formattedRobot = { items: exampleRobotItems, type: 'robot', x: exampleRobotX, y: exampleRobotY };

      // Format world and watermarkers
      const formattedWorldMap = exampleWorldMap.filter(position => position.type !== 'water');
      let formmattedWaterMarkers = exampleWorldMap.filter(position => position.type === 'water');
      formmattedWaterMarkers = formmattedWaterMarkers.map(waterMarker => [waterMarker.x, waterMarker.y]);

      const stateBeforeAnimation = {
        worldMap: state.history[state.history.length - 1].worldMap,
        robot: state.history[state.history.length - 1].robot,
        waterMarkers: state.waterMarkers
      };

      // this is a terrible mapping, but don't want to change it immediately as I don't know what it will break later
      const currentAnimation = { ...action.response };

      const query = { text: action.response.query };


      const tempHistory = { ...state.history[state.history.length - 1], worldMap: formattedWorldMap, robot: formattedRobot };
      return {
        ...state,
        history: [ ...state.history.splice(0, idx), tempHistory ],
        animationPath: response.path.map(action => (action.completed ? {...action, completed: false} : action)),
        waterMarkers: formmattedWaterMarkers,
        isAnimationEnabled: true,
        stateBeforeAnimation: stateBeforeAnimation,
        currentAnimation: currentAnimation,
        currentResponse: response,
        query: query
      };

    case Constants.START_USER_DEFINITION:
      document.activeElement.blur();
      const robotStartState = state.history[idx].robot;
      const robotBeforeUserDefinition = {x:robotStartState.x,y:robotStartState.y,items: robotStartState.items};
      const worldBeforeUserDefinition = state.history[idx];
      return { ...state, robot: robotStartState, 
        isKeyPressEnabled: true, 
        currentQuery: state.query,
        robotBeforeUserDefinition,
        worldBeforeUserDefinition 
      };

    case Constants.FINISH_USER_DEFINITION: 
      document.getElementById(USER_INPUT_FIELD).focus({ preventScroll: true });
      const newHistoryEntry = { ...state.history[idx], type: null, robot: currentRobot };
      return { 
        ...state, 
        history: [ ...state.history.splice(0, idx), newHistoryEntry ],
        isKeyPressEnabled: false,
        defining: false, 
        defineN: null, 
        query: "",
        status: STATUS.TRY,
        keyPressHist: [],
        keyPressHistRemembered: state.keyPressHist,
        currentQuery: "",
        currentQueryRemembered: state.currentQuery 
      }; 

    case Constants.FORCE_QUIT_ITEM_SELECTION:
      return { ...state,
               isItemSelectionEnabled: false 
             };

    case Constants.START_ITEM_SELECTION:
      currentWorldMap = state.history[idx].worldMap;
      let itemsAtCurrentLocation = [];
      for (let i = 0; i < currentWorldMap.length; i ++) {
        if (currentWorldMap[i].x === currentRobotX && 
            currentWorldMap[i].y === currentRobotY &&  
            currentWorldMap[i].type === 'item') { 
          const isSelected = false;    
          const itemID = i.toString();   
          itemsAtCurrentLocation.push([currentWorldMap[i].color, currentWorldMap[i].shape, isSelected, itemID]);    
        }      
      }
      return { ...state,
               itemsAtCurrentLocation,
               isItemSelectionEnabled: true};

    case Constants.FINISH_ITEM_SELECTION:
      const isSelected = ({ color, shape, id }) => {
        const item = state.itemsAtCurrentLocation.find(item => item[0] === color && item[1] === shape && item[3] ===id);
        const isItemSelected = item[2];
        return isItemSelected; 
      };
      let newWorldMap = [];
      currentWorldMap = state.history[idx].worldMap;
      let carriedItems = currentRobot.items.map(item => item);
      let newItems = [];
      for (let i = 0; i < currentWorldMap.length; i ++) {
        if (currentWorldMap[i].x === currentRobotX && 
            currentWorldMap[i].y === currentRobotY &&  
            currentWorldMap[i].type === 'item' &&
            isSelected({ 
              color: currentWorldMap[i].color, 
              shape: currentWorldMap[i].shape, 
              id: i.toString()})) 
        {
          carriedItems.push([currentWorldMap[i].color, currentWorldMap[i].shape]);    
          newItems.push([currentWorldMap[i].color, currentWorldMap[i].shape]);
        }   
        else newWorldMap.push(currentWorldMap[i]);    
      }

      const currentHistory = { ...state.history[idx], worldMap: newWorldMap };
      // console.log("%%%carried item %%%%")
      // console.log(carriedItems)
      return { ...state,
               history: [ ...state.history.splice(0, idx), currentHistory ], 
               robot: { ...state.robot, items: carriedItems},

               keyPressHist: [ ...currentKeyPressHist, ['pick', newItems] ],
               isItemSelectionEnabled: false,
               itemsAtCurrentLocation: []
             };  

    case Constants.TOGGLE_ITEM_SELECTION:
      const newItemsAtCurrentLocation = state.itemsAtCurrentLocation.map(item => item);
      for (let i=0; i<newItemsAtCurrentLocation.length; i++) {
        const selectedColor = action.color;
        const selectedShape = action.shape;
        const selectedID = action.id;
        const currentColor = newItemsAtCurrentLocation[i][0];
        const currentShape = newItemsAtCurrentLocation[i][1];
        const currentID = newItemsAtCurrentLocation[i][3];
        if (selectedColor === currentColor && selectedShape === currentShape && selectedID === currentID) {
          newItemsAtCurrentLocation[i][2] = ! newItemsAtCurrentLocation[i][2];
        }
      }
      return { ...state, 
               itemsAtCurrentLocation: newItemsAtCurrentLocation
             };       
       
    case Constants.MOVE_ROBOT_UP:
      nextRobotPosition = { x: currentRobotX, y: currentRobotY + 1 };
      // If nextRobotPosition is a wall, don't move robot, don't change state.
      if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
      // Else move robot up and update key press history
      else return { ...state, robot: { ...currentRobot, y: currentRobotY + 1 }, keyPressHist: [ ...currentKeyPressHist, ['move','up' ]] };

      
		case Constants.MOVE_ROBOT_DOWN:
			nextRobotPosition = { x: currentRobotX, y: currentRobotY - 1 };
			if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
      else return { ...state, robot: { ...currentRobot, y: currentRobotY - 1 }, keyPressHist: [ ...currentKeyPressHist, ['move','down' ] ] };


		case Constants.MOVE_ROBOT_LEFT:
			nextRobotPosition = { x: currentRobotX - 1, y: currentRobotY };
			if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
      else return { ...state, robot: { ...currentRobot, x: currentRobotX - 1 }, keyPressHist: [ ...currentKeyPressHist, ['move','left' ] ] };


		case Constants.MOVE_ROBOT_RIGHT:
			nextRobotPosition = { x: currentRobotX + 1, y: currentRobotY };
			if (state.wallMarkers.find((pos) => pos.x === nextRobotPosition.x && pos.y === nextRobotPosition.y)) return state;
      else return { ...state, robot: { ...currentRobot, x: currentRobotX + 1 }, keyPressHist: [ ...currentKeyPressHist, ['move','right' ] ] };   


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

      // could manipulating history be of a help here?
      return { ...state, responses: action.responses, history: history, current_history_idx: -1, status: STATUS.ACCEPT }
    case Constants.ACCEPT:
      const newHistory = [...state.history, action.el]
      return { ...state, history: newHistory, responses: [], status: STATUS.TRY, query: "" }
    case Constants.DEFINE:
      return { ...state, defining: false, defineN: null, query: "", status: STATUS.TRY, dictionary: [] }
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
