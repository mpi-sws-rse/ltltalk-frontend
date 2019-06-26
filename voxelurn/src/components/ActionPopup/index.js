import React, { Component } from "react"
import classnames from "classnames"
import { connect } from "react-redux"
import PropTypes from 'prop-types';

import "./styles.css"

class ActionPopup extends Component {
  static propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      text: "..."
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === true) {
      this.setState(state => {
        state.text = nextProps.text;
        return state;
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.text !== nextProps.text ||
        this.props.active !== nextProps.active;
  }

  componentWillUpdate(nextProps) {
  }

  componentDidUpdate(prevProps) {
  }

  render() {

    return (
      <div className="ActionPopup">
        <div className={classnames("ActionPopup-box", { "active" : this.props.active })}>
          {this.state.text}<wbr/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //popup: state.world.popup
})

export default connect(mapStateToProps)(ActionPopup)
