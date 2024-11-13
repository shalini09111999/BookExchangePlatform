const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteGenres: { type: [String], default: [] },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    //console.log("Hashed password before saving:", this.password); 
    next();
});

// Method to match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    //console.log("Entered password:", enteredPassword); 
    //console.log("Stored password hash:", this.password); 

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(enteredPassword.trim(), this.password);
    //console.log("Password match result:", isMatch); 

    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
