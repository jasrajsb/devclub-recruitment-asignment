const mongoose = require("mongoose");
const User = require("../models/user.js");
const Book = require("../models/book.js");
const Request = require("../models/request.js");
const auth = require("./auth")
var md5 = require('md5');
const request = require("request");

var database = {};

database.sign_up = (user) => {
    return new Promise(function (resolve, reject) {
        User.findOne({ user_type: "counter" }).then((counter) => {
            if (!counter) {
                counter = {
                    name: 'Counter',
                    email: '32u0rfeihujpwoerfinkl@r9e8o3pi90ro.hh',
                    password: '4r3feuiowjorfk',
                    user_id: '1000001',
                    photo_url: '',
                    google_sub: 'conventional_sign_up',
                    user_type: 'counter',
                    activity: '[]',
                    books: '[]',
                    username: 'counter'
                }
            }
            user.user_id = counter.user_id;
            counter.user_id = ((counter.user_id - 0) + 1) + '';

            User(counter).save(function (err) {
                if (err) throw err;
                User(user).save(function (err, user) {
                    if (err) throw err;
                    resolve(user);
                });
            });
        });
    });
}

database.add_book = (book) => {
    return new Promise(function (resolve, reject) {
        Book.findOne({ status: "counter" }).then((counter) => {
            if (!counter) {
                counter = {
                    title: "counter",
                    author: "",
                    publisher: "",
                    genre: "",
                    summary: "",
                    ISBN: "",
                    location: "",
                    availability: "",
                    status: "counter",
                    book_id: "100001"
                }
            }
            book.book_id = counter.book_id;
            counter.book_id = ((counter.book_id - 0) + 1) + '';

            Book(counter).save(function (err) {
                if (err) throw err;
                Book(book).save(function (err, user) {
                    if (err) throw err;
                    resolve(user);
                });
            });
        });
    });
}

database.request_book = (uid, bid) => {
    return new Promise(function (resolve, reject) {
        Request.findOne({ status: "counter" }).then((counter) => {
            if (!counter) {
                counter = {
                    status: 'counter',
                    request_id: '100001',
                    user_id: '',
                    book_id: '',
                    days: ''
                }
            }
            var req = {
                status: 'pending',
                request_id: '100001',
                user_id: uid,
                book_id: bid,
                days: '7'
            }
            req.request_id = counter.request_id;
            counter.request_id = ((counter.request_id - 0) + 1) + '';

            Request(counter).save(function (err) {
                if (err) throw err;
                Request(req).save(function (err, user) {
                    if (err) throw err;
                    Book.findOne({book_id:bid}).then((b)=>{
                        b.status='requested';
                        b.availability = uid;
                        Book(b).save(function(err){
                            if(err) throw err;
                            resolve(user.request_id);
                        })
                        
                    });
                    
                });
            });
        });
    });
}

database.username_available = (u) => {
    console.log("database", 39, u)
    return new Promise((resolve, reject) => {
        User.findOne({ username: u }).then((obj) => {
            console.log('database line 39', obj)
            if (obj) {
                console.log('database line 41, rejecting....')
                reject(true);
            } else {
                console.log('database line 43, resolving....')
                resolve(true);
            }
        })
    });
}

database.mail_available = (u) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: u }).then((obj) => {
            if (obj) {
                reject(true);
            } else {
                resolve(true);
            }
        })
    });
}

database.auth_user = (un, pass) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: un }).then((obj) => {
            if (obj) {
                if (obj.password === md5(pass)) {
                    resolve(obj);
                } else {
                    reject("incorrect Password");
                }
            } else {
                reject("User not found");
            }

        });
    });
}

database.get_user_obj = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ user_id: id }).then(obj => {
            if (obj) {
                resolve(obj);
            } else {
                reject("invalid token")
            }
        });
    });
}

database.get_admin_dashboard = () => {
    return new Promise((resolve, reject) => {
        var state = {};
        User.countDocuments({ user_type: "User" }).then((count) => {
            state.users = count
            User.countDocuments({ user_type: "Librarian" }).then((count) => {
                state.librarians = count
                state.pending_requests = 0;
                resolve(state);
            });
        });
    });
}
database.get_users = () => {
    return new Promise((resolve, reject) => {
        var users = [];
        User.find({ user_type: "User" }).then((u) => {
            users.concat(u)
            User.find({ user_type: "Librarian" }).then((l) => {
                users.concat(u);
                console.log(users.concat(u, l))
                resolve(users.concat(u, l))
            });
        });
    });
}

database.get_books = () => {
    return new Promise((resolve, reject) => {
        var users = [];
        Book.find({ status: "in_library" }).then((il) => {
            Book.find({ status: "with_user" }).then((wu) => {
                Book.find({ status: "lost" }).then((l) => {
                    resolve(users.concat(il, wu, l))
                });
            });
        });
    });
}

database.search_books = (q) => {
    return new Promise((resolve, reject) => {
        var users = [];
        console.log(172, q)
        Book.find({ status: 'in_library' }).then((il) => {
            var lid = [];
            il.forEach((b) => {
                if ((b.title).toLowerCase().includes(q.toLowerCase()) || (b.author).toLowerCase().includes(q.toLowerCase())) {
                    lid.push(b)
                }
            })
            resolve(lid);
        });
    });
}

database.change_user_type = (id, type) => {
    return new Promise((resolve, reject) => {
        if (type === "User" || type === "Librarian") {
            User.findOne({ user_id: id }).then((user) => {
                user.user_type = type;
                User(user).save(function (err) {
                    if (err) throw err;
                    resolve(user.user_type)
                });
            });
        } else {
            reject("Invalid Type")
        }

    });

}

database.book_lost = (id) => {
    return new Promise((resolve, reject) => {
        if (true) {
            Book.findOne({ book_id: id }).then((user) => {
                user.status = 'lost';
                Book(user).save(function (err) {
                    if (err) throw err;
                    resolve(user.status)
                });
            });
        } else {
            reject("Invalid Type")
        }

    });
}

database.edit_book = (book) => {
    console.log(204, book)
    return new Promise((resolve, reject) => {
        if (true) {
            Book.findOne({ book_id: book.book_id }).then((user) => {
                for (var key in book) {
                    console.log(key.toLowerCase());
                    user[key.toLowerCase()] = book[key];
                }
                user["ISBN"] = book["ISBN"]
                console.log(212, user);
                Book(user).save(function (err) {
                    if (err) throw err;
                    resolve(user)
                });
            });
        } else {
            reject("Invalid Type")
        }

    });
}

database.remove_book = (book) => {
    console.log(204, book)
    return new Promise((resolve, reject) => {
        if (true) {
            Book.findOne({ book_id: book }).then((user) => {
                console.log(212, user);
                user.status = 'deleted';

                Book(user).save(function (err) {
                    if (err) throw err;
                    resolve(user)
                });
            });
        } else {
            reject("Invalid Type")
        }

    });
}


database.get_librarian_dashboard = () => {
    return new Promise((resolve, reject) => {
        var state = {}
        Book.countDocuments({ status: "with_user" }).then((count) => {
            state.with_user = count;
            Book.countDocuments({ status: "in_library" }).then((count) => {
                state.in_library = count;
                resolve(state)
            });
        });
    });
}

database.get_user_dashboard = (id) => {
    return new Promise((resolve, reject) => {
        var state = {}
        Book.countDocuments({ availability: id }).then((count1) => {
            state.with_user = count1;
            Request.countDocuments({ user_id: id, status: "pending" }).then((count2) => {
                state.pending_requests = count2;
                Request.countDocuments({ user_id: id, status: "accepted" }).then((count3) => {
                    state.accepted = count3;
                    resolve(state)
                });
            });
        });
    });
}



module.exports = database;