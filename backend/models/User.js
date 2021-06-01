const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {type: String,unique:true},
  password: {type: String},
  firstName:{type:String},
  lastName:{type:String},
  userType:{type:String},
  studentNumber:{type:Number,unique:true}

})

module.exports = mongoose.model('Student', studentSchema)