import React from "react"
import { BrowserRouter as Router, Route, Redirect,Switch}from "react-router-dom"
import Layout from './Layout'
import Build from './Build';
import Tutorial from './Tutorial';
import Reference from './Reference';
import About from "./About"
import SyntaxSemantics from "./SyntaxSemantics";
import Tasks from "./Tasks";
  
const Routes = () => (

    <Router>
    <Switch>

        <Layout>
        <Route exact={true} path="/" component={Layout}/>
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
export default Routes
