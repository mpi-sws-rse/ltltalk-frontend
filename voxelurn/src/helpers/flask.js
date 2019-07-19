import { EXAMPLE_SERVER_URL } from 'constants/strings';

// const toQueryParam = (string) => {
// 	let newString = string.replace(`[`, `[\n`);
// 	console.log(newString);
// 	newString = newString.replace(`]`, `]\n`);
// 	newString = newString.replace('m', 'd');
// 	return newString;
// };

// https://d2a4b60b-0322-4156-bd45-70d04dc80be2.mock.pstmn.io
export async function EXAMPLEquery(url) {
  alert(arguments.length);
  alert('Im in async')
	const raw =
		'http://127.0.0.1:5000/get-candidate-spec?query=get red item&path=[\n  [\n    "move",\n    "right"\n  ],\n  [\n    "move",\n    "right"\n  ],\n  [\n    "move",\n    "right"\n  ], [\n    "move",\n    "right"\n  ],[\n    "move",\n    "right"\n  ],\n  [\n    "pick",\n    [\n      [\n        "red",\n        "circle"\n      ]\n    ]\n  ]\n]&context={\n  "height": 10,\n  "robot": [\n    2,\n    4,\n    []\n  ],\n  "width": 10,\n  "world": [\n    {\n      "x": -1,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 0,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 1,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 2,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 3,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 4,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 5,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 6,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 7,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 8,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 9,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 10,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 11,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": 9,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 8,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 6,\n      "y": 8,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": 8,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 7,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 3,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 6,\n      "y": 7,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 10,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "triangle"\n    },\n    {\n      "x": 10,\n      "y": 7,\n      "type": "item",\n      "color": "green",\n      "shape": "triangle"\n    },\n    {\n      "x": 12,\n      "y": 7,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 0,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 1,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 2,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 3,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 4,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 6,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 7,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 8,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 10,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 11,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": 6,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 5,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": 5,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 4,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 7,\n      "y": 4,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 7,\n      "y": 4,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 7,\n      "y": 4,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 7,\n      "y": 4,\n      "type": "item",\n      "color": "green",\n      "shape": "circle"\n    },\n    {\n      "x": 12,\n      "y": 4,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 3,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 8,\n      "y": 3,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 9,\n      "y": 3,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 10,\n      "y": 3,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 11,\n      "y": 3,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": 3,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 2,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 3,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 4,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 5,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 6,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 7,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 8,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": 2,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 8,\n      "y": 1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 11,\n      "y": 1,\n      "type": "item",\n      "color": "green",\n      "shape": "square"\n    },\n    {\n      "x": 12,\n      "y": 1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": 0,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 4,\n      "y": 0,\n      "type": "item",\n      "color": "green",\n      "shape": "triangle"\n    },\n    {\n      "x": 4,\n      "y": 0,\n      "type": "item",\n      "color": "green",\n      "shape": "triangle"\n    },\n    {\n      "x": 12,\n      "y": 0,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": -1,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 0,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 1,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 2,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 3,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 4,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 5,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 6,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 7,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 8,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 9,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 10,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 11,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    },\n    {\n      "x": 12,\n      "y": -1,\n      "type": "wall",\n      "color": "null",\n      "shape": "null"\n    }\n  ]\n}&sessionId=tempSessionId';
	//http://127.0.0.1:5000/get-candidate-spec?query=${infoToBeSent.query}&path=${JSON.stringify(infoToBeSent.path)}&context=${JSON.stringify(infoToBeSent.context)}}&sessionId=tempSessionId
	//console.log('url conversion');
	//console.log(infoToBeSent.path)
  //console.log(toQueryParam(JSON.stringify(infoToBeSent.path)));
  //console.log(`query is ${infoToBeSent.query}`)
	const dummyQuery = 'get red item'
	const dummyPath = [ [ 'move', 'right' ],  [ 'move', 'right' ]];
	const dummyContext = {
		height: 10,
		robot: [ 2, 4, [] ],
		width: 10,
		world: [
			{
				x: -1,
				y: 9,
				type: 'wall',
				color: 'null',
				shape: 'null'
			}
		]
  };
  const dummySessionId = 'tempSessionId'
  console.log('hey everything is here')
  console.log(url);
  //const dummyPath = JSON.stringify(infoToBeSent.path);
  
  const dummyURL = `http://127.0.0.1:5000/get-candidate-spec?query=${dummyQuery}&path=${JSON.stringify(dummyPath)}&context=${JSON.stringify(dummyContext)}&sessionId=${dummySessionId}`;
  //console.log('dummy url is');
  console.log(dummyURL);
	return fetch(dummyURL)
		.then((response) => {
      const responseJSON = response.json();
			console.log(responseJSON)
			return responseJSON;
		})
		.catch((error) => {
			alert('Error when getting worlds from server!');
		});
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
