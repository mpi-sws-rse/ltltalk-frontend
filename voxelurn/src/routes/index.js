/* PropTypes removed as we are no longer using history in router and
calling of PropTYpes is also changed */

// import React, { PropTypes } from "react"

import React from "react"

/* From react-router to react-router-dom as 
v4 and indexredict and simple Router are replaced by BrowserRouter and Redict.
Switch element is added to handle children in router */
// import { Router, Route, IndexRedirect } from "react-router"
import { BrowserRouter as Router, Route, Redirect,Switch}from "react-router-dom"

import Layout from './Layout'
import Build from './Build';
import Tutorial from './Tutorial';
import Reference from './Reference';
import About from "./About"
import SyntaxSemantics from "./SyntaxSemantics";
import Tasks from "./Tasks";

// const Routes = ({ history }) => (
  
const Routes = () => (

    <Router>
    {/* // <Router history={history}> */}
    <Switch>

        <Layout>
        <Route exact={true} path="/" component={Layout}/>
          {/* <IndexRedirect to="about" /> */}

          {/* <Route exact={true} path="/" component={() => <Redirect to="/about" />}/>  */}

          <Route  path='/build' component={Build} />
          <Route  path='/about' component={About} />
          <Route  path="/tutorial" component={Tutorial} />
          <Route   path="/reference" component={Reference} />   
          <Route path="/syntaxsemantics" component={SyntaxSemantics} />" 
          <Route path="/tasks" component={Tasks} />

          <Redirect exact={true} from="/" to="/about" />
        </Layout>

        

        </Switch>
      </Router>
)

// not require anymore
// Routes.propTypes = {
//   /* History object for the router to interact with (e.g. hashHistory) */
//   history: PropTypes.object
// }

export default Routes
