import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './styles.css';
import Actions from 'actions/world';

class PickBox extends Component {

	constructor(props) {
		super(props);
    this.renderItems = this.renderItems.bind(this);
	}

	renderItems() {
		return this.props.itemsAtCurrentLocation.map((item) => {
      console.log(item[0]);
      console.log(item[1]);
      if (item[1] === 'triangle') return <i class={`fas fa-exclamation-triangle`} style={{ color: item[0] }} />;
			else return <i class={`fas fa-${item[1]}`} style={{ color: item[0] }} id={`item[0] item[1]`}/>;
		});
	}
	render() {
		return (
			<div className="PickBox" onClick={(e) => this.props.disableItemSelection()}>
				<div className={classnames('PickBox-box', { active: this.props.isItemSelectionEnabled })}>
					{this.renderItems()}
					<wbr />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isItemSelectionEnabled: state.world.isItemSelectionEnabled,
	itemsAtCurrentLocation: state.world.itemsAtCurrentLocation
});

const mapDispatchToProps = (dispatch) => {
	return {
		disableItemSelection: () => dispatch(Actions.disableItemSelection())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PickBox);
