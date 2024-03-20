const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
