const mongoose = require('mongoose');

const ListsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  refUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  favs: [ {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },]
}, { versionKey: false });

module.exports = mongoose.model('Favs', ListsSchema);