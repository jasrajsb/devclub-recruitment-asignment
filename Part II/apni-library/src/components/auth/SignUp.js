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

class SignUp extends React.Component {
    loadDash = () => {
        this.redirect("/loading");
    }
    redirect = (path) => {
        var self = this;
        console.log("google_user_loggedin");

        if (!self.state.redirected) {
            self.setState({
                redirected: true
            })
            console.log("redirected")
            self.props.history.push("/loading");
        }
    }
    constructor(props) {
        super(props);
        document.addEventListener("google_user_loggedin", this.loadDash);
        this.state = {
            scriptloaded: window.auth2 ? true : false,
            script: window.loadScript("https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback"),
            redirected: false
        }
        var self = this;
        console.log("adding event listener");

    }
    componentWillUnmount() {
        console.log("removing event listener");
        document.removeEventListener("google_user_loggedin", this.loadDash);
    }
    render() {
        var self = this;
        
        document.addEventListener("script_loaded", function (e) {
            self.setState({
                scriptloaded: true
            })
        });
        this.state.scriptloaded && window.attachClickHandler()
        return <div className='mb-5'>
            <div className='text-center mb-2 fw-bold fs-3'>
                <span>Sign Up to Apni Library</span>
            </div>
            <div className='text-center mb-5  fs-6'>
                <span>Already have an Account? <Link to='/auth/login' ><a className="cool-link" >Sign In</a></Link></span>
            </div>

            <div className="mx-lg-4" >
                <Form key='1.'  prevname="Sign Up with Google" previd="googleSignIn" onPrev={() => { }} submittedonce={false} onSubmit={(inps) => {
                    window.validateSignUp(inps);
                    this.props.history.push("/loading");
                }}>
                    <Input key='.1' name='Username' className='text-lowercase' invalidmsg='Username should be atleast 5 characters long.' validator={(val)=>{return val.length>4}}  required></Input>
                    <Input key='.2' name='Email' className='' invalidmsg="Enter a valid E Mail ID" validator={(val)=>{return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val))}} required></Input>
                    <Input key='.3' type='password' name='Password' invalidmsg='Password must be Atleast 5 characters long' validator={(val) => { return val.toString().length > 4 }} required></Input>

                    <Button name='Sign Up' className=' ml-auto full-width' ></Button>
                </Form>
            </div>
        </div>
    }
}


export default SignUp


