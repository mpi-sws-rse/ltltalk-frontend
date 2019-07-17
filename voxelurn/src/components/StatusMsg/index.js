import React, { Component } from 'react';
import { STATUS, TRY_MSG, ACCEPT_MSG, DEFINE_MSG } from 'constants/strings';
import { connect } from 'react-redux';

import './styles.css';

class StatusMsg extends Component {
	render() {
		const { status, text, isExampleAnimationEnabled } = this.props;
		let msg = TRY_MSG;
		if (status === STATUS.ACCEPT) msg = text;
		else if (status === STATUS.DEFINE) msg = DEFINE_MSG;
		return (
			<div
				className="StatusMsg"
				style={{ visibility: `${this.props.isExampleAnimationEnabled ? 'hidden' : 'visible'}` }}
			>
				{msg}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isExampleAnimationEnabled: state.world.isExampleAnimationEnabled
});

export default connect(mapStateToProps)(StatusMsg);
