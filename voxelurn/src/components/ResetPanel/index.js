import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Actions from 'actions/logger';
import WorldActions from 'actions/world';
import './styles.css';

class SharePanel extends Component {
	constructor(props) {
		super(props);
	}

	clear() {
		this.props.dispatch(WorldActions.clear());
	}

	render() {
		return (
			<div
				className="side-panel"
				style={{ visibility: `${this.props.isAnimationEnabled ? 'hidden' : 'visible'}` }}
			>
				<button className="side-panel__btn" id="controlPanel-clear" onClick={() => this.clear()}>
					Reset
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user_structs: state.logger.user_structs,
	sessionId: state.user.sessionId,
	sid: state.logger.sid,
	signedIn: state.user.signedIn,
	isAnimationEnabled: state.world.isAnimationEnabled
});

export default connect(mapStateToProps)(SharePanel);
