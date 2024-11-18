const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    email: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);
