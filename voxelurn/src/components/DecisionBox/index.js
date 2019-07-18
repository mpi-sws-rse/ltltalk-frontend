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
		this.props.stopShowingAnimations();
	}

	handleDecline(e) {
		e.preventDefault();
		this.props.stopShowingAnimations();
	}

	handleRepeat(e) {
		e.preventDefault();
		// console.log(this.props.rememberedAnimation);
		// this.props.stopShowingAnimations();
		this.props.repeatAnimation();
		//setTimeout(this.props.getWorldsFromServer(true, this.props.rememberedAnimation), 1000);
		//this.props.getWorldsFromServer(true, this.props.rememberedAnimation);
	}

	render() {
		return (
			<div className="DecisionBox">
				<div className={classnames('DecisionBox-box', { active: this.props.isExampleAnimationEnabled })}>
					<div>
						<button className="DecisionBox-button" onClick={(e) => this.handleAccept(e)}>
							<i className="fas fa-check" />
						</button>
						<button className="DecisionBox-button" onClick={(e) => this.handleDecline(e)}>
							<i class="fas fa-times" />
						</button>
						<button className="DecisionBox-button" onClick={(e) => this.handleRepeat(e)}>
							<i class="fas fa-redo" />
						</button>
					</div>
					<wbr />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isExampleAnimationEnabled: state.world.isExampleAnimationEnabled,
	rememberedAnimation: state.world.rememberedAnimation
});

const mapDispatchToProps = (dispatch) => {
	return {
		stopShowingAnimations: () => dispatch(Actions.stopShowingAnimations()),
		getWorldsFromServer: (isRepeat, rememberedAnimation) => dispatch(Actions.getWorldsFromServer(isRepeat, rememberedAnimation)),
		repeatAnimation: () => dispatch(Actions.repeatAnimation()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DecisionBox);
