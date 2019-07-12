import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './styles.css';
import Actions from 'actions/world';

class PickBox extends Component {
	constructor(props) {
		super(props);
		this.renderItems = this.renderItems.bind(this);
		this.handleItemSelection = this.handleItemSelection.bind(this);
		this.handleFinishSelection = this.handleFinishSelection.bind(this);
	}

	handleFinishSelection(e) {
		this.props.finishItemSelection();
	}

	handleItemSelection(e) {
		const IDArray = e.target.id.split(' ');
		this.props.toggleItemSelection(IDArray[0], IDArray[1], IDArray[2]);
	}

	renderItems() {
		return this.props.itemsAtCurrentLocation.map((item) => {
			return (
				<span>
					<i
						className={`fas fa-${item[1] === 'triangle'
							? 'fas fa-exclamation-triangle'
							: item[1]} item-icon`}
						style={{ color: item[0] }}
						id={`${item[0]} ${item[1]} ${item[3]}`}
						onClick={(e) => this.handleItemSelection(e)}
					/>
					<i
						className={`far ${item[2] === true ? 'fa-check-square' : 'fa-square'} item-check-box`}
						id={`${item[0]} ${item[1]} ${item[3]} check-box`}
						onClick={(e) => this.handleItemSelection(e)}
					/>
				</span>
			);
		});
	}
	render() {
		return (
			<div className="PickBox" onClick={(e) => {}}>
				<div className={classnames('PickBox-box', { active: this.props.isItemSelectionEnabled })}>
					{this.renderItems()}
					<div>
						<button className="PickBox-finish-button" onClick={(e) => this.handleFinishSelection(e)}>
							<i class="fas fa-check" />
						</button>
					</div>
					<wbr />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('map');
	return {
		isItemSelectionEnabled: state.world.isItemSelectionEnabled,
		itemsAtCurrentLocation: state.world.itemsAtCurrentLocation.map((item) => {
			return item;
		})
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		finishItemSelection: () => dispatch(Actions.finishItemSelection()),
		toggleItemSelection: (color, shape, id) => dispatch(Actions.toggleItemSelection(color, shape, id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PickBox);
