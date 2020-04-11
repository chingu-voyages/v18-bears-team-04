const mongoose = require("mongoose");
//import mongoose from ("mongoose");
const userSchema = require("./schema");

//import userSchema from ("./schema");

//add hooks here
// userSchema.pre('save', function(){
//     return doStuff().then(() => doMoreStuff());
// });

const User = mongoose.model("User", userSchema);
export default User;
