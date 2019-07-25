import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import './styles.css';
import Actions from 'actions/world';

class ActionPopup extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.props.autoClose) setTimeout(() => this.props.toggleThankYouMessage(false), 3000);
	}

	render() {
		if (this.props.type === 'defInstructions') {
			return (
				<div className="ActionPopup">
					<div className={classnames('ActionPopup-box', { active: this.props.active })}>
						<span>
							Press
							<span className="key-symbol">▲</span>
							<span className="key-symbol">▼</span>
							<span className="key-symbol">◀</span>
							<span className="key-symbol">▶</span>
							to move.
						</span>
						<br />
						<span>
							Press <span className="key-symbol">P</span> to select items at current location for picking.
						</span>
						<br />
						<span>
							Press <span className="key-symbol">⏎</span> to finish definition.
						</span>
						<br />

						<wbr />
					</div>
				</div>
			);
		}
		return (
			<div className="ActionPopup">
				<div className={classnames('ActionPopup-box', { active: this.props.active })}>
					{this.props.text}
					<wbr />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		toggleThankYouMessage: (isThankYouMessageDisplayed) =>
			dispatch(Actions.toggleThankYouMessage(isThankYouMessageDisplayed))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionPopup);
