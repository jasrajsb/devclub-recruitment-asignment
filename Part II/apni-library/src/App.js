
import './App.css';
import vector from './img/vector.jpg';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import React from 'react';
import Dashboard from './components/dashboard/comp.js';
import LibDashboard from './components/dashboard/comp-lib.js';
import UserDashboard from './components/dashboard/comp-user.js';
import Loading from './components/loading/comp.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import { render } from 'react-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    this.state = {
      component:
        <div>
          <div className="xcenter ycenter d-flex flex-column full-height pb-5">
            <div className="fw-700 fs-2 m-3">Apni Library</div>
            <div className="">Logging you Out...</div>
          </div>
        </div>
    }
    var int = setInterval(()=>{
      if(!window.getUser()){
        
        clearInterval(int);
        this.setState({
          component: <Redirect to='/auth/login' />
        })
      }
    }, 500)
  }
  // 
  render() {
    return this.state.component
  }


}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: <div className="xcenter ycenter full-height">Apni Library</div>
    };
  }
  render() {

    console.log(document.readyState, "complete", this.state.loading, (document.readyState === "complete" ? false : this.state.loading));
    return (
      <div >

        <Router>
          <Route path="/auth">
            <div className="container-fluid full-height">
              <div style={{ height: '70px' }}>
                <nav className="navbar fixed-top navbar-expand-md navbar-light bg-white" id='navBar'>
                  <div className="container-fluid ">
                    <a className="navbar-brand " href="#"> <span className="px-2" style={{ fontWeight: 600 }}>Apni Library </span></a>
                  </div>
                </nav>
                <div id="top-shadow"></div>
              </div>
              {window.getUser() ? <Redirect to='/dashboard' /> : (<div className="row flex-row-reverse " style={{ height: 'calc(100vh - 70px)' }}>
                <div className="col-xl-6 col-lg-5 col-0 d-none d-lg-flex   xcenter ycenter flex-column text-center " style={{ height: 'calc(100vh - 70px)' }}>
                  {/* <span className='fw-bold fs-2 mb-5 '>Welcome to Apni Library</span>
                <span className="fw-500">Library management solution that helps organization manage books and administration with QR, barcode facility, and multi user login. </span> */}
                  <img src={vector} alt="" style={{ width: '70%' }} />
                </div>
                <div className="col-lg-7 col-xl-6 px-xl-5  col-12 xcenter ycenter">
                  <div className="mx-xl-5 ">

                    <Route path="/auth/register" component={SignUp} />

                    <Route path="/auth/login" component={SignIn} />

                    <Route exact path="/auth"><Redirect to='/auth/login' /> </Route>

                  </div>
                </div>
              </div>)}
            </div>
          </Route>
          <Route path="/loading" component={Loading} />
          <Route path="/dashboard/admin" component={Dashboard} />
          <Route path="/dashboard/librarian" component={LibDashboard} />
          <Route path="/dashboard/user" component={UserDashboard} />
          <Route path="/dashboard" >
            <Navigation />

          </Route>
          <Route path='/logout' component={Logout} />


        </Router>
      </div>
    );
  }

}

var Navigation = () => {
  //window.updateUser();
  if (window.getUser()) {
    if (!window.loaded) {
      window.updateUser();
      return <Redirect to='/loading' />
    } else {
      if (!window.redirected) {
        if (window.getUser().user.user_type === "User") {
          return <Redirect to='/dashboard/user' />
        }
        if (window.getUser().user.user_type === "Librarian") {
          return <Redirect to='/dashboard/librarian' />
        }
        if (window.getUser().user.user_type === "Admin") {
          return <Redirect to='/dashboard/admin' />
        }
      }
    }
  } else {
    return <Redirect to='/auth/login' />
  }
}
export default App;
