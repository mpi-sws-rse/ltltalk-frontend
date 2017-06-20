import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import classnames from "classnames"
import Actions from "actions/world"
import { STATUS, COMMAND_BAR_DEFINE_PLACEHOLDER, COMMAND_BAR_PLACEHOLDER } from "constants/strings"

import "./styles.css"

import Constants from "constants/actions"

class CommandBar extends Component {
  static propTypes = {
    /* Callback function when the CommandBar button clicks clicked */
    onClick: PropTypes.func,

    /* Callback function when the user hits the up or down arrow keys */
    onUp: PropTypes.func,
    onDown: PropTypes.func,

    /* injected by Redux */
    status: PropTypes.string,
    query: PropTypes.string,
    dispatch: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      /* If the query changed and we were in ACCEPT mode, move us back to TRY mode */
      if (this.props.status === STATUS.ACCEPT)
        //this.props.dispatch(Actions.setStatus(STATUS.TRY))
        this.props.dispatch(Actions.setStatus(STATUS.PATH))
    }
  }

  handleClick() {
    /* If the query is empty, we don't want to do anything */
    if (this.props.query.length === 0) {
      /* Alert informatively if we are in define mode */
      if (this.props.status === "define")
        alert("You cannot define something as an empty string.")
      return
    }

    this.props.dispatch({
      type: Constants.SET_STATUS,
      status: STATUS.PATH
    })
    this.props.onClick(this.props.query)


    /* If we clicked on an ACCEPT status, let's clear the query */
    if (this.props.status === STATUS.ACCEPT) {
      this.props.dispatch(Actions.setQuery(""))
      this.props.dispatch({
        type: Constants.UPDATE_MARKERS,
        markers: []
      })
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        /* If we hit Shift+Enter, we want to define the head */
        this.handleShiftClick()
      } else {
        /* If we hit Enter, it is an alias to clicking the button */
        this.handleClick()
      }
    } else if (e.keyCode === 40) {
      /* Up arrow key is alias for clicking up */
      e.preventDefault()
      this.props.onUp()
    } else if (e.keyCode === 38) {
      /* Down arrow key is alias for clicking down */
      e.preventDefault()
      this.props.onDown()
    }
  }

  handleChange(e) {
    const newValue = e.target.value
    if (newValue !== this.props.query)
      this.props.dispatch(Actions.setQuery(newValue))

    let locRe = /\[\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\]/g;
    let result = locRe.exec(newValue);
    let cursor = e.target.selectionStart;
    let locs = [];
    while (result) {
      //console.log(result.index);
      //if (cursor >= result.index && cursor < (result.index + result[0].length))
        //console.log(result[0]);
      locs.push([result[1], result[2]]);
      result = locRe.exec(newValue);
    }
    this.props.dispatch({
      type: Constants.UPDATE_MARKERS,
      markers: locs
    })
  }

  render() {
    const { query, status } = this.props

    const placeholder = status !== STATUS.DEFINE ? COMMAND_BAR_PLACEHOLDER : COMMAND_BAR_DEFINE_PLACEHOLDER

    return (
      <div className="CommandBar">
        <input
          type="text"
          value={query}
          onChange={(e) => this.handleChange(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
          placeholder={placeholder}
        />
        <button className={classnames({ "active": ((status === STATUS.TRY || status === STATUS.DEFINE) && query.length > 0) || status === STATUS.ACCEPT }, { "accepting": status === STATUS.ACCEPT })} onClick={() => this.handleClick()}>
          {status}
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  query: state.world.query,
  status: state.world.status
})

export default connect(mapStateToProps)(CommandBar)
