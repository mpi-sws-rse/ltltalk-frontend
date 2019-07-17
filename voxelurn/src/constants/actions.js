const Actions = {
  REPEAT_ANIMATION: 'REPEAT_ANIMATION',
  STOP_SHOWING_ANIMATIONS: 'STOP_SHOWING_ANIMATIONS',
  GET_WORLDS_FROM_SERVER: 'GET_WORLDS_FROM_SERVER',
  FORCE_QUIT_ITEM_SELECTION: 'FORCE_QUIT_ITEM_SELECTION',
  TOGGLE_ITEM_SELECTION: 'TOGGLE_ITEM_SELECTION',
  START_USER_DEFINITION: "START_USER_DEFINITION",
  FINISH_USER_DEFINITION: "FINISH_USER_DEFINITION",
  // ROBOT_PICK_ITEM: "ROBOT_PICK_ITEM",
  MOVE_ROBOT_UP: "MOVE-ROBOT_UP",
  MOVE_ROBOT_DOWN: "MOVE_ROBOT_DOWN",
  MOVE_ROBOT_LEFT: "MOVE_ROBOT_LEFT",
  MOVE_ROBOT_RIGHT: "MOVE_ROBOT_RIGHT",
  TRY_QUERY: "TRY_QUERY",
  ACCEPT: "ACCEPT",
  DEFINE: "DEFINE",
  START_ITEM_SELECTION: "START_ITEM_SELECTION",
  FINISH_ITEM_SELECTION: "FINISH_ITEM_SELECTION",

  REVERT: "REVERT",
  SET_STATUS: "SET_STATUS",
  SET_QUERY: "SET_QUERY",
  RESET_RESPONSES: "RESET_RESPONSES",
  
  DICTIONARY: "DICTIONARY",
  
  UPDATE_ROOM_MARKERS: "UPDATE_ROOM_MARKERS",
  UPDATE_POINT_MARKERS: "UPDATE_POINT_MARKERS",

  OPEN_DEFINE: "OPEN_DEFINE",
  CLOSE_DEFINE: "CLOSE_DEFINE",
  SET_PIN: "SET_PIN",
  REMOVE_PIN: "REMOVE_PIN",
  MARK_PIN: "MARK_PIN",
  INJECT_PIN: "INJECT_PIN",
  SET_DEFINE_N: "SET_DEFINE_N",
  REMOVE_LAST: "REMOVE_LAST",

  SET_SESSION_ID: "SET_SESSION_ID",

  OPEN_LOGGING_SOCKET: "OPEN_LOGGING_SOCKET",
  SHARED_STRUCT: "SHARED_STRUCT",
  NEW_ACCEPT: "NEW_ACCEPT",
  NEW_UPVOTE: "NEW_UPVOTE",
  NEW_DEFINE: "NEW_DEFINE",
  NEW_STRUCT: "NEW_STRUCT",
  NEW_UTTERANCES: "NEW_UTTERANCES",
  LOAD_TOP_BUILDERS: "LOAD_TOP_BUILDERS",
  USER_SCORE: "USER_SCORE",
  USER_STRUCTS_COUNT: "USER_STRUCTS_COUNT",
  SET_STRUCTURE_ID: "SET_STRUCTURE_ID",
  STRUCTS: "STRUCTS",

  SET_TASK: "SET_TASK",

  CLEAR: "CLEAR",

  SIGN_IN: "SIGN_IN",

  LOAD_DEFINITIONS: "LOAD_DEFINITIONS"
}

export default Actions
