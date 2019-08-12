import React, { Component } from 'react';
import './styles.css';

class AnimationPositionBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// picks is an array,
		// e.g.
		// [ { x: 2, y: 3, color: 'red', shape: 'circle' }, { x: 5, y: 8, color: 'blue', shape: 'triangle' }]
		const { startX, startY, endX, endY, picks } = this.props;
		const slicedPicks = picks.length > 5 ? picks.slice(0, 5) : picks;
		return (
			<div className="animation-position-box">
				<div className="animation-position-box__text-container">
					<div className="animation-position-box__text-container--from">
						From: <br />
						<span className="animation-position-box__coordinates">
							&#x5b; {startX}, {startY} &#x5d;
						</span>
					</div>

					<div className="animation-position-box__text-container--to">
						To: <br />
						<span className="animation-position-box__coordinates">
							&#x5b; {endX}, {endY} &#x5d;
						</span>
					</div>

					<div className="animation-position-box__text-container--picks">
						Items to be picked: <br />
						<ul>

							{slicedPicks.map(pick => {
								return (
									<li>
										<span
											className="animation-position-box__shape"
											style={{
												color: pick.color
											}}
										>
											<i
												className={`fas fa-${pick.shape ===
												'triangle'
													? 'fas fa-exclamation-triangle'
													: pick.shape} item-icon`}
												style={{
													color: pick.color
												}}
											/>
										</span>

										<span className="animation-position-box__coordinates--small">
											&#x5b; {pick.x}, {pick.y}{' '}
											&#x5d;
										</span>
									</li>
								);
							})}
							{picks.length > 5 && '...'}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default AnimationPositionBox;
