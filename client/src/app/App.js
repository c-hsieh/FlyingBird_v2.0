import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Index from '../components/layout/Index';
import Search from '../components/search/Search';
import Searchsim from '../components/searchsim/Search';
import Like from '../components/like/Like';
// import Schedule from '../components/schedule/Schedule'

import {ContextController} from '../context/context';
import './App.css';

function App() {
  return (
    <ContextController>
      <Router>
        <>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/like" component={Like} />
              <Route exact path="/searchsim" component={Searchsim} />
              {/* <Route exact path="/schedule" component={Schedule} /> */}
            </Switch>
          </div>
        </>
      </Router>
    </ContextController>
  );
}

export default App;
