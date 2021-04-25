import React from 'react';
import './comp.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

class Loading extends React.Component {
    loadDash = () => {
        this.redirect("/");
    }
    redirect = (e) => {
        var self = this;
        //console.log("google_user_loggedin");
        console.log(11, "loading","this.redirect called")
        if (!self.state.redirected) {
            self.setState({
                redirected: true
            })
            console.log("redirected")
            console.log(e.detail, e.billi)
            //self.props.history.push(path.redirect);
            self.setState({
                redirect: <Redirect to = {e.detail}/>
            })
        }
    }
    constructor(props) {
        super(props);
        document.addEventListener("stop_loading", this.redirect);
        this.state = {
            redirected: false
        }
        var self = this;
        console.log("adding event listener");

    }
    componentWillUnmount() {
        console.log("removing event listener");
        document.removeEventListener("stop_loading", this.redirect);
    }
    render() {
        return this.state.redirect||<div>
            <div className="wrapper full-height">
                {/*<!-- Sidebar  -->*/}
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Apni Library</h3>
                        <strong>AL</strong>
                    </div>

                    <ul className="list-unstyled components  mx-4">
                        <li className="active">
                            <a href="#" >
                                <svg style={{opacity: 0}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                                </svg>

                                <span style={{opacity: 0}}> Dashboard</span>
                            </a>
                        </li>
                        <div className="mt-3 mb-1 fw-500 sidebar-label" style={{ fontSize: 'smaller' }}>
                            <div style={{height:'20px', width:'100px', background:'#7e8299', opacity:.5}}></div>
                        </div>
                        <li className="">
                            <a href="#">
                            <div style={{height:'25px', width:'150px', background:'#7e8299', opacity:.3}}></div>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                            <div style={{height:'25px', width:'150px', background:'#7e8299', opacity:.3}}></div>
                            </a>
                        </li>
                        <div className="mt-3 mb-1  fw-500 sidebar-label" style={{ fontSize: 'smaller' }}>
                        <div style={{height:'20px', width:'100px', background:'#7e8299', opacity:.5}}></div>
                        </div>
                        <li className="">
                            <a href="#">
                            <div style={{height:'25px', width:'150px', background:'#7e8299', opacity:.3}}></div>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                            <div style={{height:'25px', width:'150px', background:'#7e8299', opacity:.3}}></div>
                            </a>
                        </li>


                    </ul>


                </nav>

                {/*<!-- Page Content  -->*/}
                <div id="content" >
                    <nav className="navbar navbar-expand-lg navbar-light my-1">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn">
                                <i className="fas fa-align-left"></i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z" />
                                </svg>
                            </button>

                            <div className="col-12 col-lg-8">
                                <div class="cool-input">
                                    <div class="prea">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                    <input id="org" type="" name="Organization" value="" placeholder="" />
                                </div>
                            </div>
                            <div className="col-0 col-lg-4"></div>


                        </div>
                    </nav>

                    <div>
                        <div className="px-3 px-lg-4 py-4 bg-light mx-3 my-4 dashboard" >
                            <div><div style={{height:'40px', width:'150px', background:'#000', opacity:.3}}></div></div>
                            <div className="row mt-3">
                            <div className="col-lg-4 col-12">
                                    <div className="disp-card ">
                                        <div className="gradient" style={{height:'40px', width:'70%'}}></div>
                                        <div className="gradient" style={{height:'20px', width:'50%'}}></div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="disp-card ">
                                        <div className="gradient" style={{height:'40px', width:'70%'}}></div>
                                        <div className="gradient" style={{height:'20px', width:'50%'}}></div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="disp-card ">
                                        <div className="gradient" style={{height:'40px', width:'70%'}}></div>
                                        <div className="gradient" style={{height:'20px', width:'50%'}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-4 col-12">
                                    <div className="dash-list">
                                        <div className="heading">
                                        <div className="gradient" style={{height:'40px', width:'70%'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="dash-list">
                                        <div className="heading">
                                        <div className="gradient" style={{height:'40px', width:'70%'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="dash-list">
                                        <div className="heading">
                                        <div className="gradient" style={{height:'40px', width:'70%'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>
                                        <div className="gradient" style={{height:'50px', width:'100%', marginTop:'20px'}}></div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>

        

        </div>
    }
}

export default Loading;
