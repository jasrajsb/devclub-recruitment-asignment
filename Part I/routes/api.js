const database = require('../functions/database');
const auth = require('../functions/auth');
const router = require('Express').Router();
var md5 = require('md5');

const mailValid = (val) => { return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)) }

router.post('/', (req, res) => {
    console.log("request", req.body);
    if (req.body.request_name === 'sign_up_user') {
        console.log("in sign_up_user")
        console.log(req.body.credentials.Username, req.body.credentials.Password, req.body.credentials.Email /*,req.body.username.length > 4 , req.body.password.length > 4 , mailValid(req.body.email)*/)
        if (req.body && req.body.credentials && req.body.credentials.Username && req.body.credentials.Password && req.body.credentials.Email && req.body.credentials.Username.length > 4 && req.body.credentials.Password.length > 4 && mailValid(req.body.credentials.Email)) {
            database.username_available(req.body.credentials.Username).then(() => {
                console.log("api", 14, "username_available")
                database.mail_available(req.body.credentials.Email).then(() => {
                    var user = {
                        name: req.body.credentials.Username,
                        email: req.body.credentials.Email,
                        password: md5(req.body.credentials.Password),
                        photo_url: '',
                        google_sub: 'sign_up_se',
                        user_type: 'User',
                        activity: '[]',
                        books: '[]',
                        username: req.body.credentials.Username,
                    };
                    var state;
                    database.sign_up(user).then((user) => {
                        user.password = undefined;
                        if (user.user_type === "Admin") {
                            database.get_admin_dashboard().then((data) => {
                                state = data;

                                res.send({
                                    msg: 'signed_in',
                                    success: true,
                                    name: user.name,
                                    email: user.email,
                                    photo: user.photo_url,
                                    token: auth.getToken(user),
                                    username: user.username,
                                    user: user,
                                    state: state
                                })
                            })
                        }
                        if (user.user_type === "Librarian") {
                            database.get_librarian_dashboard().then((data) => {
                                state = data;

                                res.send({
                                    msg: 'signed_in',
                                    success: true,
                                    name: user.name,
                                    email: user.email,
                                    photo: user.photo_url,
                                    token: auth.getToken(user),
                                    username: user.username,
                                    user: user,
                                    state: state
                                })
                            })
                        }

                        if (user.user_type === "User") {
                            database.get_user_dashboard(user.user_id).then((data) => {
                                state = data;
                                res.send({
                                    msg: 'signed_in',
                                    success: true,
                                    name: user.name,
                                    email: user.email,
                                    photo: user.photo_url,
                                    token: auth.getToken(user),
                                    username: user.username,
                                    user: user,
                                    state: state
                                })
                            })
                        }

                    });
                }).catch(() => {
                    res.send({
                        success: false,
                        msg: 'Email already used'
                    })
                });
            }).catch((error) => {
                console.log("api", 36, error);
                if (error) {
                    console.log("api", 14, "username_not_available")
                    res.send({
                        success: false,
                        msg: 'Username not available'
                    })
                }

            });
        } else {
            res.send({
                success: false,
                msg: 'Username, password or Email is invalid'
            })
        }


    }
    if (req.body.request_name === 'validate_sign_in_user') {
        if (req.body && req.body.credentials && req.body.credentials.Username && req.body.credentials.Password) {
            database.auth_user(req.body.credentials.Username, req.body.credentials.Password).then((user) => {
                user.password = undefined;
                if (user.user_type === "Admin") {
                    database.get_admin_dashboard().then((data) => {
                        state = data;
                        res.send({
                            msg: 'signed_in',
                            success: true,
                            name: user.name,
                            email: user.email,
                            photo: user.photo_url,
                            token: auth.getToken(user),
                            username: user.username,
                            user: user,
                            state: state
                        })
                    })
                }
                if (user.user_type === "Librarian") {
                    database.get_librarian_dashboard().then((data) => {
                        state = data;
                        res.send({
                            msg: 'signed_in',
                            success: true,
                            name: user.name,
                            email: user.email,
                            photo: user.photo_url,
                            token: auth.getToken(user),
                            username: user.username,
                            user: user,
                            state: state
                        })
                    })
                }
                if (user.user_type === "User") {
                    database.get_user_dashboard(user.user_id).then((data) => {
                        state = data;
                        res.send({
                            msg: 'signed_in',
                            success: true,
                            name: user.name,
                            email: user.email,
                            photo: user.photo_url,
                            token: auth.getToken(user),
                            username: user.username,
                            user: user,
                            state: state
                        })
                    })
                }



            }).catch((msg) => {
                res.send({
                    success: false,
                    msg: msg
                })
            })
        } else {
            res.send({
                success: false,
                msg: 'Empty Username or Password'
            })
        }

    }
    if (req.body.request_name === 'update_user') {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    user.password = undefined;
                    var state = {};
                    if (user.user_type === "Admin") {
                        database.get_admin_dashboard().then((data) => {
                            state = data;
                            res.send({
                                msg: 'signed_in',
                                success: true,
                                name: user.name,
                                email: user.email,
                                photo: user.photo_url,
                                token: auth.getToken(user),
                                username: user.username,
                                user: user,
                                state: state
                            })
                        })
                    }
                    if (user.user_type === "Librarian") {
                        database.get_librarian_dashboard().then((data) => {
                            state = data;
                            res.send({
                                msg: 'signed_in',
                                success: true,
                                name: user.name,
                                email: user.email,
                                photo: user.photo_url,
                                token: auth.getToken(user),
                                username: user.username,
                                user: user,
                                state: state
                            })
                        })
                    }
                    if (user.user_type === "User") {
                        database.get_user_dashboard(user.user_id).then((data) => {
                            state = data;
                            res.send({
                                msg: 'signed_in',
                                success: true,
                                name: user.name,
                                email: user.email,
                                photo: user.photo_url,
                                token: auth.getToken(user),
                                username: user.username,
                                user: user,
                                state: state
                            })
                        })
                    }

                }).catch((msg) => {
                    res.send({
                        success: false,
                        msg: msg
                    })
                });
            }
        } else {
            res.send({
                success: false,
                msg: 'Invalid token. try clearing cookies or opening page in incognito mode.'
            })
        }

    }
    if (req.body.request_name === 'get_users') {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Admin");
                    if (user.user_type !== "Admin") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.get_users().then((users) => {
                            res.send({
                                success: true,
                                msg: {
                                    users: users
                                }
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        } else {
            res.send({
                success: false,
                msg: 'Invalid token. try clearing cookies or opening page in incognito mode.'
            })
        }
    }
    if (req.body.request_name === 'get_books') {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Librarian");
                    if (user.user_type !== "Librarian") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.get_books().then((books) => {
                            res.send({
                                success: true,
                                msg: {
                                    users: books
                                }
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        } else {
            res.send({
                success: false,
                msg: 'Invalid token. try clearing cookies or opening page in incognito mode.'
            })
        }
    }
    if (req.body.request_name === 'add_book') {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Librarian");
                    if (user.user_type !== "Librarian") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        var book = {
                            title: req.body.vals.Title,
                            author: req.body.vals.Author,
                            publisher: req.body.vals.Publisher,
                            genre: req.body.vals.Genre,
                            summary: req.body.vals.Summary,
                            ISBN: req.body.vals.ISBN,
                            location: req.body.vals.Location,
                            availability: true,
                            status:'in_library',
                        }
                        database.add_book(book).then((book) => {
                            res.send({
                                success: true,
                                msg: 'Added'
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        } else {
            res.send({
                success: false,
                msg: 'Invalid token. try clearing cookies or opening page in incognito mode.'
            })
        }
    }
    
    if (req.body.request_name === "change_user_type") {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Admin");
                    if (user.user_type !== "Admin") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.change_user_type(req.body.user, req.body.type).then((user) => {
                            res.send({
                                success: true,
                                msg: user
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        }
    }
    if (req.body.request_name === "book_lost") {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Librarian");
                    if (user.user_type !== "Librarian") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.book_lost(req.body.book).then((user) => {
                            res.send({
                                success: true,
                                msg: user
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        }
    }
    if (req.body.request_name === "edit_book") {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Librarian");
                    if (user.user_type !== "Librarian") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.edit_book(req.body.vals).then((user) => {
                            res.send({
                                success: true,
                                msg: user
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        }
    }
    if (req.body.request_name === "remove_book") {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "Librarian");
                    if (user.user_type !== "Librarian") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.remove_book(req.body.vals).then((user) => {
                            res.send({
                                success: true,
                                msg: user
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        }
    }
    if (req.body.request_name === "find_book") {
        if (req.body.credentials) {
            var user_id = auth.verify(req.body.credentials);
            console.log(user_id);
            if (user_id) {
                database.get_user_obj(user_id).then((user) => {
                    var state = {};
                    console.log(user, user.user_type !== "User");
                    if (user.user_type !== "User") {
                        res.send({
                            success: false,
                            msg: 'Forbidden'
                        })
                    } else {
                        database.search_books(req.body.q).then((user) => {
                            res.send({
                                success: true,
                                books: user
                            })
                        });
                    }

                }).catch((msg) => {
                    console.log(159, msg);
                    if (msg !== {}) {
                        res.send({
                            success: false,
                            msg: msg
                        })
                    }

                });
            }
        }
    }
});

module.exports = router;