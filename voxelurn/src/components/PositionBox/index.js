import React, { Component } from 'react';
import './styles.css';

class PositionBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { x, y } = this.props;
		return (
			<div className="position-box">
				<div className="position-box__text-container">
					Robot position: <br />
					<span className="position-box__coordinates">
						&#x5b; {x}, {y} &#x5d;
					</span>
				</div>
			</div>
		);
	}
}

export default PositionBox;
