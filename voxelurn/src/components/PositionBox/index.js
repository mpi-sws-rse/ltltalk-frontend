import React, { Component } from 'react';
import './styles.css';

class PositionBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="position-box">
				<div className="position-box__text-container">
					Robot position: <br />
					<span className="position-box__coordinates">
                    &#x5b; 3, 3 &#x5d;{' '}
                        </span>
				</div>
			</div>
		);
	}
}

export default PositionBox;
