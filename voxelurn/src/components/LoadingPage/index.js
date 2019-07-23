import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Actions from 'actions/world';

class LoadingPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="loading-page">
				<div className="loading-page__container">
					<div className="loading-page__instructions__container">
						<h3 className="loading-page__instructions__text">
							Here goes the instructions. Tell the user to do something. Never underestimate yourself.
							Never overestimate your user. Ivan told me so.
						</h3>
					</div>

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
						Our server is fast <br/>
						But sorry your internet is slow...
						
					</h1>
				</div>
			</div>
		);
	}
}

export default LoadingPage;
