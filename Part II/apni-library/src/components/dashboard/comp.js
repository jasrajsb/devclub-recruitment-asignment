import React from 'react';
import './comp.css';
import avtaar from '../../img/avtaar.png';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

function List(props) {
    return <div>
        {
            props.arr.map((child, index) => {
                return <div key={index} className="bg-white py-3 px-4 ycenter" style={{ height: "100px", borderRadius: '15px', marginTop: '20px', justifyContent: 'space-between' }}>
                    <img src={avtaar} alt="" style={{ height: '35px' }} />
                    <div className="fs-4 mx-3 text-capitalize fw-500 d-flex ycenter ">{child.name} <div style={{ paddingLeft: "10px", fontSize: 'smaller', opacity: '.7', fontWeight: 500 }}>({child.user_type})</div></div>
                    <div className="d-flex">
                        <div onClick={() => { child.change() }} className={"user_but mx-2 py-2 px-4 text-white"} style={{ borderRadius: "10px", background: '#000', cursor: 'pointer' }}>Change Type</div>
                    </div>

                </div>
            })
        }
    </div>

}

class UserManagement extends React.Component {
    load = () => {
        var self = this;
        window.server.send({
            request_name: "get_users",
            credentials: window.getUser().token.token
        }).then((msg) => {
            console.log(msg)
            if (msg.success) {
                self.setState({
                    loaded: true,
                    users: msg.msg.users
                })
            } else {
                self.props.history.push("/dashboard/admin")
            }
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            users: []
        }
        this.load()
    }
    render = () => {
        this.state.users.forEach((u, i) => {
            u.change = () => {
                window.server.send({
                    request_name: "change_user_type",
                    user: this.state.users[i].user_id,
                    type: (this.state.users[i].user_type === "Librarian" ? "User" : "Librarian"),
                    credentials: window.getUser().token.token
                }).then((res) => {
                    console.log(65, res)
                    if (res.success) {
                        this.state.users[i].user_type = res.msg;
                    } else {
                        this.state.users[i].user_type = "" + ("Changing to " + this.state.users[i].user_type === "Librarian" ? "User" : "Librarian");
                    }
                    this.setState({

                    })
                });
                this.state.users[i].user_type = "Changing to " + (this.state.users[i].user_type === "Librarian" ? "User" : "Librarian");
                this.setState({

                })

            }
        });
        return <div>
            <div className="px-3 px-lg-4 py-4 bg-light mx-3 my-4 dashboard" >
                <div><span className="fw-bolder fs-5 fw-600">Admin Dashboard</span></div>
                <div className="row mt-3">
                    <span className="fw-600 fs-6">User Management</span>
                    {this.state.loaded ? <div className="mt-3">

                        <List arr={this.state.users} />


                    </div> : <div className="mt-3">
                        <div className="gradient" style={{ height: "100px", borderRadius: '15px' }}></div>
                        <div className="gradient" style={{ height: "100px", borderRadius: '15px', marginTop: '20px' }}></div>
                        <div className="gradient" style={{ height: "100px", borderRadius: '15px', marginTop: '20px' }}></div>
                        <div className="gradient" style={{ height: "100px", borderRadius: '15px', marginTop: '20px' }}></div>
                        <div className="gradient" style={{ height: "100px", borderRadius: '15px', marginTop: '20px' }}></div>
                        <div className="gradient" style={{ height: "100px", borderRadius: '15px', marginTop: '20px' }}></div>
                    </div>}
                </div>
            </div>
        </div>
    }
}


class Dashboard extends React.Component {
    loadDash = () => {
        this.redirect("/" + window.getUser().type + "/dashboard");
    }
    constructor(props) {
        super(props);
        console.log("called");
        document.addEventListener("signed_in", this.loadDash);
        this.state = {
            redirected: false
        }
        var self = this;
        console.log("adding event listener");

    }
    redirect = (path) => {
        var self = this;
        console.log();
        if (!self.state.redirected) {
            self.setState({
                redirected: true
            })
            console.log("redirected")
            self.props.history.push(path);
        }
    }
    componentWillUnmount() {
        console.log("removing event listener");
        document.removeEventListener("signed_in", this.loadDash);
    }

    render() {
        return <div>
            <div className="wrapper full-height">
                {/*<!-- Sidebar  -->*/}
                <nav id="sidebar">
                    <div className="sidebar-header my-3">
                        <h3>Apni Library</h3>
                        <strong>AL</strong>
                    </div>

                    <ul className="list-unstyled components  mx-4">
                        {console.log(this.props.location.pathname)}
                        <li className={this.props.location.pathname === "/dashboard/admin" ? "active" : ""}>
                            <Link to="/dashboard/admin">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                                </svg>

                                <span> Dashboard</span>
                            </Link>
                        </li>
                        {/* <div className="mt-3 mb-1 fw-500 sidebar-label" style={{ fontSize: 'smaller' }}>MANAGE USERS</div> */}
                        <li className={this.props.location.pathname === "/dashboard/admin/users" ? "active" : ""}>
                            <Link to="/dashboard/admin/users">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                <span>Users</span>
                            </Link>
                        </li>
                        {/* <li className={this.props.location.pathname === "/dashboard/admin/librarians" ? "active" : ""}>
                            <Link to="/dashboard/admin/librarians">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                                <span>Librarians</span>
                            </Link>
                        </li> */}
                        {/* <div className="mt-3 mb-1  fw-500 sidebar-label" style={{ fontSize: 'smaller' }}>MISCELLANEOUS</div>
                        <li className="">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-shaded" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                                </svg>
                                <span> Monitor Comments</span>
                            </a>
                        </li>
                        <li className="">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app-indicator" viewBox="0 0 16 16">
                                    <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                                    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                </svg>
                                <span> Send Notification</span>
                            </a>
                        </li> */}


                    </ul>


                </nav>

                {/*<!-- Page Content  -->*/}
                <div id="content" >
                    <nav className="navbar navbar-expand-lg navbar-light my-1">
                        <div className="container-fluid">



                            <div className="col-12 col-lg-8 d-flex">
                                <button type="button" id="sidebarCollapse" className="btn" onClick={() => { window.$('#sidebar').toggleClass('active'); }}>
                                    <i className="fas fa-align-left"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z" />
                                    </svg>
                                </button>
                                <div class="cool-input">
                                    <div class="prea">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                    <input id="org" type="" name="book" value="" placeholder="Search Book" />
                                </div>
                            </div>
                            <div className="col-0  col-lg-4 d-flex ">
                                <div className="d-flex pl-5 xcenter ycenter my-3">
                                    <div className="mx-3">
                                        <img src={avtaar} alt="" style={{ height: '32px' }} />
                                    </div>
                                    <div className="fw-600 text-capitalize">{window.getUser().name || window.getUser().username}</div>
                                    <Link to='/logout'> <div className="mx-3 "><small>Sign Out</small></div> </Link>
                                </div>
                            </div>


                        </div>
                    </nav>
                    <Switch>

                        <Route exact path="/dashboard/admin">
                            <div>
                                <div className="px-3 px-lg-4 py-4 bg-light mx-3 my-4 dashboard" >
                                    <div><span className="fw-bolder fs-5 fw-600">Admin Dashboard</span></div>
                                    <div className="row mt-3">
                                        <div className="col-lg-4 col-12">
                                            <div className="disp-card">
                                                <div className="val">{window.getUser().state.users}</div>
                                                <div className="name">Resgistered Users</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-12">
                                            <div className="disp-card">
                                                <div className="val">{window.getUser().state.librarians}</div>
                                                <div className="name">Resgistered Librarians</div>
                                            </div>
                                        </div>
                                        {/* <div className="col-4"></div> */}
                                        {/* <div className="col-lg-3 col-12">
                                    <div className="disp-card">
                                        <div className="val">123</div>
                                        <div className="name">Posted Comments</div>
                                    </div>
                                </div> */}
                                        <div className="col-lg-4 col-12">
                                            <div className="disp-card">
                                                <div className="val">{window.getUser().state.pending_requests}</div>
                                                <div className="name">Pending Requests</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row mt-2">
                                <div className="col-lg-4 col-12">
                                    <div className="dash-list">
                                        <div className="heading">
                                            <div className="fs-5 fw-600">User Activity</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="dash-list">
                                        <div className="heading">
                                            <div className="fs-5 fw-600">Librarian Activity</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="dash-list">
                                        <div className="heading">
                                            <div className="fs-5 fw-600">Issued Books</div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                                </div>
                            </div>
                        </Route>
                        <Route exact path="/dashboard/admin/users" component={UserManagement} />


                    </Switch>



                </div>
            </div>

            {/*<!-- jQuery CDN - Slim version (=without AJAX) -->*/}
            {/* <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> */}
            {/*<!-- Popper.JS -->*/}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script> */}
            {/*<!-- Bootstrap JS -->*/}
            {/* <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script> */}

        </div >
    }
}

export default Dashboard
