const mongoose = require(`mongoose`)
const {Schema} = mongoose 
const validator = require('validator')



const userSchema = new Schema({
    firstName:{
         type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
    },  
    lastName:{
         type: String,
        minLength: 3,
        maxLength: 10,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        // minLength: 3,
        // maxLength: 30,
    
    },  
    email: {
        type : String,
        required: true,
    },

     
})

const User = mongoose.model(`user`, userSchema)


const Post = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // owner
}));


module.exports ={
    User, 
    Post
}