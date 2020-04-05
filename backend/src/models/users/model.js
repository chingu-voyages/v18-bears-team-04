import mongoose from ('mongoose');
import userSchema from ('./schema');

//add hooks here
// userSchema.pre('save', function(){
//     return doStuff().then(() => doMoreStuff());
// });

const User = mongoose.model('User', schema);
export default User;