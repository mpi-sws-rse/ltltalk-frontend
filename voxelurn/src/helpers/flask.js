import { EXAMPLE_SERVER_URL } from "constants/strings"


export async function EXAMPLEquery(cmds, callback) {

  console.log("+++++++post example query ++++");
  console.log(cmds.context)
  return fetch(`${EXAMPLE_SERVER_URL}/get-candidate-spec?query=${cmds.query}&path=${cmds.path}&context=${cmds.context}&sessionId=${cmds.sessionId}`)
}