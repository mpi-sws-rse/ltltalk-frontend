/* Server URLs */
//const DEFAULT_SEMPRE_SERVER_URL = "http://jonsson.stanford.edu:8410"
//const DEFAULT_SEMPRE_SERVER_URL = "http://localhost:8410"
//const DEFAULT_SEMPRE_SERVER_URL = "http://127.0.0.1:8410";
//const DEFAULT_SEMPRE_SERVER_URL = getDomain()+":8410";

const DEFAULT_IMPRINT = "/";
const DEFAULT_DATA = "/";
export const DEFAULT_SEMPRE_SERVER_URL = "//ltltalk.mpi-sws.org/";
export const DEFAULT_EXAMPLES_SERVER_URL = "//ltltalk.mpi-sws.org/";

//const DEFAULT_COMMUNITY_SERVER_URL = "http://jonsson.stanford.edu:8403"
export const USER_INPUT_FIELD = "user-input-field";
export const SEMPRE_SERVER_URL = process.env.REACT_APP_SEMPRE_SERVER ? process.env.REACT_APP_SEMPRE_SERVER : DEFAULT_SEMPRE_SERVER_URL;
//export const EXAMPLE_SERVER_URL = getDomain()+":5000";
export const EXAMPLE_SERVER_URL = process.env.REACT_APP_EXAMPLES_SERVER ? process.env.REACT_APP_EXAMPLES_SERVER : DEFAULT_EXAMPLES_SERVER_URL;


export const IMPRINT = process.env.REACT_APP_IMPRINT_LINK ? process.env.REACT_APP_IMPRINT_LINK : DEFAULT_IMPRINT;
export const DATA_PROTECTION = process.env.REACT_APP_DATA_PROTECTION_LINK ? process.env.REACT_APP_DATA_PROTECTION_LINK : DEFAULT_DATA;
//export const COMMUNITY_SERVER_URL = process.env.REACT_APP_COMMUNITY_SERVER ? process.env.REACT_APP_COMMUNITY_SERVER : DEFAULT_COMMUNITY_SERVER_URL

/* Header URLs */
//export const TUTORIAL_URL = "https://youtu.be/7clXX0g3Znw"
//export const SLACK_SIGNUP_URL = "https://shrdlurn.slack.com/"
//export const SLACK_OAUTH_URL = "https://slack.com/oauth/authorize?scope=identity.basic,identity.email&client_id=130265636855.151294060356&redirect_uri=" + (process.env.NODE_ENV === "development" ? "http%3A%2F%2Flocalhost%3A3000%2F%23%2Flogin" : "http%3A%2F%2Fwww.voxelurn.com%2F%23%2Flogin")
//export const DOCUMENTATION_URL = "https://github.com/sidaw/shrdlurn/blob/master/Voxelurn.md"

/* Meta information */
export const DEFAULT_SESSIONID = "euthyphro"
//export const DEFAULT_SESSIONID = Math.random(new Date()/1).toString(36).substr(2,10);
//console.log("Session ID: " + DEFAULT_SESSIONID);

/* Control strings */
export const STATUS = {
  TRY: "TRY",
  ACCEPT: "ACCEPT",
  DEFINE: "DEFINE",
  LOADING: "LOADING"
}

/* Important Variables */
export const CUBE_MINIMUM = 50

/* Display Strings */
export const COMMAND_BAR_PLACEHOLDER = "Tell the robot to do something..."
export const COMMAND_BAR_DEFINE_PLACEHOLDER = "Define this set of actions as..."
export const TRY_MSG = "Enter a command for the robot."
export const ACCEPT_MSG = "Click accept if the robot correctly intepreted what you meant, scroll to see other intepretations or revise your command."
export const DEFINE_MSG = "Define the highlighted set of actions as this phrase (e.g. gather all items)."
export const REDEFINE = "Redefine"
export const FINISH_DEFINITION = "Finish Definition"

function getDomain() {
  return window.location.href.match(/^(.*:\/\/[\w\.-]+):?\/?/)[1];
}
