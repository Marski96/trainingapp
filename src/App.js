import React, { Component } from 'react';
import "react-table/react-table.css";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CustomersList from './components/CustomersList';
import Home from './components/Home';
import TrainingsList from './components/TrainingsList';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" color="inherit">
                TrainingApp
              </Typography>
          </Toolbar>
        </AppBar>

        <BrowserRouter>
              <div class="Frame" style={{marginleft:24}}>
              <Link to="/" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} variant="outlined">Home</Button></Link>
              <Link to="/calendar" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} variant="outlined">Calendar</Button></Link>
              <Link to="/customers" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} variant="outlined">Customers</Button></Link>
              <Link to="/trainings" style={{textDecoration: 'none'}}><Button style={{marginTop:10, marginBottom:10, marginRight:5}} variant="outlined">Trainings</Button></Link>
              </div>  
        

                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/calendar" component={Calendar} />
                    <Route path= "/customers" component={CustomersList} />
                    <Route path= "/trainings" component={TrainingsList} />

                 </Switch>


        </BrowserRouter>
      </div>
    );
  }
}

export default App;
