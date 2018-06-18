/* Dictionary: implements a list of induced definitions for the user to review them
 * DictionaryItem: a single element of the Dictionary list
 */

import React, { Component, PropTypes } from "react"
import classnames from "classnames"
import Logger from "actions/logger"
import { connect } from "react-redux"


import "./styles.css"

class DictionaryPanel extends Component {
	static propTypes = {
	    dictionary: PropTypes.array,
	    
	    status: PropTypes.string,
	    query: PropTypes.string,
	    dispatch: PropTypes.func,
	 }
	
	constructor(props) {
		super(props)
		this.state = ({
			collapsed: false,
		})
	}
	

	render() {
		return (
			<div className={classnames("Dictionary", {"collapsed": this.state.collapsed})}>
				<div className="Dictionary-header">
		          <span className="Dictionary-header-name">Dictionary</span>
		          <div onClick={() => 
		          	this.setState({ collapsed: !this.state.collapsed })}
		          className="Dictionary-header-arrow">
		            {(() => {
		              if (this.state.collapsed) return (<span>&larr;</span>)
		              return (<span>&rarr;</span>)
		            })()}
		          </div>
		        </div>
		        <Dictionary />
			</div>
		)
	}
}

class Dictionary extends Component{
	constructor(props) {
		super(props)
		this.state={
			dictionary: JSON.parse(json),
		}
	}
	
	getDictionaryCells(){
		const dictionary = this.state.dictionary.slice();
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
	
	getInnerText(){
		if (this.state.isHovering) {
			return (this.state.head + "" + this.state.body)
		}
		else {
			return (this.state.rhs)
		}
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
	dictionary: state.logger.dictionary,
})

export default connect(mapStateToProps)(Dictionary)
export {DictionaryPanel}


const json =  ('[{"rhs":"gather $Color","uid":"6yyw176mqx","head":"gather red","body":"foreach point in world containing item has color red { visit point ; pick every item has color red }","index":1},'
+   '{"rhs":"gather $Property","uid":"6yyw176mqx","head":"gather red","body":"foreach point in world containing item has color red { visit point ; pick every item has color red }","index":2},'
+   '{"rhs":"drop all","uid":"6yyw176mqx","head":"drop all","body":"drop every item","index":3},'
+   '{"rhs":"$ItemActionFragment all","uid":"6yyw176mqx","head":"drop all","body":"drop every item","index":4},'
+   '{"rhs":"all","uid":"6yyw176mqx","head":"drop all","body":"drop every item","index":5},'
+   '{"rhs":"pick all","uid":"6yyw176mqx","head":"pick all","body":"pick every item","index":6},'
+   '{"rhs":"$ItemActionFragment $CountedItem","uid":"6yyw176mqx","head":"pick all","body":"pick every item","index":7},'
+   '{"rhs":"go $Direction","uid":"6yyw176mqx","head":"go left","body":"move left","index":8},'
+   '{"rhs":"go $Number $Direction","uid":"6yyw176mqx","head":"go 4 left","body":"repeat 4 times go left","index":9},'
+   '{"rhs":"line $Direction","uid":"6yyw176mqx","head":"line left","body":"strict { while robot has item { move left ; drop item } }","index":10},'
+   '{"rhs":"gather $Property $Property","uid":"fqnl8usll7","head":"gather red triangle","body":"foreach point in world containing item has color red and has shape triangle { visit point ; pick item has color red and has shape triangle }","index":11},'
+   '{"rhs":"drop all $Color","uid":"l9ers2dvop","head":"drop all red","body":"while robot has item has color red { drop item has color red }","index":12},'
+   '{"rhs":"$ItemActionFragment all $Property","uid":"l9ers2dvop","head":"drop all red","body":"while robot has item has color red { drop item has color red }","index":13}]')

//[{"rhs":"gather $Color","uid":"6yyw176mqx","head":"gather red","body":"foreach point in world containing item has color red { visit point ; pick every item has color red }","index":1},
//{"rhs":"gather $Property","uid":"6yyw176mqx","head":"gather red","body":"foreach point in world containing item has color red { visit point ; pick every item has color red }","index":2},
//{"rhs":"drop all","uid":"6yyw176mqx","head":"drop all","body":"drop every item","index":3},
//{"rhs":"$ItemActionFragment all","uid":"6yyw176mqx","head":"drop all","body":"drop every item","index":4},
//{"rhs":"all","uid":"6yyw176mqx","head":"drop all","body":"drop every item","index":5},
//{"rhs":"pick all","uid":"6yyw176mqx","head":"pick all","body":"pick every item","index":6},
//{"rhs":"$ItemActionFragment $CountedItem","uid":"6yyw176mqx","head":"pick all","body":"pick every item","index":7},
//{"rhs":"go $Direction","uid":"6yyw176mqx","head":"go left","body":"move left","index":8},
//{"rhs":"go $Number $Direction","uid":"6yyw176mqx","head":"go 4 left","body":"repeat 4 times go left","index":9},
//{"rhs":"line $Direction","uid":"6yyw176mqx","head":"line left","body":"strict { while robot has item { move left ; drop item } }","index":10},
//{"rhs":"gather $Property $Property","uid":"fqnl8usll7","head":"gather red triangle","body":"foreach point in world containing item has color red and has shape triangle { visit point ; pick item has color red and has shape triangle }","index":11},
//{"rhs":"drop all $Color","uid":"l9ers2dvop","head":"drop all red","body":"while robot has item has color red { drop item has color red }","index":12},
//{"rhs":"$ItemActionFragment all $Property","uid":"l9ers2dvop","head":"drop all red","body":"while robot has item has color red { drop item has color red }","index":13}]