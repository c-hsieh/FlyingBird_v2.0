import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Index from '../components/layout/Index';
import Search from '../components/search/Search';
import Searchsim from '../components/searchsim/Search';
import Like from '../components/like/Like';
import Schedule from '../components/schedule/Schedule'

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


import { ContextController, Context } from "../flux/store";
import './App.css';

// Alert optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

function App() {
  
  return (
    <ContextController>
      <Router>
        <>
          <Navbar />
          <AlertProvider template={AlertTemplate} {...options}>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/like" component={Like} />
                <Route exact path="/searchsim" component={Searchsim} />
                <Route exact path="/schedule" component={Schedule} />
              </Switch>
            </div>
          </AlertProvider>
        </>
      </Router>
    </ContextController>
  );
}

export default App;
