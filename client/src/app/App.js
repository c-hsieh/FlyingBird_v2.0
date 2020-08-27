import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Index from '../components/layout/Index';
import Search from '../components/search/Search';
import Searchsim from '../components/searchsim/Search';
import Like from '../components/like/Like';
import Schedule from '../components/schedule/Schedule'

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import ReactGA from "react-ga";

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
const Routers = () => {
  let location = useLocation();
  useEffect(() => {
    ReactGA.initialize("UA-174561276-1");
    ReactGA.pageview(location.pathname + location.search);
  }, []);
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
    console.log("bananaONE", location.pathname + location.search);
  }, [location]);
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/search" component={Searchsim} />
      <Route exact path="/like" component={Like} />
      <Route exact path="/searchsim" component={Searchsim} />
      <Route exact path="/schedule" component={Schedule} />
    </Switch>
  );
}

function App() {
  
  return (
    <ContextController>
      <Router>
        <>
          <Navbar />
          <AlertProvider template={AlertTemplate} {...options}>
            <div className="container" style={{ minHeight: 'calc(100vh - 110px)'}}>
              <Routers />
            </div>
          </AlertProvider>
          <Footer/>
        </>
      </Router>
    </ContextController>
  );
}

export default App;
