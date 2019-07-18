import React, { Component } from 'react';
import { STATUS, TRY_MSG, ACCEPT_MSG, DEFINE_MSG } from 'constants/strings';
import { connect } from 'react-redux';

import './styles.css';

class StatusMsg extends Component {
	render() {
		const { status, text, isAnimationEnabled } = this.props;
		let msg = TRY_MSG;
		if (status === STATUS.ACCEPT) msg = text;
		else if (status === STATUS.DEFINE) msg = DEFINE_MSG;
		return (
			<div
				className="StatusMsg"
				style={{ visibility: `${this.props.isAnimationEnabled ? 'hidden' : 'visible'}` }}
			>
				{msg}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAnimationEnabled: state.world.isAnimationEnabled
});

export default connect(mapStateToProps)(StatusMsg);
