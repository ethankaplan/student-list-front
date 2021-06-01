const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {type: String,unique:true,required: true},
  password: {type: String,required: true},
  firstName:{type:String,required: true},
  lastName:{type:String,required: true},
  accType:{type:String,required: true},
  studentNumber:{type:Number,unique:true}

})

module.exports = mongoose.model('Student', studentSchema)