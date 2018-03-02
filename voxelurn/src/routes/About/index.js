import React, { Component } from "react"
import { connect } from "react-redux"
//import Actions from "actions/logger"
import { Link } from "react-router"
import "./styles.css"
import { TUTORIAL_URL, SLACK_SIGNUP_URL, DOCUMENTATION_URL } from "constants/strings"

import MPI_SWS_logo from "images/mpi_sws_logo.png"

class Information extends Component {
	componentDidMount() {
		//this.props.dispatch(Actions.joinCommunity())
	}

  /* JSX Link example
   * <Link to={{ pathname: "/community", query: this.props.query }} activeClassName="active" target="_blank">voxel structures</Link>.{' '}
   */
	render() {
		const height = "150px";
		return (
			<div className="About">
				<div>
					<img src={MPI_SWS_logo} alt="example voxel structure" height={height} />
					<p>The project temporarily named LASRE (Language Acquisition System in a Robotic Environment) is a web interface for controlling a robot in a simulated environment. The interface also provides the ability for the user to define new commands which the system learns and generalizes off of.</p> <p><a href="https://wiki.mpi-klsb.mpg.de/documentation/WebResources/Imprint">imprint </a> and <a href="https://www.mpi-sws.org/data-protection"> data protection</a> info</p>
        <h2>Tutorial</h2>
          <ul>
            <li>Please complete the step-by-step tutorial provided <Link to={{ pathname: "/tutorial" }}>here</Link></li>
            <li>You may also find it useful to reference a <Link to={{ pathname: "/reference" }}>list of example commands</Link></li>
            <li>After the tutorial, try to come up with new, complex commands!</li>
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
