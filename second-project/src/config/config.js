 const mongoose =  require(`mongoose`)

 const uri =  `mongodb+srv://muhammadimam:33531789@cluster0.v2ao39n.mongodb.net/`

async function connectDB() {
    await mongoose.connect(uri)
}

module.exports =  {
    connectDB
}