import React, { Component } from "react"
import classnames from "classnames"
import { connect } from "react-redux"
import Actions from "actions/logger"
import WorldActions from "actions/world"

import "./styles.css"

class SharePanel extends Component {
  constructor(props) {
    super(props)

    // changed for debugging
    this.state = { collapsed: true }
  }

  share() {
    this.props.dispatch(Actions.share())
  }

  clear() {
    this.props.dispatch(WorldActions.clear())
  }

  deleteStruct() {
    this.props.dispatch(Actions.deleteStruct(this.refs.deleteSelect.value))
  }

  render() {
    return (
      <div className={classnames("SidePanel", { "collapsed": this.state.collapsed })}>
        <div className="SidePanel-header">
          <span className="SidePanel-header-name">Control Panel</span>
          <div onClick={() => this.setState({ collapsed: !this.state.collapsed })} className="SidePanel-header-arrow">
            {(() => {
              if (this.state.collapsed) return (<span>&larr;</span>)
              return (<span>&rarr;</span>)
            })()}
          </div>
        </div>
        <div className="SidePanel-content">
          <div>
            <div className="SharePanel-buttons">
                <div className="yourstructs">
                  <table>
                    <tbody>
                    <tr>
                      <td><button id="controlPanel-clear" onClick={() => this.clear()}>Reset</button></td>
                      <td><div>Reset world to initial state (learned commands are remembered)</div></td>
                    </tr>
                    <tr>
                      <td><button >Click</button></td>
                      <td><div>Click a button</div></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  user_structs: state.logger.user_structs,
  sessionId: state.user.sessionId,
  sid: state.logger.sid,
  signedIn: state.user.signedIn
})

export default connect(mapStateToProps)(SharePanel)
