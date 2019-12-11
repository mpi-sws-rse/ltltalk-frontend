import Constants from 'constants/actions';
import { SEMPREquery, parseSEMPRE /*, worldToJSON*/ } from 'helpers/sempre';
import { EXAMPLEquery } from 'helpers/flask';

import Logger from 'actions/logger';
import { updateRobot, removeRobot } from 'helpers/blocks';
import { persistStore } from 'redux-persist';
import { getStore } from '../';
import { STATUS } from 'constants/strings';
import { worldConfig, WORLD_HEIGHT, WORLD_WIDTH } from 'constants/defaultMap';

import { taskWorldConfig } from 'constants/taskWorldMap';


function sendContext({ history, current_history_idx, sessionId, waterMarkers, keyPressHist }) {
	let contextCommand = '(:context)';

	if (history.length > 0) {
		const idx =
			current_history_idx >= 0 && current_history_idx < history.length ? current_history_idx : history.length - 1;
		const currentState = history[idx].worldMap.map((c) => [ c.x, c.y, c.type, c.color, c.shape ]);
		//const currentState = worldToJSON(history[idx].worldMap);
		const robot = history[idx].robot;
		const robotContext = [ robot.x, robot.y, robot.items ];
		const rooms = {};
		for (let k of Object.keys(worldConfig.roomPoints)) {
			rooms[k] = [ ...worldConfig.roomPoints[k].values() ];
		}
		const totalState = JSON.stringify(
			JSON.stringify({
				robot: robotContext,
				world: currentState,
				waterMarkers,
				keyPressHist,
				rooms: rooms
			})
		);

		contextCommand = `(:context ${totalState})`;
	}

	const contextCmds = { q: contextCommand, sessionId: sessionId };

	return SEMPREquery(contextCmds);
}

const Actions = {
	
	toggleThankYouMessage: (isThankYouMessageDisplayed) => {
		return (dispatch) => {
			dispatch({ type: Constants.TOGGLE_THANK_YOU_MESSAGE, isThankYouMessageDisplayed: isThankYouMessageDisplayed });
		}
	},

	hideInstructions: () => {
		return (dispatch) => {
			dispatch({ type: Constants.HIDE_INSTRUCTIONS });
		}
	},

	toggleReading: (isReading) => {
		return (dispatch) => {
			dispatch({ type: Constants.TOGGLE_READING, isReading: isReading });
		}
	},

	toggleLoading: (isLoading) => {
		return (dispatch) => {
			dispatch({ type: Constants.TOGGLE_LOADING, isLoading: isLoading });
			// setTimeout(()=>dispatch({ type: Constants.TOGGLE_LOADING, isLoading: !isLoading }), 5000);
		}
	},
	
	repeatAnimation: () => {
		return (dispatch) => {
			dispatch({ type: Constants.REPEAT_ANIMATION });
		};
	},

	endAnimation: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.END_ANIMATION
			});
		};
	},


	getTask: (taskId) => {

		return (dispatch) => {
			dispatch({
				type: Constants.GET_TASK,
				taskId
			});
		};

	},

	// decision is 0 or 1
	decisionUpdate: (decision) => {
		return (dispatch, getState) => {
			const { sessionId } = getState().user;
			const queryText = getState().world.currentQueryRemembered;
			console.log(getState());
			console.log("query text is");
			console.log(queryText);
			const { candidates, path, world, trace, actions } = getState().world.currentResponse;
			let url = encodeURI(`http://127.0.0.1:5000/user-decision-update?session-id=${sessionId}&decision=${decision}&sessionId=${sessionId}&candidates=${(JSON.stringify(
				candidates))}&path=${(JSON.stringify(path))}&context=${(JSON.stringify(world))}&actions=${JSON.stringify(actions)}`);

			console.log(url);

			return EXAMPLEquery(url)
				.then((response) => {
				    console.log("got the response:");
				    console.log(response);

					dispatch({ type: Constants.TOGGLE_LOADING, isLoading: false });
					dispatch({ type: Constants.FETCH_ANIMATION, response: response });
					if (response.status === "ok"){

					    const formal_language_def = response.formatted_candidates[0]
					    const query = `(:q ${JSON.stringify(formal_language_def)})`;
                        const cmds = { q: query, sessionId: sessionId };
                        console.log('sending query ' + query);
                        return SEMPREquery(cmds).then((try_response) => {
                            const formula = try_response.candidates[0].formula;
                            console.log("formula is %",formula);

                            let mode=":def_ret";

                            //const sempreQuery = `(${mode} "${/*processed*/ defineAs}" ${JSON.stringify(JSON.stringify(defineHist))})`;

                            const sempreQuery = `(${mode} ${JSON.stringify(queryText)} ${JSON.stringify(JSON.stringify([[formal_language_def, formula]]))})`;
                            console.log("query is %s", sempreQuery);

                            console.log(queryText);

                            console.log(sempreQuery);
                            return SEMPREquery({q: sempreQuery, sessionId: sessionId})
                            .then((resp) => {
                                if (resp.lines && resp.lines.length > 0) {
                                        /* Display errors and quit if there errors */
                                        alert(`There were error(s) in this definition: ${resp.lines.join(", ")}`)
                                        return
                                      }

                                      const { formula: topFormula } = resp.candidates[0]

                                      dispatch(Logger.log({ type: "define", msg: { defineAs: formal_language_def }}));

                                      dispatch({
                                        type: Constants.DEFINE,
                                        text: queryText,
                                      })
                            })
                          })
                        }
                    })
				.catch((error) => {
					alert(`Error in fetchAnimation action: ${error}`);
				});
		};
	},

	fetchAnimation: () => {
		return (dispatch, getState) => {
			const { sessionId } = getState().user;
			const { waterMarkers, robot, history, current_history_idx, currentQueryRemembered, keyPressHistRemembered } = getState().world;

			console.log("world states....")
			console.log(getState().world)

			const { robotBeforeUserDefinition, worldBeforeUserDefinition } = getState().world;
			let currentState = [];
			let context = {
				height: WORLD_HEIGHT,
				robot: [robotBeforeUserDefinition.x, robotBeforeUserDefinition.y, robotBeforeUserDefinition.items ],
				width: WORLD_WIDTH,
				world: []
			};
			currentState = worldBeforeUserDefinition.worldMap.map((c) => {
				return {
					x: c.x,
					y: c.y,
					type: c.type,
					color: c.color === null ? 'null' : c.color,
					shape: c.shape === null ? 'null' : c.shape
				};
			});

			waterMarkers.forEach((waterMarker) =>
				currentState.push({
					x: waterMarker[0],
					y: waterMarker[1],
					type: 'water',
					color: 'null',
					shape: 'null'
				})
			);

			context.world = currentState;
			let examples = [{"context":context, "init-path":keyPressHistRemembered}]
//			let url = `http://127.0.0.1:5000/get-candidate-spec?query=${currentQueryRemembered}&path=${JSON.stringify(
//				keyPressHistRemembered
//			)}&context=${JSON.stringify(context)}&sessionId=${sessionId}`;
			let url = `http://127.0.0.1:5000/get-candidate-spec?query=${JSON.stringify(currentQueryRemembered)}&examples=${JSON.stringify(examples)}&sessionId=${sessionId}`;


			console.log(url)
			return EXAMPLEquery(url)
				.then((response) => {
					dispatch({ type: Constants.TOGGLE_LOADING, isLoading: false });
					dispatch({ type: Constants.FETCH_ANIMATION, response: response });
				})
				.catch((error) => {
					alert(`Error in fetchAnimation action: ${error}`);
				});
		};
	},

	forceQuitItemSelection: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.FORCE_QUIT_ITEM_SELECTION
			});
		};
	},

	toggleItemSelection: (color, shape, id) => {
		return (dispatch) => {
			dispatch({
				type: Constants.TOGGLE_ITEM_SELECTION,
				color,
				shape,
				id
			});
		};
	},

	startUserDefinition: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.START_USER_DEFINITION
			});
		};
	},

	finishUserDefinition: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.FINISH_USER_DEFINITION
			});
		};
	},

	startItemSelection: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.START_ITEM_SELECTION
			});
		};
	},

	finishItemSelection: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.FINISH_ITEM_SELECTION
			});
		};
	},

	moveRobotUp: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.MOVE_ROBOT_UP
			});
		};
	},

	moveRobotDown: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.MOVE_ROBOT_DOWN
			});
		};
	},

	moveRobotLeft: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.MOVE_ROBOT_LEFT
			});
		};
	},

	moveRobotRight: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.MOVE_ROBOT_RIGHT
			});
		};
	},

	setQuery: (query) => {
		return (dispatch) => {
			dispatch({
				type: Constants.SET_QUERY,
				query
			});
		};
	},

	undo: () => {
		return (dispatch, getState) => {
			const { current_history_idx, history } = getState().world;

			const idx =
				current_history_idx !== 0
					? current_history_idx >= 0 ? current_history_idx - 1 : history.length - 2
					: current_history_idx;

			dispatch({
				type: Constants.REVERT,
				idx: idx
			});
		};
	},

	redo: () => {
		return (dispatch, getState) => {
			const { current_history_idx, history } = getState().world;

			const idx =
				current_history_idx !== history.length - 1
					? current_history_idx >= 0 ? current_history_idx + 1 : -1
					: current_history_idx;

			dispatch({
				type: Constants.REVERT,
				idx: idx
			});
		};
	},

	setStatus: (status) => {
		return (dispatch) => {
			dispatch({
				type: Constants.SET_STATUS,
				status
			});
		};
	},

	tryQuery: (q) => {
		return (dispatch, getState) => {
			const { sessionId } = getState().user;
			const { history, current_history_idx, waterMarkers, keyPressHist } = getState().world;

			dispatch({
				type: Constants.SET_STATUS,
				status: STATUS.LOADING
			});

			return sendContext({ history, current_history_idx, sessionId, waterMarkers, keyPressHist })
				.then((eh) => {
					//q = processMacros(q);
					const query = `(:q ${JSON.stringify(q)})`;
					const cmds = { q: query, sessionId: sessionId };
					console.log('sending query ' + query);
					return SEMPREquery(cmds).then((response) => {
						console.log("received response: "+JSON.stringify(response));
						//var modified_response = {"candidates":[{"score":11,"prob":"NaN","prettyString":"F(at_4_4)","anchored":true,"formula":"(:eventually (: at (number 7) (number 4)))","value":"{\"status\":\"\",\"path\":[]}"}],"stats":{"type":"q","size":1,"status":"Core","author":"None","walltime":0.001718432,"count":83},"lines":[]};
						console.log(response);
						if (!response) throw new Error('empty_modified_response');

						if (response.lines && response.lines.length > 0) {
							/* Alert any errors in the query */
							alert(response.lines.join('; '));
						}

						const formval = parseSEMPRE(response.candidates);

						const exampleQuery = { query: q, context: cmds, path: keyPressHist, sessionId: sessionId };
						console.log("I got formval ++++++++++++");
						console.log(formval);

						if (formval === null || formval === undefined) {
							dispatch(Logger.log({ type: 'tryFail', msg: { query: q } }));
							dispatch({
								type: Constants.START_USER_DEFINITION
							});

							return false;
						} else {
							/* Remove no-ops */
							//const idx = current_history_idx >= 0 && current_history_idx < history.length ? current_history_idx : history.length - 1

							let responses = formval;

							console.log(query);
							console.log("pretty string is**************")
							console.log(responses[0]["prettyString"])

						let currentState = [];
						const idx = current_history_idx >= 0 && current_history_idx < history.length ? current_history_idx : history.length - 1;
						const robot = history[idx].robot;
						const robotContext = [ robot.x, robot.y, robot.items ];
						console.log("history [idx]");
						console.log(history[idx]);
						currentState = history[idx].worldMap.map((c) => {
							return {
								x: c.x,
								y: c.y,
								type: c.type,
								color: c.color === null ? 'null' : c.color,
								shape: c.shape === null ? 'null' : c.shape
							};
						});

						waterMarkers.forEach((waterMarker) =>
							currentState.push({
							x: waterMarker[0],
							y: waterMarker[1],
							type: 'water',
							color: 'null',
							shape: 'null'
							})
						);
						let Examplecontext = {
							height: WORLD_HEIGHT,
							robot: robotContext,
							width: WORLD_WIDTH,
							// world: currentState
							world: []
						};
						Examplecontext.world = currentState;

						console.log("current states...")
						console.log(Examplecontext)
						const formulasList = responses.map(x => x['prettyString']);

						console.log(formulasList);


		
						let url = `http://127.0.0.1:5000/get-path?context=${JSON.stringify(Examplecontext)}&formulas=${JSON.stringify(formulasList)}`;


						console.log(url)
						return EXAMPLEquery(url)
						.then((exResponse) => {
						console.log("server response, paths")
							console.log(exResponse.paths);

							if (exResponse.status === "ok"){
                            for (var i = 0; i < responses.length; ++i){
							    responses[i].path = exResponse.paths[i];
							    responses[i].robot = {x: exResponse.world.robot[0], y: exResponse.world.robot[1], type:"robot", items:[]};
							    }
                            //responses[0].robot = [2,4,[]];
							dispatch(Logger.log({ type: 'try', msg: { query: q, responses: responses.length } }));
							dispatch({
                            		type: Constants.TRY_QUERY,
                            		responses: responses
                            	});
                            return true;
                            }
                            else
                            {
                                alert("can not find the path");
                                dispatch({
                                    type: Constants.TRY_QUERY,
                                    responses: responses
                                                            	});
                                return true;
                            }

						})
						.catch((error) => {
							alert(`Error in sending formula in example server: ${error}`);
						});
							
}
});
})
.catch((e) => {
					if (e.message === 'empty_response') {
						alert('Could not contact server');
					}
					//alert("Query could no be processed by server.");
					//console.log("tryQuery error?", e);
					//console.log(JSON.stringify(e, null, 4));
					console.log(e);
					return null;
				});
};
},


	pushToHistory: (el) => {
		return (dispatch) => {
			dispatch({
				type: Constants.ACCEPT,
				el: el
			});
		};
	},

	acceptPath: (text, selectedResp) => {
		return (dispatch, getState) => {
			const { responses, history } = getState().world;
			const { sessionId } = getState().user;

			const selected = responses[selectedResp];
            console.log("inside accept path --- hihi");
			if (selected.error) {
				alert(
					"You can't accept a response with an error in it. Please accept another response or try a different query."
				);
				dispatch({
					type: Constants.SET_STATUS,
					status: STATUS.TRY
				});
				return;
			}

			//dispatch(Logger.log({ type: "accept", msg: { query: text, rank: selected.rank, formula: selected.formula } }))

			// Apply history; maybe I need to identify the history I need to apply to in a different way.
			let currentState = JSON.parse(JSON.stringify(history[history.length - 1]));
			let path = selected.path;
			for (let i = 0; i < path.length; ++i) {
				updateRobot(currentState.worldMap, currentState.robot, i, selected.path, 1);
				removeRobot(currentState.worldMap);
			}

			selected.worldMap = currentState.worldMap;
			selected.robot = currentState.robot;

			const query = `(:accept ${JSON.stringify(text)} ${JSON.stringify(selected.formula)})`;
			SEMPREquery({ q: query, sessionId: sessionId }, () => {});

			dispatch({
				type: Constants.ACCEPT,
				el: { ...selected, text }
			});

			return true;
		};
	},

	acceptNone: (text) => {
		return (dispatch, getState) => {
			const { sessionId } = getState().user;
			const { responses } = getState().world;

			const formulas = responses.reduce((acc, r) => acc.concat(r.formulas), []);

			// Do I need to processMacros() here?
			const query = `(:reject ${JSON.stringify(text)} ${formulas.map((f) => JSON.stringify(f)).join(' ')})`;
			SEMPREquery({ q: query, sessionId: sessionId }, () => {});

			dispatch(Logger.log({ type: 'acceptNone', msg: { query: text } }));
		};
	},



	revert: (idx) => {
		return (dispatch) => {
			dispatch(Logger.log({ type: 'revert', msg: { idx: idx } }));

			dispatch({
				type: Constants.REVERT,
				idx: idx
			});
		};
	},

	resetResponses: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.RESET_RESPONSES
			});
		};
	},

	closeDefine: () => {
		return (dispatch) => {
			dispatch(Logger.log({ type: 'closeDefine' }));

			dispatch({
				type: Constants.CLOSE_DEFINE
			});
		};
	},

	openDefine: (idx) => {
		return (dispatch, getState) => {
			dispatch(Logger.log({ type: 'openDefine', msg: { idx } }));

			dispatch({
				type: Constants.OPEN_DEFINE,
				defineN: idx
			});
		};
	},

	setDefineN: (idx) => {
		return (dispatch) => {
			dispatch({
				type: Constants.SET_DEFINE_N,
				defineN: idx
			});
		};
	},

	setPin: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.SET_PIN
			});
		};
	},

	markPin: (idx) => {
		return (dispatch) => {
			dispatch({
				type: Constants.MARK_PIN,
				idx
			});
		};
	},

	injectPin: (idx) => {
		return (dispatch) => {
			dispatch({
				type: Constants.INJECT_PIN,
				idx
			});
		};
	},

	removePin: (idx) => {
		// Does getState work here?
		return (dispatch, getState) => {
			const { history } = getState().world;
			dispatch({
				type: Constants.REMOVE_PIN,
				idx
			});
			if (idx === history.length - 1) {
				let query = history[history.length - 1].text;
				dispatch({
					type: Constants.SET_QUERY,
					query
				});
			}
		};
	},

	removeLast: () => {
		return (dispatch) => {
			dispatch({
				type: Constants.REMOVE_LAST
			});
		};
	},

	clear: () => {
		return (dispatch, getState) => {
			dispatch({
				type: Constants.CLEAR
			});
			persistStore(getStore(), { whitelist: [ 'world', 'user' ] }, () => {}).purge();
		};
	},

	dictionary: () => {
		return (dispatch, getState) => {
			const { sessionId } = getState().user;
			const sempreQuery = '(:dictionary)';

			console.log('Dictionary request');

			SEMPREquery({ q: sempreQuery, sessionId: sessionId }).then((r) => {
				if (r.lines && r.lines.length > 0) {
					/* Display errors and quit if there errors */
					alert(`There were error(s): ${r.lines.join(', ')}`);
					return;
				}
				const dictionary = JSON.parse(r.stats.dictionary);
				//console.log(dictionary)
				dispatch({
					type: Constants.DICTIONARY,
					dictionary: dictionary
				});
			});
		};
	},

	deleteRule: (idx) => {
		return (dispatch, getState) => {
			const { sessionId } = getState().user;
			const sempreQuery = '(:delete ' + idx + ')';
			SEMPREquery({ q: sempreQuery, sessionId: sessionId }).then((r) => {
				if (r.lines && r.lines.length > 0) {
					/* Display errors and quit if there errors */
					alert(`There were error(s): ${r.lines.join(', ')}`);
					return;
				}
				//Force change to the dictionary to force rerendering
				dispatch({
					type: Constants.DICTIONARY,
					dictionary: []
				});
			});
		};
	}
};


export default Actions;
