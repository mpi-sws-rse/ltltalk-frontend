import React, { Component} from "react"
import { connect } from "react-redux"
import { worldConfig } from "constants/defaultMap"
import "./styles.css"

import Constants from "constants/actions"
import PropTypes from 'prop-types';


class ControlButtons extends Component {
  static propTypes = {
    /* Callback function when the CommandBar button clicks clicked */
    //onClick: PropTypes.func,

    /* Callback function when the user hits the up or down arrow keys */
    //onUp: PropTypes.func,
    //onDown: PropTypes.func,

    /* injected by Redux */
    status: PropTypes.string,
    query: PropTypes.string,
    dispatch: PropTypes.func,
  }

  //componentDidUpdate(prevProps) {
  //}

  setToPoints(set) {
    let str = '[';
    let first = true;
    for (let point of set) {
      if (first)
        first = false;
      else
        str += ',';
      str += '[' + point[0] + ',' + point[1] + ']';
    }
    return str + ']';
  }

  processMacros(str) {
    for (let room in worldConfig.roomPoints) {
      if (worldConfig.roomPoints.hasOwnProperty(room)) {
        let re = new RegExp('(\\W|^)' + room + '(\\W|$)', 'gi');
        let setString = this.setToPoints(worldConfig.roomPoints[room]);
        str = str.replace(re, (m,g0,g1) => g0 + setString+ g1);
      }
    }
    return str;
  }

  render() {
    return (
      <div className="ControlButtons">
        <button>Clear Actions</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  query: state.world.query,
  status: state.world.status
})

export default connect(mapStateToProps)(ControlButtons)
