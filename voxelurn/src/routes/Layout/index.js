import React, { Component } from 'react'
import { connect } from "react-redux"
import Actions from "actions/user"
import LoggerActions from "actions/logger"
import Logger from "actions/logger"
import Header from "containers/Header"
import queryString from 'query-string';
import { withRouter } from "react-router-dom";



import "normalize.css"
import "./styles.css"

// /* For Debugging: react perf tools to measure performance */
// import Perf from 'react-addons-perf'
// window.Perf = Perf
// window.Perf.start()

class Layout extends Component {
  componentDidMount() {
    /* Set the appropriate sessionId (either turker id or generated) */
    this.props.dispatch(Actions.setSessionId())

    /* Get the logged in user if there is one */
    this.props.dispatch(LoggerActions.getUser())

    /* Open Logging Socket */
    this.props.dispatch(Logger.open())
    console.log("##############")
    console.log(this.props) // "?filter=top&origin=im"

  }

  render() {
    // const query = queryString.parse(this.props.location.search);

    const query = queryString.parse(this.props.location.query);


    return (
      <div className="container">
        <Header query={query} />
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(connect()(Layout))
