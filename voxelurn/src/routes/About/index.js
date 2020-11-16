import React, { Component } from "react"
import { connect } from "react-redux"
//import Actions from "actions/logger"
import { NavLink } from "react-router-dom"
// import { Link } from "react-router"
import "./styles.css"
import { TUTORIAL_URL, SLACK_SIGNUP_URL, DOCUMENTATION_URL } from "constants/strings"

import MPI_SWS_logo from "images/mpi_sws_logo.png"
// import { withRouter } from "react-router-dom";

class Information extends Component {
	componentDidMount() {
		//this.props.dispatch(Actions.joinCommunity())
	}

  /* JSX Link example
   * <Link to={{ pathname: "/community", query: this.props.query }} activeClassName="active" target="_blank">voxel structures</Link>.{' '}
   */
	render() {
		const height = "50px";
		return (
			<div className="About">
				<div>
					<img src={MPI_SWS_logo} alt="MPI-SWS logo" height={height} />
					<p>LTLTalk enables you to instruct the robot easily.
					At the beginning, the robot only understands Linear Temporal Logic specifications.
					If you give a command that is not in LTL, the system will ask you provide a demonstration.
					From that demonstration, with a couple of rounds of interactions, LTLTalk will infer the specification.
					Furthermore, it will generalize it for future use.
					</p>
		<h2>Quick start</h2>
		<ul>
			<li> write <em>take one red item from 7,4</em></li>
            <li> the robot will not know what is meant by that and will ask for clarification:
            do it using arrows and pressing P for picking (these instructions will be provided in the frontend as well).
            Once the demonstration is finished, press the check mark symbol.</li>
            <li> press the <b>finish definition</b> button.</li>
            <li> the system will show a couple of demonstrations for which you have to judge whether or not they fit to the intended command.
            (This process is not deterministic so the number of questions can vary.)</li>
            <li> once the process is finished, try <em>take every triangle item from 10, 8</em> .
            Now, the system should be able to parse it and execute the action --> press the <b>accept</b> button.</li>
            <li> <b>important:</b> while the definitions are meant to be shared across different users, that option is disabled in this demo.
            That way, everybody can try the example from this Quick Start. The definitions remain in use until reloading the page.</li>
		</ul>
        <h2>More</h2>
          <ul>

          <li> For the details on LTLTalk, check out <a href="https://people.mpi-sws.org/~gavran/papers/ltlTalk.pdf">the paper</a></li>
          <li>Check the implementation in <a href="https://github.com/mpi-sws-rse/ltltalk-interactive-synthesis">this github repository </a></li>
          </ul>
        </div></div>
		)
	}
}

const mapStateToProps = (state) => ({
	structs: state.logger.structs,
	utterances: state.logger.utterances,
	topBuilders: state.logger.topBuilders
})

export default connect(mapStateToProps)(Information)
