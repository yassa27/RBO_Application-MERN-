const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  Content: String,
  user: [{  //model association saving user data for message
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
}],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);