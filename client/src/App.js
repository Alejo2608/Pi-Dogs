import React from 'react';
import './index.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Nav from "./components/nav/nav.jsx"
import Home from './components/home/home.jsx';
import Create from './components/createDog/createDog.jsx';
import Detail from './components/details/details.jsx';
import Landing from './components/landing/landing.jsx';

function App() {
  return (
    <BrowserRouter>
    <Nav/>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/create' component={Create}/>
        <Route path='/detail/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App