//title, author, publisher, genre, summary, ISBN, location, availability,
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    status:String,
    request_id:String,
    user_id:String,
    book_id:String,
    days:String
});

const Model = mongoose.model('request', schema);

module.exports = Model;