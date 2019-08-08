import React from "react"
import {IMPRINT, DATA_PROTECTION} from "constants/strings"
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux"
import PropTypes from 'prop-types';


import "./styles.css"

const Header = ({ query, signedIn, sessionId, email, dispatch }) => (
  <div className="Header">
    <div className="Header-logo">
      <span>Flipper</span>
      <span className="Header-sublogo">talk to your robot</span>
      <span className="Header-subsublogo"> <a href={IMPRINT}>[Imprint]</a> </span>
      <span className="Header-subsublogo"> <a href={DATA_PROTECTION}>[Data protection]</a> </span>
    </div>
    <div className="Header-nav">
      <NavLink to={{ pathname: "/about", query: query }} activeClassName="active"><div>About</div></NavLink>
      <NavLink to={{ pathname: "/build", query: query }} activeClassName="active"><div>Play</div></NavLink>
      <NavLink to={{ pathname: "/tutorial", query: query }} activeClassName="active"><div>Tutorial</div></NavLink>
      <NavLink to={{ pathname: "/reference", query: query }} activeClassName="active"><div>Reference</div></NavLink>
      <NavLink to={{ pathname: "/syntaxsemantics", query: query }} activeClassName="active"><div>Syntax and Semantics</div></NavLink>
      {/* <div className="task-menu__panel"> */}

      <NavLink id="tasks-nav" to={{ pathname: "/tasks", query: query }} activeClassName="active"><div>Tasks</div></NavLink> 
      {/* </div> */}
      {/* <DropdownMenu>
      <DropdownItem tag="a" href="/yourpage">TaskOne</DropdownItem>></DropdownMenu> */}

    </div>
  </div>
)

Header.propTypes = {
  /* URL parameters in order to persist the query (e.g ?turkid=AMT_123) across
   * route changes */
  query: PropTypes.object
}

const mapStateToProps = (state) => ({
  sessionId: state.user.sessionId,
  email: state.user.email,
  signedIn: state.user.signedIn
})

export default connect(mapStateToProps)(Header)
