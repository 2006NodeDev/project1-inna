import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent'
import { ClickerComponent } from './components/ClickerComponent/ClickerComponent'
import { LoginComponent } from './components/LoginComponent/LoginComponent'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { User } from './models/User';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent'
import { NewUserComponent } from './components/NewUserComponent/NewUserComponent';
import { ToastContainer } from 'react-toastify'

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent/>
        <Route path="/"><Redirect to="/login"/></Route>
        <Route path='/clicker'><ClickerComponent/></Route>
        <Route path='/login' render={(props) => (<LoginComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>
        <Route path='/profile/:userId' component={ProfileComponent}/>
        <Route path='/new' component={NewUserComponent}/>
      </Router>
      <ToastContainer position='bottom-right'/>
    </div>
  );
}

export default App;
