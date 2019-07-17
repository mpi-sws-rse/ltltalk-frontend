import { EXAMPLE_SERVER_URL } from "constants/strings"


export async function EXAMPLEquery(cmds, callback) {
  return fetch('https://8142f831-e581-4c4a-98ac-d4f52dd6fc32.mock.pstmn.io') 
  .then((response) => {
    const responseJSON = response.json();
    //console.log(responseJSON)
    return responseJSON;
  })
  .catch((error) => {
    alert('Error when getting worlds from server!');
  })
  // console.log("+++++++post example query ++++");
  // console.log(cmds)


  // var data_ = new FormData();
  // data_.append(
  //       'formula',
  //        cmds
  //         // 'req_type': 'updateRecord',
  //         // 'mjson': btext,  
  //         //   'OS': Platform.OS  // optional
  //     );

  // return fetch(`${EXAMPLE_SERVER_URL}/get-candidate-spec?`,
  // {
  //   method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: data_
  //   }
  //   )
  // // return fetch(`${FLASK_SERVER_URL2}/api/singleExample?formula=${cmds}`)

  //   .then(response => {
  //     console.log("response is..........")

  //     console.log(response.json())
  //   }

    
  //   )
  //   .catch((ex) => {

  //     alert("Query could no be processed by server.");
  //     console.log("fetch issue?", ex)
  //     return;

  //   })
}