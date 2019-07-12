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
		// e.target.id is either this format 'red circle 70' or this format 'red circle 70 chekck-box'
		const IDArray = e.target.id.split(' ');
		const color = IDArray[0];
		const shape = IDArray[1];
		const id = IDArray[2];
		this.props.toggleItemSelection(color, shape, id);
	}

	renderItems() {
		if (this.props.isItemSelectionEnabled && this.props.itemsAtCurrentLocation.length === 0) 
			return (<h3>There is no items to pick!</h3>);
		else return this.props.itemsAtCurrentLocation.map((item) => {
			const color = item[0];
			const shape = item[1];
			const isSelected = item[2];
			const id = item[3];
			return (
				<span>
					<i
						className={`fas fa-${shape === 'triangle'
							? 'fas fa-exclamation-triangle'
							: shape} item-icon`}
						style={{ color: color }}
						id={`${color} ${shape} ${id}`}
						onClick={(e) => this.handleItemSelection(e)}
					/>
					<i
						className={`far ${isSelected === true ? 'fa-check-square' : 'fa-square'} item-check-box`}
						id={`${color} ${shape} ${id} check-box`}
						onClick={(e) => this.handleItemSelection(e)}
					/>
				</span>
			);
		});
	}

	render() {
		return (
			<div className="PickBox">
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
