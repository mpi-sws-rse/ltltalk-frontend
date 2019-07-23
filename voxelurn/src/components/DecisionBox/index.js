import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './styles.css';
import Actions from 'actions/world';

class DecisionBox extends Component {
	constructor(props) {
		super(props);
		this.handleAccept = this.handleAccept.bind(this);
		this.handleDecline = this.handleDecline.bind(this);
		this.handleRepeat = this.handleRepeat.bind(this);
	}

	handleAccept(e) {
		e.preventDefault();
		this.props.endAnimation();
		this.props.toggleLoading(true);
		this.props.decisionUpdate(1);
	}

	handleDecline(e) {
		e.preventDefault();
		this.props.endAnimation();
		this.props.toggleLoading(true);
		this.props.decisionUpdate(0);
	}

	handleRepeat(e) {
		e.preventDefault();
		this.props.repeatAnimation();
	}

	render() {
		if (!this.props.isAnimationEnabled) return <span />;
		else {
			return (
				<div className="DecisionBox">
					<div className={classnames('DecisionBox-box', { active: this.props.isAnimationEnabled })}>
						<h3 className="DecisionBox-title">
							Your command was: <br />
							{this.props.query} <br />
							Does the animation match your command?
						</h3>
						<div>
							<button
								className="DecisionBox-button DecisionBox-button-yes"
								onClick={(e) => this.handleAccept(e)}
							>
								<i className="fas fa-check" />
							</button>
							<button
								className="DecisionBox-button DecisionBox-button-no"
								onClick={(e) => this.handleDecline(e)}
							>
								<i className="fas fa-times" />
							</button>
							<button
								className="DecisionBox-button DecisionBox-button-repeat"
								onClick={(e) => this.handleRepeat(e)}
							>
								<i className="fas fa-redo" />
							</button>
						</div>
						<wbr />
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	isAnimationEnabled: state.world.isAnimationEnabled,
	currentAnimation: state.world.currentAnimation,
	query: state.world.history[state.world.history.length - 1].text
});

const mapDispatchToProps = (dispatch) => {
	return {
		endAnimation: () => dispatch(Actions.endAnimation()),
		fetchAnimation: (isRepeat, currentAnimation) => dispatch(Actions.fetchAnimation(isRepeat, currentAnimation)),
		repeatAnimation: () => dispatch(Actions.repeatAnimation()),
		decisionUpdate: (decision) => dispatch(Actions.decisionUpdate(decision)),
		toggleLoading: (isLoading) => dispatch(Actions.toggleLoading(isLoading))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DecisionBox);
