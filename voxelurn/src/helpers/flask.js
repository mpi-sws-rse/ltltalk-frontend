import { EXAMPLE_SERVER_URL } from "constants/strings"


export async function EXAMPLEquery(cmds, callback) {

  console.log("+++++++post example query ++++");
  console.log(cmds)


  var data_ = new FormData();
  data_.append(
        'formula',
         cmds
          // 'req_type': 'updateRecord',
          // 'mjson': btext,  
          //   'OS': Platform.OS  // optional
      );

  return fetch(`${EXAMPLE_SERVER_URL}/get-candidate-spec?`,
  {
    method: "GET",
    body: data_
    }
    )
  // return fetch(`${FLASK_SERVER_URL2}/api/singleExample?formula=${cmds}`)

    .then(response => response.json())
    .then(responseData => {
      console.log("response is new......")
      console.log(responseData)
      //  return parseResponse(responseData)
      return
    })
    .catch((ex) => {

      alert("Query could no be processed by server.");
      console.log("fetch issue?", ex)
      return;

    })
}