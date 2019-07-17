import { EXAMPLE_SERVER_URL } from "constants/strings"


export async function EXAMPLEquery(cmds, callback) {

  // console.log("+++++++post example query ++++");
  // console.log(JSON.stringify(cmds.context))
  // console.log("+++++++Path is ++++");

  // console.log(JSON.stringify(cmds.path))

 return fetch(`${EXAMPLE_SERVER_URL}/get-candidate-spec?query=${cmds.query}&path=${JSON.stringify(cmds.path)}&context=${JSON.stringify(cmds.context)}&sessionId=${cmds.sessionId}`
 ).then(response => {
   console.log("Resonspe is Status is:")
   console.log(response.statusText)
   
 })
 .catch((ex) => {
   console.log("fetch issue?", ex)
   return;

 })
}