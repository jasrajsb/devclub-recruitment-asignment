//title, author, publisher, genre, summary, ISBN, location, availability,
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: String,
    author: String,
    publisher: String,
    genre: String,
    summary: String,
    ISBN: String,
    location: String,
    availability: String,
    status:String,
    book_id:String
});
schema.index({
    title: 'text',
    author: 'text',
  }, {
    weights: {
        title: 5,
        author: 1,
    },
  });
const Model = mongoose.model('book', schema);

module.exports = Model;