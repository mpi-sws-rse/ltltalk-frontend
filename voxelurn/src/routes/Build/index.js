import React, { Component } from 'react'
import Actions from "actions/world"
import LoggerActions from "actions/logger"
import UserActions from "actions/user"
import { connect } from "react-redux"
import Mousetrap from "mousetrap"
import History from "containers/History"
import Setting, { equalityCheck } from "setting"
import CommandBar from "containers/CommandBar"
import ActionPopup from "components/ActionPopup"
import PickBox from "components/PickBox"
import DecisionBox from "components/DecisionBox"
import LoadingPage from "components/LoadingPage"

//import ControlButtons from "components/ControlButtons"
import { STATUS } from "constants/strings"
import { genTarget } from "helpers/util"
import StatusMsg from "components/StatusMsg"
import ResetPanel from "components/ResetPanel"
import PositionBox from "components/PositionBox"
import AnimationPositionBox from "components/AnimationPositionBox"
import DictionaryPanel from "components/Dictionary"
import TaskList from "components/TaskList"

// import DashboardBox from "components/DashboardBox"
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from "react-router-dom";

import "./styles.css"

class Build extends Component {
  static propTypes = {
    /* Injected by Redux */
    status: PropTypes.string,
    historyLen: PropTypes.number,
    responses: PropTypes.array,
    dispatch: PropTypes.func,
    task: PropTypes.string,
    waterMarkers: PropTypes.array,
    pointMarkers: PropTypes.array
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedResp: 0,
      targetIdx: -1,
      target: [],
      possSteps: 33,
      win: false
    }

    this.handleRobotKeyPress = this.handleRobotKeyPress.bind(this);
    this.renderPositionBox = this.renderPositionBox.bind(this);
  }

  componentDidMount() {
    document.querySelector('body').addEventListener('keydown', this.handleRobotKeyPress);
    /* Bind Ctrl+Z and Crtl+Shift+Z to Undo and Redo actions respectively */
    Mousetrap.prototype.stopCallback = () => false;
    //Mousetrap.bind("command+z", (e) => { e.preventDefault(); this.props.dispatch(Actions.undo()) })
    //Mousetrap.bind("command+shift+z", (e) => { e.preventDefault(); this.props.dispatch(Actions.redo()) })

  

    const query = queryString.parse(this.props.location.query);

    if (Object.keys(query).indexOf("taskid") !== -1) {
      this.props.dispatch(UserActions.setTask("target"))
      this.setTarget()
    }
    
  }


  componentDidUpdate(prevProps) {
    /* Whenever there is a status change, reset the selected response */
    if (prevProps.status !== this.props.status)
      this.setState({ selectedResp: 0 })

    /* Check for win! */
    if (this.props.task === "target" && this.props.history.length > 0 && equalityCheck(this.props.history[this.props.history.length - 1].value, this.state.target)) {
      /* WIN! */
      this.win()
    } else if (this.state.win) {
      this.setState({ win: false })
    }

    /* Check to see if we need to set the target */
    if (prevProps.task === "world" && this.props.task === "target")
      this.setTarget()
  }

  componentWillUnmount() {
    document.querySelector('body').removeEventListener('keydown', this.handleRobotKeyPress);
    /* Clean up the key undo+redo bindings */
    Mousetrap.unbind("command+z")
    Mousetrap.unbind("command+shift+z")
  }

  setTarget() {
    const randomTarget = genTarget()
    this.setState({ target: randomTarget[2], possSteps: randomTarget[1], targetIdx: randomTarget[0] })

    this.props.dispatch(LoggerActions.log({ type: "start", msg: { targetIdx: randomTarget[0], target: randomTarget[2] } }))
  }

  handleRobotKeyPress(event) {
    if (!this.props.isKeyPressEnabled) return;
		const KEY_LEFT = 37;
		const KEY_UP = 38;
		const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    const KEY_PICK = 80;
    const KEY_ENTER = 13;

		switch (event.keyCode) {
      case KEY_ENTER:
        if(this.props.isItemSelectionEnabled) this.props.dispatch(Actions.finishItemSelection());
        else {
          this.props.dispatch(Actions.finishUserDefinition());
          this.props.dispatch(Actions.toggleLoading(true));
          this.props.dispatch(Actions.fetchAnimation());
        }
        break;
        
      case KEY_PICK:
        // this.props.dispatch(Actions.robotPickItem());
        this.props.dispatch(Actions.startItemSelection());
        break;
        
			case KEY_UP:
        this.props.dispatch(Actions.forceQuitItemSelection());
        this.props.dispatch(Actions.moveRobotUp());
				break;

			case KEY_DOWN:
        this.props.dispatch(Actions.forceQuitItemSelection());
        this.props.dispatch(Actions.moveRobotDown());
				break;

			case KEY_LEFT:
        this.props.dispatch(Actions.forceQuitItemSelection());
        this.props.dispatch(Actions.moveRobotLeft());
				break;

			case KEY_RIGHT:
        this.props.dispatch(Actions.forceQuitItemSelection());
        this.props.dispatch(Actions.moveRobotRight());
				break;

			default:
				break;
		}
  }


  handleTaskGetWorld() {
    // this.props.dispatch(Actions.getTask());
  }


  handlePickItemClick(event){


    const selectedPicKItem = this.state.selectedPickItem;

    if(selectedPicKItem >0){
      this.props.dispatch(Actions.enablePickItem());

    }

  }
  handleQuery(query) {
    switch (this.props.status) {
      case STATUS.TRY:
        /* Try the query */
        this.props.dispatch(Actions.tryQuery(query))
          .then(r => {
            if (r === null) { // If an error occurred
              this.props.dispatch(Actions.setStatus(STATUS.TRY));
            } else if (!r) {
              /* The try query was unsuccessful, so set it as a pin */
              this.props.dispatch(Actions.setPin())
              this.props.dispatch(Actions.resetResponses())
              this.props.dispatch(Actions.setQuery(""))
              this.setState({ selectedResp: 0 })
            } else {
              /* Try query successful! Give the user a choice */
              this.setState({ selectedResp: 0 })
            }
          })
        break;
      case STATUS.ACCEPT:
        /* Max steps check */
        if (this.props.task === "target" && this.props.historyLen >= this.maxSteps()) {
          alert("You've reached the maximum number of steps of " + this.maxSteps() + " , undo some steps in order to add more.")
          this.setState({ selectedResp: 0 })
          return
        }

        /* Otherwise, just accept normally */
        //const r = this.props.dispatch(Actions.accept(query, this.state.selectedResp))
        const r = this.props.dispatch(Actions.acceptPath(query, this.state.selectedResp))
        if (r)
          this.setState({ selectedResp: 0 })

        break
      case STATUS.DEFINE:
        this.props.dispatch(Actions.define(this.props.defineN))
        break
      case STATUS.LOADING:
        this.props.dispatch(Actions.setStatus(STATUS.TRY))
        break
      default:
        console.log("uh oh... unknown status!", this.props.status)
        break
    }
  }

  maxSteps() {
    /* If this is a qualifier with a targer, there is a max steps */
    if (this.props.task !== "target")
      return Infinity

    return this.state.possSteps * 3
  }

  win() {
    if (!this.state.win) {
      this.props.dispatch(LoggerActions.log({ type: "win", msg: { steps: this.props.history.length } }))
      this.setState({ win: true })
    }
  }

  upSelected() {
    const selectedResp = this.state.selectedResp
    if (selectedResp < this.props.responses.length - 1) {
      this.setState({ selectedResp: selectedResp + 1 })
      this.props.dispatch(LoggerActions.log({ type: "scroll", msg: { dir: "up" } }))
    }
  }

  downSelected() {
    const selectedResp = this.state.selectedResp
    if (selectedResp > 0) {
      this.setState({ selectedResp: selectedResp - 1 })
      this.props.dispatch(LoggerActions.log({ type: "scroll", msg: { dir: "down" } }))
    }
  }

  closeDefine() {
    this.props.dispatch(Actions.closeDefine())
  }

  handleShiftClick() {
    // TODO: open up the latest define
    // const { history, defining } = this.props.world
    // if (defining) return
    // /* Find last pin to define */
    // const idx = history.slice().reverse().findIndex(h => h.type === "pin")
    // if (idx !== -1) {
    //   this.props.dispatch(Actions.define(history.length - 1 - idx))
    // } else {
    //   alert("shift-enter is for defining, you are not in defining mode")
    // }
  }

  renderPositionBox() {

    const { status, history, responses, current_history_idx, isKeyPressEnabled, isAnimationEnabled, animationPath } = this.props;

    let idx = current_history_idx >= 0 ? current_history_idx : history.length - 1;
    if (idx > history.length - 1) idx = history.length - 1;

    let robot;
    if (isKeyPressEnabled) robot = this.props.robot;
    else robot = history[idx].robot;

  
    if (isAnimationEnabled) { 
      const picks = animationPath
      .filter(e => e.action === 'pickitem')
      .map(e => { return { color: e.color, shape: e.shape, x: e.x, y: e.y } });
      const startX = animationPath[0].x ;
      const startY = animationPath[0].y;
      const endX = animationPath[animationPath.length - 1].x;
      const endY = animationPath[animationPath.length - 1].y;
      return <AnimationPositionBox startX={startX} startY={startY} endX={endX} endY={endY} picks={picks} />;
    }
    // else if (status === 'ACCEPT') { 
    //   let { x, y } = responses[0].path.find(move => move.action === 'destination'); 
    //   return <PositionBox x={x} y={y} />; 
    // }
    else { 
      let { x, y } = robot;
      return <PositionBox x={x} y={y} />; 
    }   
  }
  

  render() {
    const { status, responses, pointMarkers, waterMarkers, history,
        current_history_idx, task, isKeyPressEnabled, isAnimationEnabled, animationPath } = this.props

    /* The current state should be the history element at the last position, or
     * the one selected by the current_history_idx */
    let idx = current_history_idx >= 0 ? current_history_idx : history.length - 1
    if (idx > history.length - 1) idx = history.length - 1
    let currentState = history[idx].worldMap;
    // TODO This might be unnecessary
    // let robot = history[idx].robot;
    let robot;
    if (this.props.isKeyPressEnabled) robot = this.props.robot;
    else robot = history[idx].robot;
    let currentPath = [];// = history[idx].path;

    let interpretation = "";
    let popup = { text: "", active: false };
    if (status === STATUS.ACCEPT && !responses[this.state.selectedResp].error) {
      /* If the status is accept, then the current state will be the diff
       * of the previous state and the responded state */
      //currentState = diff(currentState, responses[this.state.selectedResp].value)
      let response = JSON.parse(JSON.stringify(responses[this.state.selectedResp])); 
      currentPath = response.path;
      interpretation = "Interpretation " + (this.state.selectedResp + 1) + ": " + response.prettyString;
      //currentPath = JSON.parse(JSON.stringify(responses[this.state.selectedResp].path));
      if (response.status.length === 0) {
        popup.active = false;
      } else {
        popup.text = response.status;
        popup.active = true;
      }
    } 
    else if (isAnimationEnabled) currentPath = animationPath;
    
    if (this.props.isLoading || this.props.isReading) return <LoadingPage/>;
    return (
      <div className="Build">
        <div className="Build-info" >
{/* 
        <DashboardBox
           blocks={currentState}
           isoConfig={{ canvasWidth: 1650, canvasHeight: 1200, numUnits: 40 }} 
           width={600}
           height={200}/> */}
        
          

        </div>
        <div className="Build-world">
          <Setting
            // handleRobotKeyPress={this.handleRobotKeyPress}
            blocks={currentState}
            path={currentPath}
            robot={robot}
            pointMarkers={pointMarkers}
            waterMarkers={waterMarkers}
            width={1650}
            height={1200}
            isoConfig={{ canvasWidth: 1650, canvasHeight: 1200, numUnits: 40 }} />
        </div>

        {/* <button onClick={() => this.handleTaskGetWorld()} style={{cursor: 'pointer', marginRight: '10px', marginTop: '17px'}}>Click!</button>  
            <p>Click here to get world state from server</p> */}

        <div className="Build-command">
          <History />
          <ActionPopup
            active={popup.active}
            text={[popup.text]} />  
          <ActionPopup 
            type="defInstructions"
            active={this.props.isKeyPressEnabled}
            text={[
              'Please provide a definition.', 
              'Press arrow keys to move.',
               'Press P to pick all items at current location.', 
               'Press enter to finish definition.']}
          />  
          {this.props.isThankYouMessageDisplayed &&
          <ActionPopup 
            active={true}
            text={["Thank you for your response!"]}
            autoClose={true}
          />}  
          <PickBox active={true}/> 
          <DecisionBox active={true}/>
          <CommandBar
            onClick={(query) => this.handleQuery(query)}
            handleShiftClick={() => this.handleShiftClick()}
            onUp={() => this.upSelected()}
            onDown={() => this.downSelected()} />
          <div className="Build-status">
            <StatusMsg status={status} text={interpretation}/>
            <div className="Build-actions">
              {status === STATUS.ACCEPT &&
                <div>
                  <span>{this.state.selectedResp + 1} / {responses.length} possible interpretations</span>
                  <div className="Build-actions-buttons">
                    <button onClick={() => this.downSelected()}>&uarr;</button>
                    <button onClick={() => this.upSelected()}>&darr;</button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
       {/* <PositionBox x={robot.x} y={robot.y} />        */}
       {this.renderPositionBox()}
       

       <ResetPanel />

       <TaskList/>


      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.world.status,
  historyLen: state.world.history.length,
  history: state.world.history,
  task: state.user.task,
  responses: state.world.responses,
  waterMarkers: state.world.waterMarkers,
  pointMarkers: state.world.pointMarkers,
  defineN: state.world.defineN,
  //popup: state.world.popup,
  current_history_idx: state.world.current_history_idx,
  robot: state.world.robot,
  isKeyPressEnabled: state.world.isKeyPressEnabled,
  isItemSelectionEnabled: state.world.isItemSelectionEnabled,
  isAnimationEnabled: state.world.isAnimationEnabled,
  animationPath: state.world.animationPath,
  isLoading: state.world.isLoading,
  isReading: state.world.isReading,
  isThankYouMessageDisplayed: state.world.isThankYouMessageDisplayed
})

export default  withRouter(connect(mapStateToProps)(Build))
