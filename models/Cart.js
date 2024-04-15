const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  consoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Console',
  }],
});

module.exports = mongoose.model('Cart', cartSchema);