import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Actions from 'actions/world';

class LoadingPage extends Component {
	constructor(props) {
		super(props);
		this.state = { content: 'instructions' };
		this.handleClickOk = this.handleClickOk.bind(this);
		this.handleClickHide = this.handleClickHide.bind(this);
	}

	componentDidMount() {
		if (! this.props.areInstructionsHidden) this.props.toggleReading(true);
	}

	handleClickOk(e) {
		e.preventDefault();
		this.setState({ content: 'loader' });
		this.props.toggleReading(false);
	}

	handleClickHide(e) {
		e.preventDefault();
		this.setState({ content: 'loader' });
		this.props.toggleReading(false);
		this.props.hideInstructions();
	}

	render() {
		if (this.state.content === 'instructions' && ! this.props.areInstructionsHidden) {
			return (
				<div className="loading-page">
					<div className="loading-page__container" style={{ top: '40%' }}>
						<div className="loading-page__instructions__container">
							<h3 className="loading-page__instructions__text">
								Here goes the instructions. Tell the user to do something. Never underestimate yourself.
								Never overestimate your user. Ivan told me so.
							</h3>

							<div className="loading-page_-button__container" style={{ marginBottom: '1em' }}>
								<button
									className="loading-page__instructions__button"
									onClick={(e) => this.handleClickOk(e)}
								>
									<i className="fas fa-check" /> <span>Got it!</span>
								</button>
							</div>

							<div className="loading-page_-button__container">
								<button
									className="loading-page__instructions__button"
									onClick={(e) => this.handleClickHide(e)}
								>
									<i className="fas fa-ban" /> <span>Don't show again</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="loading-page" style={{ top: '50%' }}>
					<div className="loading-page__container">
						<div class="lds-roller">
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
							<div />
						</div>
						<h1 className="loading-page__loader-text">
							Our server is fast <br />
							But sorry your internet is slow...
						</h1>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	areInstructionsHidden: state.world.areInstructionsHidden
});

const mapDispatchToProps = (dispatch) => {
	return {
		toggleReading: (isReading) => dispatch(Actions.toggleReading(isReading)),
		hideInstructions: () => dispatch(Actions.hideInstructions())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
