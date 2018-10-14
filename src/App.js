import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavbarBootstrap from './components/NavbarBootstrap';
import Posts from './components/Posts';
import EditPost from './components/EditPost';
import Profiles from './components/Profiles';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavbarBootstrap />
          
          <Route exact path="/" component={()=>(<Posts />)} />
          <Route path="/profiles" component={()=>(<Profiles />)} />
          <Route path="/post/:id" component={(match)=>(<EditPost route={match} />)} />
        </div>
      </Router>
    );
  }
}

export default App;
