import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './container/Home'
import CallAppPage from './container/CallAppPage'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/call-app" component={CallAppPage} />
      </div>
    </Router>
  );
}

export default App;
