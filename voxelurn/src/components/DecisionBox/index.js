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
	}

	handleDecline(e) {
		e.preventDefault();
		this.props.endAnimation();
	}

	handleRepeat(e) {
		e.preventDefault();
		// console.log(this.props.currentAnimation);
		// this.props.endAnimation();
		this.props.repeatAnimation();
		//setTimeout(this.props.fetchAnimation(true, this.props.currentAnimation), 1000);
		//this.props.fetchAnimation(true, this.props.currentAnimation);
	}

	render() {
		return (
			<div className="DecisionBox">
				<div className={classnames('DecisionBox-box', { active: this.props.isAnimationEnabled })}>
					<h2 className="DecisionBox-title">Is this what you meant?</h2>
					<div>
						<button className="DecisionBox-button DecisionBox-button-yes" onClick={(e) => this.handleAccept(e)}>
							<i className="fas fa-check" />
						</button>
						<button className="DecisionBox-button DecisionBox-button-no" onClick={(e) => this.handleDecline(e)}>
							<i class="fas fa-times" />
						</button>
						<button className="DecisionBox-button DecisionBox-button-repeat" onClick={(e) => this.handleRepeat(e)}>
							<i className="fas fa-redo" />
						</button>
					</div>
					<wbr />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAnimationEnabled: state.world.isAnimationEnabled,
	currentAnimation: state.world.currentAnimation
});

const mapDispatchToProps = (dispatch) => {
	return {
		endAnimation: () => dispatch(Actions.endAnimation()),
		fetchAnimation: (isRepeat, currentAnimation) => dispatch(Actions.fetchAnimation(isRepeat, currentAnimation)),
		repeatAnimation: () => dispatch(Actions.repeatAnimation()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DecisionBox);
