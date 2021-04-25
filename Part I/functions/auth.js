const jwt = require('jsonwebtoken');
require('dotenv').config()

var auth = {};

auth.getToken = (obj)=>{
    var result = {
        name: obj.name,
        email: obj.email,
        photo_url: obj.photo_url
    };
    result.token = jwt.sign({ id: obj.user_id }, process.env.JWT_AUTH_KEY);
    return result;
}

auth.verify = (token)=>{
    var decoded = jwt.verify(token, process.env.JWT_AUTH_KEY)
    return decoded?decoded.id:null
}


module.exports=auth;