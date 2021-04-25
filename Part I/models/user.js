const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email :String,
    password :String,
    user_id: String,
    photo_url: String,
    google_sub:String,
    user_type:String,
    activity:String,
    books:String,
    username: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;