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

	  render() {
			return (			

			<div  className="task-panel-dropdown" style = {{background:"#4F94CD",width:"200px"}} >
         <div className="task-panel-dropdown-button" onClick={this.showTask}> Tasks </div>

          { this.state.displayTask ? (
          <ul>
         <li><a className="active" href="#Create Page">Task 1</a></li>
         <li><a href="">Task 2</a></li>
         <li><a href="">Task 3</a></li>
				 <li><a href="#Create Page">Task 4</a></li>
         <li><a href="">Task 5</a></li>
         <li><a href="">Task 6</a></li>
				 <li><a href="#Create Page">Task 7</a></li>
         <li><a href="">Task 8</a></li>
         <li><a href="">Task 9</a></li>
				 <li><a href="#Create Page">Task 10</a></li>
      
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
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(TaskList);
