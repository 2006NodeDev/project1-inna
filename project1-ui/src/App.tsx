import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent'
import { LoginComponent } from './components/LoginComponent/LoginComponent'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { User } from './models/User';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent'
import { NewUserComponent } from './components/NewUserComponent/NewUserComponent'
import { EditUserComponent } from './components/EditUserComponent/EditUserComponent'
import { ToastContainer } from 'react-toastify'
import { LogoutComponent } from './components/LogoutComponent/LogoutComponent'

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route exact path="/"><Redirect to="/login"/></Route>
        <Route path='/login' render={(props) => (<LoginComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>
        <Route exact path='/profile/:userId' component={ProfileComponent} user={currentUser}/>
        {/* <Route path='/profile/:userId' render={(props)=>(<ProfileComponent user={currentUser} {...props}/>)}/> */}
        <Route path='/new' component={NewUserComponent}/>
        <Route exact path='/profile/edit/:userId' render={(props)=>(<EditUserComponent user={currentUser} {...props}/>)} />
        <Route path='/logout' render={(props) => (<LogoutComponent changeCurrentUser={changeCurrentUser} user={currentUser} {...props}/>)}/>
      </Router>
      <ToastContainer position='bottom-right'/>
    </div>
  );
}

export default App;
