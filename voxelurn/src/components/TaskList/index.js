import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import './styles.css';
import Actions from 'actions/world';

class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  displayTask: false
		};
		
		
		this.showTask = this.showTask.bind(this);
		this.closeTask = this.closeTask.bind(this);
		this.handleTask = this.handleTask.bind(this);

	
	}
		showTask(event) {
			event.preventDefault();
			
			this.setState({ displayTask: true }, () => {
				document.addEventListener('click', this.closeTask);
			});
		}
		
		closeTask(event) {
			
				
				this.setState({ displayTask: false }, () => {
					document.removeEventListener('click', this.closeTask);
				});  
		}



	handleTask(e,index) {
		console.log("key id issss")
		console.log(index)
		e.preventDefault();
		this.props.getTask(index);
	}


	  render() {

		if (this.props.isAnimationEnabled == true || this.props.isKeyPressEnabled== true) {

			return <span />;
		} 
		else {
			var names = ["Task 1","Task 2","Task 3","Task 4","Task 5", "Task 6", "Task 6", "Task 7", "Task 8", "Task 9", "Task 10"]
			const that = this;

			return (	
				


		 <div  className="task-panel-dropdown" style = {{background:"#4F94CD",width:"200px"}} >
         <div className="task-panel-dropdown-button" onClick={this.showTask}> Tasks </div>

          { this.state.displayTask ? (
          <ul>

				{names.map(function(name, index){
                    return <li key={ index }><a className="active" href='javascript:void(0)' onClick={(e) => that.handleTask(e,index)} >{name}</a></li>;
                  })}
      
          </ul>
        ):
        (
          null
        )
        }

	   </div>
	   );
	  }
	} 

}
const mapStateToProps = (state) => ({
	isAnimationEnabled: state.world.isAnimationEnabled,
	isKeyPressEnabled: state.world.isKeyPressEnabled
});



const mapDispatchToProps = (dispatch) => {
	return {
		getTask: (taskId) => dispatch(Actions.getTask(taskId))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
