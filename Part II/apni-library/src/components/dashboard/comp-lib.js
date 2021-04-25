import React from 'react';
import './comp.css';
import avtaar from '../../img/avtaar.png';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";

import Form from "../../TULF/Form/comp";
import Input from "../../TULF/Form/Input/comp";
import Button from "../../TULF/Button/comp";

function List(props) {
    return <div>
        {
            props.arr.map((child, index) => {
                return <div key={index} className="bg-white py-3 px-4 ycenter fullwidth" style={{ height: "100px", borderRadius: '15px', marginTop: '20px', width:'100%' }}>
                    {/* <img src={avtaar} alt="" style={{ height: '35px' }} /> */}
                    <div className="row fullwidth" style={{width:'100%'}}>
                        <div className="col-6 ">
                            <div className="fs-4 mx-3 text-capitalize fw-500 d-flex ycenter ">{child.title} <div style={{ paddingLeft: "10px", fontSize: 'smaller', opacity: '.7', fontWeight: 500 }}>({child.status === "in_library" ? "In Library" : (child.status === "with_user" ? "With User" : (child.status === "lost" ? "Lost" : "Information Unavailable"))})</div></div>

                        </div>
                        <div className="col-3">
                            {child.status !== "lost" ? <div className="d-flex">
                                <div onClick={() => { child.lost() }} className={"user_but mx-2 py-2 px-4 text-white"} style={{ borderRadius: "10px", background: '#000', cursor: 'pointer' }}>Mark as Lost</div>
                            </div> : <div />}
                        </div>
                        <div className="col-3">
                            <div className="d-flex" style={{}}>
                                <div onClick={() => { child.edit() }} className={"user_but py-2 px-4 text-white"} style={{ borderRadius: "10px", background: '#000', cursor: 'pointer',marginLeft: "auto" }}>Edit</div>
                            </div>
                        </div>
                    </div>




                </div>
            })
        }
    </div>

}

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render = () => {
        var self = this;
        return <div className="container-fluid">
            <div className="row">
                <div className="col-0 col-lg-2"></div>
                <div className="col-12 col-lg-6">
                    <div className="px-5 mb-5">
                        <Form key='1.' dispprevbut={/*this.state.scriptloaded*/false} prevname="Sign In with Google" previd="googleSignIn" onPrev={() => { }} submittedonce={false} onSubmit={(inps) => {
                            window.server.send({
                                request_name: 'add_book',
                                credentials: window.getUser().token.token,
                                vals: inps
                            }).then(() => {
                                self.props.history.push("/dashboard/librarian/books")
                            });
                            self.setState({
                                button_name: "Adding..."
                            })
                        }}>

                            <Input key='.1' name='Title' className='text-capitalize' required></Input>
                            <Input key='.2' name='Author' className='text-capitalize ' ></Input>
                            <Input key='.3' name='Publisher' className='text-capitalize' ></Input>
                            <Input key='.4' name='Genre' className='text-capitalize' ></Input>
                            <Input key='.5' name='ISBN' className='text-capitalize' ></Input>
                            <Input key='.6' name='Location' className='text-capitalize' ></Input>
                            <Input key='.7' name='Summary' className='text-capitalize' ></Input>
                            {/* <Input key='.2' type='password' name='Password' invalidmsg='Password must be Atleast 5 characters long' validator={(val) => { return val.toString().length > 4 }} required></Input> */}
                            <Button name={self.state.button_name || 'Add Book'} className=' ml-auto full-width' ></Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    }
}

class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
        
    }
    render = () => {
        var self = this;
        return <div className="container-fluid">
            <div className="row">
                <div className="col-0 col-lg-2"></div>
                <div className="col-12 col-lg-6">
                    <div className="px-5 mb-5">
                        <Form key='1.' dispprevbut={/*this.state.scriptloaded*/true} prevname="Remove Book" previd="remBook" onPrev={() => {
                            document.getElementById("remBook").innerHTML = "Removing..."
                            window.server.send({
                                request_name: 'remove_book',
                                credentials: window.getUser().token.token,
                                vals: this.props.location.state.book_id
                            }).then(() => {
                                self.props.history.push("/dashboard/librarian/books")
                            });
                        }} submittedonce={false} onSubmit={(inps) => {
                            inps.book_id= this.props.location.state.book_id;
                            window.server.send({
                                request_name: 'edit_book',
                                credentials: window.getUser().token.token,
                                vals: inps
                            }).then(() => {
                                self.props.history.push("/dashboard/librarian/books")
                            });
                            self.setState({
                                button_name: "Saving..."
                            })
                        }}>
                        
                            <Input key='.1' name='Title' className='text-capitalize' val={this.props.location.state.title} required></Input>
                            <Input key='.2' name='Author' className='text-capitalize ' val={this.props.location.state.author}></Input>
                            <Input key='.3' name='Publisher' className='text-capitalize' val={this.props.location.state.publisher}></Input>
                            <Input key='.4' name='Genre' className='text-capitalize' val={this.props.location.state.genre}></Input>
                            <Input key='.5' name='ISBN' className='text-capitalize' val={this.props.location.state.ISBN}></Input>
                            <Input key='.6' name='Location' className='text-capitalize' val={this.props.location.state.location}></Input>
                            <Input key='.7' name='Summary' className='text-capitalize' val={this.props.location.state.summary}></Input>
                            {/* <Input key='.2' type='password' name='Password' invalidmsg='Password must be Atleast 5 characters long' validator={(val) => { return val.toString().length > 4 }} required></Input> */}
                            <Button name={this.state.button_name||'Save'} className=' ml-auto full-width' ></Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    }
}

class UserManagement extends React.Component {
    load = () => {
        var self = this;
        window.server.send({
            request_name: "get_books",
            credentials: window.getUser().token.token
        }).then((msg) => {
            console.log(msg)
            if (msg.success) {
                self.setState({
                    loaded: true,
                    users: msg.msg.users
                })
            } else {
                self.props.history.push("/dashboard/librarian")
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
            var temp = this.state.users[i].status
            u.lost = () => {
                window.server.send({
                    request_name: "book_lost",
                    book: this.state.users[i].book_id,
                    credentials: window.getUser().token.token
                }).then((res) => {
                    console.log(65, res)
                    if (res.success) {
                        this.state.users[i].status = res.msg;
                    } else {
                        this.state.users[i].status = temp;
                    }
                    this.setState({

                    })
                });
                this.state.users[i].user_type = "Marking as Lost ";
                this.setState({

                })
            }
            u.edit = () => {
                u.lost=undefined;
                u.edit=undefined;
                this.props.history.push({
                    pathname:"/dashboard/librarian/books/edit",
                    state: u
                })
            }
        });
        return <div>
            <div className="px-3 px-lg-4 py-4 bg-light mx-3 my-4 dashboard" >
                <div><span className="fw-bolder fs-5 fw-600">Librarian Dashboard</span></div>
                <div className="row mt-3">

                    <div className="row">
                        <div className="col-lg-2 col-12">
                            <div className="fw-600 fs-6">Book Management</div>
                        </div>
                        <div className="col-lg-2 col-12"></div>
                        <div className="col-lg-2 col-12"></div>
                        <div className="col-lg-2 col-12"></div>
                        <div className="col-lg-2 col-0"></div>
                        <div className="col-lg-2 col-12">

                            <Link to="/dashboard/librarian/books/add"><div onClick={() => { }} className={"user_but mx-2 py-2 xcenter px-4 text-white"} style={{ borderRadius: "10px", background: '#000', cursor: 'pointer' }}>Add Book</div></Link>


                        </div>
                    </div>


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
                        <li className={this.props.location.pathname === "/dashboard/librarian" ? "active" : ""}>
                            <Link to="/dashboard/librarian">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                                </svg>

                                <span> Dashboard</span>
                            </Link>
                        </li>
                        {/* <div className="mt-3 mb-1 fw-500 sidebar-label" style={{ fontSize: 'smaller' }}>MANAGE USERS</div> */}
                        <li className={this.props.location.pathname === "/dashboard/librarian/books" ? "active" : ""}>
                            <Link to="/dashboard/librarian/books">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                </svg>
                                <span>Books</span>
                            </Link>
                        </li>
                        <li className={this.props.location.pathname === "/dashboard/librarian/requests" ? "active" : ""}>
                            <Link to="/dashboard/librarian/requests">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                                    <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                </svg>
                                <span>Requests</span>
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

                        <Route exact path="/dashboard/librarian">
                            <div>
                                <div className="px-3 px-lg-4 py-4 bg-light mx-3 my-4 dashboard" >
                                    <div><span className="fw-bolder fs-5 fw-600">Librarian Dashboard</span></div>
                                    <div className="row mt-3">
                                        <div className="col-lg-4 col-12">
                                            <div className="disp-card">
                                                <div className="val">{window.getUser().state.with_user + window.getUser().state.in_library}</div>
                                                <div className="name">Total Books</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-12">
                                            <div className="disp-card">
                                                <div className="val">{window.getUser().state.with_user}</div>
                                                <div className="name">Issued Books</div>
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
                                                <div className="val">{window.getUser().state.in_library}</div>
                                                <div className="name">Books Available</div>
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
                        <Route exact path="/dashboard/librarian/books" component={UserManagement} />
                        <Route exact path="/dashboard/librarian/books/add" component={AddBook} />
                        <Route exact path="/dashboard/librarian/books/edit" component={EditBook} />


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
