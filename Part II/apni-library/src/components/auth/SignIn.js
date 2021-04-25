import React from 'react';
import Form from "../../TULF/Form/comp";
import Input from "../../TULF/Form/Input/comp";
import Button from "../../TULF/Button/comp";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

var props;

function qs(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

class SignIn extends React.Component {
    loadDash = ()=>{
        this.redirect("/loading");
    }
    redirect = (path) =>{
        var self=this;
            console.log("google_user_loggedin");
            
            if(!self.state.redirected){
                self.setState({
                    redirected: true
                })
                console.log("redirected")
                self.props.history.push("/loading");
            }
    }
    constructor(props) {
    
        super(props);
        console.log("called");
        //console.log(this.props.history)
        document.addEventListener("google_user_loggedin", this.loadDash);
        this.state = {
            scriptloaded: window.auth2 ? true : false,
            script: window.loadScript("https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback"),
            redirected: false
        }
        //console.log(this)
        var self=this;
        console.log("adding event listener");
       
        
    }
    componentWillUnmount(){
        console.log("removing event listener");
        document.removeEventListener("google_user_loggedin", this.loadDash);
    }
    render() {
       console.log(this.state.scriptloaded );
        this.state.scriptloaded && window.attachClickHandler()
        var self = this;
        
        document.addEventListener("script_loaded", function (e) {
            self.setState({
                scriptloaded: true
            })
        });

        return this.state.redirect || <div className='mb-5'>
            <div className='text-center mb-2 fw-bold fs-3'>
                <span>Sign In to Apni Library</span>
            </div>
            <div className='text-center mb-5  fs-6'>
                <span>New Here?  <Link to='/auth/register' ><a className="cool-link" >Create a New Account</a></Link></span>
            </div>
            <div className="text-center text-danger">{qs("reason")}</div>

            <div className="mx-lg-4" >
                <Form key='1.' dispprevbut={/*this.state.scriptloaded*/false} prevname="Sign In with Google" previd="googleSignIn" onPrev={() => { }} submittedonce={false} onSubmit={(inps) => {
                    window.validateSignIn(inps);
                    this.props.history.push("/loading");
                }}>
                    <Input key='.1' name='Username' className='text-lowercase' required></Input>
                    <Input key='.2' type='password' name='Password' invalidmsg='Password must be Atleast 5 characters long' validator={(val) => { return val.toString().length > 4 }} required></Input>
                    <Button name='Sign In' className=' ml-auto full-width' ></Button>
                </Form>
            </div>
        </div>
    }
}


export default SignIn


