const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.DB_ConnectionString
exports.ConnectDB=()=>{
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const connection = mongoose.connection
    return connection.once('open', () => {
        console.log('connection established successfully')
        
    })
    


} catch (err) {
    console.log(err)
    return false
}
}
