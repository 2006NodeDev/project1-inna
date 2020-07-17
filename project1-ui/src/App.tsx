import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent'
import { ClickerComponent } from './components/ClickerComponent/ClickerComponent'
import { LoginComponent } from './components/LoginComponent/LoginComponent'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { User } from './models/User';
// import {UserDisplayComponent} from './components/UserDisplayComponent/UserDisplayComponent'
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent'

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent/>
        <Route path='/clicker'><ClickerComponent/></Route>
        <Route path='/login' render={(props) => (<LoginComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>
        <Route path='/profile/:userId' component={ProfileComponent}/>
      </Router>
    </div>
  );
}

export default App;
