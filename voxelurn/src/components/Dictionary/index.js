/* Dictionary: implements a list of induced definitions for the user to review them
 * DictionaryItem: a single element of the Dictionary list
 */

import React, { Component, PropTypes } from "react"
import classnames from "classnames"
import Actions from "actions/world"
import { connect } from "react-redux"


import "./styles.css"

class DictionaryPanel extends Component {
	static propTypes = {
	    dispatch: PropTypes.func,
	    dictionary: PropTypes.array
	 }
	
	constructor(props) {
		super(props)
		this.state = ({
			collapsed: true,
		})
	}
	
	shouldComponentUpdate(nextProps, nextState){
		if (this.props.dictionary.length !== nextProps.dictionary.length ||
			this.state.collapsed !== nextState.collapsed) {
			return true
			
		}
		else{
			return false
		}
	}
	
	//TODO add a shouldComponentUpdate
	
	render() {
		return (
			<div className={classnames("Dictionary", {"collapsed": this.state.collapsed})}>
				<div className="Dictionary-header">
		          <span className="Dictionary-header-name">Dictionary</span>
		          <div onClick={() => 
		          	this.setState({ collapsed: !this.state.collapsed })}
		          className="Dictionary-header-arrow">
		            {(() => {
		              if (this.state.collapsed) {
		            	  return (<span>&larr;</span>)
		              }
		              else {
		          		  this.props.dispatch(Actions.dictionary())
		            	  return (<span>&rarr;</span>)
		              }
		            })()}
		          </div>
		        </div>
		        {!this.state.collapsed && <Dictionary dictionary={this.props.dictionary}/>}
			</div>
		)
	}
}

export class Dictionary extends Component{
	static PropTypes= {
		dictionary: PropTypes.array
	}
	
	constructor(props) {
		super(props)
		this.state={
			dictionary: props.dictionary,
		}
	}
	
	shouldComponentUpdate(nextProps){
		if (this.props.dictionary.length !== nextProps.dictionary.length) {
			return true
		}
		else{
			return false
		}
	}
	
	getDictionaryCells(){
		const dictionary = this.props.dictionary.slice();
		const arr = dictionary.map((el) => {
			return (
				<DictionaryElement key={el.index} rule={el} />
			)
		}) 
		return arr
	} 

	render(){
		return (
				<div className="Dictionary-content">
		        	<table width="100%">
		        		<tbody>
			        	<tr className="Explanation">
			        		<td colSpan="2">Hover over a rule to see an example</td>
			        	</tr>
		        			{this.getDictionaryCells()}
		        		</tbody>
		        	</table>
				</div>
		)
	}
}

class DictionaryElement extends Component{	
	constructor(props){
		super(props)
		this.handleHovering = this.handleHovering.bind(this)
		this.state={
			rhs: this.props.rule.rhs,
			uid: this.props.rule.uid,
			head: this.props.rule.head,
			body:this.props.rule.body,
			index: this.props.rule.index,
			isHovering: false,
		}
	}
	
	handleHovering() {
		this.setState(({
			rhs: this.state.rhs,
			uid: this.state.uid,
			head: this.state.head,
			body: this.state.body,
			index: this.state.index,
			isHovering: !this.state.isHovering,
		}))
	}

	
	render () {
		if (this.state.isHovering) {
			return(
			<tr 
				className="DictionaryElement"
				onMouseEnter={this.handleHovering}
				onMouseLeave={this.handleHovering}
			>
				<td colSpan="1" width="40%">{this.state.head}</td>
				<td colSpan="1" width="60%">{this.state.body}</td>
			</tr>)
		}
		else {
			return (
			<tr 
				className="DictionaryElement"
				onMouseEnter={this.handleHovering}
				onMouseLeave={this.handleHovering}
			>
				<td colSpan="2">{this.state.rhs}</td>
			</tr>)
		}
		
	}
}
const mapStateToProps = (state) => ({
  dictionary: state.world.dictionary
})

export default connect(mapStateToProps)(DictionaryPanel)