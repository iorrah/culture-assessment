import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './app.css';
import appSettings from './app/app-settings/app-settings';
import Header from './app/header/header';
import Home from './app/home/home';
import Result from './app/result/result';
import Footer from './app/footer/footer';

const App = () => (
  <Router basename={appSettings.base_name}>
    <div className="app">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/result" component={Result} />
      <div className="clearfix" />
      <Footer />
    </div>
  </Router>
);

export default App;
