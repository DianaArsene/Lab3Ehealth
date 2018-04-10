import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router'
import Home from './Home';
import Medication from './Medication';
import Patients from './Patients';
import Detalii from './Detalii';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav class="navbar navbar-expand-lg navbar-light bg-blue App-header">
            <a class="navbar-brand" href="#">E-health-Lab3 Arsene Diana eGov</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
              <Link to={'/Home'} className="nav-link menu_item"> Home </Link>
              <Link to={'/Patients'} className="nav-link menu_item"> Patients </Link>
              <Link to={'/Medication'} className="nav-link menu_item"> Medication </Link>        
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/patients' component={Patients} />
            <Route path='/medication' component={Medication} />
            <Route path='/detalii/:id' component={Detalii} />
          </Switch>


          <footer class="myfooter">
            <div>
              <p class="text_footer">Copyright &copy; E-health Lab3 2018</p>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
